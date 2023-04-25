import { User_interface } from "./../../interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";

type initialType = {
	loading: boolean;
	error: string;
	user: User_interface | { _id: "" };
};

const initialState: initialType = {
	loading: false,
	error: "",
	user: { _id: "" },
};

const createDiscountSlice = createSlice({
	name: "create discount",
	initialState,
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
			state.user = { _id: "" };
		},

		resetDiscountCodeUser: () => initialState,
	},
});

export const {
	createDiscountFailed,
	createDiscountRequest,
	createDiscountSuccess,
	resetDiscountCodeUser,
} = createDiscountSlice.actions;
export const discountCodeReducer = createDiscountSlice.reducer;

const deactivateDiscountSlice = createSlice({
	name: "deactivate discount",
	initialState,
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
			state.user = { _id: "" };
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

const getUserByDiscountCodeSlice = createSlice({
	name: "get user by discount code",
	initialState: {
		loading: false,
		error: "",
		user: {
			discount_code: {
				active: false,
				discount_percent: 0,
			},
		},
	},
	reducers: {
		getUserByDiscountCodeRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		getUserByDiscountCodeSuccess: (state, { payload }) => {
			state.loading = false;
			state.user = payload;
			state.error = "";
		},
		getUserByDiscountCodeFailed: (state, { payload }) => {
			state.loading = false;
			state.user = {
				discount_code: {
					active: false,
					discount_percent: 0,
				},
			};
			state.error = payload;
		},
	},
});

export const {
	getUserByDiscountCodeRequest,
	getUserByDiscountCodeFailed,
	getUserByDiscountCodeSuccess,
} = getUserByDiscountCodeSlice.actions;
export const getUserByDiscountCodeReducer = getUserByDiscountCodeSlice.reducer;
