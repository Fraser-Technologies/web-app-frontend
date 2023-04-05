import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { Booking_interface } from "../../interfaces/Booking_interface";

export const verifyPaymentSlice = createSlice({
	name: "verify payment",
	initialState: {
		loading: false,
		error: "",
	},

	reducers: {
		verifyPaymentRequest: (state) => {
			state.loading = true;
		},

		verifyPaymentSuccess: (state) => {
			state.loading = false;
		},
		verifyPaymentFailed: (state) => {
			state.loading = false;
		},
		clearVerifyPayment: (state) => {
			state.loading = false;
			state.error = "";
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

export const createBookingSlice = createSlice({
	name: "verify payment",
	initialState: {
		loading: false,
		error: "",
		createBooking: {},
	},

	reducers: {
		createBookingRequest: (state) => {
			state.loading = true;
		},

		createBookingSuccess: (state, { payload }) => {
			state.createBooking = payload as any;
			state.loading = false;
		},
		createBookingFailed: (state, { payload }) => {
			state.error = payload as any;
			state.loading = false;
		},
		clearcreateBooking: (state) => {
			state.loading = false;
			state.error = "";
			state.createBooking = {};
		},
	},
});

export const {
	createBookingRequest,
	createBookingSuccess,
	createBookingFailed,
	clearcreateBooking,
} = createBookingSlice.actions;
export const createBookingReducer = createBookingSlice.reducer;

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
