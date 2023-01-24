import React from "react";
import { Button } from "../Button";

const DriverRevenueOverview = () => {
  return (
    <>
      <div className="mx-[120px] text-sm mt-4">
        <div>
          <div className="bg-black text-white px-24 py-12 rounded-md">
            <div className="mb-8 border-b border-[#353535] pb-8">
              <p className="text-sm mb-3 font-normal text-[#646464]">
                Total Available Balance
              </p>
              <h3 className="text-[24px] font-semibold">NGN 212,345.00</h3>
            </div>
            <div className="flex w-1/3">
              <Button
                title="View History"
                type="submit"
                className="w-full py-3 mr-4 text-xs rounded-md border border-[#ffffff] text-white"
                onClick={() => {}}
              />
              <Button
                title="Request Payout"
                type="submit"
                className="w-full py-3 text-xs rounded-md bg-[#00FF6A] text-black"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverRevenueOverview;
