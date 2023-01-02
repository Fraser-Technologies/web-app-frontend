import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import DropDown from "./drop-down";

const DateField = ({ className }: { className: any }) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  //   const [year, setYear] = useState<number>(0);
  //   const [month, setMonth] = useState<string | null>(null);
  //   const [day, setDay] = useState<number | null>(null);

  // Array of years to display in the dropdown menu
  const years = [2023, 2024, 2025];

  // Array of months to display in the dropdown menu
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Array of days to display in the dropdown menu (assuming 31 days in every month)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  //DROPDOWN
  const [open, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState("Year");
  const onChange = (option: any) => {
    setDisplayText(option);
    setIsOpen(!open);
  };
  const click = () => {
    setIsOpen(!open);
  };

  return (
    <div className={`w-full flex  ${className}`}>
      {/* <label>Year</label> */}
      <div className="bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
        Date
      </div>
      <div className="flex w-full">
        <select
          className="w-full mr-2 bg-[#EFF3EF] px-2 rounded-md"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <br />
        {/* <label>Month</label> */}
        <select
          className="w-full mx-2 bg-[#EFF3EF] px-2 rounded-md"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <br />
        {/* <label>Day</label> */}
        <select
          className="w-full ml-2 bg-[#EFF3EF] px-2 rounded-md"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateField;
