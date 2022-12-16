import { createSlice } from "@reduxjs/toolkit";

const allTripState = {
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
			state.trips = payload as unknown as any;
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
			state.trips = payload as unknown as any;
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
