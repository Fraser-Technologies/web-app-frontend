import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import { AppThunk } from "../redux-store";
import {
	getAllBusFailed,
	getAllBusRequest,
	getAllBusSuccess,
	getTripByBusFailed,
	getTripByBusRequest,
	getTripByBusSuccess,
} from "../slices/bus.slice";

export const getAllBusAction = (): AppThunk => async (dispatch) => {
	try {
		dispatch(getAllBusRequest());
		const { data } = await api.get("/bus");
		dispatch(getAllBusSuccess(data));
	} catch (error: any) {
		dispatch(getAllBusFailed(RequestError(error)));
	}
};

export const getTripByBusAction =
	(bus_id: string): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(getTripByBusRequest());
			const { data } = await api.get(`/bus/tripbybus/${bus_id}`);
			dispatch(getTripByBusSuccess(data));
		} catch (error: any) {
			dispatch(getTripByBusFailed(RequestError(error)));
		}
	};
