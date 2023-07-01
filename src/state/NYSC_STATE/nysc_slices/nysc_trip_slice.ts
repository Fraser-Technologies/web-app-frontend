import { createSlice } from "@reduxjs/toolkit";
import { NYSCTrip_interface } from "../../../interfaces/NYSC_INTERFACES/nysc_trip_interface";

export type initialType = {
	trips: NYSCTrip_interface[] | [];
	loading: boolean;
	error: string;
};

export const allNYSCTripState: initialType = {
	trips: [],
	loading: false,
	error: ""
};

export type initialTypeForOne = {
	trip: NYSCTrip_interface | { _id: string };
	loading: boolean;
	error: string;
};

export const oneTrip: initialTypeForOne = {
	loading: false,
	error: "",
	trip: { _id: "" }
};

export const getNYSCAvailableTripSlice = createSlice({
	name: "get NYSC trips",
	initialState: allNYSCTripState,
	reducers: {
		getAvailableNYSCTripRequest: (state) => {
			state.loading = true;
		},

		getAvailableNYSCTripSuccess: (state, { payload }) => {
			state.trips = payload;
			state.loading = false;
		},
		getAvailableNYSCTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.trips = [];
		}
	}
});

export const {
	getAvailableNYSCTripRequest,
	getAvailableNYSCTripSuccess,
	getAvailableNYSCTripFailed
} = getNYSCAvailableTripSlice.actions;
export const availableNYSCTripReducer = getNYSCAvailableTripSlice.reducer;

export const allNYSCAvailableTripSlice = createSlice({
	name: "available nysc trips",
	initialState: oneTrip,
	reducers: {
		getAllNYSCAvailableTripRequest: (state) => {
			state.loading = true;
		},

		getAllNYSCAvailableTripSuccess: (state, { payload }) => {
			state.trip = payload as unknown as NYSCTrip_interface;
			state.loading = false;
		},
		getAllNYSCAvailableTripFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
			state.trip = {
				_id: ""
			};
		}
	}
});

export const {
	getAllNYSCAvailableTripRequest,
	getAllNYSCAvailableTripSuccess,
	getAllNYSCAvailableTripFailed
} = allNYSCAvailableTripSlice.actions;
export const getAllAvailableTripReducer = allNYSCAvailableTripSlice.reducer;

const getAllNYSCTripSlice = createSlice({
	name: "all NYSC trip",
	initialState: allNYSCTripState,
	reducers: {
		getAllNYSCTripsRequest: (state) => {
			state.loading = true;
		},
		getAllNYSCTripsSuccess: (state, { payload }) => {
			state.loading = false;
			state.trips = payload as unknown as NYSCTrip_interface[];
		},

		getAllNYSCTripsFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
			state.trips = [];
		}
	}
});

export const {
	getAllNYSCTripsRequest,
	getAllNYSCTripsSuccess,
	getAllNYSCTripsFailed
} = getAllNYSCTripSlice.actions;
export const allNYSCTripReducer = getAllNYSCTripSlice.reducer;

type initialStateType = {
	loading: boolean;
	error: string;
	trip: NYSCTrip_interface | { _id: "" };
};

const initialState: initialStateType = {
	loading: false,
	error: "",
	trip: { _id: "" }
};

const createNYSCTripSlice = createSlice({
	name: "create NYSC trip",
	initialState: initialState,
	reducers: {
		createNYSCTripRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		createNYSCTripSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload as unknown as NYSCTrip_interface;
		},
		createNYSCTripFailed: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		resetCreateNYSCTrip: () => initialState
	}
});

export const {
	createNYSCTripFailed,
	createNYSCTripRequest,
	createNYSCTripSuccess,
	resetCreateNYSCTrip
} = createNYSCTripSlice.actions;
export const createNYSCTripReducer = createNYSCTripSlice.reducer;

const updateNYSCTripSlice = createSlice({
	name: "update NYSC trip",
	initialState: initialState,
	reducers: {
		updateNYSCTripRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		updateNYSCTripSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload as unknown as NYSCTrip_interface;
		},
		updateNYSCTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		updateNYSCTripReset: () => initialState
	}
});

export const {
	updateNYSCTripRequest,
	updateNYSCTripFailed,
	updateNYSCTripSuccess,
	updateNYSCTripReset
} = updateNYSCTripSlice.actions;
export const updateNYSCTripReducer = updateNYSCTripSlice.reducer;

export const endNYSCTripSlice = createSlice({
	name: "end NYSC trip",
	initialState: oneTrip,
	reducers: {
		endNYSCTripRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		endNYSCTripSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload as unknown as NYSCTrip_interface;
		},
		endNYSCTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		endNYSCTripReset: () => initialState
	}
});

export const {
	endNYSCTripRequest,
	endNYSCTripFailed,
	endNYSCTripReset,
	endNYSCTripSuccess
} = endNYSCTripSlice.actions;
export const endNYSCTripReducer = endNYSCTripSlice.reducer;

const deleteNYSCTripByIdSlice = createSlice({
	name: "delete NYSC trip by id",
	initialState: initialState,
	reducers: {
		deleteNYSCTripByIdRequest: (state) => {
			state.loading = true;
			state.error = "";
		},

		deleteNYSCTripByIdSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload;
		},
		deleteNYSCripByIdFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		resetNYSCDeleteTripById: (state) => {
			state.loading = false;
			state.error = "";
			state.trip = { _id: "" };
		}
	}
});

export const {
	deleteNYSCTripByIdRequest,
	deleteNYSCTripByIdSuccess,
	deleteNYSCripByIdFailed,
	resetNYSCDeleteTripById
} = deleteNYSCTripByIdSlice.actions;
export const deleteNYSCTripByIdReducer = deleteNYSCTripByIdSlice.reducer;
