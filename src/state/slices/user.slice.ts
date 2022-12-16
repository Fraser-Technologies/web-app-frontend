import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

// const user = Cookie.get("userInfo")
// 	? JSON?.parse(Cookie.get("userInfo") as string)
// 	: {};

const user = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo") as string)
	: {};

const initialState = {
	userInfo: user,
	error: "",
	loading: false,
};

export const userLoginSlice = createSlice({
	name: "userLogin",
	initialState,
	reducers: {
		loginRequest: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, { payload }) => {
			state.userInfo = payload as unknown as any;
			state.loading = false;
		},

		logOut: (state) => {
			state.userInfo = {};
			state.loading = false;
		},

		loginFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
		},
	},
});

export const { loginRequest, loginSuccess, logOut, loginFailed } =
	userLoginSlice.actions;
export const userLoginReducer = userLoginSlice.reducer;

export const userRegisterSlice = createSlice({
	name: "userRegister",
	initialState,
	reducers: {
		registerRequest: (state) => {
			state.loading = true;
		},
		registerSuccess: (state, { payload }) => {
			state.userInfo = payload as any;
			state.loading = false;
		},

		registerFailed: (state, { payload }) => {
			state.error = payload as any;
			state.loading = false;
		},
	},
});

export const { registerRequest, registerSuccess, registerFailed } =
	userRegisterSlice.actions;
export const userRegisterReducer = userRegisterSlice.reducer;

export const updateUserSlice = createSlice({
	name: "update user",
	initialState,
	reducers: {
		updateUserRequest: (state) => {
			state.loading = true;
		},

		updateUserSuccess: (state, { payload }) => {
			state.userInfo = payload as unknown as any;
			state.loading = false;
		},
		updateUserFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
		resetUpdateUser: () => initialState,
	},
});

export const { updateUserRequest, updateUserSuccess, updateUserFailed } =
	updateUserSlice.actions;
export const updateUserReducer = updateUserSlice.reducer;
