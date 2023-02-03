import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import AdminDashBoard from "../pages/admin";
import AdminLogin from "../pages/admin-login";
import { _paths_ } from "../utils/appHelpers";

const AdminApp: FC = () => {
	return (
		<Routes>
			<Route path={_paths_.ADMIN_DASHBOARD} element={<AdminDashBoard />} />
			<Route path={_paths_.NOTFOUND} element={<NotFound />} />
			<Route path={_paths_.ADMIN_LOGIN} element={<AdminLogin />} />
		</Routes>
	);
};

export default AdminApp;
