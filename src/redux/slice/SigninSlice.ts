import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	isAuth: false,
	error: "",
};

const SigninSlice = createSlice({
	name: "signin",
	initialState,
	reducers: {
		signinPending: (state) => {
			state.isLoading = true;
		},
		signinSuccessful: (state) => {
			state.isLoading = false;
			state.isAuth = true;
			state.error = "";
		},
		signinFailed: (state, { payload }) => {
			state.isLoading = false;
			state.error = payload;
		},
	},
});

const { reducer, actions } = SigninSlice;

export const { signinPending, signinSuccessful, signinFailed } = actions;

export default reducer;
