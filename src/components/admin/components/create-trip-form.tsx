import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { City_interface } from "../../../interfaces/city_interface";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import DateField from "./datefield";
import TimePicker from "./time-picker";

// FORM TO CREATE A TRIP
const CreateTripFormComponent = () => {
  const { cities, loading, error } = useAppSelector(
    (state: any) => state?.allCity
  );
  const dispatch = useAppDispatch();

  //   START CITY CONTROLLERS
  const [startCityOpen, setStartCityIsOpen] = useState(false);
  const [startCityDisplayText, setStartCityDisplayText] = useState(
    Cookies.get("startCity") || "Select Start City"
  );
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

  // startCityDisplayText,
  // startBusStopDisplayText,
  // destinationCityDisplayText,
  // destinationBuStopDisplayText,
  // vehicleDisplayText,
  // driverDisplayText,
  // year,
  // month,
  // day,
  // time,

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

      <button
        className={`w-full p-3 mt-8 mb-8 font-medium rounded-lg ${
          true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
        } `}
        onClick={() => {}}
      >
        {/* <svg
		className={`${
								true === true ? "animate-spin" : "hidden"
							} inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="white"
								stroke="white"
								stroke-width="5"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="green"
								stroke="green"
								stroke-width="5"
							/>
						</svg> */}
        Proceed to review
      </button>
    </div>
  );
};

export default CreateTripFormComponent;
