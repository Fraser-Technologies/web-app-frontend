import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { Booking_interface } from "../../interfaces/Booking_interface";

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

const myBooking = Cookie.get("myBookings")
	? JSON.parse(Cookie.get("myBookings") as string)
	: {};

export const BookingSlice = createSlice({
	name: "add to booking",
	initialState: { myBooking },
	reducers: {
		addToBooking: (state, { payload }) => {
			Cookie.set("myBookings", JSON.stringify(payload));
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

type allBookingType = {
	loading: boolean;
	error: string;
	bookings: Booking_interface[] | [];
};

const initialAllBooking: allBookingType = {
	loading: false,
	error: "",
	bookings: [],
};

const getAllBookingSlice = createSlice({
	name: "get all bookings",
	initialState: initialAllBooking,
	reducers: {
		getAllBookingRequest: (state) => {
			state.loading = true;
		},
		getAllBookingSuccess: (state, { payload }) => {
			state.bookings = payload;
			state.loading = false;
			state.error = "";
		},
		getAllBookingFailed: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
	},
});

export const {
	getAllBookingFailed,
	getAllBookingRequest,
	getAllBookingSuccess,
} = getAllBookingSlice.actions;
export const allBookingReducer = getAllBookingSlice.reducer;
