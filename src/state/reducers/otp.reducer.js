import {
  GET_OTP_FAILED,
  GET_OTP_REQUEST,
  GET_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "../constants/otp.constant";

let initial_State = {
  loading: false,
  data: {},
  error: {},
};

export const getOtpReducer = (state = initial_State, action) => {
  switch (action.type) {
    case GET_OTP_REQUEST:
      return { loading: true };
    case GET_OTP_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_OTP_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const verifyOtpReducer = (state = initial_State, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return { loading: true };
    case VERIFY_OTP_SUCCESS:
      return { loading: false, data: action.payload };
    case VERIFY_OTP_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
