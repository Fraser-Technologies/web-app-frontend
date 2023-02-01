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
	async (dispatch) => {
		try {
			dispatch(uploadFileRequest());
			const { data } = await api.post(
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
	async (dispatch) => {
		try {
			dispatch(deleteFileRequest());
			console.log("the file is ", file);
			const { data } = await api.delete(`/image/${file}`);
			dispatch(deleteFileSuccess(data));
		} catch (error: any) {
			dispatch(deleteFileFailed(RequestError(error)));
		}
	};
