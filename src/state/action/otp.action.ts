import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import Cookie from "js-cookie";
import {
	clearOtp,
	clearVerifyOtp,
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
			const { data } = await api.post("/otp/getotp", { phone });
			dispatch(getOtpSuccess(data));
		} catch (error: any) {
			dispatch(getOtpFailed(RequestError(error)));
		}
	};

export const getOtpEmailAction =
	(email: string): AppThunk =>
	async (dispatch) => {
		dispatch(getOtpRequest());
		try {
			const { data } = await api.post("/otp/getotp", { email });
			dispatch(getOtpSuccess(data));
		} catch (error: any) {
			dispatch(getOtpFailed(RequestError(error)));
		}
	};

export const resetGetOtpAction = (): AppThunk => async (dispatch) => {
	dispatch(clearOtp());
};

export const VerifyOtpAction =
	({ otp, phone }: { otp: string; phone: string }): AppThunk =>
	async (dispatch) => {
		dispatch(verifyOtpRequest());
		try {
			const { data } = await api.post("/otp/verifyotp", {
				phone,
				otp,
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

export const VerifyEmailOtpAction =
	({ otp, email }: { otp: string; email: string }): AppThunk =>
	async (dispatch) => {
		dispatch(verifyOtpRequest());
		try {
			const { data } = await api.post("/otp/verifyotp", {
				email,
				otp,
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

export const resetVerifyOtpAction = (): AppThunk => async (dispatch) => {
	dispatch(clearVerifyOtp());
};
