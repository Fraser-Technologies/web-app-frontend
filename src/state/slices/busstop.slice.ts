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

const removeBusStopFromStateSlice = createSlice({
	name: "remove busstop from State",
	initialState: createStateInitialState,
	reducers: {
		removeBusStopFromStateRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		removeBusStopFromStateSuccess: (state, { payload }) => {
			state.loading = false;
			state.state = payload as unknown as State_interface;
		},
		removeBusStopFromStateFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},

		removeBusStopFromStateReset: () => createStateInitialState
	}
});

export const {
	removeBusStopFromStateSuccess,
	removeBusStopFromStateRequest,
	removeBusStopFromStateFailed,
	removeBusStopFromStateReset
} = removeBusStopFromStateSlice.actions;
export const removeBusStopReducer = removeBusStopFromStateSlice.reducer;

const addBusStopFromStateSlice = createSlice({
	name: "add busstop from State",
	initialState: createStateInitialState,
	reducers: {
		addBusStopFromStateRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		addBusStopFromStateSuccess: (state, { payload }) => {
			state.loading = false;
			state.state = payload as unknown as State_interface;
			state.error = "";
		},
		addBusStopFromStateFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},

		addBusStopFromStateReset: (state) => createStateInitialState
	}
});

export const {
	addBusStopFromStateSuccess,
	addBusStopFromStateRequest,
	addBusStopFromStateFailed,
	addBusStopFromStateReset
} = addBusStopFromStateSlice.actions;
export const addBusStopReducer = addBusStopFromStateSlice.reducer;
