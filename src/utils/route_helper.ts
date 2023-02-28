import { APPS } from "./route_constant";

const getSubdomain = (location: string) => {
	const locationParts = location.split(".");

	// const isLocalhost = () => {
	// 	if (process.env.production) {
	// 		return locationParts[1];
	// 	} else {
	// 		return locationParts[1];
	// 	}
	// };

	return locationParts[0];
};

export const getApp = () => {
	const subdomain = getSubdomain(window.location.hostname);

	const main = APPS.find((app) => app?.main);

	if (!main) {
		throw new Error("Must have a main app");
	}

	if (subdomain === "") {
		return main?.app;
	}

	const app = APPS.find((app) => subdomain === app?.subdomain);

	if (!app) {
		return main.app;
	}

	return app.app;
};
