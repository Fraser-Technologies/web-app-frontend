import React, { useEffect, useState } from "react";
import DriverHeader from "../components/driver-components/DriverHeader";
import DriverOverview from "./driver-pages/driver-overview";
import DriverRevenueOverview from "./driver-pages/revenue-overview";
import { useAppSelector } from "../state/hooks";
import { RootState } from "../state/redux-store";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { userLoginAction } from "../state/slices/user.action";
import { _paths_ } from "../utils/routes";

const DriverPortal = () => {
	const navigate = useNavigate();
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
	const [selectedView, setSelectedView] = useState("overview");
	const handleViewChange = (value: string) => {
		setSelectedView(value);
	};

	useEffect(() => {
		if (userInfo?.user_type !== "driver") {
			navigate(_paths_.DRIVER_LOGIN);
		}
	}, [navigate, userInfo]);

	useEffect(() => {
		if (!userInfo?.driver_verification_status) {
			userLoginAction(userInfo?.phone);
		}
	}, [userInfo]);

	return (
		<div className="w-full h-full">
			<DriverHeader onViewChange={handleViewChange} />

			{!userInfo?.driver_verification_status && (
				<Alert
					type="info"
					message="Your account is been review and will be verified shortly"
				/>
			)}
			{selectedView === "overview" && <DriverOverview />}
			{selectedView === "revenue" && <DriverRevenueOverview />}
		</div>
	);
};

export default DriverPortal;
