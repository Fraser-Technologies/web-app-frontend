import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const verifyPaymentSlice = createSlice({
	name: "verify payment",
	initialState: {
		loading: false,
		error: "",
		verifyPayment: {},
	},

	reducers: {
		verifyPaymentRequest: (state) => {
			state.loading = true;
		},

		verifyPaymentSuccess: (state, { payload }: PayloadAction) => {
			state.verifyPayment = payload as any;
			state.loading = false;
		},
		verifyPaymentFailed: (state, { payload }: PayloadAction) => {
			state.error = payload as any;
			state.loading = false;
		},
	},
});

export const {
	verifyPaymentRequest,
	verifyPaymentSuccess,
	verifyPaymentFailed,
} = verifyPaymentSlice.actions;
export const verifyPaymentReducer = verifyPaymentSlice.reducer;
