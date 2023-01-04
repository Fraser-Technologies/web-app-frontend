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
	(name: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(createCityRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.post(
				"/city",
				{ name },
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

export const getAllCityAction = (): AppThunk => async (dispatch) => {
	dispatch(getAllCityRequest());
	try {
		const { data } = await api.get("/city");
		dispatch(getAllCitySuccess(data));
	} catch (error: any) {
		dispatch(getAllCityFailed(RequestError(error)));
	}
};

export const updateCityAction =
	(id: string, name: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(updateCityRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.put(
				`/city/${id}`,
				{ name },
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
			} = getState();
			const { data } = await api.delete(`/city/${id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
			});
			dispatch(deleteCitySuccess(data));
		} catch (error: any) {
			dispatch(deleteCityFailed(RequestError(error)));
		}
	};
