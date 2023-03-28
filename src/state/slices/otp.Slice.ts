import { createSlice } from "@reduxjs/toolkit";

interface otp_interface {
	message: string | any;
	error: string;
	loading: boolean;
	data: boolean;
}

const initialState: otp_interface = {
	message: "",
	error: "",
	loading: false,
	data: false,
};
export const getOtpSlice = createSlice({
	name: "get otp",
	initialState: initialState,
	reducers: {
		getOtpRequest: (state) => {
			state.loading = false;
			state.data = false;
		},
		getOtpSuccess: (state, { payload }) => {
			state.message = payload?.message;
			state.loading = false;
			state.data = payload.data;
		},
		getOtpFailed: (state, { payload }) => {
			state.error = payload?.error;
			state.loading = false;
			state.data = payload.data;
			state.message = payload.message;
		},

		clearOtp: () => {
			initialState as any;
		},
	},
});

export const { getOtpRequest, getOtpSuccess, getOtpFailed, clearOtp } =
	getOtpSlice.actions;
export const getOtpReducer = getOtpSlice.reducer;

export const VerifyOtpSlice = createSlice({
	name: "verify otp",
	initialState: initialState,
	reducers: {
		verifyOtpRequest: (state) => {
			state.loading = false;
			state.data = false;
		},
		verifyOtpSuccess: (state, { payload }) => {
			state.message = payload?.message;
			state.loading = false;
			state.data = payload.data;
		},
		verifyOtpFailed: (state, { payload }) => {
			state.error = payload?.error;
			state.loading = false;
			state.data = payload.data;
		},

		clearVerifyOtp: () => {
			initialState as any;
		},
	},
});

export const {
	verifyOtpRequest,
	verifyOtpSuccess,
	verifyOtpFailed,
	clearVerifyOtp,
} = VerifyOtpSlice.actions;
export const verifyOtpReducer = VerifyOtpSlice.reducer;
