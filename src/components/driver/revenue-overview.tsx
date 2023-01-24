import React, { useState } from "react";
import { BsArrowDownLeftCircleFill, BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/fa";
import { Button } from "../Button";

const DriverRevenueOverview = () => {
  const [selectedData, setIsSelected] = useState("day");
  const handleFilterToggle = (value: string) => {
    setIsSelected(value);
  };

  return (
    <>
      <div className="mx-[120px] text-sm mt-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-start-1 text-black col-end-8">
            <div className="bg-black text-white px-12 py-16 rounded-md">
              <div className="mb-6 pb-3 text-sm font-normal text-[#646464]">
                Total Available Balance
                <h3 className="text-[24px] mt-3 text-white font-semibold">
                  NGN 212,345.00
                </h3>
              </div>
              <Button
                title="Request Payout"
                type="submit"
                className="px-4 py-3 mb-12 text-xs rounded-md bg-[#00FF6A] text-black"
                onClick={() => {}}
              />

              {/* //FILTERS */}
              <div className="border-b border-[#353535] pb-4 w-1/2 text-white text-sm mb-8 flex">
                <div
                  className={` px-2 py-1 cursor-pointer ${
                    selectedData === "day"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("day")}
                >
                  Day
                </div>
                <div
                  className={` px-2 py-1 cursor-pointer ${
                    selectedData === "week"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("week")}
                >
                  Week
                </div>
                <div
                  className={` px-2 py-1 cursor-pointer ${
                    selectedData === "month"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("month")}
                >
                  Month
                </div>
                <div
                  className={` px-2 py-1 cursor-pointer ${
                    selectedData === "6 months"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("6 months")}
                >
                  6 Months
                </div>
                <div
                  className={` px-2 py-1 cursor-pointer ${
                    selectedData === "year"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("year")}
                >
                  Year
                </div>
              </div>

              <div className="flex justify-between">
                <div className="">
                  <p className="text-sm mb-3 font-normal text-[#646464]">
                    Total Earnings
                  </p>
                  <h3 className="text-[18px] font-medium">NGN 212,345.00</h3>
                </div>
                <div className="ml-auto mr-auto">
                  <p className="text-sm mb-3 font-normal text-[#646464]">
                    Total Withdrawals
                  </p>
                  <h3 className="text-[18px] font-medium">NGN 212,345.00</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-start-8 col-end-13 px-6 rounded-md text-black">
            <p className="mt-4 text-base font-medium border-b mb-4 pb-4">
              Trip History
            </p>
            <div className="">
              <div className="flex items-center border-b pb-4 mb-4">
                <div className="flex mr-auto items-center">
                  <div className="bg-[#E5FCF5] px-4 py-4 flex">
                    <BsArrowDownLeftCircleFill className="m-auto text-[#22B11E]" size="24px" />
                  </div>
                  <div className="ml-4 text-[16px] font-medium">
                    Trip Fulfilment
                    <p className="text-[#929292] text-[12px] mt-2 font-light">
                      3rd September 2022
                    </p>
                  </div>
                </div>
                <div className="text-base font-semibold">NGN 35,989.89</div>
              </div>

              <div className="flex items-center border-b pb-4 mb-4">
                <div className="flex mr-auto items-center">
                  <div className="bg-[#FFEFF1] px-4 py-4 flex">
                    <BsArrowUpRightCircleFill className="m-auto text-[#E71D36]" size="24px" />
                  </div>
                  <div className="ml-4 text-[16px] font-medium">
                    Withdrawal
                    <p className="text-[#929292] text-[12px] mt-2 font-light">
                      3rd September 2022
                    </p>
                  </div>
                </div>
                <div className="text-base font-semibold">NGN 35,989.89</div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverRevenueOverview;
