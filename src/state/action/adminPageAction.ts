import { AppThunk } from "./../redux-store";
import { changePage, resetpage } from "../slices/adminPageSlice";

export const changePageAction =
	(page: number): AppThunk =>
	(dispatch) => {
		dispatch(changePage(page));
	};

export const resetPageAction = (): AppThunk => (dispatch) => {
	dispatch(resetpage());
};
