import { Trip_interface } from "./../../interfaces/trip_interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type initialType = {
	trips: Trip_interface[] | [];
	loading: boolean;
	error: string;
};
export const allTripState: initialType = {
	trips: [],
	loading: false,
	error: "",
};
export const getAvailableTripSlice = createSlice({
	name: "get all trips",
	initialState: allTripState,
	reducers: {
		getAvailableTripRequest: (state) => {
			state.loading = true;
		},

		getAvailableTripSuccess: (state, { payload }) => {
			state.trips = payload;
			state.loading = false;
		},
		getAvailableTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.trips = [];
		},
	},
});

export const {
	getAvailableTripRequest,
	getAvailableTripSuccess,
	getAvailableTripFailed,
} = getAvailableTripSlice.actions;
export const availableTripReducer = getAvailableTripSlice.reducer;

export const allAvailableTripSlice = createSlice({
	name: "available trips",
	initialState: allTripState,
	reducers: {
		getAllAvailableTripRequest: (state) => {
			state.loading = true;
		},

		getAllAvailableTripSuccess: (state, { payload }) => {
			state.trips = payload as unknown as Trip_interface[];
			state.loading = false;
		},
		getAllAvailableTripFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
			state.trips = [];
		},
	},
});

export const {
	getAllAvailableTripFailed,
	getAllAvailableTripRequest,
	getAllAvailableTripSuccess,
} = allAvailableTripSlice.actions;
export const getAllAvailableTripReducer = allAvailableTripSlice.reducer;

const getAllTripSlice = createSlice({
	name: "all trip",
	initialState: allTripState,
	reducers: {
		getAllTripsRequest: (state) => {
			state.loading = true;
		},
		getAllTripsSuccess: (state, { payload }) => {
			state.loading = false;
			state.trips = payload as unknown as Trip_interface[];
		},

		getAllTripsFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
			state.trips = [];
		},
	},
});

export const { getAllTripsFailed, getAllTripsRequest, getAllTripsSuccess } =
	getAllTripSlice.actions;
export const allTripReducer = getAllTripSlice.reducer;

type initialStateType = {
	loading: boolean;
	error: string;
	trip: Trip_interface | {};
};

const initialState: initialStateType = {
	loading: false,
	error: "",
	trip: {},
};

const createTripSlice = createSlice({
	name: "create trip",
	initialState: initialState,
	reducers: {
		createTripRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		createTripSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload as unknown as Trip_interface;
		},
		createTripFailed: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		resetCreateTrip: () => initialState,
	},
});

export const {
	createTripFailed,
	createTripRequest,
	createTripSuccess,
	resetCreateTrip,
} = createTripSlice.actions;
export const createTripReducer = createTripSlice.reducer;

const updateTripSlice = createSlice({
	name: "update trip",
	initialState: initialState,
	reducers: {
		updateTripRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		updateTripSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload as unknown as Trip_interface;
		},
		updateTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		updateTripReset: () => initialState,
	},
});

export const {
	updateTripRequest,
	updateTripFailed,
	updateTripSuccess,
	updateTripReset,
} = updateTripSlice.actions;
export const updateTripReducer = updateTripSlice.reducer;

const getTripByBusSlice = createSlice({
	name: "get trip by bus",
	initialState: allTripState,
	reducers: {
		getTripByBusRequest: (state) => {
			state.loading = true;
			state.error = "";
		},

		getTripByBusSuccess: (state, { payload }) => {
			state.loading = false;
			state.trips = payload;
		},
		getTripByBusFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const { getTripByBusFailed, getTripByBusRequest, getTripByBusSuccess } =
	getTripByBusSlice.actions;
export const getTripByBusReducer = getTripByBusSlice.reducer;

const getTripByDriverSlice = createSlice({
	name: "get trip by bus",
	initialState: allTripState,
	reducers: {
		getTripByDriverRequest: (state) => {
			state.loading = true;
			state.error = "";
		},

		getTripByDriverSuccess: (state, { payload }) => {
			state.loading = false;
			state.trips = payload;
		},
		getTripByDriverFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const {
	getTripByDriverFailed,
	getTripByDriverRequest,
	getTripByDriverSuccess,
} = getTripByDriverSlice.actions;
export const getTripByDriverReducer = getTripByDriverSlice.reducer;

const deleteTripByIdSlice = createSlice({
	name: "delete trip by id",
	initialState: initialState,
	reducers: {
		deleteTripByIdRequest: (state) => {
			state.loading = true;
			state.error = "";
		},

		deleteTripByIdSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload;
		},
		deleteTripByIdFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		resetDeleteTripById: (state) => {
			state.loading = false;
			state.error = "";
			state.trip = {};
		},
	},
});

export const {
	deleteTripByIdFailed,
	deleteTripByIdRequest,
	deleteTripByIdSuccess,
	resetDeleteTripById,
} = deleteTripByIdSlice.actions;
export const deleteTripByIdReducer = deleteTripByIdSlice.reducer;

const verifyPassangerOnBoardSlice = createSlice({
	name: "verify passanger is onboard",
	initialState: initialState,
	reducers: {
		verifyPassangerOnBoardRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		verifyPassangerOnBoardSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload;
		},
		verifyPassangerOnBoardFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const {
	verifyPassangerOnBoardFailed,
	verifyPassangerOnBoardSuccess,
	verifyPassangerOnBoardRequest,
} = verifyPassangerOnBoardSlice.actions;
export const verifyPassangerOnBoardReducer =
	verifyPassangerOnBoardSlice.reducer;

const unverifyPassangerOnBoardSlice = createSlice({
	name: "unverify passanger is onboard",
	initialState: initialState,
	reducers: {
		unverifyPassangerOnBoardRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		unverifyPassangerOnBoardSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload;
		},
		unverifyPassangerOnBoardFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const {
	unverifyPassangerOnBoardFailed,
	unverifyPassangerOnBoardSuccess,
	unverifyPassangerOnBoardRequest,
} = unverifyPassangerOnBoardSlice.actions;
export const unverifyPassangerOnBoardReducer =
	unverifyPassangerOnBoardSlice.reducer;
