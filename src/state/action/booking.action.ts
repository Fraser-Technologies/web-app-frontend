import { RequestError } from "./../../utils/requestError";
import {
	addToBooking,
	emptyBooking,
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
		console.log("the trip details here is ", trip);
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
	(trip: any): AppThunk =>
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
					comfirmed_payment: true,
				},
				requestHeader(userInfo)
			);

			bookings.push(data);

			dispatch(verifyPaymentSuccess(bookings));
		} catch (error: any) {
			dispatch(verifyPaymentFailed(RequestError(error)));
		}
	};
