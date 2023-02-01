import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import { AppThunk } from "../redux-store";
import {
	createBusFailed,
	createBusRequest,
	createBusSuccess,
	getAllBusFailed,
	getAllBusRequest,
	getAllBusSuccess,
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

export const createBusAction =
	(input: any): AppThunk =>
	async (dispatch) => {
		try {
			dispatch(createBusRequest());
			const { data } = await api.post(
				"/bus",
				{ ...input },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			dispatch(createBusSuccess(data));
		} catch (error: any) {
			dispatch(createBusFailed(RequestError(error)));
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
