import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const allTripState = {
	trips: [],
	loading: false,
	error: "",
};
export const getTripSlice = createSlice({
	name: "get all trips",
	initialState: allTripState,
	reducers: {
		getAllTripRequest: (state) => {
			state.loading = true;
		},

		getAllTripSuccess: (state, { payload }: PayloadAction) => {
			state.trips = payload as unknown as any;
			state.loading = false;
		},
		getAllTripFailed: (state, { payload }: PayloadAction) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
	},
});

export const { getAllTripRequest, getAllTripSuccess, getAllTripFailed } =
	getTripSlice.actions;
export const allTripReducer = getTripSlice.reducer;

export const availableTripSlice = createSlice({
	name: "available trips",
	initialState: allTripState,
	reducers: {
		getAllAvailableTripRequest: (state) => {
			state.loading = true;
		},

		getAllAvailableTripSuccess: (state, { payload }: PayloadAction) => {
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
} = availableTripSlice.actions;
export const getAvailableTripReducer = availableTripSlice.reducer;
