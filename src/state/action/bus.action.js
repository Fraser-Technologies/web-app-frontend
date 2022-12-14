import { RequestError } from "../../utils/requestError";
import { api } from "../api";
import {
  GET_ALL_BUS_STOP_FAILURE,
  GET_ALL_BUS_STOP_REQUEST,
  GET_ALL_BUS_STOP_SUCCESS,
  GET_BUS_STOP_FAILURE,
  GET_BUS_STOP_REQUEST,
  GET_BUS_STOP_SUCCESS,
} from "../constants/bus_stop.constant";

export const getBusStopAction = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: GET_BUS_STOP_REQUEST });
    const { data } = await api.get(`/busstop/keyword?keyword=${keyword}`);
    dispatch({ type: GET_BUS_STOP_SUCCESS, payload: data?.data });
  } catch (error) {
    dispatch({ type: GET_BUS_STOP_FAILURE, payload: RequestError(error) });
  }
};

export const getAllBusStop = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BUS_STOP_REQUEST });
    const { data } = await api.get("/busstop");
    dispatch({ type: GET_ALL_BUS_STOP_SUCCESS, payload: data?.data });
  } catch (error) {
    dispatch({ type: GET_ALL_BUS_STOP_FAILURE, payload: RequestError(error) });
  }
};
