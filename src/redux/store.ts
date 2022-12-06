import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import storage from "./storage";
import { combineReducers } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import SigninSlice from "./slice/SigninSlice";
import SignupSlice from "./slice/SignupSlice";
import UserSlice from "./slice/UserSlice";

const reducers = combineReducers({
	signin: SigninSlice,
	signup: SignupSlice,
	user: UserSlice,
});

const persistConfig = {
	key: "root",
	version: 1,
	storage: storage,
	whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
