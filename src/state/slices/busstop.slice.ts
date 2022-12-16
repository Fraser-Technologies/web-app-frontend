import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface busStopInterface {
	loading: boolean;
	error: string | any;
	busStops: [];
}

const allBusStop: busStopInterface = {
	loading: false,
	busStops: [],
	error: "",
};

export const busSlice = createSlice({
	name: "getAllBusStop",
	initialState: allBusStop,
	reducers: {
		getAllBusStopRequest: (state) => {
			state.loading = true;
		},
		getAllbusStopSuccess: (state, { payload }: PayloadAction) => {
			state.loading = false;
			state.busStops = payload as unknown as any;
		},
		getAllBusStopFailed: (state, { payload }: PayloadAction) => {
			state.loading = true;
			state.error = payload as unknown as string;
		},
	},
});

export const {
	getAllBusStopRequest,
	getAllBusStopFailed,
	getAllbusStopSuccess,
} = busSlice.actions;
export const getAllBusStopReducer = busSlice.reducer;
