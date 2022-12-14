import { RequestError } from "../../utils/requestError";
import { requestHeader } from "../../utils/requestHeader";
import { api } from "../api";
import { GET_BUS_STOP_REQUEST } from "../constants/bus_stop.constant";
import {
  ADD_TO_BOOKING,
  EMPTY_BOOKING,
  GET_AVAILABLE_TRIP_FAILURE,
  GET_AVAILABLE_TRIP_SUCCESS,
  REMOVE_FROM_BOOKING,
  VERIFY_PAYMENT_FAILURE,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
} from "../constants/trip.constant";

export const getAvailableTripAction =
  ({ from, to }) =>
  async (dispatch) => {
    dispatch({ type: GET_BUS_STOP_REQUEST });
    try {
      const { data } = await api.post("/trip/available", {
        from,
        to,
      });

      dispatch({ type: GET_AVAILABLE_TRIP_SUCCESS, payload: data?.data });
    } catch (error) {
      dispatch({
        type: GET_AVAILABLE_TRIP_FAILURE,
        payload: RequestError(error),
      });
    }
  };

export const getAllAvailableTripAction = () => async (dispatch) => {
  dispatch({ type: GET_BUS_STOP_REQUEST });
  try {
    const { data } = await api.get("/trip/uncompleted");
    dispatch({ type: GET_AVAILABLE_TRIP_SUCCESS, payload: data?.data });
  } catch (error) {
    dispatch({
      type: GET_AVAILABLE_TRIP_FAILURE,
      payload: RequestError(error),
    });
  }
};

export const addToMyBookinAction = (trip) => (dispatch) => {
  dispatch({ type: ADD_TO_BOOKING, payload: trip });
};

export const removeFromMyBooking = (trip) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_BOOKING, payload: trip });
};

export const emptyMyBooking = () => (dispatch) => {
  dispatch({ type: EMPTY_BOOKING });
};

export const verifyPaymentAction = (trips) => async (dispatch, getState) => {
  try {
    dispatch({ type: VERIFY_PAYMENT_REQUEST });
    const {
      loginUser: { userInfo },
    } = getState();

    let bookings = [];

    for (let index = 0; index < trips.length; index++) {
      const { data } = await api.post(
        `/booking`,
        {
          trip: trips[index]?._id,
          comfirmed_payment: true,
        },
        requestHeader(userInfo)
      );

      bookings.push(data);
    }

    dispatch({ type: VERIFY_PAYMENT_SUCCESS, payload: bookings });
  } catch (error) {
    dispatch({
      type: VERIFY_PAYMENT_FAILURE,
      payload: RequestError(error),
    });
  }
};
