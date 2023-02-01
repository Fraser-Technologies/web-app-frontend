import { createSlice } from "@reduxjs/toolkit";

const uploadFileSlice = createSlice({
	name: "upload file",
	initialState: {
		loading: false,
		error: "",
		image: {},
	},
	reducers: {
		uploadFileRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		uploadFileSuccess: (state, { payload }) => {
			state.image = payload;
			state.error = "";
			state.loading = false;
		},
		uploadFileFailed: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		resetUploadFile: (state) => {
			state.loading = false;
			state.error = "";
			state.image = {};
		},
	},
});

export const {
	uploadFileFailed,
	uploadFileRequest,
	uploadFileSuccess,
	resetUploadFile,
} = uploadFileSlice.actions;
export const uploadFileReducer = uploadFileSlice.reducer;

const deleteFileSlice = createSlice({
	name: "upload file",
	initialState: {
		loading: false,
		error: "",
		image: {},
	},
	reducers: {
		deleteFileRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		deleteFileSuccess: (state, { payload }) => {
			state.image = payload;
			state.error = "";
			state.loading = false;
		},
		deleteFileFailed: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		resetDeleteFile: (state) => {
			state.loading = false;
			state.error = "";
			state.image = {};
		},
	},
});

export const {
	deleteFileFailed,
	deleteFileRequest,
	deleteFileSuccess,
	resetDeleteFile,
} = deleteFileSlice.actions;
export const deleteFileReducer = deleteFileSlice.reducer;
