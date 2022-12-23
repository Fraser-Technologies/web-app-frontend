export const RequestError = (error: any) => {
	return error?.response ? error?.response?.data : error?.message;
};
