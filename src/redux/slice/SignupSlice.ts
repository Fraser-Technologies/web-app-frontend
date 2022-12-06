import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	isAuth: false,
	error: "",
	userID: "",
};

const SignupSlice = createSlice({
	name: "signup",
	initialState,
	reducers: {
		SignupPending: (state) => {
			state.isLoading = true;
		},
		SignupSuccessful: (state, { payload }) => {
			state.isLoading = false;
			state.userID = payload;
			state.error = "";
		},
		SignupFailed: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

const { reducer, actions } = SignupSlice;

export const { SignupPending, SignupSuccessful, SignupFailed } = actions;

export default reducer;
