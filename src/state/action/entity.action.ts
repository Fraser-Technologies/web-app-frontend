import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import { AppThunk } from "../redux-store";
import { deleteCityFailed } from "../slices/city.slice";
import {
	createEntityFailure,
	createEntityRequest,
	createEntitySuccess,
	deleteEntityFailure,
	deleteEntityRequest,
	deleteEntitySuccess,
	editEntityFailure,
	editEntityRequest,
	editEntitySuccess,
	getAllEntityFailure,
	getAllEntityRequest,
	getAllEntitySuccess,
	getEntityByIdFailure,
	getEntityByIdRequest,
	getEntityByIdSuccess
} from "../slices/entity.slice";

export const createEntityAction =
	(input: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			dispatch(createEntityRequest());
			const { data } = await api(app_type).post(
				"/entity",
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);
			dispatch(createEntitySuccess(data));
		} catch (error: any) {
			dispatch(createEntityFailure(RequestError(error)));
		}
	};

export const getAllEntityAction =
	(): AppThunk => async (dispatch, getState) => {
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			dispatch(getAllEntityRequest());
			const { data } = await api(app_type).get("/entity", {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`
				}
			});
			dispatch(getAllEntitySuccess(data));
		} catch (error: any) {
			dispatch(getAllEntityFailure(RequestError(error)));
		}
	};

export const getEntityByIdAction =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const {
			userLogin: { userInfo },
			appState: { app_type }
		} = getState();
		try {
			dispatch(getEntityByIdRequest());
			const { data } = await api(app_type).get(`/entity/${id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`
				}
			});
			dispatch(getEntityByIdSuccess(data));
		} catch (error: any) {
			dispatch(getEntityByIdFailure(RequestError(error)));
		}
	};

export const deleteEntityAction =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		const {
			userLogin: { userInfo },
			appState: { app_type }
		} = getState();
		try {
			dispatch(deleteEntityRequest());
			const { data } = await api(app_type).delete(`/entity/${id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`
				}
			});
			dispatch(deleteEntitySuccess(data));
		} catch (error: any) {
			dispatch(deleteEntityFailure(RequestError(error)));
		}
	};

export const editEntityAction =
	(id: string, input: any): AppThunk =>
	async (dispatch, getState) => {
		const {
			userLogin: { userInfo },
			appState: { app_type }
		} = getState();
		try {
			dispatch(editEntityRequest());
			const { data } = await api(app_type).put(
				`/entity/${id}`,
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);
			dispatch(editEntitySuccess(data));
		} catch (error: any) {
			dispatch(editEntityFailure(RequestError(error)));
		}
	};
