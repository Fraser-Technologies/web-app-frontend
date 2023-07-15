import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import AdminDashBoard from "../pages/AdminPortal";
import AdminLogin from "../pages/admin-pages/admin-login";
import { _paths_ } from "../utils/routes";
import { useAppDispatch } from "../state/hooks";
import { checkForTest } from "../utils/route_helper";
import { changeAppStateAction } from "../state/action/app.action";

const AdminApp: FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (checkForTest() === "test") {
			dispatch(changeAppStateAction("development"));
		} else {
			dispatch(changeAppStateAction("production"));
		}
	}, [dispatch]);

	return (
		<Routes>
			<Route path={_paths_.ADMIN_DASHBOARD} element={<AdminDashBoard />} />
			<Route path={_paths_.NOTFOUND} element={<NotFound />} />
			<Route path={_paths_.ADMIN_LOGIN} element={<AdminLogin />} />
		</Routes>
	);
};

export default AdminApp;
