import {
	adminUpdateUserFailed,
	adminUpdateUserRequest,
	adminUpdateUserReset,
	adminUpdateUserSuccess,
} from "../slices/user.slice";
import { requestHeader } from "../../utils/requestHeader";
import { RequestError } from "../../utils/requestError";
import Cookie from "js-cookie";
import { AppThunk } from "../redux-store";
import {
	allDriverFailed,
	allDriverRequest,
	allDriverSuccess,
	becomeADriverFailed,
	becomeADriverRequest,
	becomeADriverSuccess,
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
	registerAsDriverFailed,
	registerAsDriverRequest,
	registerAsDriverSuccess,
	registerRequest,
	registerSuccess,
	unBlockUserFailed,
	unBlockUserRequest,
	unBlockUserSuccess,
	updateUserFailed,
	updateUserRequest,
	updateUserSuccess,
} from "../slices/user.slice";
import { api } from "../../utils/api";

export const getAllUserAction = (): AppThunk => async (dispatch, getState) => {
	dispatch(getAllUserRequest());
	try {
		const {
			userLogin: { userInfo },
			appState: { app_type },
		} = getState();
		const { data } = await api(app_type).get("/user", {
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
	async (dispatch, getState) => {
		try {
			dispatch(registerRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post("/user/signup", { ...input });

			Cookie.set("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
			dispatch(registerSuccess(data));
		} catch (error: any) {
			dispatch(loginFailed(RequestError(error)));
		}
	};

export const userLoginAction =
	(phone: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(loginRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post("/user/login", { phone });
			Cookie.set("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
		} catch (error: any) {
			dispatch(loginFailed(RequestError(error)));
		}
	};

export const userLoginWithEmailAction =
	(email: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(loginRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post("/user/login", { email });
			Cookie.set("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
		} catch (error: any) {
			dispatch(loginFailed(RequestError(error)));
		}
	};

export const updateUserAction =
	(id: string, update: any): AppThunk =>
	async (dispatch, getState) => {
		dispatch(updateUserRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).put(
				`/user/update/${id}`,
				{ ...update },
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
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
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
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
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

export const getAllDriverAction =
	(): AppThunk => async (dispatch, getState) => {
		try {
			dispatch(allDriverRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).get("/user/drivers");
			dispatch(allDriverSuccess(data));
		} catch (error: any) {
			dispatch(allDriverFailed(RequestError(error)));
		}
	};

export const becomeADriverAction =
	(): AppThunk => async (dispatch, getState) => {
		try {
			dispatch(becomeADriverRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
				`/user/becomedriver/${userInfo?._id}`
			);
			Cookie.set("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
			dispatch(becomeADriverSuccess(data));
		} catch (error: any) {
			dispatch(becomeADriverFailed(RequestError(error)));
		}
	};

export const registerAsADriverAction =
	(driverData: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(registerAsDriverRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
				"/user/registerasdriver",
				{
					...driverData,
				},
				{
					headers: {
						"Content-type": "application/json",
					},
				}
			);
			Cookie.set("userInfo", JSON.stringify(data));
			dispatch(loginSuccess(data));
			dispatch(registerAsDriverSuccess(data));
		} catch (error: any) {
			dispatch(registerAsDriverFailed(RequestError(error)));
		}
	};

export const AdminUpdateUserAction =
	(id: string, update: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(adminUpdateUserRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).put(
				`/user/admin/update/${id}`,
				{
					...update,
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);
			dispatch(adminUpdateUserSuccess(data));
		} catch (error: any) {
			dispatch(adminUpdateUserFailed(RequestError(error)));
		}
	};

export const ResetAdminUpdateUserAction = (): AppThunk => (dispatch) => {
	dispatch(adminUpdateUserReset());
};
