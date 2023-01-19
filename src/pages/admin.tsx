import React, { useEffect } from "react";
import LeftSidebar from "../components/admin/SideBar";
import RightSidebar from "../components/admin/Notifications";
import Layout from "../components/layouts/SignInLayout";
import MiddleSection from "../components/admin/MiddleSection";
import { useAppDispatch } from "../state/hooks";
import { getAllTripAction } from "../state/action/trip.action";
import { getAllCityAction } from "../state/action/city.action";
import { getAllUserAction } from "../state/action/user.action";
import { getAllDriverAction } from "../state/action/driver.action";
import { getAllBusAction } from "../state/action/bus.action";
import { getAllBookingAction } from "../state/action/booking.action";

const AdminDashBoard = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllTripAction());
		dispatch(getAllCityAction());
		dispatch(getAllUserAction());
		dispatch(getAllDriverAction());
		dispatch(getAllBusAction());
		dispatch(getAllBookingAction());
	}, [dispatch]);
	return (
		<Layout title="Checkout - Fraser">
			<div className="grid grid-cols-6 bg-white">
				<LeftSidebar />
				<MiddleSection />
				<RightSidebar />
			</div>
		</Layout>
	);
};

export default AdminDashBoard;
