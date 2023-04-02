import { api } from "../../utils/api";
import { RequestError } from "../../utils/requestError";
import {
	deleteFileFailed,
	deleteFileRequest,
	deleteFileSuccess,
	resetUploadFile,
	uploadFileFailed,
	uploadFileRequest,
	uploadFileSuccess,
} from "../slices/image.slice";
import { AppThunk } from "./../redux-store";

export const uploadFileAction =
	(file: any): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(uploadFileRequest());
			const {
				appState: { app_type },
			} = getState();
			const { data } = await api(app_type).post(
				"/image",
				{ ...file },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			dispatch(uploadFileSuccess(data));
		} catch (error) {
			dispatch(uploadFileFailed(RequestError(error)));
		}
	};

export const resetUploadFileAction = (): AppThunk => (dispatch) => {
	dispatch(resetUploadFile());
};

export const deleteFileAction =
	(file: string): AppThunk =>
	async (dispatch, getState) => {
		try {
			dispatch(deleteFileRequest());
			const {
				appState: { app_type },
			} = getState();

			const { data } = await api(app_type).delete(`/image/${file}`);
			dispatch(deleteFileSuccess(data));
		} catch (error: any) {
			dispatch(deleteFileFailed(RequestError(error)));
		}
	};
