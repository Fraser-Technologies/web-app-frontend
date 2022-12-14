import { verifyOtpReducer, getOtpReducer } from "./slices/otp.Slice";
import { combineReducers } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer } from "./slices/user.slice";
import { getAllBusStopReducer } from "./slices/bus.slice";
import { getAvailableTripReducer } from "./slices/trip.slice";
import { verifyPaymentReducer } from "./slices/booking.slice";

const rootReducer = combineReducers({
	getotp: getOtpReducer,
	verifyOtp: verifyOtpReducer,
	allBusStop: getAllBusStopReducer,

	//user reducers
	registerUser: userRegisterReducer,
	loginUser: userLoginReducer,
	availableTrip: getAvailableTripReducer,

	// trip reducers
	verifyPayment: verifyPaymentReducer,
});

export default rootReducer;
