import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import { AppThunk } from "../redux-store";
import {
	getAllBusFailed,
	getAllBusRequest,
	getAllBusSuccess,
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
