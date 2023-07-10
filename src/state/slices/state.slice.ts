import { State_interface } from "../../interfaces/state_interface";
import { createSlice } from "@reduxjs/toolkit";

type createStateType = {
	state: State_interface | { _id: string };
	loading: boolean;
	error: string;
};

export const createStateInitialState: createStateType = {
	state: { _id: "" },
	loading: false,
	error: ""
};

const createStateSlice = createSlice({
	name: "create state",
	initialState: createStateInitialState,
	reducers: {
		createStateRequest: (state) => {
			state.loading = true;
		},
		createStateSuccess: (state, { payload }) => {
			state.state = payload as unknown as State_interface;
			state.loading = false;
		},
		createStateFailed: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		resetCreateState: () => createStateInitialState
	}
});

export const {
	createStateFailed,
	createStateRequest,
	createStateSuccess,
	resetCreateState
} = createStateSlice.actions;
export const createStateReducer = createStateSlice.reducer;

//  get all State
type allStateType = {
	states: State_interface[];
	loading: boolean;
	error: string;
};
const initialStateAllState: allStateType = {
	states: [],
	loading: false,
	error: ""
};
const getAllStateSlice = createSlice({
	name: "get all state ",
	initialState: initialStateAllState,
	reducers: {
		getAllStateRequest: (state) => {
			state.loading = true;
		},
		getAllStateSuccess: (state, { payload }) => {
			state.loading = false;
			state.states = payload as any as State_interface[];
		},
		getAllStateFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		}
	}
});
export const { getAllStateRequest, getAllStateFailed, getAllStateSuccess } =
	getAllStateSlice.actions;
export const getAllStateReducer = getAllStateSlice.reducer;

// delete State
const deleteStateSlice = createSlice({
	name: "delete State",
	initialState: createStateInitialState,
	reducers: {
		deleteStateRequest: (state) => {
			state.loading = true;
		},
		deleteStateSuccess: (state, { payload }) => {
			state.state = payload as unknown as State_interface;
			state.loading = false;
		},
		deleteStateFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
		resetDeleteState: (state) => createStateInitialState
	}
});

export const {
	deleteStateFailed,
	deleteStateRequest,
	deleteStateSuccess,
	resetDeleteState
} = deleteStateSlice.actions;
export const deleteStateReducer = deleteStateSlice.reducer;

// update State
const updateStateSlice = createSlice({
	name: "update state",
	initialState: createStateInitialState,
	reducers: {
		updateStateRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		updateStateSuccess: (state, { payload }) => {
			state.loading = false;
			state.state = payload as unknown as State_interface;
			state.error = "";
		},
		updateStateFailed: (state, { payload }) => {
			state.loading = true;
			state.error = payload as unknown as string;
		},

		resetUpdateState: () => createStateInitialState
	}
});
export const { updateStateFailed, updateStateRequest, updateStateSuccess } =
	updateStateSlice.actions;
export const updateStateReducer = updateStateSlice.reducer;
