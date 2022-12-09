import axios from "axios";

const FRASER_BASE_URL = process.env.REACT_APP_ENV;
const instance = axios.create({ baseURL: FRASER_BASE_URL });


export const AuthAPI = {
	get: async (query) => {
		return instance.get(query);
	},
};