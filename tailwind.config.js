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

				"landing-page":
					"url('https://res.cloudinary.com/du2jabqay/image/upload/v1666715036/app%20images/website%20images/shutterstock_1791760502_1fraser-landing_page_oolsgb.png')",
				heroImage: "url('/public/assets/images/bg.png')",
				withFriends:
					"url('/public/assets/withfriends.051522d885873700dacd.png')",
			},
			colors: {
				primary: {
					50: "#E5FCF5",
					100: "#00FF6A",
					200: "#22B11E",
				},
			},
		},

		fontSize: {
			sm: ["12px", "15px"],
			base: ["16px", "24px"],
			lg: ["20px", "28px"],
			xl: ["24px", "32px"],
		},

		screens: {
			sm: "425px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
};
