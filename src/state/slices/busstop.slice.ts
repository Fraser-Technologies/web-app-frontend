import { State_interface } from "../../interfaces/state_interface";
import { createStateInitialState } from "./state.slice";
import { createSlice } from "@reduxjs/toolkit";
import { BusStop_interface } from "../../interfaces/busstop_interface";

interface busStopInterface {
	loading: boolean;
	error: string;
	busStops: BusStop_interface[] | [];
}

const allBusStop: busStopInterface = {
	loading: false,
	busStops: [],
	error: ""
};

export const busSlice = createSlice({
	name: "getAllBusStop",
	initialState: allBusStop,
	reducers: {
		getAllBusStopRequest: (state) => {
			state.loading = true;
		},
		getAllbusStopSuccess: (state, { payload }) => {
			state.loading = false;
			state.busStops = payload;
		},
		getAllBusStopFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		}
	}
});

export const {
	getAllBusStopRequest,
	getAllBusStopFailed,
	getAllbusStopSuccess
} = busSlice.actions;
export const getAllBusStopReducer = busSlice.reducer;

const removeBusStopFromCitySlice = createSlice({
	name: "remove busstop from city",
	initialState: createStateInitialState,
	reducers: {
		removeBusStopFromCityRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		removeBusStopFromCitySuccess: (state, { payload }) => {
			state.loading = false;
			state.state = payload as unknown as State_interface;
		},
		removeBusStopFromCityFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},

		removeBusStopFromCityReset: () => createStateInitialState
	}
});

export const {
	removeBusStopFromCitySuccess,
	removeBusStopFromCityRequest,
	removeBusStopFromCityFailed,
	removeBusStopFromCityReset
} = removeBusStopFromCitySlice.actions;
export const removeBusStopReducer = removeBusStopFromCitySlice.reducer;

const addBusStopFromCitySlice = createSlice({
	name: "add busstop from city",
	initialState: createStateInitialState,
	reducers: {
		addBusStopFromCityRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		addBusStopFromCitySuccess: (state, { payload }) => {
			state.loading = false;
			state.state = payload as unknown as State_interface;
			state.error = "";
		},
		addBusStopFromCityFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},

		addBusStopFromCityReset: (state) => {
			state.loading = false;
			state.error = "";
			state.state = {};
		}
	}
});

export const {
	addBusStopFromCitySuccess,
	addBusStopFromCityRequest,
	addBusStopFromCityFailed,
	addBusStopFromCityReset
} = addBusStopFromCitySlice.actions;
export const addBusStopReducer = addBusStopFromCitySlice.reducer;
