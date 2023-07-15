// import { APPS } from "./route_constant";

export const getSubdomain = (location: string): string[] => {
	const locationParts = location.split(".");
	return locationParts;
};

// const getTestDomain = (location: string): string[] => {
// 	const allParts = location.split(".");
// 	return allParts;
// };

// export const getApp = () => {
// 	const subdomains = getSubdomain(window.location.hostname);
// 	const checkSubDommain = subdomains[0];
// 	console.log(subdomains)
// 	const main = APPS.find((app) => app?.main);

// 	if (!main) {
// 		throw new Error("Must have a main app");
// 	}

// 	if (checkSubDommain === "") {
// 		return main?.app;
// 	}

// 	const app =
// 		APPS.find((app) => {
// 			if (subdomains.includes("test") && subdomains.includes(app?.subdomain))
// 				return APPS.find((app) => subdomains.includes(app?.subdomain));
// 		}) || APPS.find((app) => checkSubDommain === app?.subdomain);

// 	if (!app) {
// 		return main.app;
// 	}

// 	return app.app;
// };

export const checkForTest = () => {
	const subdomains = getSubdomain(window.location.hostname);
	const checkSubDommain = subdomains[0];
	if (checkSubDommain === "test") return "test";
};
