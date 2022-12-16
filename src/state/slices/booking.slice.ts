import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

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

		verifyPaymentSuccess: (state, { payload }) => {
			state.verifyPayment = payload as any;
			state.loading = false;
		},
		verifyPaymentFailed: (state, { payload }) => {
			state.error = payload as any;
			state.loading = false;
		},
		clearVerifyPayment: (state) => {
			state.loading = false;
			state.error = "";
			state.verifyPayment = {};
		},
	},
});

export const {
	verifyPaymentRequest,
	verifyPaymentSuccess,
	verifyPaymentFailed,
	clearVerifyPayment,
} = verifyPaymentSlice.actions;
export const verifyPaymentReducer = verifyPaymentSlice.reducer;

// const myBookings = Cookie.get("myBookings")
// 	? JSON.parse(Cookie.get("myBookings") as string)
// 	: [];

const myBooking = localStorage.getItem("myBookings")
	? JSON.parse(localStorage.getItem("myBookings") as string)
	: {};

export const BookingSlice = createSlice({
	name: "add to booking",
	initialState: { myBooking },
	reducers: {
		addToBooking: (state, { payload }) => {
			console.log("the payload as the slice is ", payload);
			localStorage.setItem("myBookings", JSON.stringify(payload));
			state.myBooking = payload;
		},

		removeFromBooking: (state) => {
			Cookie.remove("myBookings");
			state.myBooking = {};
		},
		emptyBooking: (state) => {
			Cookie.remove("myBookings");
			state.myBooking = {};
		},
	},
});

export const { addToBooking, removeFromBooking, emptyBooking } =
	BookingSlice.actions;
export const bookingReducer = BookingSlice.reducer;
