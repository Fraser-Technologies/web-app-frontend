//if you'll like to store data in the local storage just call "storage" anywhere in the app
export const storage = {
	local: {
		get: (key: string) => {
			if (localStorage) {
				return localStorage.getItem(key)
					? JSON.parse(localStorage.getItem(key) as any)
					: null;
			}

			return false;
		},
		set: (key: string, data: any) => {
			if (localStorage) {
				return localStorage.setItem(key, JSON.stringify(data));
			}

			return false;
		},
		remove: (key: any) => {
			if (localStorage && localStorage.getItem(key)) {
				localStorage.removeItem(key);
				return true;
			}

			return false;
		},
	},
};

export const _paths_ = {
	LANDING_PAGE: "/landingpage",
	AVAILABLE_TRIP: "/bookings",
	SIGNIN: "signin",
	SIGNUP: "/signup",
	BOOKRIDE: "/",
	// BOOKRIDE: "/book-a-ride",
	CHECKOUT: "/checkout",
	NOTFOUND: "*",
	TERMS_OF_SERVICE: "/termsofservice",

	// DRIVER ROUTES
	DRIVER_PORTAL: "/",
	DRIVER_LOGIN: "/driverlogin",
	DRIVER_SIGNUP: "/driversignup",

	// ADMIN ROUTES
	ADMIN_DASHBOARD: "/",
	ADMIN_LOGIN: "/login",
};
