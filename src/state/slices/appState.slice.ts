import { createSlice } from "@reduxjs/toolkit";

type AppStateType = {
	app_type: string;
};

const initialState: AppStateType = {
	app_type: "production",
};

const AppStateSlice = createSlice({
	name: "app state",
	initialState,
	reducers: {
		changeAppState: (state, { payload }) => {
			state.app_type = payload as string;
		},
	},
});

export const { changeAppState } = AppStateSlice.actions;
export const appStateReducer = AppStateSlice.reducer;
