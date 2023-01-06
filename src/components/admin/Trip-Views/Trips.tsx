import React, { useEffect, useState } from "react";
import { getAllCityAction } from "../../../state/action/city.action";
import { getAllTripAction } from "../../../state/action/trip.action";
import { useAppDispatch } from "../../../state/hooks";
import BusStopManagement from "./bus-stop-mgt";
import TripsOverview from "./trips-overiew";

const Trips: React.FC = () => {
	// PAGINATION
	const dispatch = useAppDispatch();

	const [activeTripsView, setIsActive] = useState("overview");
	const handleTripViewToggle = (value: string) => {
		setIsActive(value);
	};

	// PAGINATION

	useEffect(() => {
		dispatch(getAllTripAction());
		dispatch(getAllCityAction());
	}, [dispatch]);
	return (
		<div className="h-full col-start-2 col-end-6 bg-white ">
			<div className="h-full px-6 bg-white">
				{/* GROUP BUTTON - NAVIGATION */}
				<div className="w-full py-4 mt-8 mb-2 border-b">
					<div className="inline-flex rounded-md" role="group">
						<button
							onClick={() => handleTripViewToggle("overview")}
							type="button"
							className={`inline-flex items-center py-2 px-6 text-base font-medium  ${
								activeTripsView === "overview"
									? "bg-primary-100 font-semibold text-black"
									: "text-gray-400 font-normal bg-gray-50"
							}`}>
							Trips Overview
						</button>

						<button
							onClick={() => handleTripViewToggle("management")}
							type="button"
							className={`inline-flex items-center py-2 px-8 text-base font-medium  ${
								activeTripsView === "management"
									? "bg-primary-100 font-semibold text-black"
									: "text-gray-400 font-normal bg-gray-50"
							}`}>
							Bus Stops Management
						</button>
					</div>
				</div>

				{activeTripsView === "overview" ? (
					<TripsOverview />
				) : activeTripsView === "management" ? (
					<BusStopManagement />
				) : null}
			</div>
		</div>
	);
};

export default Trips;
