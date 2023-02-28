import { APPS } from "./route_constant";

const getSubdomain = (location: string) => {
	const locationParts = location.split(".");
	console.log("the location parts is ", locationParts);
	let sliceTil = -2;

	const isLocalhost =
		locationParts.slice(-1)[0] === process.env.production
			? "ridefraser"
			: "localhost:3000";

	if (isLocalhost) sliceTil = -1;
	return locationParts.slice(0, sliceTil).join(".");
};

export const getApp = () => {
	const subdomain = getSubdomain(window.location.hostname);

	console.log("the subdomain is ", subdomain);

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
