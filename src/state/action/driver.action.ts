import { api } from "./../../utils/api";
import { RequestError } from "../../utils/requestError";
import {
	allDriverFailed,
	allDriverRequest,
	allDriverSuccess,
} from "../slices/driver.slice";
import { AppThunk } from "./../redux-store";

export const getAllDriverAction = (): AppThunk => async (dispatch) => {
	try {
		dispatch(allDriverRequest());
		const { data } = await api.get("/driver");
		dispatch(allDriverSuccess(data));
	} catch (error: any) {
		dispatch(allDriverFailed(RequestError(error)));
	}
};
