import React, { useEffect } from "react";
import { message } from "antd";
import LeftSidebar from "./admin-pages/SideBar";
// import RightSidebar from "./admin-pages/Notifications";
import MiddleSection from "./admin-pages/MiddleSection";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getAllTripAction } from "../state/action/trip.action";
import { getAllStateAction } from "../state/action/state.action";
import {
	getAllDriverAction,
	getAllUserAction
} from "../state/action/user.action";
import { getAllBusAction } from "../state/action/bus.action";
import { getAllBookingAction } from "../state/action/booking.action";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/redux-store";
import { _paths_ } from "../utils/routes";
import AdminLayout from "../components/layouts/AdminLayout";

const AdminDashBoard = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);

	useEffect(() => {
		dispatch(getAllTripAction());
		dispatch(getAllStateAction());
		dispatch(getAllUserAction());
		dispatch(getAllDriverAction());
		dispatch(getAllBusAction());
		dispatch(getAllBookingAction());
	}, [dispatch]);

	useEffect(() => {
		if (!userInfo?.is_admin) {
			navigate(_paths_.ADMIN_LOGIN);
			messageApi.info(
				"Sorry! you cannot access this route, because you are not an admin at fraser!"
			);
		}
	}, [messageApi, navigate, userInfo]);
	return (
		<AdminLayout title="Admin Dashboard">
			<div className="grid grid-cols-6 bg-white">
				{contextHolder}
				<LeftSidebar />
				<MiddleSection />
				{/* <RightSidebar /> */}
			</div>
		</AdminLayout>
	);
};

export default AdminDashBoard;
