import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	clearAddBusStopFromCityAction,
	clearRemoveBusStopFromCityAction,
} from "../../../state/action/bus.action";
import { getAllCityAction } from "../../../state/action/city.action";
import { getAllTripAction } from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import BusStopManagement from "./bus-stop-mgt";
import TripsOverview from "./trips-overiew";

const Trips: React.FC = () => {
	// PAGINATION
	const dispatch = useAppDispatch();
	const { trips, loading, error } = useAppSelector(
		(state: any) => state.allTrip
	);
	const { city: removebusStopCity } = useSelector(
		(state: any) => state.removeBusStop
	);
	const { city: addBusStopCity } = useAppSelector(
		(state: any) => state.addBusStop
	);
	const { city: createCityCity } = useAppSelector(
		(state: any) => state.createCity
	);
	const { city: updateCityCity } = useAppSelector(
		(state: any) => state.updateCity
	);

	const [activeTripsView, setIsActive] = useState("overview");
	const handleTripViewToggle = (value: string) => {
		setIsActive(value);
	};

	console.log("the add bus stop city is ", addBusStopCity);

	useEffect(() => {
		dispatch(getAllTripAction());
		dispatch(getAllCityAction());
	}, [dispatch]);

	useEffect(() => {
		if (
			addBusStopCity?._id ||
			removebusStopCity?._id ||
			createCityCity?._id ||
			updateCityCity?._id
		) {
			dispatch(getAllCityAction());
			dispatch(clearAddBusStopFromCityAction());
			dispatch(clearRemoveBusStopFromCityAction());
		}
	}, [
		dispatch,
		addBusStopCity,
		removebusStopCity,
		createCityCity,
		updateCityCity,
	]);
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
