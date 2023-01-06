import { AppThunk } from "./../redux-store";
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

export const getAllBusStop = (): AppThunk => async (dispatch) => {
	try {
		dispatch(getAllBusStopRequest());
		const { data } = await api.get("/busstop");
		dispatch(getAllbusStopSuccess(data));
	} catch (error) {
		dispatch(getAllBusStopFailed(RequestError(error)));
	}
};

export const addBusStopToCityAction =
	(id: string, busStop: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(addBusStopFromCityRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.post(
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
		console.log("the value passed are ", id, busStop);
		dispatch(removeBusStopFromCityRequest());
		try {
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.post(
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
