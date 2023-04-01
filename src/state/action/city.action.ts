import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import {
	createCityFailed,
	createCityRequest,
	createCitySuccess,
	deleteCityFailed,
	deleteCityRequest,
	deleteCitySuccess,
	getAllCityFailed,
	getAllCityRequest,
	getAllCitySuccess,
	updateCityFailed,
	updateCityRequest,
	updateCitySuccess,
} from "../slices/city.slice";
import { AppThunk } from "./../redux-store";

export const createCityAction =
	(input: any): AppThunk =>
	async (dispatch, getState) => {
		dispatch(createCityRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
				"/city",
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);
			dispatch(createCitySuccess(data));
		} catch (error: any) {
			dispatch(createCityFailed(RequestError(error)));
		}
	};

export const getAllCityAction = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch(getAllCityRequest());
		const {
			appState: { app_type },
		} = getState();
		const { data } = await api(app_type).get("/city");
		dispatch(getAllCitySuccess(data));
	} catch (error: any) {
		dispatch(getAllCityFailed(RequestError(error)));
	}
};

export const updateCityAction =
	(id: string, input: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(updateCityRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).put(
				`/city/${id}`,
				{ input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);

			dispatch(updateCitySuccess(data));
		} catch (error: any) {
			dispatch(updateCityFailed(RequestError(error)));
		}
	};

export const deleteCity =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(deleteCityRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).delete(`/city/${id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
			});
			dispatch(deleteCitySuccess(data));
		} catch (error: any) {
			dispatch(deleteCityFailed(RequestError(error)));
		}
	};
