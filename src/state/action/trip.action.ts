import { AppThunk } from "./../redux-store";
import { RequestError } from "../../utils/requestError";
import {
	createTripFailed,
	createTripRequest,
	createTripSuccess,
	deleteTripByIdFailed,
	deleteTripByIdRequest,
	deleteTripByIdSuccess,
	getAllAvailableTripFailed,
	getAllAvailableTripRequest,
	getAllAvailableTripSuccess,
	getAllTripsFailed,
	getAllTripsRequest,
	getAllTripsSuccess,
	getAvailableTripFailed,
	getAvailableTripRequest,
	getAvailableTripSuccess,
	getTripByBusFailed,
	getTripByBusRequest,
	getTripByBusSuccess,
	getTripByDriverFailed,
	getTripByDriverRequest,
	getTripByDriverSuccess,
	resetCreateTrip,
	unverifyPassengerOnBoardFailed,
	unverifyPassengerOnBoardRequest,
	unverifyPassengerOnBoardSuccess,
	updateTripFailed,
	updateTripRequest,
	updateTripReset,
	updateTripSuccess,
	verifyPassengerOnBoardFailed,
	verifyPassengerOnBoardRequest,
	verifyPassengerOnBoardSuccess,
	endTripFailed,
	endTripRequest,
	endTripSuccess,
	getAvailableNYSCTripFailed,
	getAvailableNYSCTripRequest,
	getAvailableNYSCTripSuccess
} from "../slices/trip.slice";
import { resetDeleteState } from "../slices/state.slice";
import { api } from "../../utils/api";
import { requestHeader } from "../../utils/requestHeader";

export const getAvailableTripAction =
	({ from, to }: { from: string; to: string }): AppThunk =>
	async (dispatch, getState) => {
		dispatch(getAvailableTripRequest());
		try {
			const {
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post("/trip/available", {
				from,
				to
			});

			dispatch(getAvailableTripSuccess(data));
		} catch (error: any) {
			dispatch(getAvailableTripFailed(RequestError(error)));
		}
	};

export const getAllAvailableTripAction =
	(): AppThunk => async (dispatch, getState) => {
		dispatch(getAllAvailableTripRequest());
		try {
			const {
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).get("/trip/uncompleted");
			dispatch(getAvailableTripSuccess(data));
			dispatch(getAllAvailableTripSuccess(data));
		} catch (error: any) {
			dispatch(getAllAvailableTripFailed(RequestError(error)));
		}
	};

export const getAllTripAction = (): AppThunk => async (dispatch, getState) => {
	dispatch(getAllTripsRequest());
	try {
		const {
			appState: { app_type }
		} = getState();
		const { data } = await api(app_type).get("/trip");
		dispatch(getAllTripsSuccess(data));
	} catch (error: any) {
		dispatch(getAllTripsFailed(RequestError(error)));
	}
};

export const createTripAction =
	(trip: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(createTripRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post("/trip", trip, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`
				}
			});
			dispatch(createTripSuccess(data));
		} catch (error: any) {
			dispatch(createTripFailed(RequestError(error)));
		}
	};

export const resetCreateTripAction = (): AppThunk => (dispatch) => {
	dispatch(resetCreateTrip());
};

export const updateTripAction =
	(id: string, input: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(updateTripRequest());

			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).put(
				`/trip/${id}`,
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);

			dispatch(updateTripSuccess(data));
		} catch (error: any) {
			dispatch(updateTripFailed(RequestError(error)));
		}
	};

export const endTripAction =
	(id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(endTripRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).put(
				`/trip/endtrip/${id}`,
				{},

				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);
			dispatch(endTripSuccess(data));
		} catch (error: any) {
			dispatch(endTripFailed(RequestError(error)));
		}
	};

export const resetUpdateTripAction = (): AppThunk => (dispatch) => {
	dispatch(updateTripReset());
};

export const getTripByBusAction =
	(bus_id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(getTripByBusRequest());
			const {
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).get(`/trip/tripbybus/${bus_id}`);
			dispatch(getTripByBusSuccess(data));
		} catch (error: any) {
			dispatch(getTripByBusFailed(RequestError(error)));
		}
	};

export const getTripByDriverAction =
	(driver_id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(getTripByDriverRequest());
			const {
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).get(
				`/trip/tripbydriver/${driver_id}`
			);
			dispatch(getTripByDriverSuccess(data));
		} catch (error: any) {
			dispatch(getTripByDriverFailed(RequestError(error)));
		}
	};

export const deleteTripByIdAction =
	(trip_id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(deleteTripByIdRequest());

			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).delete(`/trip/${trip_id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`
				}
			});

			dispatch(deleteTripByIdSuccess(data));
		} catch (error: any) {
			dispatch(deleteTripByIdFailed(RequestError(error)));
		}
	};

export const resetDeleteTripAction = (): AppThunk => (dispatch) => {
	dispatch(resetDeleteState());
};

export const verifyPassengerOnboardAction =
	(trip_id: string, passenger_id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(verifyPassengerOnBoardRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post(
				`/trip/passenger/onboard/${trip_id}`,
				{
					passenger_id
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);

			dispatch(verifyPassengerOnBoardSuccess(data));
		} catch (error: any) {
			dispatch(verifyPassengerOnBoardFailed(RequestError(error)));
		}
	};

export const unverifyPassengerOnboardAction =
	(trip_id: string, passenger_id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(unverifyPassengerOnBoardRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post(
				`/trip/passenger/onboard/${trip_id}`,
				{
					passenger_id
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`
					}
				}
			);

			dispatch(unverifyPassengerOnBoardSuccess(data));
		} catch (error: any) {
			dispatch(unverifyPassengerOnBoardFailed(RequestError(error)));
		}
	};

export const getAvailableNYSCTripAction =
	({ from, to }: { from: string; to: string }): AppThunk =>
	async (dispatch, getState) => {
		try {
			const {
				appState: { app_type }
			} = getState();

			dispatch(getAvailableNYSCTripRequest());
			const { data } = await api(app_type).get(
				`/trip/availableNYSCTrip?from=${from}&to=${to}`
			);
			dispatch(getAvailableNYSCTripSuccess(data));
		} catch (error: any) {
			dispatch(getAvailableNYSCTripFailed(RequestError(error)));
		}
	};
