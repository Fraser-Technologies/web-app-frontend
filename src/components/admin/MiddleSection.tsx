import React from "react";
import { useAppSelector } from "../../state/hooks";
import BusStopManagement from "./Trip-Views/bus-stop-mgt";
import TripsOverview from "./Trip-Views/trips-overiew";
import Trips from "./Trip-Views/Trips";

const MiddleSection = () => {
	const { page } = useAppSelector((state: any) => state.adminPage);
	return (
		<>
			{page === 0 && <Trips />}
			{page === 1 && <TripsOverview />}
			{page === 2 && <BusStopManagement />}
		</>
	);
};

export default MiddleSection;
