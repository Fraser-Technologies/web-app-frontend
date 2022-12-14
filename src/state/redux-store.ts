// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { getOtpReducer, verifyOtpReducer } from "./reducers/otp.reducer";
// import { getAllBusStopReducer } from "./reducers/bus.reducer";
// import Cookie from "js-cookie";
// import {
//   getAvailableTripReducer,
//   myBookingsReducer,
//   verifyPaymentReducer,
// } from "./reducers/trip.reducer";
// import {
//   loginUserReducer,
//   logoutReducer,
//   registerUserReducer,
// } from "./reducers/user.reducer";

// const userInfoFromStorage = Cookie.get("userInfo")
//   ? JSON.parse(Cookie.get("userInfo"))
//   : null;

// const myBookings = Cookie.get("myBookings")
//   ? JSON.parse(Cookie.get("myBookings"))
//   : [];

// const initialState = {
//   loginUser: { userInfo: userInfoFromStorage },
//   myBookings: myBookings,
// };

// const reducer = combineReducers({
//   getotp: getOtpReducer,
//   verifyOtp: verifyOtpReducer,
//   allBusStop: getAllBusStopReducer,

//   //user reducers
//   registerUser: registerUserReducer,
//   loginUser: loginUserReducer,
//   availableTrip: getAvailableTripReducer,

//   // trip reducers
//   myBookings: myBookingsReducer,
//   verifyPayment: verifyPaymentReducer,
// });

// const middleware = [thunk];

// const reduxStore = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default reduxStore;

import { Action, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";
import thunk, { ThunkAction } from "redux-thunk";
import rootReducer from "./rootReducer";

const middleware = [thunk, logger];

export const store = configureStore({
	reducer: rootReducer,
	middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	// void,
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
