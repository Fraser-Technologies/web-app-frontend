import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import TripsOverview from "./Trip-Views/trips-overiew";
import BusStopManagement from "./Trip-Views/bus-stop-mgt";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  getAllAvailableTripAction,
  getAllTripAction,
} from "../../state/action/trip.action";

const MiddleSection: React.FC = () => {
  // PAGINATION
  const dispatch = useAppDispatch();
  
  const [activeTripsView, setIsActive] = useState("overview");
  const handleTripViewToggle = (value: string) => {
    setIsActive(value);
  };

  useEffect(() => {
    dispatch(getAllTripAction());
  }, [dispatch]);
  return (
    <div className="bg-white h-full col-start-2 col-end-6 ">
      <div className="bg-white h-full px-6">
        {/* GROUP BUTTON - NAVIGATION */}
        <div className="border-b w-full mt-8 py-4 mb-2">
          <div className="inline-flex rounded-md" role="group">
            <button
              onClick={() => handleTripViewToggle("overview")}
              type="button"
              className={`inline-flex items-center py-2 px-6 text-base font-medium  ${
                activeTripsView === "overview"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Trips Overview
            </button>

            <button
              onClick={() => handleTripViewToggle("management")}
              type="button"
              className={`inline-flex items-center py-2 px-8 text-base font-medium  ${
                activeTripsView === "management"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
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

export default MiddleSection;
