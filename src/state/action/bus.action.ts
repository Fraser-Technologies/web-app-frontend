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

export const getAllBusAction = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch(getAllBusRequest());
		const {
			appState: { app_type },
		} = getState();
		const { data } = await api(app_type).get("/bus");
		dispatch(getAllBusSuccess(data));
	} catch (error: any) {
		dispatch(getAllBusFailed(RequestError(error)));
	}
};

export const createBusAction =
	(input: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(createBusRequest());
			const {
				userLogin: { userInfo },
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
				"/bus",
				{ ...input },
				{
					headers: {
						Authorization: `Bearer ${userInfo?.user_token}`,
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
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).put(
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
