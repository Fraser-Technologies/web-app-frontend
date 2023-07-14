import { Trip_interface } from "./../../interfaces/trip_interface";
import { createSlice } from "@reduxjs/toolkit";

export type initialType = {
	trips: Trip_interface[] | [];
	loading: boolean;
	error: string;
};
export const allTripState: initialType = {
	trips: [],
	loading: false,
	error: ""
};

export type initialTypeForOne = {
	trip: Trip_interface | { _id: string };
	loading: boolean;
	error: string;
};

export const oneTrip: initialTypeForOne = {
	loading: false,
	error: "",
	trip: { _id: "" }
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
		}
	}
});

export const {
	getAvailableTripRequest,
	getAvailableTripSuccess,
	getAvailableTripFailed
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
		}
	}
});

export const {
	getAllAvailableTripFailed,
	getAllAvailableTripRequest,
	getAllAvailableTripSuccess
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
		}
	}
});

export const { getAllTripsFailed, getAllTripsRequest, getAllTripsSuccess } =
	getAllTripSlice.actions;
export const allTripReducer = getAllTripSlice.reducer;

type initialStateType = {
	loading: boolean;
	error: string;
	trip: Trip_interface | { _id: "" };
};

const initialState: initialStateType = {
	loading: false,
	error: "",
	trip: { _id: "" }
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
		resetCreateTrip: () => initialState
	}
});

export const {
	createTripFailed,
	createTripRequest,
	createTripSuccess,
	resetCreateTrip
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
		updateTripReset: () => initialState
	}
});

export const {
	updateTripRequest,
	updateTripFailed,
	updateTripSuccess,
	updateTripReset
} = updateTripSlice.actions;
export const updateTripReducer = updateTripSlice.reducer;

export const endTripSlice = createSlice({
	name: "end trip",
	initialState: oneTrip,
	reducers: {
		endTripRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		endTripSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload as unknown as Trip_interface;
		},
		endTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		endTripReset: () => initialState
	}
});

export const { endTripRequest, endTripFailed, endTripReset, endTripSuccess } =
	endTripSlice.actions;
export const endTripReducer = endTripSlice.reducer;

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
		}
	}
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
		}
	}
});

export const {
	getTripByDriverFailed,
	getTripByDriverRequest,
	getTripByDriverSuccess
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
			state.trip = { _id: "" };
		}
	}
});

export const {
	deleteTripByIdFailed,
	deleteTripByIdRequest,
	deleteTripByIdSuccess,
	resetDeleteTripById
} = deleteTripByIdSlice.actions;
export const deleteTripByIdReducer = deleteTripByIdSlice.reducer;

const verifyPassengerOnBoardSlice = createSlice({
	name: "verify Passenger is onboard",
	initialState: initialState,
	reducers: {
		verifyPassengerOnBoardRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		verifyPassengerOnBoardSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload;
		},
		verifyPassengerOnBoardFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		}
	}
});

export const {
	verifyPassengerOnBoardFailed,
	verifyPassengerOnBoardSuccess,
	verifyPassengerOnBoardRequest
} = verifyPassengerOnBoardSlice.actions;
export const verifyPassengerOnBoardReducer =
	verifyPassengerOnBoardSlice.reducer;

const unverifyPassengerOnBoardSlice = createSlice({
	name: "unverify Passenger is onboard",
	initialState: initialState,
	reducers: {
		unverifyPassengerOnBoardRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		unverifyPassengerOnBoardSuccess: (state, { payload }) => {
			state.loading = false;
			state.trip = payload;
		},
		unverifyPassengerOnBoardFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		}
	}
});

export const {
	unverifyPassengerOnBoardFailed,
	unverifyPassengerOnBoardSuccess,
	unverifyPassengerOnBoardRequest
} = unverifyPassengerOnBoardSlice.actions;
export const unverifyPassengerOnBoardReducer =
	unverifyPassengerOnBoardSlice.reducer;

export const getAvailableNYSCTripSlice = createSlice({
	name: "get available NYSC trip",
	initialState: allTripState,
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
	getAvailableNYSCTripFailed,
	getAvailableNYSCTripRequest,
	getAvailableNYSCTripSuccess
} = getAvailableNYSCTripSlice.actions;

export const NYSCTripReducer = getAvailableNYSCTripSlice.reducer;

export const getAvailableAIESECTripSlice = createSlice({
	name: "get available AIESEC trip",
	initialState: allTripState,
	reducers: {
		getAvailableAIESECTripRequest: (state) => {
			state.loading = true;
		},

		getAvailableAIESECTripSuccess: (state, { payload }) => {
			state.trips = payload;
			state.loading = false;
		},
		getAvailableAIESECTripFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.trips = [];
		}
	}
});

export const {
	getAvailableAIESECTripFailed,
	getAvailableAIESECTripRequest,
	getAvailableAIESECTripSuccess
} = getAvailableAIESECTripSlice.actions;

export const AIESECTripReducer = getAvailableAIESECTripSlice.reducer;
