import React, { useEffect, useState } from "react";
import DriverHeader from "../components/driver/DriverHeader";
import DriverOverview from "../components/driver/driver-overview";
import DriverRevenueOverview from "../components/driver/revenue-overview";
import { useAppSelector } from "../state/hooks";
import { RootState } from "../state/redux-store";
import { useNavigate } from "react-router-dom";
import { _paths_ } from "../utils/appHelpers";

const DriverPortal = () => {
	const navigate = useNavigate();
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
	const [selectedView, setSelectedView] = useState("overview");
	const handleViewChange = (value: string) => {
		setSelectedView(value);
	};

	// useEffect(() => {
	// 	if (userInfo?.user_type !== "driver") {
	// 		navigate(_paths_.DRIVER_LOGIN);
	// 	}
	// }, [navigate, userInfo]);
	return (
		<div className="w-full h-full bg-white">
			<DriverHeader onViewChange={handleViewChange} />

			{selectedView === "overview" && <DriverOverview />}
			{selectedView === "revenue" && <DriverRevenueOverview />}
		</div>
	);
};

export default DriverPortal;
