import { createSlice } from "@reduxjs/toolkit";
import { Transaction_interface } from "./../../interfaces/transaction_interface";

type allTransactionType = {
	loading: boolean;
	error: string;
	transactions: Transaction_interface[] | [];
};

type singleTransactionType = {
	loading: boolean;
	error: string;
	transaction: Transaction_interface | {};
};

const singleTransaction: singleTransactionType = {
	loading: false,
	error: "",
	transaction: {},
};

const transactionList: allTransactionType = {
	loading: false,
	error: "",
	transactions: [],
};

export const getAllTransactionSlice = createSlice({
	name: "get all transaction",
	initialState: transactionList,
	reducers: {
		getAllTransactionRequest: (state) => {
			state.loading = true;
		},
		getAllTransactionSuccess: (state, { payload }) => {
			state.loading = false;
			state.transactions = payload;
		},
		getAllTransactionFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const {
	getAllTransactionRequest,
	getAllTransactionSuccess,
	getAllTransactionFailed,
} = getAllTransactionSlice.actions;
export const getAllTransactionReducer = getAllTransactionSlice.reducer;

export const getTransactionByIdSlice = createSlice({
	name: "get transaction by id",
	initialState: singleTransaction,
	reducers: {
		getTransactionByIdRequest: (state) => {
			state.loading = true;
		},
		getTransactionByIdSuccess: (state, { payload }) => {
			state.loading = false;
			state.transaction = payload;
		},
		getTransactionByIdFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
});

export const {
	getTransactionByIdRequest,
	getTransactionByIdFailed,
	getTransactionByIdSuccess,
} = getTransactionByIdSlice.actions;
export const getTransactionByIdReducer = getTransactionByIdSlice.reducer;

export const verifyPaymentStatusSlice = createSlice({
	name: "verify payment status",
	initialState: singleTransaction,
	reducers: {
		verifyPaymentStatusRequest: (state) => {
			state.loading = true;
		},

		verifyPaymentStatusSuccess: (state, { payload }) => {
			state.loading = false;
			state.transaction = payload;
		},

		verifyPaymentStatusFailed: (state, { payload }) => {
			state.loading = false;
			state.transaction = payload;
		},
	},
});

export const {
	verifyPaymentStatusFailed,
	verifyPaymentStatusSuccess,
	verifyPaymentStatusRequest,
} = verifyPaymentStatusSlice.actions;
export const verifyPaymentStatusReducer = verifyPaymentStatusSlice.reducer;
