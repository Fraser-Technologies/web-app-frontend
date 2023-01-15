import { Bus_interface } from "./../../interfaces/bus_interface";
import { createSlice } from "@reduxjs/toolkit";

type allBusInitialType = {
	loading: boolean;
	error: string;
	buses: Bus_interface | [];
};

const allBusInitialState: allBusInitialType = {
	loading: false,
	error: "",
	buses: [],
};
const getAllBusSlice = createSlice({
	name: "get all bus",
	initialState: allBusInitialState,
	reducers: {
		getAllBusRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		getAllBusSuccess: (state, { payload }) => {
			state.loading = false;
			state.buses = payload;
		},
		getAllBusFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const { getAllBusFailed, getAllBusRequest, getAllBusSuccess } =
	getAllBusSlice.actions;
export const allBusReducer = getAllBusSlice.reducer;

type busInitialState = {
	loading: boolean;
	error: string;
	bus: Bus_interface | {};
};

const intiBusState: busInitialState = {
	loading: false,
	error: "",
	bus: {},
};

const updateBusSlice = createSlice({
	name: "update slice",
	initialState: intiBusState,
	reducers: {
		updateBusRequest: (state) => {
			state.loading = true;
		},
		updateBusSuccess: (state, { payload }) => {
			state.loading = false;
			state.bus = payload;
		},
		updateBusFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		resetUpdateBus: () => intiBusState,
	},
});

export const {
	updateBusFailed,
	updateBusRequest,
	updateBusSuccess,
	resetUpdateBus,
} = updateBusSlice.actions;
export const updateBusSliceReducer = updateBusSlice.reducer;
