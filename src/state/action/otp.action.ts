import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import Cookie from "js-cookie";
import {
	getOtpFailed,
	getOtpRequest,
	getOtpSuccess,
	verifyOtpFailed,
	verifyOtpRequest,
	verifyOtpSuccess,
} from "../slices/otp.Slice";
import { loginSuccess } from "../slices/user.slice";
import { AppThunk } from "../redux-store";

export const getOtpAction =
	(phone: string): AppThunk =>
	async (dispatch) => {
		dispatch(getOtpRequest());
		try {
			const { data } = await api.post("/user/get_otp", { phone: phone });
			dispatch(getOtpSuccess(data));
		} catch (error: any) {
			dispatch(getOtpFailed(RequestError(error)));
		}
	};

export const VerifyOtpAction =
	({ otp, phone }: { otp: string; phone: string }): AppThunk =>
	async (dispatch) => {
		dispatch(verifyOtpRequest());
		try {
			const { data } = await api.post("/user/verify_otp", {
				phone: phone,
				otp: otp,
			});

			if (data) {
				dispatch(verifyOtpSuccess(data));
				if (data?._id) {
					dispatch(loginSuccess(data));

					Cookie.set("userInfo", JSON.stringify(data));
				}
			} else {
				dispatch(verifyOtpSuccess(data));
			}
		} catch (error: any) {
			dispatch(verifyOtpFailed(RequestError(error)));
		}
	};
