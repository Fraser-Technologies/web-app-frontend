import { requestHeader } from "./../../utils/requestHeader";
import { RequestError } from "../../utils/requestError";
import Cookie from "js-cookie";
import { api } from "../../utils/api";

import { AppThunk } from "../redux-store";
import {
	loginFailed,
	loginRequest,
	loginSuccess,
	logOut,
	registerRequest,
	registerSuccess,
	updateUserFailed,
	updateUserRequest,
	updateUserSuccess,
} from "../slices/user.slice";

export const registerUserAction =
	(input: any): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(registerRequest());
			const { data } = await api.post("/user/signup", { input });
			Cookie.set("userInfo", JSON.stringify(data?.data));
			dispatch(loginSuccess(data));
			dispatch(registerSuccess(data));
		} catch (error: any) {
			dispatch(loginFailed(requestHeader(error)));
		}
	};

export const userLoginAction =
	(phone: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(loginRequest());
			const { data } = await api.post("/user/login", { phone });
			const userData = {
				...data?.data?.user,
				user_token: data?.data?.user_token,
			};
			const cook = Cookie.set("userInfo", JSON.stringify(userData));
			localStorage.setItem("userInfo", JSON.stringify(userData));
			console.log("suppose to save to cookie ", cook);
			dispatch(loginSuccess(userData));
		} catch (error: any) {
			dispatch(loginFailed(RequestError(error)));
		}
	};

export const updateUserAction =
	({ id, update }: { id: string; update: any }): AppThunk =>
	async (dispatch, getState) => {
		dispatch(updateUserRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.put(
				`/user/${id}`,
				{ update },
				requestHeader(userInfo)
			);
			Cookie.set("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
			dispatch(updateUserSuccess(data));
		} catch (error: any) {
			dispatch(updateUserFailed(RequestError(error)));
		}
	};

export const logoutUserAction = (): AppThunk => (dispatch) => {
	Cookie.remove("userInfo");
	dispatch(logOut());
};
