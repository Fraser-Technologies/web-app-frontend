import { City_interface } from "./../../interfaces/city_interface";
import { createSlice } from "@reduxjs/toolkit";

type createCityType = {
	city: City_interface | {};
	loading: boolean;
	error: string;
};

export const createCityInitialState: createCityType = {
	city: {},
	loading: false,
	error: "",
};

const createCitySlice = createSlice({
	name: "create city",
	initialState: createCityInitialState,
	reducers: {
		createCityRequest: (state) => {
			state.loading = true;
		},
		createCitySuccess: (state, { payload }) => {
			state.city = payload as unknown as City_interface;
			state.loading = false;
		},
		createCityFailed: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		resetCreateCity: () => createCityInitialState,
	},
});

export const {
	createCityFailed,
	createCityRequest,
	createCitySuccess,
	resetCreateCity,
} = createCitySlice.actions;
export const createCityReducer = createCitySlice.reducer;

//  get all city
type allCityType = {
	cities: City_interface[];
	loading: boolean;
	error: string;
};
const initialStateAllCity: allCityType = {
	cities: [],
	loading: false,
	error: "",
};
const getAllCitySlice = createSlice({
	name: "get all city ",
	initialState: initialStateAllCity,
	reducers: {
		getAllCityRequest: (state) => {
			state.loading = true;
		},
		getAllCitySuccess: (state, { payload }) => {
			state.loading = false;
			state.cities = payload as any as City_interface[];
		},
		getAllCityFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
	},
});
export const { getAllCityRequest, getAllCityFailed, getAllCitySuccess } =
	getAllCitySlice.actions;
export const getAllCityReducer = getAllCitySlice.reducer;

// delete City
const deleteCitySlice = createSlice({
	name: "delete city",
	initialState: {
		cities: {},
		loading: false,
		error: "",
	},
	reducers: {
		deleteCityRequest: (state) => {
			state.loading = true;
		},
		deleteCitySuccess: (state, { payload }) => {
			state.cities = payload as unknown as City_interface;
			state.loading = false;
		},
		deleteCityFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
		resetDeleteCity: (state) => {
			state.loading = false;
			state.error = "";
			state.cities = {};
		},
	},
});
export const {
	deleteCityFailed,
	deleteCityRequest,
	deleteCitySuccess,
	resetDeleteCity,
} = deleteCitySlice.actions;
export const deleteCityReducer = deleteCitySlice.reducer;

// update City
const updateCitySlice = createSlice({
	name: "update City",
	initialState: createCityInitialState,
	reducers: {
		updateCityRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		updateCitySuccess: (state, { payload }) => {
			state.loading = false;
			state.city = payload as unknown as City_interface;
			state.error = "";
		},
		updateCityFailed: (state, { payload }) => {
			state.loading = true;
			state.error = payload as unknown as string;
		},

		resetUpdateCity: () => createCityInitialState,
	},
});
export const { updateCityFailed, updateCityRequest, updateCitySuccess } =
	updateCitySlice.actions;
export const updateCityReducer = updateCitySlice.reducer;
