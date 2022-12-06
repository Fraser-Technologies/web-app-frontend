import React from "react";

import axios from "axios";
import { storage } from "../utils/appHelpers";

const FRASER_BASE_URL = process.env.REACT_APP_ENV;
const instance = axios.create({ baseURL: FRASER_BASE_URL });

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

function reducer(currentState, newState) {
	return { ...currentState, ...newState };
}

function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (!context) throw new Error("useAuthState must be used in AuthProvider");

	return context;
}

function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (!context) throw new Error("useAuthDispatch must be used in AuthProvider");

	return context;
}

const initialState = {
	status: "idle",
	user: null,
	token: null,
	error: null,
	allAccesses: null,
};

const storageKey = "@fraser-session";

function AuthProvider(props) {
	const defaultData = storage.local.get(storageKey);

	if (!defaultData) {
		storage.local.set(storageKey, initialState);
	}

	const [state, dispatch] = React.useReducer(
		reducer,
		defaultData ? defaultData : initialState
	);

	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>
				{props.children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
}

async function contextSignUp(
	dispatch,
	user,
	setSubmitting,
	navigate,
	location
) {
	try {
		setSubmitting(true);
		dispatch({ status: "pending" });
		const result = await instance.post(`/api/v1/user/signup`, user);
		const status = result?.data?.status;
		const message = result?.data?.message;
		const response = result.data;
		console.log("response", response);

		if (status === 200) {
			const token = response.data.auth;
			const user = response.data;
			delete user.auth;
			const allAccesses = [];

			storage.local.set(storageKey, {
				status: "resolved",
				user,
				token,
				error: null,
			});

			dispatch({
				status: "resolved",
				user,
				token,
				error: null,
				allAccesses,
			});

			navigate(location);
			window.location.reload();
		}
		// else {
		// 	dispatch({ status: "rejected", error: message });
		// }

		setSubmitting(false);
	} catch (error) {
		setSubmitting(false);
		dispatch({ status: "rejected", error: error.response.data.message });
		storage.local.set(storageKey, {
			status: "rejected",
			user: null,
			token: null,
			error: error.response.data.message,
		});
	}
}

function contextSignOut(dispatch, navigate, location) {
	dispatch(initialState);
	storage.local.remove(storageKey);
	navigate(location);
	window.location.replace(location);
	// history.push(PATH_.SIGN_IN);
}

export {
	AuthProvider,
	useAuthState,
	useAuthDispatch,
	contextSignUp,
	contextSignOut,
};
