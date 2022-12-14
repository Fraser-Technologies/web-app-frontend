import { RequestError } from "../../utils/requestError";
import { requestHeader } from "../../utils/requestHeader";
import Cookie from "js-cookie";
import { api } from "../api";
import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_DETAIL_FAILURE,
  UPDATE_USER_DETAIL_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGOUT,
} from "../constants/user.constant";

export const registerUserAction = (input) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await api.post("/user/signup", { input });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data?.data });
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data?.data });
    Cookie.set("userInfo", JSON.stringify(data?.data));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: RequestError(error),
    });
  }
};

export const userLoginAction = (phone) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const { data } = await api.post("/user/login", { phone });
    console.log("data", data);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data?.data });
    Cookie.set("userInfo", JSON.stringify(data?.data));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: RequestError(error),
    });
  }
};

export const updateUserAction =
  ({ id, update }) =>
  async ({ dispatch, getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await api.put(
        `/user/${id}`,
        { update },
        requestHeader(userInfo)
      );
      dispatch({ type: UPDATE_USER_DETAIL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_DETAIL_FAILURE,
        payload: RequestError(error),
      });
    }
  };

export const logoutUserAction = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: LOGOUT });
};
