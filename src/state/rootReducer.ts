import { allUserBalances, balanceByUserReducer } from "./slices/balance.slice";
import { allBusReducer, updateBusSliceReducer } from "./slices/bus.slice";
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
	allUserReducer,
	blockUserReducer,
	unblockUserReducer,
	updateUserReducer,
	userLoginReducer,
	userRegisterReducer,
} from "./slices/user.slice";
import {
	addBusStopReducer,
	getAllBusStopReducer,
	removeBusStopReducer,
} from "./slices/busstop.slice";
import {
	allTripReducer,
	availableTripReducer,
	createTripReducer,
	deleteTripByIdReducer,
	getAllAvailableTripReducer,
	getTripByBusReducer,
	getTripByDriverReducer,
	unverifyPassangerOnBoardReducer,
	updateTripReducer,
	verifyPassangerOnBoardReducer,
} from "./slices/trip.slice";
import {
	allBookingReducer,
	bookingReducer,
	verifyPaymentReducer,
} from "./slices/booking.slice";
import { allDriverReducer } from "./slices/driver.slice";

const rootReducer = combineReducers({
	getotp: getOtpReducer,
	verifyOtp: verifyOtpReducer,

	// bus reducers
	allBusStop: getAllBusStopReducer,
	tripByBus: getTripByBusReducer,
	tripByDriver: getTripByDriverReducer,
	updateBus: updateBusSliceReducer,
	verifyPassangerOnboard: verifyPassangerOnBoardReducer,
	unverifyPassengerOnboard: unverifyPassangerOnBoardReducer,

	//user reducers
	registerUser: userRegisterReducer,
	userLogin: userLoginReducer,
	updateUser: updateUserReducer,
	availableTrip: availableTripReducer,
	allAvailableTrip: getAllAvailableTripReducer,
	allUser: allUserReducer,
	blockUser: blockUserReducer,
	unblockUser: unblockUserReducer,

	// booking reducer
	booking: bookingReducer,
	allBooking: allBookingReducer,

	adminPage: adminPageReducer,

	// trip reducers
	allTrip: allTripReducer,
	createTrip: createTripReducer,
	updateTrip: updateTripReducer,
	deleteTrip: deleteTripByIdReducer,

	// trip reducers
	verifyPayment: verifyPaymentReducer,

	// city
	createCity: createCityReducer,
	allCity: getAllCityReducer,
	deleteCity: deleteCityReducer,
	updateCity: updateCityReducer,
	removeBusStop: removeBusStopReducer,
	addBusStop: addBusStopReducer,

	//driver reducers
	allDriver: allDriverReducer,

	//bus
	allBus: allBusReducer,

	//balance
	allBalance: allUserBalances,
	userBalance: balanceByUserReducer,
});

export default rootReducer;
