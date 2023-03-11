import { deleteFileReducer, uploadFileReducer } from "./slices/image.slice";
import {
	addAccountReducer,
	allUserBalances,
	balanceByUserReducer,
	withdrawReducer,
} from "./slices/balance.slice";
import {
	allBusReducer,
	createBusReducer,
	updateBusSliceReducer,
} from "./slices/bus.slice";
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
	adminUpdateUserReducer,
	allDriverReducer,
	allUserReducer,
	becomeADriverReducer,
	blockUserReducer,
	registerAsDriverReducer,
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
	endTripReducer,
	getAllAvailableTripReducer,
	getTripByBusReducer,
	getTripByDriverReducer,
	unverifyPassengerOnBoardReducer,
	updateTripReducer,
	verifyPassengerOnBoardReducer,
} from "./slices/trip.slice";
import {
	allBookingReducer,
	bookingReducer,
	verifyPaymentReducer,
} from "./slices/booking.slice";
import {
	getAllTransactionReducer,
	getAllTransactionSlice,
	getTransactionByIdReducer,
	verifyPaymentStatusReducer,
} from "./slices/transactionSlice";

const rootReducer = combineReducers({
	getotp: getOtpReducer,
	verifyOtp: verifyOtpReducer,

	// bus reducers
	allBusStop: getAllBusStopReducer,
	tripByBus: getTripByBusReducer,
	tripByDriver: getTripByDriverReducer,
	updateBus: updateBusSliceReducer,
	verifyPassengerOnboard: verifyPassengerOnBoardReducer,
	unverifyPassengerOnboard: unverifyPassengerOnBoardReducer,

	//user reducers
	registerUser: userRegisterReducer,
	userLogin: userLoginReducer,
	updateUser: updateUserReducer,
	availableTrip: availableTripReducer,
	allAvailableTrip: getAllAvailableTripReducer,
	allUser: allUserReducer,
	blockUser: blockUserReducer,
	unblockUser: unblockUserReducer,
	becomeADriver: becomeADriverReducer,
	registerAsDriver: registerAsDriverReducer,
	adminUpdateUser: adminUpdateUserReducer,

	// booking reducer
	booking: bookingReducer,
	allBooking: allBookingReducer,

	adminPage: adminPageReducer,

	// trip reducers
	allTrip: allTripReducer,
	createTrip: createTripReducer,
	updateTrip: updateTripReducer,
	deleteTrip: deleteTripByIdReducer,
	endTrip: endTripReducer,

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
	createBus: createBusReducer,

	//balance
	allBalance: allUserBalances,
	userBalance: balanceByUserReducer,
	createAccount: addAccountReducer,
	withdrawBalance: withdrawReducer,

	// image reducer
	uploadFile: uploadFileReducer,
	deleteFile: deleteFileReducer,

	// transaction reducer
	allTransaction: getAllTransactionReducer,
	transactionById: getTransactionByIdReducer,
	verifyPaymentStatus: verifyPaymentStatusReducer,
});

export default rootReducer;
