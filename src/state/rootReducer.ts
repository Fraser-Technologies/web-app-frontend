import { deleteFileReducer, uploadFileReducer } from "./slices/image.slice";
import {
	addAccountReducer,
	allUserBalances,
	balanceByUserReducer,
	withdrawReducer
} from "./slices/balance.slice";
import {
	allBusReducer,
	createBusReducer,
	updateBusSliceReducer
} from "./slices/bus.slice";
import {
	createStateReducer,
	deleteStateReducer,
	getAllStateReducer,
	updateStateReducer
} from "./slices/state.slice";
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
	userRegisterReducer
} from "./slices/user.slice";
import {
	addBusStopReducer,
	getAllBusStopReducer,
	removeBusStopReducer
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
	verifyPassengerOnBoardReducer
} from "./slices/trip.slice";
import {
	allBookingReducer,
	bookingReducer,
	verifyPaymentReducer
} from "./slices/booking.slice";
import {
	getAllTransactionReducer,
	getTransactionByIdReducer,
	verifyPaymentStatusReducer
} from "./slices/transactionSlice";
import { appStateReducer } from "./slices/appState.slice";
import {
	deactivateCodeReducer,
	discountCodeReducer,
	getUserByDiscountCodeReducer
} from "./slices/discountSlice";
import {
	createEntityReducer,
	deleteEntityByReducer,
	editEntityByReducer,
	getAllEntityReducer,
	getEntityByIdReducer,
	markAsPaidReducer
} from "./slices/entity.slice";

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

	// State
	createState: createStateReducer,
	allState: getAllStateReducer,
	deleteState: deleteStateReducer,
	updateState: updateStateReducer,
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

	// discount reducer
	createDiscountCode: discountCodeReducer,
	deactivateCode: deactivateCodeReducer,
	userByDiscountCode: getUserByDiscountCodeReducer,

	//entity reducer
	createEntity: createEntityReducer,
	getEntityById: getEntityByIdReducer,
	getAllEntity: getAllEntityReducer,
	deleteEntity: deleteEntityByReducer,
	editEntity: editEntityByReducer,
	markAsPaid: markAsPaidReducer,

	appState: appStateReducer
});

export default rootReducer;
