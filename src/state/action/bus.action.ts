import { AppThunk } from "./../redux-store";
import { RequestError } from "../../utils/requestError";
import { api } from "../../utils/api";

import {
	getAllBusStopFailed,
	getAllBusStopRequest,
	getAllbusStopSuccess,
} from "../slices/busstop.slice";

// export const getBusStopAction =
// 	(keyword: string): AppThunk =>
// 	async (dispatch) => {
// 		dispatch(getAllBusStopRequest());
// 		try {
// 			const { data } = await api.get(`/busstop/keyword?keyword=${keyword}`);
// 			dispatch(getAllbusStopSuccess(data?.data));
// 		} catch (error: any) {
// 			dispatch(getAllBusStopFailed(RequestError(error)));
// 		}
// 	};

export const getAllBusStop = (): AppThunk => async (dispatch) => {
	try {
		dispatch(getAllBusStopRequest());
		const { data } = await api.get("/busstop");
		dispatch(getAllbusStopSuccess(data));
	} catch (error) {
		dispatch(getAllBusStopFailed(RequestError(error)));
	}
};
