/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", ...defaultTheme.fontFamily.sans],
			},
			backgroundImage: {
				"signin-hero-bg":
					"url('/public/assets/images/fraser-signin-bg-img.svg')",
				"signup-hero-bg-mobile":
					"url('/public/assets/images/fraser-signin-bg-img-mobile.svg')",
			},
			colors: {
				primary: {
					50: "#E5FCF5",
					100: "#00FF6A",
					200: "#22B11E",
				},
			},
		},
	},
	plugins: [],
};
