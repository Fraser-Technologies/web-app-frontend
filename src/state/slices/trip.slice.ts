import { Trip_interface } from "./../../interfaces/trip_interface";
import { createSlice } from "@reduxjs/toolkit";

type initialType = {
	trips: Trip_interface[];
	loading: boolean;
	error: string;
};
const allTripState: initialType = {
	trips: [],
	loading: false,
	error: "",
};
export const getAvailableTripSlice = createSlice({
	name: "get all trips",
	initialState: allTripState,
	reducers: {
		getAvailableTripRequest: (state) => {
			state.loading = true;
		},

		getAvailableTripSuccess: (state, { payload }) => {
			state.trips = payload as unknown as Trip_interface[];
			state.loading = false;
		},
		getAvailableTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
	},
});

export const {
	getAvailableTripRequest,
	getAvailableTripSuccess,
	getAvailableTripFailed,
} = getAvailableTripSlice.actions;
export const availableTripReducer = getAvailableTripSlice.reducer;

export const allAvailableTripSlice = createSlice({
	name: "available trips",
	initialState: allTripState,
	reducers: {
		getAllAvailableTripRequest: (state) => {
			state.loading = true;
		},

		getAllAvailableTripSuccess: (state, { payload }) => {
			state.trips = payload as unknown as Trip_interface[];
			state.loading = false;
		},
		getAllAvailableTripFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
		},
	},
});

export const {
	getAllAvailableTripFailed,
	getAllAvailableTripRequest,
	getAllAvailableTripSuccess,
} = allAvailableTripSlice.actions;
export const getAllAvailableTripReducer = allAvailableTripSlice.reducer;

const getAllTripSlice = createSlice({
	name: "all trip",
	initialState: allTripState,
	reducers: {
		getAllTripsRequest: (state) => {
			state.loading = true;
		},
		getAllTripsSuccess: (state, { payload }) => {
			state.loading = false;
			state.trips = payload as unknown as Trip_interface[];
		},

		getAllTripsFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
		},
	},
});

export const { getAllTripsFailed, getAllTripsRequest, getAllTripsSuccess } =
	getAllTripSlice.actions;
export const allTripReducer = getAllTripSlice.reducer;

type initialStateType = {
	loading: boolean;
	error: string;
	trip: Trip_interface | {};
};

const initialState: initialStateType = {
	loading: false,
	error: "",
	trip: {},
};

const updateTripSlice = createSlice({
	name: "update trip",
	initialState: initialState,
	reducers: {
		updateTripRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		updateTripSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload;
		},
		updateTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		updateTripReset: () => initialState,
	},
});

export const {
	updateTripRequest,
	updateTripFailed,
	updateTripSuccess,
	updateTripReset,
} = updateTripSlice.actions;
export const updateTripReducer = updateTripSlice.reducer;
