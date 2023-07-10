import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import {
	createStateFailed,
	createStateRequest,
	createStateSuccess,
	deleteStateFailed,
	deleteStateRequest,
	deleteStateSuccess,
	getAllStateFailed,
	getAllStateRequest,
	getAllStateSuccess,
	updateStateFailed,
	updateStateRequest,
	updateStateSuccess
} from "../slices/state.slice";
import { AppThunk } from "../redux-store";

export const createStateAction =
	(input: any): AppThunk =>
	async (dispatch, getState) => {
		dispatch(createStateRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post(
				"/state",
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);
			dispatch(createStateSuccess(data));
		} catch (error: any) {
			dispatch(createStateFailed(RequestError(error)));
		}
	};

export const getAllStateAction = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch(getAllStateRequest());
		const {
			appState: { app_type }
		} = getState();
		const { data } = await api(app_type).get("/state");
		dispatch(getAllStateSuccess(data));
	} catch (error: any) {
		dispatch(getAllStateFailed(RequestError(error)));
	}
};

export const updateStateAction =
	(id: string, input: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(updateStateRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).put(
				`/state/${id}`,
				{ input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);

			dispatch(updateStateSuccess(data));
		} catch (error: any) {
			dispatch(updateStateFailed(RequestError(error)));
		}
	};

export const deleteState =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(deleteStateRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).delete(`/state/${id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`
				}
			});
			dispatch(deleteStateSuccess(data));
		} catch (error: any) {
			dispatch(deleteStateFailed(RequestError(error)));
		}
	};
