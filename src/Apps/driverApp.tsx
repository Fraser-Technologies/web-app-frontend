import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import DriverLogin from "../pages/driver-pages/driver-login";
import DriverSignUp from "../pages/driver-pages/driver-signup";
import DriverPortal from "../pages/DriverPortal";
import { _paths_ } from "../utils/appHelpers";

const DriverApp: FC = () => {
	return (
		<Routes>
			<Route path={_paths_.DRIVER_PORTAL} element={<DriverPortal />} />
			<Route path={_paths_.DRIVER_LOGIN} element={<DriverLogin />} />
			<Route path={_paths_.DRIVER_SIGNUP} element={<DriverSignUp />} />
			<Route path={_paths_.NOTFOUND} element={<NotFound />} />
		</Routes>
	);
};

export default DriverApp;
