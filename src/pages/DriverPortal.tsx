import React, { useState } from "react";
import { FaEllipsisV, FaStar } from "react-icons/fa";
import { Button } from "../components/Button";
import DriverHeader from "../components/driver/DriverHeader";
import DriverOverview from "../components/driver/driver-overview";
import DriverRevenueOverview from "../components/driver/revenue-overview";

const DriverPortal = () => {
  const [selectedView, setSelectedView] = useState("overview");
  const handleViewChange = (value: string) => {
    setSelectedView(value);
  };

  return (
    <div className="w-full mt-24 bg-white h-full">
      <DriverHeader onViewChange={handleViewChange} />

      {selectedView === "overview" && <DriverOverview />}
      {selectedView === "revenue" && <DriverRevenueOverview />}
    </div>
  );
};

export default DriverPortal;
