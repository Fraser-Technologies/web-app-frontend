import { Bus_interface } from "./../../interfaces/bus_interface";
import { createSlice } from "@reduxjs/toolkit";
import { BusStop_interface } from "../../interfaces/busstop_interface";

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
