import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import BookRide from "../pages/book-a-ride";
import Bookings from "../pages/bookings";
import Checkout from "../pages/checkout";
import LandingPage from "../pages/landingPage";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import TermsOfService from "../pages/terms-of-service";
import Waitlist from "../pages/Waitlist";
import { _paths_ } from "../utils/appHelpers";

const UserApp: FC = () => {
	return (
		<Routes>
			<Route path={_paths_.LANDING_PAGE} element={<LandingPage />} />
			{/* <Route path={_paths_.LANDING_PAGE} element={<Waitlist />} /> */}
			<Route path={_paths_.AVAILABLE_TRIP} element={<Bookings />} />
			<Route path={_paths_.TERMS_OF_SERVICE} element={<TermsOfService />} />
			<Route path={_paths_.SIGNIN} element={<SignIn />} />
			<Route path={_paths_.SIGNUP} element={<SignUp />} />
			<Route path={_paths_.BOOKRIDE} element={<BookRide />} />
			<Route path={_paths_.CHECKOUT} element={<Checkout />} />
			<Route path={_paths_.NOTFOUND} element={<NotFound />} />
		</Routes>
	);
};

export default UserApp;
