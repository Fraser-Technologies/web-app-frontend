import { createSlice } from "@reduxjs/toolkit";

export const adminPageSlice = createSlice({
	name: "admin page",
	initialState: {
		page: 0,
	},
	reducers: {
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		resetpage: (state) => {
			state.page = 0;
		},
	},
});

export const { changePage, resetpage } = adminPageSlice.actions;
export const adminPageReducer = adminPageSlice.reducer;
