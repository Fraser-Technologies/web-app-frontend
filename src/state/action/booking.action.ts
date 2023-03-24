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
			} = getState();

			let bookings = [];

			const { data } = await api.post(
				`/booking`,
				{
					trip: trip?._id,
					no_of_ticket: trip?.no_of_ticket,
					comfirmed_payment: true,
					passengers
				},
				requestHeader(userInfo)
			);

			bookings.push(data);

			dispatch(verifyPaymentSuccess(bookings));
		} catch (error: any) {
			dispatch(verifyPaymentFailed(RequestError(error)));
		}
	};

export const getAllBookingAction = (): AppThunk => async (dispatch) => {
	try {
		dispatch(getAllBookingRequest());
		const { data } = await api.get("/booking");
		dispatch(getAllBookingSuccess(data));
	} catch (error: any) {
		dispatch(getAllBookingFailed(RequestError(error)));
	}
};
