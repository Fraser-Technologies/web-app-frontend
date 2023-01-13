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
	resetUpdateBus,
	updateBusFailed,
	updateBusRequest,
	updateBusSuccess,
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

export const updateBusAction =
	(bus_id: string, update: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(updateBusRequest());
			const {
				userLogin: { userInfo },
			} = getState();
			const { data } = await api.put(
				`/bus/${bus_id}`,
				{ ...update },
				{
					headers: { Authorization: `Bearer ${userInfo?.user_token}` },
				}
			);
			dispatch(updateBusSuccess(data));
		} catch (error: any) {
			dispatch(updateBusFailed(RequestError(error)));
		}
	};

export const resetUpdateBusAction = (): AppThunk => (dispatch) => {
	dispatch(resetUpdateBus());
};
