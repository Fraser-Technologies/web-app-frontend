import { verifyOtpReducer, getOtpReducer } from "./slices/otp.Slice";
import { combineReducers } from "@reduxjs/toolkit";
import {
	updateUserReducer,
	userLoginReducer,
	userRegisterReducer,
} from "./slices/user.slice";
import { getAllBusStopReducer } from "./slices/busstop.slice";
import {
	availableTripReducer,
	getAllAvailableTripReducer,
} from "./slices/trip.slice";
import { bookingReducer, verifyPaymentReducer } from "./slices/booking.slice";

const rootReducer = combineReducers({
	getotp: getOtpReducer,
	verifyOtp: verifyOtpReducer,
	allBusStop: getAllBusStopReducer,

	//user reducers
	registerUser: userRegisterReducer,
	userLogin: userLoginReducer,
	updateUser: updateUserReducer,
	availableTrip: availableTripReducer,
	allAvailableTrip: getAllAvailableTripReducer,

	// booking reducer
	booking: bookingReducer,

	// trip reducers
	verifyPayment: verifyPaymentReducer,
});

export default rootReducer;
