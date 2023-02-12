import React, { useState } from "react";
import AdminDriverOverview from "./admin-driver-overview";
import NewSignUps from "./new-signup";

const Driver: React.FC = () => {
  const [activeView, setIsActive] = useState("overview");
  const handleViewToggle = (value: string) => {
    setIsActive(value);
  };
  return (
    <div className="h-full col-start-2 mt-24 col-end-8 bg-white ">
      <div className="w-full fixed bg-white py-6 pt-12 border-b px-4 ">
        <div className="inline-flex rounded-md" role="group">
          <button
            onClick={() => handleViewToggle("overview")}
            type="button"
            className={`inline-flex items-center py-2 px-6 font-medium  ${
              activeView === "overview"
                ? "bg-primary-100 font-semibold text-black"
                : "text-gray-400 font-normal bg-gray-50"
            }`}
          >
            Drivers Overview
          </button>

          <button
            onClick={() => handleViewToggle("management")}
            type="button"
            className={`inline-flex items-center py-2 px-8 font-medium  ${
              activeView === "management"
                ? "bg-primary-100 font-semibold text-black"
                : "text-gray-400 font-normal bg-gray-50"
            }`}
          >
            New Signups
          </button>
        </div>
      </div>
      <div className="h-full bg-white">
        <div>
          {activeView === "overview" ? <AdminDriverOverview /> : <NewSignUps />}
        </div>
      </div>
    </div>
  );
};

export default Driver;
