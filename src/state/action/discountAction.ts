import { AppThunk } from "../redux-store";
import { RequestError } from "../../utils/requestError";
import { api } from "../../utils/api";
import {
	createDiscountFailed,
	createDiscountRequest,
	createDiscountSuccess,
	deactivateDiscountFailed,
	deactivateDiscountRequest,
	deactivateDiscountSuccess,
} from "../slices/discountSlice";

export const createDiscountCodeAction =
	(id: string, input: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(createDiscountRequest());
			const {
				appState: { app_type },
				userLogin: { userInfo },
			} = getState();

			const { data } = await api(app_type).post(
				`/referral/${id}`,
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);
			dispatch(createDiscountSuccess(data));
		} catch (error) {
			dispatch(createDiscountFailed(RequestError(error)));
		}
	};

export const deactivateDiscountCodeAction =
	(id: String): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(deactivateDiscountRequest());

			const {
				appState: { app_type },
				userLogin: { userInfo },
			} = getState();

			const { data } = await api(app_type).post(`/referral/deactivate/${id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
			});
			dispatch(deactivateDiscountSuccess(data));
		} catch (error) {
			dispatch(deactivateDiscountFailed(RequestError(error)));
		}
	};
