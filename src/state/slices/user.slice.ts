import { User_interface } from "./../../interfaces/user.interface";
import { createSlice } from "@reduxjs/toolkit";

// const user = Cookie.get("userInfo")
// 	? JSON?.parse(Cookie.get("userInfo") as string)
// 	: {};

const user = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo") as string)
	: {};

const initialState = {
	userInfo: user,
	error: "",
	loading: false,
};

// USER LOGIN SLICE
const userLoginSlice = createSlice({
	name: "userLogin",
	initialState,
	reducers: {
		loginRequest: (state) => {
			state.loading = true;
		},
		loginSuccess: (state, { payload }) => {
			state.userInfo = payload as unknown as any;
			state.loading = false;
		},

		logOut: (state) => {
			state.userInfo = {};
			state.loading = false;
		},

		loginFailed: (state, { payload }) => {
			state.error = payload as unknown as string;
			state.loading = false;
		},
	},
});

export const { loginRequest, loginSuccess, logOut, loginFailed } =
	userLoginSlice.actions;
export const userLoginReducer = userLoginSlice.reducer;

// USER REGITER SLICE
const userRegisterSlice = createSlice({
	name: "userRegister",
	initialState,
	reducers: {
		registerRequest: (state) => {
			state.loading = true;
		},
		registerSuccess: (state, { payload }) => {
			state.userInfo = payload as any;
			state.loading = false;
		},

		registerFailed: (state, { payload }) => {
			state.error = payload as any;
			state.loading = false;
		},
	},
});

export const { registerRequest, registerSuccess, registerFailed } =
	userRegisterSlice.actions;
export const userRegisterReducer = userRegisterSlice.reducer;

// UPDATE USER SLICE
const updateUserSlice = createSlice({
	name: "update user",
	initialState,
	reducers: {
		updateUserRequest: (state) => {
			state.loading = true;
		},

		updateUserSuccess: (state, { payload }) => {
			state.userInfo = payload as unknown as any;
			state.loading = false;
		},
		updateUserFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
		resetUpdateUser: () => initialState,
	},
});

export const { updateUserRequest, updateUserSuccess, updateUserFailed } =
	updateUserSlice.actions;
export const updateUserReducer = updateUserSlice.reducer;

// GET ALL USER
type allUserType = {
	loading: boolean;
	error: string;
	users: User_interface[];
};
const initialAllUser: allUserType = {
	loading: false,
	error: "",
	users: [],
};
const allUserSlice = createSlice({
	name: "get all user",
	initialState: initialAllUser,
	reducers: {
		getAllUserRequest: (state) => {
			state.loading = true;
		},
		getAllUserSuccess: (state, { payload }) => {
			state.loading = false;
			state.users = payload as unknown as User_interface[];
			state.error = "";
		},
		getAllUserFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
	},
});

export const { getAllUserFailed, getAllUserSuccess, getAllUserRequest } =
	allUserSlice.actions;
export const allUserReducer = allUserSlice.reducer;

// BLOCK USER SLICE
type userType = {
	loading: boolean;
	error: string;
	user: User_interface | {};
};
const userState: userType = {
	loading: false,
	error: "",
	user: {},
};
const blockUserSlice = createSlice({
	name: "block user",
	initialState: userState,
	reducers: {
		blockUserRequest: (state) => {
			state.loading = true;
		},
		blockUserSuccess: (state, { payload }) => {
			state.user = payload as unknown as User_interface;
			state.loading = false;
		},

		blockUserFailed: (state, { payload }) => {
			state.loading = false;
			state.error = payload as unknown as string;
		},
		clearBlockUser: (state) => {
			state.loading = false;
			state.error = "";
			state.user = {};
		},
	},
});

export const {
	blockUserFailed,
	blockUserSuccess,
	blockUserRequest,
	clearBlockUser,
} = blockUserSlice.actions;
export const blockUserReducer = blockUserSlice.reducer;

// UNBLOCK USER SLICE
const unBlockUserSlice = createSlice({
	name: "block user",
	initialState: userState,
	reducers: {
		unBlockUserRequest: (state) => {
			state.loading = true;
		},
		unBlockUserSuccess: (state, { payload }) => {
			state.user = payload as unknown as User_interface;
			state.loading = false;
		},

		unBlockUserFailed: (state) => {
			state.user = {};
			state.loading = false;
		},
		clearUnBlockUser: (state) => {
			state.user = {};
			state.loading = false;
			state.error = "";
		},
	},
});

export const {
	unBlockUserFailed,
	unBlockUserSuccess,
	unBlockUserRequest,
	clearUnBlockUser,
} = unBlockUserSlice.actions;
export const unblockUserReducer = unBlockUserSlice.reducer;
