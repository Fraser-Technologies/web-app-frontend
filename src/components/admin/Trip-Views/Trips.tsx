import React, { useState } from "react";
import BusStopManagement from "./bus-stop-mgt";
import TripsOverview from "./trips-overiew";

const Trips: React.FC = () => {
  const [activeTripsView, setIsActive] = useState("overview");
  const handleTripViewToggle = (value: string) => {
    setIsActive(value);
  };

  return (
    <div className="h-full col-start-2 col-end-6 bg-white px-4">
      {/* <div className="h-full px-6 bg-white"> */}
        {/* GROUP BUTTON - NAVIGATION */}
        <div className="w-full fixed bg-white py-4 pt-8 border-b">
          <div className="inline-flex rounded-md" role="group">
            <button
              onClick={() => handleTripViewToggle("overview")}
              type="button"
              className={`inline-flex items-center py-2 px-6 text-sm font-medium  ${
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
              className={`inline-flex items-center py-2 px-8 text-sm font-medium  ${
                activeTripsView === "management"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Bus Stops Management
            </button>
          </div>
        </div>

        <div>
          {activeTripsView === "overview" ? (
            <TripsOverview />
          ) : (
            <BusStopManagement />
          )}
        </div>
      {/* </div> */}
    </div>
  );
};

export default Trips;
