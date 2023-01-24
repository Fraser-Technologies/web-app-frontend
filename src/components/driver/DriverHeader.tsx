import React, { useState } from "react";
import { FaCaretDown, FaSuitcase, FaThLarge } from "react-icons/fa";

type Props = {
  onViewChange: (value: string) => void;
};

const DriverHeader = (props: Props) => {
  const [activeView, setIsActive] = useState("overview");
  const handleToggle = (value: string) => {
    setIsActive(value);
    props.onViewChange(value);
  };

  return (
    <div className="flex text-white text-sm flex-col bg-black">
      <div className="my-4 px-[10px] px-[40px] flex flex-row w-full justify-between">
        <div className="flex flex-row items-center justify-start ">
          <div className="py-1 border-r border-[#ffffff]"><img
            className="pr-[10px] h-[20px]"
            src="/assets/images/fraser-white-logo.svg"
            alt=""
          /></div>
          <span className="ml-[10px] ">Driver Portal</span>
        </div>

        <div className="flex flex-row items-center item-center">
          <img
            className="w-[30px] h-[30px] rounded-full bg-gray-300"
            src="/assets/images/shutterstock_1791760502 1fraserlandingpage.png"
            alt=""
          />
          <p className="ml-[10px] text-white">Amen Olabode</p>
          <p className="ml-[10px]">
            <FaCaretDown className="ml-auto" />
          </p>
        </div>
      </div>

      <div className="bg-[#E1EDE1] px-[120px] py-[10px] px-[10px]">
        {/* GROUP BUTTON - NAVIGATION */}

        <div className="inline-flex rounded-md" role="group">
          <button
            onClick={() => handleToggle("overview")}
            type="button"
            className={`inline-flex mr-6 items-center text-sm font-medium  ${
              activeView === "overview"
                ? //   true
                  "text-[#22B11E] font-semibold text-black"
                : "text-gray-400 font-normal"
            }`}
          >
            <FaThLarge className="mr-2" />
            Overview
          </button>

          <button
            onClick={() => handleToggle("revenue")}
            type="button"
            className={`inline-flex items-center text-sm font-medium  ${
              activeView === "revenue"
                ? //   false
                  "text-[#22B11E] font-semibold text-black"
                : "text-gray-400 font-normal"
            }`}
          >
            <FaSuitcase className="mr-2" />
            Revenue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverHeader;
