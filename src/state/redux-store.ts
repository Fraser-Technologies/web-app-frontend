import { Action, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk, { ThunkAction } from "redux-thunk";
import rootReducer from "./rootReducer";

const middleware = [thunk, logger];

export const store = configureStore({
	reducer: rootReducer,
	middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export default store;
