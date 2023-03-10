import { AppThunk } from "./../redux-store";
import {
	getTransactionByIdRequest,
	getTransactionByIdSuccess,
	verifyPaymentStatusFailed,
	verifyPaymentStatusRequest,
	verifyPaymentStatusSuccess,
} from "./../slices/transactionSlice";
import { api } from "../../utils/api";
import {
	getAllTransactionFailed,
	getAllTransactionRequest,
	getAllTransactionSuccess,
	getTransactionByIdFailed,
} from "../slices/transactionSlice";

export const getAllTransactionAction =
	(): AppThunk => async (dispatch, getState) => {
		dispatch(getAllTransactionRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.get("/transaction", {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
			});
			dispatch(getAllTransactionSuccess(data));
		} catch (error: any) {
			dispatch(getAllTransactionFailed(error));
		}
	};

export const getAllTransactionByIdAction =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(getTransactionByIdRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.get(`/transaction/${id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
			});
			dispatch(getTransactionByIdSuccess(data));
		} catch (error: any) {
			dispatch(getTransactionByIdFailed(error));
		}
	};

export const verifyPaymentStatusAction =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(verifyPaymentStatusRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();

			const { data } = await api.put(
				`/transaction/verifypayment/${id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);

			dispatch(verifyPaymentStatusSuccess(data));
		} catch (error: any) {
			dispatch(verifyPaymentStatusFailed(error));
		}
	};
