import {
  GET_ALL_BUS_STOP_FAILURE,
  GET_ALL_BUS_STOP_REQUEST,
  GET_ALL_BUS_STOP_SUCCESS,
} from "../constants/bus_stop.constant";

export const getAllBusStopReducer = (
  state = {
    loading: false,
    busStop: [],
    error: "",
  },
  action
) => {
  switch (action.type) {
    case GET_ALL_BUS_STOP_REQUEST:
      return { loading: true };
    case GET_ALL_BUS_STOP_SUCCESS:
      return { loading: false, busStop: action.payload };

    case GET_ALL_BUS_STOP_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
