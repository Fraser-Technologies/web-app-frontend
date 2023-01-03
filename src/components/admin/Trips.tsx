import React, { useState } from "react";
import { Button } from "../Button";
import { _paths_ } from "../../utils/appHelpers";
import TripsOverview from "./Trip-Views/trips-overiew";
import BusStopManagement from "./Trip-Views/bus-stop-mgt";
import { Modal } from "antd";
import CreateTripFormComponent from "./components/create-trip-form";
import Cookies from "js-cookie";

const MiddleSection: React.FC = () => {
  // PAGINATION
  const [activeTripsView, setIsActive] = useState("overview");
  const handleTripViewToggle = (value: string) => {
    setIsActive(value);
  };

  const [flip, setFlip] = useState("");
  const [createVisible, setCreateModalVisible] = useState<boolean>(false);
  const handleOpenCreateModal = () => {
    setFlip("create");
    setCreateModalVisible(true);
    // setModalData(data);
  };
  const handleOk = () => {
    setCreateModalVisible(false);
    Cookies.remove("startCity");
    Cookies.remove("startBusStop");
    Cookies.remove("destinationBusStop");
    Cookies.remove("destinationCity");
    Cookies.remove("vehicle");
    Cookies.remove("driver");
    Cookies.remove("time");
    Cookies.remove("month");
    Cookies.remove("year");
    Cookies.remove("day");
  };

  const handleCancel = () => {
    if (flip === "create") {
      setCreateModalVisible(false);
      setFlip("");
    }
    Cookies.remove("startCity");
    Cookies.remove("startBusStop");
    Cookies.remove("destinationBusStop");
    Cookies.remove("destinationCity");
    Cookies.remove("vehicle");
    Cookies.remove("driver");
    Cookies.remove("time");
    Cookies.remove("month");
    Cookies.remove("year");
    Cookies.remove("day");
  };

  //ALL COLLECTED DATA FROM FORM FIELDS
  const [startCity, setStartCity] = useState("");
  const [startBusStop, setStartBusStop] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationBusStop, setDestinationBusStop] = useState("");
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDataFromChild = (
    startCityDisplayText: any,
    startBusStopDisplayText: any,
    destinationCityDisplayText: any,
    destinationBuStopDisplayText: any,
    driverDisplayText: any,
    VehicleDisplayText: any,
    year: any,
    month: any,
    day: any,
    time: any
  ) => {
    setStartCity(startCityDisplayText);
    setStartBusStop(startBusStopDisplayText);
    setDestinationCity(destinationCityDisplayText);
    setDestinationBusStop(destinationBuStopDisplayText);
    setDriver(driverDisplayText);
    setVehicle(VehicleDisplayText);
    setDate(year + "-" + month + "-" + day);
    setTime(time);
  };

  const validation =
    startBusStop !== "Select Start Bus Stop" &&
    startCity !== "Select Start City" &&
    destinationBusStop !== "Select Destination Bus Stop" &&
    destinationCity !== "Select Destination City" &&
    driver !== "Select Driver" &&
    date !== "--" &&
    vehicle !== "Select Vehicle" &&
    startCity !== destinationCity;

  return (
    <div className="bg-white h-full col-start-2 col-end-6 ">
      <div className="bg-white h-full px-6">
        {/* GROUP BUTTON - NAVIGATION */}
        <div className="border-b w-full mt-8 py-4 mb-2">
          <div className="inline-flex rounded-md" role="group">
            <button
              onClick={() => handleTripViewToggle("overview")}
              type="button"
              className={`inline-flex items-center py-2 px-6 text-base font-medium  ${
                activeTripsView === "overview"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Trips Overview
            </button>

            <button
              onClick={() => handleTripViewToggle("management")}
              type="button"
              className={`inline-flex items-center py-2 px-8 text-base font-medium  ${
                activeTripsView === "management"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Bus Stops Management
            </button>
          </div>
        </div>

        {/* BUSSTOPS HEADER */}
        <div className="border-b h-14 w-full my-2">
          <div className="flex justify-between">
            <h2 className="text-lg mt-2 font-medium">Busstops</h2>
            {activeTripsView === "overview" ? (
              <Button
                title="+ Create new trip"
                type="submit"
                className="px-4 py-2 text-xs rounded-md bg-primary-100"
                onClick={() => {
                  handleOpenCreateModal();
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* CREATE TRIP MODAL */}
        {flip === "create"
          ? createVisible && (
              <Modal
                title={
                  <div className="boder-b text-lg font-medium">
                    Create a new trip
                  </div>
                }
                onOk={handleOk}
                onCancel={handleCancel}
                open={createVisible}
                centered={true}
                footer={false}
                closable={true}
              >
                <CreateTripFormComponent onSendData={handleDataFromChild} />
                <button
                  className={`w-full p-3 mt-8 mb-8 font-medium rounded-lg ${
                    validation
                      ? "bg-[#00ff6a] hover:bg-[#58FF9E]"
                      : "bg-[#f5f5f5]"
                  } `}
                  onClick={() => {
                    if (validation) {
                      setFlip("review");
                    }
                  }}
                >
                  <svg
                    className={`${
                      validation === true ? "animate-spin" : "hidden"
                    } inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  </svg>
                  Create Trip
                </button>
              </Modal>
            )
          : flip === "review"
          ? createVisible && (
              <Modal
                title={
                  <div className="boder-b text-lg font-medium">
                    Trip Details
                  </div>
                }
                onOk={handleOk}
                onCancel={handleCancel}
                open={createVisible}
                centered={true}
                footer={false}
                closable={true}
              >
                <div className="w-full grid grid-cols-2 gap-8 mt-12 pb-12">
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Start
                    </div>
                    <div className="text-lg">{startCity}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Destination
                    </div>
                    <div className="text-lg">{destinationCity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Start Bus Stop
                    </div>
                    <div className="text-lg">{startBusStop}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Destination Bus Stop
                    </div>
                    <div className="text-lg">{destinationBusStop}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Departure Time
                    </div>
                    <div className="text-lg">{time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Date
                    </div>
                    <div className="text-lg">{date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Driver
                    </div>
                    <div className="text-lg">{driver}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Vehicle
                    </div>
                    <div className="text-lg">{vehicle}</div>
                  </div>
                </div>
                <Button
                  title="Continue"
                  type="submit"
                  className="w-full px-4 py-3 text-xs rounded-md bg-primary-100"
                  onClick={() => {
                    handleOk()
                    //aAPI CALL HERE FOR CREATING A TRIP
                   
                  }}
                />
                <Button
                  title="Edit"
                  type="submit"
                  className="w-full mt-4 mb-6 px-4 py-3 text-xs rounded-md border text-gray-500 border-gray-500"
                  onClick={() => {
                    setFlip("create");
                  }}
                />
              </Modal>
            )
          : null}

        {activeTripsView === "overview" ? (
          <TripsOverview />
        ) : activeTripsView === "management" ? (
          <BusStopManagement />
        ) : null}
      </div>
    </div>
  );
};

export default MiddleSection;
