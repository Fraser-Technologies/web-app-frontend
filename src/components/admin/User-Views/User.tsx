import React, { useEffect, useState } from "react";
import { getAllCityAction } from "../../../state/action/city.action";
import { getAllTripAction } from "../../../state/action/trip.action";
import { useAppDispatch } from "../../../state/hooks";
import UserOverview from "./user-overview";

const User: React.FC = () => {
  // PAGINATION
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTripAction());
    dispatch(getAllCityAction());
  }, [dispatch]);
  return (
    <div className="h-full col-start-2 col-end-6 bg-white ">
      <div className="h-full px-6 bg-white">
        {/* GROUP BUTTON - NAVIGATION */}
        <div className="w-full py-4 mt-8 mb-2 border-b">
          <div className="inline-flex rounded-md" role="group"></div>
        </div>
        <UserOverview />
      </div>
    </div>
  );
};

export default User;
