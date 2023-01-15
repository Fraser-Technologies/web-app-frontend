import { createSlice } from "@reduxjs/toolkit";
import { Driver_interface } from "../../interfaces/driver_interface";

type allDriverType = {
	loading: boolean;
	error: string;
	drivers: Driver_interface[] | [];
};

const allDriverInitialState: allDriverType = {
	loading: false,
	error: "",
	drivers: [],
};
const getAllDriverSlice = createSlice({
	name: "get all driver",
	initialState: allDriverInitialState,
	reducers: {
		allDriverRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		allDriverSuccess: (state, { payload }) => {
			state.loading = false;
			state.drivers = payload;
		},
		allDriverFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const { allDriverFailed, allDriverRequest, allDriverSuccess } =
	getAllDriverSlice.actions;
export const allDriverReducer = getAllDriverSlice.reducer;
