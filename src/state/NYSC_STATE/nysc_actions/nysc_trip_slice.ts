import { api } from "../../../utils/api";
import { RequestError } from "../../../utils/requestError";
import { AppThunk } from "../../redux-store";
import {
	getAvailableNYSCTripFailed,
	getAvailableNYSCTripRequest,
	getAvailableNYSCTripSuccess
} from "../nysc_slices/nysc_trip_slice";

export const getAvailableNYSCTripAction =
	({ from, to }: { from: string; to: string }): AppThunk =>
	async (dispatch, getState) => {
		dispatch(getAvailableNYSCTripRequest());
		try {
			const {
				appState: { app_type }
			} = getState();
			const { data } = await api(app_type).post("/NYSC/trip/available", {
				from,
				to
			});

			dispatch(getAvailableNYSCTripSuccess(data));
		} catch (error: any) {
			dispatch(getAvailableNYSCTripFailed(RequestError(error)));
		}
	};
