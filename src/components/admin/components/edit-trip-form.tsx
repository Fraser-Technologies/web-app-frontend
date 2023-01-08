/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { City_interface } from "../../../interfaces/city_interface";
import { useAppSelector } from "../../../state/hooks";
import DateField from "./datefield";
import TimePicker from "./time-picker";

const EditTripFormComponent = () => {
  const { cities, loading, error } = useAppSelector(
    (state: any) => state?.allCity
  );
  const { busStops } = useAppSelector((state: any) => state?.allBusStop);

  // All Data
  //   startCityDisplayText,
  //   startBusStopDisplayText,
  //   destinationCityDisplayText,
  //   destinationBuStopDisplayText,
  //   driverDisplayText,
  //   vehicleDisplayText,
  //   year,
  //   month,
  //   day,
  //   time

  //   START CITY CONTROLLERS
  const [startCityOpen, setStartCityIsOpen] = useState<boolean>(false);
  const [startCityDisplayText, setStartCityDisplayText] =
    useState<string>("Select Start City");

  const handleStartCityChange = (option: any) => {
    setStartCityDisplayText(option);
    setStartCityIsOpen(!startCityOpen);
  };
  const handleStartCityDropClick = () => {
    setStartCityIsOpen(!startCityOpen);
  };

  //   START BUSSTOP CONTROLLERS
  const [startBusStopOpen, setStartBusStopIsOpen] = useState(false);
  const [startBusStopDisplayText, setStartBusStopDisplayText] = useState(
    Cookies.get("startBusStop") || "Select Start Bus Stop"
  );
  const handleStartBusStopChange = (option: any) => {
    setStartBusStopDisplayText(option);
    setStartBusStopIsOpen(!startBusStopOpen);
  };
  const handleStartBusStopDropClick = () => {
    setStartBusStopIsOpen(!startBusStopOpen);
  };

  //   DESITNATION CITY CONTROLLERS
  const [destinationCityOpen, setDestinationCityIsOpen] = useState(false);
  const [destinationCityDisplayText, setDestinationCityDisplayText] = useState(
    Cookies.get("destinationCity") || "Select Destination City"
  );
  const handleDestinationCityChange = (option: any) => {
    setDestinationCityDisplayText(option);
    setDestinationCityIsOpen(!destinationCityOpen);
  };
  const handleDestinationCityDropClick = () => {
    setDestinationCityIsOpen(!destinationCityOpen);
  };

  //   DESITNATION BUSSTOP CONTROLLERS
  const [destinationBusStopOpen, setDestinationBusStopIsOpen] = useState(false);
  const [destinationBuStopDisplayText, setDestinationBusStopDisplayText] =
    useState(
      Cookies.get("destinationBusStop") || "Select Destination Bus Stop"
    );
  const handleDestinationBusStopChange = (option: any) => {
    setDestinationBusStopDisplayText(option);
    setDestinationBusStopIsOpen(!destinationBusStopOpen);
  };
  const handleDestinationBusStopDropClick = () => {
    setDestinationBusStopIsOpen(!destinationBusStopOpen);
  };

  //   VEHICLE CONTROLLERS
  const [vehicleOpen, setVehicleIsOpen] = useState(false);
  const [vehicleDisplayText, setVehicleDisplayText] = useState(
    Cookies.get("vehicle") || "Select Vehicle"
  );
  const handleVehicleChange = (option: any) => {
    setVehicleDisplayText(option);
    setVehicleIsOpen(!vehicleOpen);
  };
  const handleVehicleDropClick = () => {
    setVehicleIsOpen(!vehicleOpen);
  };

  //   DRIVER  CONTROLLERS
  const [driverOpen, setDriverIsOpen] = useState(false);
  const [driverDisplayText, setDriverDisplayText] = useState(
    Cookies.get("driver") || "Select Driver"
  );
  const handleDriverChange = (option: any) => {
    setDriverDisplayText(option);
    setDriverIsOpen(!driverOpen);
  };
  const handleDriverDropClick = () => {
    setDriverIsOpen(!driverOpen);
  };

  // SET YEAR, MONTH AND DAY FROM CHILD COMPONENT (DATEFIELD)
  const [year, setYear] = useState(Cookies.get("year"));
  const [month, setMonth] = useState(Cookies.get("month"));
  const [day, setDay] = useState(Cookies.get("day"));

  const handleDateFromChild = (year: any, month: any, day: any) => {
    setYear(year);
    setMonth(month);
    setDay(day);
  };

  //SET TIME FROM CHILD COMPONENT
  const [time, setTime] = useState("");
  const handleTimeFromChild = (time: any) => {
    setTime(time);
  };

  return (
    <div className="">
      {/* START */}
      <div>
        <p className="w-full mb-2 text-gray-500">Start</p>
        <div className="w-full flex items-center mt-2">
          <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
            City
          </div>
          <div className="relative inline text-left z-50 w-full">
            <button
              className="rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white  leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={handleStartCityDropClick}
              onChange={handleStartCityChange}
            >
              {startCityDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {startCityOpen && (
              <div className="w-full absolute mt-2 rounded-md shadow-lg">
                <div className="w-full pb-12 overflow-y-scroll rounded-md bg-white shadow-xs  py-4 ">
                  <a
                    href="#"
                    className="w-full inline-block px-4 py-4  text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleStartCityChange("Lagos")}
                  >
                    Lagos
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4  leading-5 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleStartCityChange("Ibadan")}
                  >
                    Ibadan
                  </a>
                </div>

                <div
                  onClick={() => {
                    //FUNCTION TO ADD NEW CITY
                  }}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
        <div className="w-full flex items-center mt-2">
          <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
            Busstops
          </div>
          <div className="relative inline text-left z-40 w-full">
            <button
              className="rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white  leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={handleStartBusStopDropClick}
              onChange={handleStartBusStopChange}
            >
              {startBusStopDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {startBusStopOpen && (
              <div className="w-full absolute mt-2 rounded-md shadow-lg">
                <div className="w-full pb-12 overflow-y-scroll rounded-md bg-white shadow-xs  py-4 ">
                  <a
                    href="#"
                    className="w-full inline-block px-4 py-4  text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleStartBusStopChange("Start Bus Stop 1")}
                  >
                    Start Bus Stop 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4  leading-5 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleStartBusStopChange("Start Bus Stop 2")}
                  >
                    Start Bus Stop 2
                  </a>
                </div>

                <div
                  onClick={() => {}}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DESTINATION */}
      <div className="mt-6">
        <p className="w-full text-gray-500">Destination</p>
        <div className="w-full flex items-center mt-2">
          <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
            City
          </div>
          <div className="relative inline text-left z-30 w-full">
            <button
              className="rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white  leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={handleDestinationCityDropClick}
              onChange={handleDestinationCityChange}
            >
              {destinationCityDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {destinationCityOpen && (
              <div className="w-full absolute mt-2 rounded-md shadow-lg">
                <div className="w-full pb-12 overflow-y-scroll rounded-md bg-white shadow-xs  py-4 ">
                  <a
                    href="#"
                    className="w-full inline-block px-4 py-4  text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleDestinationCityChange("Lagos")}
                  >
                    Lagos
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4  leading-5 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleDestinationCityChange("Ibadan")}
                  >
                    Ibadan
                  </a>
                </div>

                <div
                  onClick={() => {
                    //FUNCTION TO ADD NEW CITY
                  }}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
        <div className="w-full flex items-center mt-2">
          <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
            Busstops
          </div>
          <div className="relative inline text-left z-20 w-full">
            <button
              className="rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white  leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={handleDestinationBusStopDropClick}
              onChange={handleDestinationBusStopChange}
            >
              {destinationBuStopDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {destinationBusStopOpen && (
              <div className="w-full absolute mt-2 rounded-md shadow-lg">
                <div className="w-full pb-12 overflow-y-scroll rounded-md bg-white shadow-xs  py-4 ">
                  <a
                    href="#"
                    className="w-full inline-block px-4 py-4  text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() =>
                      handleDestinationBusStopChange("Destination Bus Stop 1")
                    }
                  >
                    Destination Bus Stop 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4  leading-5 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() =>
                      handleDestinationBusStopChange("Destination Bus Stop 2")
                    }
                  >
                    Destination Bus Stop 2
                  </a>
                </div>

                <div
                  onClick={() => {}}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DATE AND TIME */}
      <div className="w-full text-gray-500 mt-6 pb-2">Date and time</div>
      <DateField onSendData={handleDateFromChild} />
      <TimePicker onTimeChange={handleTimeFromChild} />

      {/* VEHICLE AND DRIVER */}
      <div className="mt-6">
        <p className="w-full text-gray-500">Vehicle and Driver</p>
        <div className="w-full flex items-center mt-2">
          <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
            Vehicle
          </div>
          <div className="relative inline text-left z-50 w-full">
            <button
              className="rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white  leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={handleVehicleDropClick}
              onChange={handleVehicleChange}
            >
              {vehicleDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {vehicleOpen && (
              <div className="w-full absolute mt-2 rounded-md shadow-lg">
                <div className="w-full pb-12 overflow-y-scroll rounded-md bg-white shadow-xs  py-4 ">
                  <a
                    href="#"
                    className="w-full inline-block px-4 py-4  text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleVehicleChange("Bus")}
                  >
                    Bus
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4  leading-5 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleVehicleChange("Ibadan")}
                  >
                    Car
                  </a>
                </div>

                <div
                  onClick={() => {
                    //FUNCTION TO ADD NEW CITY
                  }}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DRIVERS FROM BACKEND */}
        <div className="w-full flex items-center mt-2">
          <div className="w-full bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
            Driver
          </div>
          <div className="relative inline text-left z-40 w-full">
            <button
              className="rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white  leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={handleDriverDropClick}
              onChange={handleDriverChange}
            >
              {driverDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {driverOpen && (
              <div className="w-full absolute mt-2 rounded-md shadow-lg">
                <div className="w-full pb-12 overflow-y-scroll rounded-md bg-white shadow-xs  py-4 ">
                  <a
                    href="#"
                    className="w-full inline-block px-4 py-4  text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleDriverChange("Driver 1")}
                  >
                    Driver 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-4  leading-5 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    onClick={() => handleDestinationBusStopChange("Driver 2")}
                  >
                    Driver 2
                  </a>
                </div>

                <div
                  onClick={() => {}}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTripFormComponent;
