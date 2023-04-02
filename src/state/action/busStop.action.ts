import { AppThunk } from "../redux-store";
import { RequestError } from "../../utils/requestError";
import { api } from "../../utils/api";

import {
	addBusStopFromCityFailed,
	addBusStopFromCityRequest,
	addBusStopFromCityReset,
	addBusStopFromCitySuccess,
	getAllBusStopFailed,
	getAllBusStopRequest,
	getAllbusStopSuccess,
	removeBusStopFromCityFailed,
	removeBusStopFromCityRequest,
	removeBusStopFromCityReset,
	removeBusStopFromCitySuccess,
} from "../slices/busstop.slice";

export const getAllBusStopAction =
	(): AppThunk => async (dispatch, getState) => {
		try {
			dispatch(getAllBusStopRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).get("/busstop");
			dispatch(getAllbusStopSuccess(data));
		} catch (error) {
			dispatch(getAllBusStopFailed(RequestError(error)));
		}
	};

export const addBusStopToCityAction =
	(id: string, busStop: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(addBusStopFromCityRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
				`/city/addbusstop/${id}`,
				{
					busStop: busStop,
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);
			dispatch(addBusStopFromCitySuccess(data));
		} catch (error: any) {
			dispatch(addBusStopFromCityFailed(RequestError(error)));
		}
	};

export const removeBusStopToCityAction =
	(id: string, busStop: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(removeBusStopFromCityRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
				`/city/removebusstop/${id}`,
				{
					busStop: busStop,
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);

			dispatch(removeBusStopFromCitySuccess(data));
		} catch (error: any) {
			dispatch(removeBusStopFromCityFailed(RequestError(error)));
		}
	};

export const clearRemoveBusStopFromCityAction = (): AppThunk => (dispatch) => {
	dispatch(removeBusStopFromCityReset());
};

export const clearAddBusStopFromCityAction = (): AppThunk => (dispatch) => {
	dispatch(addBusStopFromCityReset());
};
