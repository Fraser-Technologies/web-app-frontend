import axios from "axios";

export const api = axios.create({
	// baseURL: "http://localhost:1222/api/v1",
	baseURL: "https://fraser-api.onrender.com/api/v1",
});
