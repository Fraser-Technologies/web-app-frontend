import { api } from "../api";
import { requestHeader } from "../../utils/requestHeader";
import { RequestError } from "../../utils/requestError";
import Cookie from "js-cookie";
import {
  GET_OTP_FAILED,
  GET_OTP_REQUEST,
  GET_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
} from "../constants/otp.constant";
import {
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
} from "../constants/user.constant";

export const getOtpAction = (phone: string) => async (dispatch, state) => {
  try {
    dispatch({
      type: GET_OTP_REQUEST,
    });
    const { data } = await api.post("/user/get_otp", { phone: phone });

    dispatch({ type: GET_OTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_OTP_FAILED,
      payload: RequestError(error),
    });
  }
};

export const VerifyOtpAction =
  ({ otp, phone }) =>
  async (dispatch) => {
    try {
      dispatch({ type: VERIFY_OTP_REQUEST });
      const { data } = await api.post("/user/verify_otp", {
        phone: phone,
        otp: otp,
      });

      console.log("the user data is ", data);

      if (data?.data) {
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });

        if (data?.data) {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: {
              ...data?.data?._doc,
              user_token: data?.data?.user_token,
            },
          });

          // localStorage.setItem(
          //   "userInfo",
          //   JSON.stringify({
          //     user: data?.data?._doc,
          //     user_token: data?.data?.user_token,
          //   })
          // );

          Cookie.set(
            "userInfo",
            JSON.stringify({
              user: data?.data?._doc,
              user_token: data?.data?.user_tol,
            })
          );
        }
      } else {
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: VERIFY_OTP_FAILED, payload: RequestError(error) });
    }
  };
