import {
	createCityReducer,
	deleteCityReducer,
	getAllCityReducer,
	updateCityReducer,
} from "./slices/city.slice";
import { adminPageReducer } from "./slices/adminPageSlice";
import { verifyOtpReducer, getOtpReducer } from "./slices/otp.Slice";
import { combineReducers } from "@reduxjs/toolkit";
import {
	updateUserReducer,
	userLoginReducer,
	userRegisterReducer,
} from "./slices/user.slice";
import { getAllBusStopReducer } from "./slices/busstop.slice";
import {
	allTripReducer,
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

	adminPage: adminPageReducer,

	allTrip: allTripReducer,

	// trip reducers
	verifyPayment: verifyPaymentReducer,

	// city
	createCity: createCityReducer,
	allCity: getAllCityReducer,
	deleteCity: deleteCityReducer,
	updateCity: updateCityReducer,
});

export default rootReducer;
