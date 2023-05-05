import axios from "axios";

export const api = (appState: string) => {
	return axios.create({
		// baseURL: "http://localhost:1222/api/v1"
		baseURL:
			appState === "production"
				? "https://fraser-api.onrender.com/api/v1"
				: "https://fraser-test-api.onrender.com/api/v1",
		headers: {
			"X-Authorization": appState
		}
	});
};
