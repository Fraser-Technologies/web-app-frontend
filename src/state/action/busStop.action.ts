import { AppThunk } from "../redux-store";
import { RequestError } from "../../utils/requestError";
import { api } from "../../utils/api";

import {
	addBusStopFromStateFailed,
	addBusStopFromStateRequest,
	addBusStopFromStateReset,
	addBusStopFromStateSuccess,
	getAllBusStopFailed,
	getAllBusStopRequest,
	getAllbusStopSuccess,
	removeBusStopFromStateFailed,
	removeBusStopFromStateRequest,
	removeBusStopFromStateReset,
	removeBusStopFromStateSuccess
} from "../slices/busstop.slice";

export const getAllBusStopAction =
	(): AppThunk => async (dispatch, getState) => {
		try {
			dispatch(getAllBusStopRequest());
			const {
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).get("/busstop");
			dispatch(getAllbusStopSuccess(data));
		} catch (error) {
			dispatch(getAllBusStopFailed(RequestError(error)));
		}
	};

export const addBusStopToStateAction =
	(id: string, busStop: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(addBusStopFromStateRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post(
				`/State/addbusstop/${id}`,
				{
					busStop: busStop
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);
			dispatch(addBusStopFromStateSuccess(data));
		} catch (error: any) {
			dispatch(addBusStopFromStateFailed(RequestError(error)));
		}
	};

export const removeBusStopToStateAction =
	(id: string, busStop: string): AppThunk =>
	async (dispatch, getState) => {
		dispatch(removeBusStopFromStateRequest());
		try {
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post(
				`/State/removebusstop/${id}`,
				{
					busStop: busStop
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);

			dispatch(removeBusStopFromStateSuccess(data));
		} catch (error: any) {
			dispatch(removeBusStopFromStateFailed(RequestError(error)));
		}
	};

export const clearRemoveBusStopFromStateAction = (): AppThunk => (dispatch) => {
	dispatch(removeBusStopFromStateReset());
};

export const clearAddBusStopFromStateAction = (): AppThunk => (dispatch) => {
	dispatch(addBusStopFromStateReset());
};
