import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { _paths_ } from "./utils/appHelpers";
import LandingPage from "./pages/landingPage";
import BookRide from "./pages/book-a-ride";
import { useSelector } from "react-redux";
import DriverLogin from "./pages/driver-login";
import Bookings from "./pages/bookings";
import TermsOfService from "./pages/terms-of-service";
import NotFound from "./pages/404";
import Checkout from "./pages/checkout";
import AdminDashBoard from "./pages/admin";
import SignUp from "./pages/signup";
import DriverPortal from "./pages/DriverPortal";
import SignIn from "./pages/signin";

const App = () => {
	const { userInfo } = useSelector((state: any) => state.userLogin);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userInfo?.is_admin) {
			navigate(_paths_.BOOKRIDE);
		}
	}, [navigate, userInfo]);
	return (
		<>
			<Routes>
				<Route path={_paths_.LANDING_PAGE} element={<LandingPage />} />
				<Route path={_paths_.AVAILABLE_TRIP} element={<Bookings />} />
				<Route path={_paths_.TERMS_OF_SERVICE} element={<TermsOfService />} />
				<Route path={_paths_.SIGNIN} element={<SignIn />} />
				<Route path={_paths_.SIGNUP} element={<SignUp />} />
				<Route path={_paths_.BOOKRIDE} element={<BookRide />} />
				<Route path={_paths_.CHECKOUT} element={<Checkout />} />
				<Route path={_paths_.ADMIN_DASHBOARD} element={<AdminDashBoard />} />
				<Route path={_paths_.DRIVER_PORTAL} element={<DriverPortal />} />
				<Route path={_paths_.NOTFOUND} element={<NotFound />} />
				<Route path={_paths_.DRIVER_LOGIN} element={<DriverLogin />} />
			</Routes>
		</>
	);
};

export default App;
