import { Entity_interface } from "../../interfaces/entity.interface";
import { createSlice } from "@reduxjs/toolkit";

type createEntityType = {
	loading: boolean;
	error: string;
	entity: Entity_interface | {};
};

const initialState: createEntityType = {
	loading: false,
	error: "",
	entity: {}
};

const createEntitySlice = createSlice({
	name: "create entity",
	initialState,
	reducers: {
		createEntityRequest: (state) => {
			state.loading = true;
		},
		createEntitySuccess: (state, action) => {
			state.loading = false;
			state.entity = action.payload;
			state.error = "";
		},
		createEntityFailure: (state, action) => {
			state.loading = false;
			state.entity = {};
			state.error = action.payload;
		},
		resetEntity: () => initialState
	}
});

export const {
	createEntityFailure,
	createEntityRequest,
	createEntitySuccess,
	resetEntity
} = createEntitySlice.actions;
export const createEntityReducer = createEntitySlice.reducer;

const entities = {
	loading: false,
	error: "",
	entities: []
};

const getAllEntitySlice = createSlice({
	name: "get all entity",
	initialState: entities,
	reducers: {
		getAllEntityRequest: (state) => {
			state.loading = true;
			state.error = "";
			state.entities = [];
		},
		getAllEntitySuccess: (state, action) => {
			state.loading = false;
			state.entities = action.payload;
			state.error = "";
		},
		getAllEntityFailure: (state, action) => {
			state.loading = false;
			state.entities = [];
			state.error = action.payload;
		}
	}
});

export const { getAllEntityFailure, getAllEntityRequest, getAllEntitySuccess } =
	getAllEntitySlice.actions;
export const getAllEntityReducer = getAllEntitySlice.reducer;

export const getEntityByIdSlice = createSlice({
	name: "get entity by id",
	initialState: {
		loading: false,
		error: "",
		entity: {}
	},
	reducers: {
		getEntityByIdRequest: (state) => {
			state.loading = true;
			state.error = "";
			state.entity = {};
		},
		getEntityByIdSuccess: (state, action) => {
			state.loading = false;
			state.entity = action.payload;
			state.error = "";
		},
		getEntityByIdFailure: (state, action) => {
			state.loading = false;
			state.entity = {};
			state.error = action.payload;
		}
	}
});

export const {
	getEntityByIdFailure,
	getEntityByIdRequest,
	getEntityByIdSuccess
} = getEntityByIdSlice.actions;
export const getEntityByIdReducer = getEntityByIdSlice.reducer;

export const deleteEntitySlice = createSlice({
	name: "delete entity by id",
	initialState: {
		loading: false,
		error: "",
		entity: {}
	},
	reducers: {
		deleteEntityRequest: (state) => {
			state.loading = true;
			state.error = "";
			state.entity = {};
		},
		deleteEntitySuccess: (state, action) => {
			state.loading = false;
			state.entity = action.payload;
			state.error = "";
		},
		deleteEntityFailure: (state, action) => {
			state.loading = false;
			state.entity = {};
			state.error = action.payload;
		}
	}
});

export const { deleteEntityFailure, deleteEntityRequest, deleteEntitySuccess } =
	deleteEntitySlice.actions;
export const deleteEntityByReducer = deleteEntitySlice.reducer;

export const editEntitySlice = createSlice({
	name: "edit entity by id",
	initialState: {
		loading: false,
		error: "",
		entity: {}
	},
	reducers: {
		editEntityRequest: (state) => {
			state.loading = true;
			state.error = "";
			state.entity = {};
		},
		editEntitySuccess: (state, action) => {
			state.loading = false;
			state.entity = action.payload;
			state.error = "";
		},
		editEntityFailure: (state, action) => {
			state.loading = false;
			state.entity = {};
			state.error = action.payload;
		}
	}
});

export const { editEntityFailure, editEntityRequest, editEntitySuccess } =
	editEntitySlice.actions;
export const editEntityByReducer = editEntitySlice.reducer;
