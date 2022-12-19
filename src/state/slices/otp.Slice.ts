import { createSlice } from "@reduxjs/toolkit";

interface otp_interface {
	otp: string | any;
	error: string;
	loading: boolean;
}

const initialState: otp_interface = {
	otp: "",
	error: "",
	loading: false,
};
export const getOtpSlice = createSlice({
	name: "get otp",
	initialState: initialState,
	reducers: {
		getOtpRequest: (state) => {
			state.loading = false;
		},
		getOtpSuccess: (state, { payload }) => {
			state.otp = payload as any;
			state.loading = false;
		},
		getOtpFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
		},

		clearOtp: () => {
			initialState as any;
		},
	},
});

export const { getOtpRequest, getOtpSuccess, getOtpFailed } =
	getOtpSlice.actions;
export const getOtpReducer = getOtpSlice.reducer;

export const VerifyOtpSlice = createSlice({
	name: "verify otp",
	initialState: initialState,
	reducers: {
		verifyOtpRequest: (state) => {
			state.loading = false;
		},
		verifyOtpSuccess: (state, { payload }) => {
			state.otp = payload as any;
			state.loading = false;
		},
		verifyOtpFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
		},

		clearVerifyOtp: () => {
			initialState as any;
		},
	},
});

export const { verifyOtpRequest, verifyOtpSuccess, verifyOtpFailed } =
	VerifyOtpSlice.actions;
export const verifyOtpReducer = VerifyOtpSlice.reducer;
