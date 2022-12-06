export const storage = {
	local: {
		get: (key) => {
			if (localStorage) {
				return localStorage.getItem(key)
					? JSON.parse(localStorage.getItem(key))
					: null;
			}

			return false;
		},
		set: (key, data) => {
			if (localStorage) {
				return localStorage.setItem(key, JSON.stringify(data));
			}

			return false;
		},
		remove: (key) => {
			if (localStorage && localStorage.getItem(key)) {
				localStorage.removeItem(key);
				return true;
			}

			return false;
		},
	},
};

export const _paths_ = {
	SIGNIN: "/",
	SIGNUP: "/signup",
	BOOKRIDE: "/book-a-ride",
	CHECKOUT: "/checkout",
};