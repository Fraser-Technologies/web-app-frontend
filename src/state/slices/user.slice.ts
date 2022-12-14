import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

const user = Cookie.get("userInfo")
	? JSON?.parse(Cookie.get("userInfo") as string)
	: {};

interface User_interface {
	userInfo: object | any | null;
	error: string | any;
	loading: boolean;
}

const initialState: User_interface = {
	userInfo: {},
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
		loginSuccess: (state, { payload }: PayloadAction) => {
			state.userInfo = payload as any;
			state.loading = false;
		},

		logOut: (state) => {
			state.userInfo = {};
			state.loading = false;
		},

		loginFailed: (state, { payload }: PayloadAction) => {
			state.error = payload;
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
		registerSuccess: (state, { payload }: PayloadAction) => {
			state.userInfo = payload as any;
			state.loading = false;
		},

		registerFailed: (state, { payload }: PayloadAction) => {
			state.error = payload;
			state.loading = false;
		},
	},
});

export const { registerRequest, registerSuccess, registerFailed } =
	userRegisterSlice.actions;
export const userRegisterReducer = userRegisterSlice.reducer;
