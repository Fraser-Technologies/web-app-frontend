import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	user: "{}",
	first_name: "",
	last_name: "",
	email: "",
	access_token: "",
	refresh_token: "",
	error: "",
};

const UserSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		getUserPending: (state) => {
			state.isLoading = true;
		},
		getUserSuccessful: (state, { payload }) => {
			state.isLoading = false;
			state.user = payload;
			state.error = "";
		},
		getUserFailed: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
		getFirstName: (state, { payload }) => {
			state.first_name = payload;
		},
		getLastName: (state, { payload }) => {
			state.last_name = payload;
		},
		getEmailAddress: (state, { payload }) => {
			state.email = payload;
		},
		getAccessToken: (state, { payload }) => {
			state.access_token = payload;
		},
		reset: () => initialState,
	},
});

const { reducer, actions } = UserSlice;

export const {
	getUserPending,
	getUserSuccessful,
	getUserFailed,
	getFirstName,
	getLastName,
	getEmailAddress,
	getAccessToken,
	reset,
} = actions;
export default reducer;
