import React, { useState } from "react";
import DriverPaymentRequests from "./payment-requests";
import AdminDriverOverview from "./admin-driver-overview";
import NewSignUps from "./new-signup";

const Driver: React.FC = () => {
  const [activeView, setIsActive] = useState("overview");
  const handleViewToggle = (value: string) => {
    setIsActive(value);
  };
  return (
    <div className="h-full col-start-2 mt-40 col-end-8 bg-white ">
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
            onClick={() => handleViewToggle("newsignups")}
            type="button"
            className={`inline-flex items-center py-2 px-8 font-medium  ${
              activeView === "newsignups"
                ? "bg-primary-100 font-semibold text-black"
                : "text-gray-400 font-normal bg-gray-50"
            }`}
          >
            New Signups
          </button>
          <button
            onClick={() => handleViewToggle("payments")}
            type="button"
            className={`inline-flex items-center py-2 px-8 font-medium  ${
              activeView === "payments"
                ? "bg-primary-100 font-semibold text-black"
                : "text-gray-400 font-normal bg-gray-50"
            }`}
          >
            Payment Requests
          </button>
        </div>
      </div>
      <div className="h-full bg-white">
        <div>
          {activeView === "overview" && <AdminDriverOverview />}
          {activeView === "newsignups" && <NewSignUps />}
          {activeView === "payments" && <DriverPaymentRequests />}
        </div>
      </div>
    </div>
  );
};

export default Driver;
