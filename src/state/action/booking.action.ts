import { RequestError } from "./../../utils/requestError";
import {
	addToBooking,
	emptyBooking,
	getAllBookingFailed,
	getAllBookingRequest,
	getAllBookingSuccess,
	removeFromBooking,
	verifyPaymentFailed,
	verifyPaymentRequest,
	verifyPaymentSuccess,
} from "../slices/booking.slice";
import { api } from "../../utils/api";
import { requestHeader } from "../../utils/requestHeader";
import { AppThunk } from "../redux-store";

export const addToMyBookinAction =
	(trip: any): AppThunk =>
	(dispatch) => {
		dispatch(addToBooking(trip));
	};

export const removeFromMyBooking =
	(trip: any): AppThunk =>
	(dispatch) => {
		dispatch(removeFromBooking(trip));
	};

export const emptyMyBooking = (): AppThunk => (dispatch) => {
	dispatch(emptyBooking());
};

export const verifyPaymentAction =
	(trip: any, passengers: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(verifyPaymentRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();

			let bookings = [];

			const { data } = await api(app_type).post(
				`/booking`,
				{
					trip: trip?._id,
					no_of_ticket: trip?.no_of_ticket,
					comfirmed_payment: true,
					passengers,
				},
				requestHeader(userInfo)
			);

			bookings.push(data);

			dispatch(verifyPaymentSuccess(bookings));
		} catch (error: any) {
			dispatch(verifyPaymentFailed(RequestError(error)));
		}
	};

export const getAllBookingAction =
	(): AppThunk => async (dispatch, getState) => {
		try {
			dispatch(getAllBookingRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).get("/booking");
			dispatch(getAllBookingSuccess(data));
		} catch (error: any) {
			dispatch(getAllBookingFailed(RequestError(error)));
		}
	};
