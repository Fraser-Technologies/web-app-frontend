import { APPS } from "./route_constant";

const getSubdomain = (location: string) => {
	const locationParts = location.split(".");
	let sliceTil = -2;

	const isLocalhost = locationParts.slice(-1)[0] === "ridefraser";
	if (isLocalhost) sliceTil = -1;
	return locationParts.slice(0, sliceTil).join("");
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

	const app = APPS.find((app) => subdomain === app.subdomain);

	if (!app) {
		return main.app;
	}

	return app.app;
};
