import { AppThunk } from "./../redux-store";
import { changeAppState } from "../slices/appState.slice";

export const changeAppStateAction =
	(appState: any): AppThunk =>
	(dispatch) => {
		dispatch(changeAppState(appState));
	};
