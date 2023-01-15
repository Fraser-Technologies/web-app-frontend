import { requestHeader } from "./../../utils/requestHeader";
import { RequestError } from "../../utils/requestError";
import Cookie from "js-cookie";
import { api } from "../../utils/api";

import { AppThunk } from "../redux-store";
import {
	blockUserFailed,
	blockUserRequest,
	blockUserSuccess,
	clearBlockUser,
	clearUnBlockUser,
	getAllUserFailed,
	getAllUserRequest,
	getAllUserSuccess,
	loginFailed,
	loginRequest,
	loginSuccess,
	logOut,
	registerRequest,
	registerSuccess,
	unBlockUserFailed,
	unBlockUserRequest,
	unBlockUserSuccess,
	updateUserFailed,
	updateUserRequest,
	updateUserSuccess,
} from "../slices/user.slice";
import { userInfo } from "os";

export const getAllUserAction = (): AppThunk => async (dispatch, getState) => {
	dispatch(getAllUserRequest());
	try {
		const {
			userLogin: { userInfo },
		} = getState();
		const { data } = await api.get("/user", {
			headers: {
				Authorization: `Bearer ${userInfo?.user_token}`,
			},
		});

		dispatch(getAllUserSuccess(data));
	} catch (error: any) {
		dispatch(getAllUserFailed(RequestError(error)));
	}
};

export const registerUserAction =
	(input: any): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(registerRequest());
			const { data } = await api.post("/user/signup", { input });
			Cookie.set("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
			dispatch(registerSuccess(data));
		} catch (error: any) {
			dispatch(loginFailed(RequestError(error)));
		}
	};

export const userLoginAction =
	(phone: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(loginRequest());
			const { data } = await api.post("/user/login", { phone });

			localStorage.setItem("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
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

export const blockUserAction =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(blockUserRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.post(
				`/user/block/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);
			dispatch(blockUserSuccess(data));
		} catch (error: any) {
			dispatch(blockUserFailed(RequestError(error)));
		}
	};

export const clearBlockUserAction = (): AppThunk => (dispatch) => {
	dispatch(clearBlockUser());
};

export const unblockUserAction =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(unBlockUserRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.post(
				`/user/unblock/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);
			dispatch(unBlockUserSuccess(data));
		} catch (error: any) {
			dispatch(unBlockUserFailed(RequestError(error)));
		}
	};

export const clearUnblockUserAction = (): AppThunk => (dispatch) => {
	dispatch(clearUnBlockUser());
};
