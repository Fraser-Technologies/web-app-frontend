import { AppThunk } from "./../redux-store";
import { RequestError } from "../../utils/requestError";
import { api } from "../../utils/api";
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
} from "../slices/trip.slice";
import { resetDeleteCity } from "../slices/city.slice";

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

export const createTripAction =
	(trip: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(createTripRequest());
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.post("/trip", trip, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
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
			} = getState();
			const { data } = await api.put(
				`/trip/${id}`,
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);

			console.log("the updated data is ", data);

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
			} = getState();
			const { data } = await api.put(
				`/trip/endtrip/${id}`,
				{},

				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
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
	async (dispatch) => {
		try {
			dispatch(getTripByBusRequest());
			const { data } = await api.get(`/trip/tripbybus/${bus_id}`);
			dispatch(getTripByBusSuccess(data));
		} catch (error: any) {
			dispatch(getTripByBusFailed(RequestError(error)));
		}
	};

export const getTripByDriverAction =
	(driver_id: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(getTripByDriverRequest());
			const { data } = await api.get(`/trip/tripbydriver/${driver_id}`);
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
			} = getState();
			const { data } = await api.delete(`/trip/${trip_id}`, {
				headers: {
					Authorization: `Bearer ${userInfo?.user_token}`,
				},
			});

			dispatch(deleteTripByIdSuccess(data));
		} catch (error: any) {
			dispatch(deleteTripByIdFailed(RequestError(error)));
		}
	};

export const resetDeleteTripAction = (): AppThunk => (dispatch) => {
	dispatch(resetDeleteCity());
};

export const verifyPassengerOnboardAction =
	(trip_id: string, passenger_id: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(verifyPassengerOnBoardRequest());
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.post(
				`/trip/passenger/onboard/${trip_id}`,
				{
					passenger_id,
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
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
			} = getState();
			const { data } = await api.post(
				`/trip/passenger/onboard/${trip_id}`,
				{
					passenger_id,
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
					},
				}
			);

			dispatch(unverifyPassengerOnBoardSuccess(data));
		} catch (error: any) {
			dispatch(unverifyPassengerOnBoardFailed(RequestError(error)));
		}
	};
