import { userInfo } from "os";
import { RequestError } from "../../utils/requestError";
import { api } from "../../utils/api";

import { AppThunk } from "../redux-store";
import {
	getAllAvailableTripFailed,
	getAllAvailableTripRequest,
	getAllAvailableTripSuccess,
	getAllTripsFailed,
	getAllTripsRequest,
	getAllTripsSuccess,
	getAvailableTripFailed,
	getAvailableTripRequest,
	getAvailableTripSuccess,
	updateTripFailed,
	updateTripRequest,
	updateTripSuccess,
} from "../slices/trip.slice";

export const getAvailableTripAction =
	({ from, to }: { from: string; to: string }): AppThunk =>
	async (dispatch) => {
		dispatch(getAvailableTripRequest());
		try {
			const { data } = await api.post("/trip/available", {
				from,
				to,
			});

			dispatch(getAvailableTripSuccess(data));
		} catch (error: any) {
			dispatch(getAvailableTripFailed(RequestError(error)));
		}
	};

export const getAllAvailableTripAction = (): AppThunk => async (dispatch) => {
	dispatch(getAllAvailableTripRequest());
	try {
		const { data } = await api.get("/trip/uncompleted");
		dispatch(getAvailableTripSuccess(data));
		dispatch(getAllAvailableTripSuccess(data));
	} catch (error: any) {
		dispatch(getAllAvailableTripFailed(RequestError(error)));
	}
};

export const getAllTripAction = (): AppThunk => async (dispatch) => {
	dispatch(getAllTripsRequest());
	try {
		const { data } = await api.get("/trip");
		dispatch(getAllTripsSuccess(data));
	} catch (error: any) {
		dispatch(getAllTripsFailed(RequestError(error)));
	}
};

export const updateTripAction =
	(id: string, input: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(updateTripRequest());
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.put(`/trip/${id}`, input, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
			});

			dispatch(updateTripSuccess(data));
		} catch (error: any) {
			dispatch(updateTripFailed(RequestError(error)));
		}
	};
