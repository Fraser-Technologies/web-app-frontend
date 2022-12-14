import {
  ADD_TO_BOOKING,
  EMPTY_BOOKING,
  GET_AVAILABLE_TRIP_FAILURE,
  GET_AVAILABLE_TRIP_REQUEST,
  GET_AVAILABLE_TRIP_SUCCESS,
  REMOVE_FROM_BOOKING,
  VERIFY_PAYMENT,
  VERIFY_PAYMENT_FAILURE,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
} from "../constants/trip.constant";
import Cookie from "js-cookie";

let initial_State = {
  loading: false,
  trips: [],
  error: "",
};

export const getAvailableTripReducer = (state = initial_State, action) => {
  switch (action.type) {
    case GET_AVAILABLE_TRIP_REQUEST:
      return { loading: true };
    case GET_AVAILABLE_TRIP_SUCCESS:
      return { loading: false, trips: action.payload };
    case GET_AVAILABLE_TRIP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// const myBookings = localStorage.getItem("myBookings")
//   ? JSON.parse(localStorage.getItem("myBookings"))
//   : [];

const myBookings = Cookie.get("myBookings")
  ? JSON.parse(Cookie.get("myBookings"))
  : [];

export const myBookingsReducer = (state = myBookings, action) => {
  switch (action.type) {
    case ADD_TO_BOOKING:
      // localStorage.setItem("myBookings", JSON.stringify(action.payload));
      Cookie.set("myBookings", JSON.stringify(action.payload));
      return action.payload;
    case REMOVE_FROM_BOOKING:
      const bookings = state.filter(
        (book) => book?._id !== action.payload?._id
      );
      // localStorage.setItem("myBookings", JSON.stringify([...bookings]));
      Cookie.set("myBookings", JSON.stringify([...bookings]));
      return [...bookings];

    case EMPTY_BOOKING:
      // localStorage.setItem("mybookings", []);
      Cookie.remove("mybookings");
      return [];

    default:
      return state;
  }
};

export const verifyPaymentReducer = (
  state = {
    loading: false,
    error: "",
    verifyPayment: {},
  },
  action
) => {
  switch (action.type) {
    case VERIFY_PAYMENT_REQUEST:
      return { loading: true };
    case VERIFY_PAYMENT_SUCCESS:
      return {
        loading: false,
        verifyPayment: action.payload,
      };

    case VERIFY_PAYMENT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
