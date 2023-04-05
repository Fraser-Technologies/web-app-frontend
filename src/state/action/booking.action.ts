import { RequestError } from "./../../utils/requestError";
import {
	addToBooking,
	createBookingFailed,
	createBookingRequest,
	createBookingSuccess,
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

export const createBookingAction =
	(trip: any, passengers: any, reference: string): AppThunk =>
	async (dispatch, getState) => {
		console.log(reference)
		try {
			// dispatch(verifyPaymentRequest());
			dispatch(createBookingRequest());
			const {
				userLogin: { userInfo },
			} = getState();

			let bookings: any = {};

			const { data } = await api.post(
				`/booking`,
				{
					trip: trip?._id,
					no_of_ticket: trip?.no_of_ticket,
					reference,
					passengers
				},
				requestHeader(userInfo)
			);

			bookings = data;

			dispatch(createBookingSuccess(bookings));
			dispatch(verifyPaymentRequest());
		} catch (error: any) {
			dispatch(createBookingFailed(RequestError(error)));
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
