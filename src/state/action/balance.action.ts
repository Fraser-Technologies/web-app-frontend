import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import { requestHeader } from "../../utils/requestHeader";
import {
	addAcccountSuccess,
	addAccountFailed,
	addAccountRequest,
	getAllUserBalanceFailed,
	getAllUserBalanceRequest,
	getAllUserBalanceSuccess,
	getBalanceByUserFailed,
	getBalanceByUserRequest,
	getBalanceByUserSuccess,
	withdrawFailed,
	withdrawRequest,
	withdrawSuccess,
} from "../slices/balance.slice";
import { AppThunk } from "./../redux-store";

export const getAllUserBalance = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch(getAllUserBalanceRequest());
		const {
			userLogin: { userInfo },
			appState: { app_type },
		} = getState();

		const { data } = await api(app_type).get("/balance", {
			headers: {
				Authorization: `Bearer ${userInfo?.user_token}`,
			},
		});
		dispatch(getAllUserBalanceSuccess(data));
	} catch (error: any) {
		dispatch(getAllUserBalanceFailed(RequestError(error)));
	}
};

export const getBalanceByUserAction =
	(): AppThunk => async (dispatch, getState) => {
		try {
			dispatch(getBalanceByUserRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).get(
				`/balance/user/${userInfo?._id}`,
				requestHeader(userInfo)
			);
			dispatch(getBalanceByUserSuccess(data));
		} catch (error: any) {
			dispatch(getBalanceByUserFailed(RequestError(error)));
		}
	};

export const addAccountAction =
	(accountDetails: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			dispatch(addAccountRequest());

			const { data } = await api(app_type).post(
				`/balance/addbank`,
				{ ...accountDetails },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);

			dispatch(addAcccountSuccess(data));
		} catch (error: any) {
			dispatch(addAccountFailed(RequestError(error)));
		}
	};

export const withdrawBalanceAction =
	(amount: number): AppThunk =>
	async (dispatch, getState) => {
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();

			dispatch(withdrawRequest());

			const { data } = await api(app_type).post(
				"/balance/withdraw",
				{ amount: amount },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);

			dispatch(withdrawSuccess(data));
		} catch (error: any) {
			dispatch(withdrawFailed(RequestError(error)));
		}
	};
