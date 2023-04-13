import { User_interface } from "./../../interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";

const createDiscountSlice = createSlice({
	name: "create discount",
	initialState: {
		loading: false,
		error: "",
		user: {},
	},
	reducers: {
		createDiscountRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		createDiscountSuccess: (state, { payload }) => {
			state.loading = true;
			state.error = "";
			state.user = payload;
		},
		createDiscountFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.user = {};
		},
	},
});

export const {
	createDiscountFailed,
	createDiscountRequest,
	createDiscountSuccess,
} = createDiscountSlice.actions;
export const discountCodeReducer = createDiscountSlice.reducer;

const deactivateDiscountSlice = createSlice({
	name: "deactivate discount",
	initialState: {
		loading: false,
		error: "",
		user: {},
	},

	reducers: {
		deactivateDiscountRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		deactivateDiscountSuccess: (state, { payload }) => {
			state.loading = false;
			state.user = payload;
			state.error = "";
		},
		deactivateDiscountFailed: (state, { payload }) => {
			state.loading = false;
			state.user = {};
			state.error = payload;
		},
	},
});

export const {
	deactivateDiscountFailed,
	deactivateDiscountSuccess,
	deactivateDiscountRequest,
} = deactivateDiscountSlice.actions;
export const deactivateCodeReducer = deactivateDiscountSlice.reducer;
