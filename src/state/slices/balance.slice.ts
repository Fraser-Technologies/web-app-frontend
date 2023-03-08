import { createSlice } from "@reduxjs/toolkit";
import { Balance_interface } from "../../interfaces/balance_interface";

type listOfBalanceType = {
	loading: boolean;
	error: string;
	balances: Balance_interface[] | [];
};

type singleBalance = {
	loading: boolean;
	error: string;
	balance: Balance_interface | any;
};

const ListsOfBalance: listOfBalanceType = {
	loading: false,
	error: "",
	balances: [],
};

const oneBalance: singleBalance = {
	loading: false,
	error: "",
	balance: {},
};

const getAllUserBalanceSlice = createSlice({
	name: "getting all user balance",
	initialState: ListsOfBalance,
	reducers: {
		getAllUserBalanceRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		getAllUserBalanceSuccess: (state, { payload }) => {
			state.loading = false;
			state.balances = payload;
		},
		getAllUserBalanceFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const {
	getAllUserBalanceFailed,
	getAllUserBalanceRequest,
	getAllUserBalanceSuccess,
} = getAllUserBalanceSlice.actions;
export const allUserBalances = getAllUserBalanceSlice.reducer;

const getUserBalanceSlice = createSlice({
	name: "get user balance",
	initialState: oneBalance,
	reducers: {
		getBalanceByUserRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		getBalanceByUserSuccess: (state, { payload }) => {
			state.loading = false;
			state.balance = payload;
		},
		getBalanceByUserFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const {
	getBalanceByUserFailed,
	getBalanceByUserRequest,
	getBalanceByUserSuccess,
} = getUserBalanceSlice.actions;
export const balanceByUserReducer = getUserBalanceSlice.reducer;

const addAccountSlice = createSlice({
	name: "get user balance",
	initialState: oneBalance,
	reducers: {
		addAccountRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		addAcccountSuccess: (state, { payload }) => {
			state.loading = false;
			state.balance = payload;
		},
		addAccountFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const { addAcccountSuccess, addAccountFailed, addAccountRequest } =
	addAccountSlice.actions;
export const addAccountReducer = addAccountSlice.reducer;

const withdrawSlice = createSlice({
	name: "withdraw from your balance",
	initialState: oneBalance,
	reducers: {
		withdrawRequest: (state) => {
			state.loading = true;
			state.error = "";
		},
		withdrawSuccess: (state, { payload }) => {
			state.loading = false;
			state.balance = payload;
		},
		withdrawFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const { withdrawFailed, withdrawRequest, withdrawSuccess } =
	withdrawSlice.actions;
export const withdrawReducer = withdrawSlice.reducer;
