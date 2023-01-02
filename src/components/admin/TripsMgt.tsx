import React, { useState } from "react";
import { Button } from "../Button";
import { _paths_ } from "../../utils/appHelpers";
import TripsOverview from "./Trip-Views/trips-overiew";
import BusStopManagement from "./Trip-Views/bus-stop-mgt";
import { Modal } from "antd";
import DropdownComponent from "./components/dropdown";
import { cities } from "./adminData/busstops-test-data";

const MiddleSection = () => {
  // PAGINATION
  const [active, setIsActive] = useState("overview");
  const handleClick = (value: string) => {
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
  };

  const handleCancel = () => {
    if (flip === "create") {
      setCreateModalVisible(false);
      setFlip("");
    }
  };

  //   START CITY CONTROLLERS
  const [startCityOpen, setStartCityIsOpen] = useState(false);
  const [startCityDisplayText, setStartCityDisplayText] =
    useState("Select Start City");
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
    "Select Start Bus Stop"
  );
  const handleStartBusStopChange = (option: any) => {
    setStartBusStopDisplayText(option);
    setStartBusStopIsOpen(!startBusStopOpen);
  };
  const handleStartBusStopDropClick = () => {
    setStartBusStopIsOpen(!startBusStopOpen);
  };

  const citiesArray = Object.entries(cities);

  return (
    <div className="bg-white h-full col-start-2 col-end-6 ">
      <div className="bg-white h-full px-6">
        {/* GROUP BUTTON - NAVIGATION */}
        <div className="border-b w-full mt-8 py-4 mb-2">
          <div className="inline-flex rounded-md" role="group">
            <button
              onClick={() => handleClick("overview")}
              type="button"
              className={`inline-flex items-center py-2 px-6 text-base font-medium  ${
                active === "overview"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Trips Overview
            </button>

            <button
              onClick={() => handleClick("management")}
              type="button"
              className={`inline-flex items-center py-2 px-8 text-base font-medium  ${
                active === "management"
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
            {active === "overview" ? (
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

                {/* START SELECTION */}
                <DropdownComponent
                  topLabel="Start"
                  onChangeFunction={handleStartCityChange}
                  onClickFunction={handleStartCityDropClick}
                  dropControllerBool={startCityOpen}
                  displayText={startCityDisplayText}
                  dataSetName={cities}
                  dataSetMapFunction={citiesArray.map(([city]) => {
                    return (
                      <a
                        key={city}
                        href="#"
                        className="w-full inline-block px-4 py-2 text-base text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        onClick={() => {
                          handleStartCityChange(city);
                        }}
                      >
                        {city}
                      </a>
                    );
                  })}
                  fullBodyClassName="mt-6 z-50"
                  dropdownLabel="City"
                  dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-50"
                  addNewOnClickFunction={undefined}
                />

                <DropdownComponent
                  topLabel=""
                  onChangeFunction={handleStartBusStopChange}
                  onClickFunction={handleStartBusStopDropClick}
                  dropControllerBool={startBusStopOpen}
                  displayText={startBusStopDisplayText}
                  dataSetName={cities}
                  dataSetMapFunction={citiesArray.map(([city, busstop]) => {
                    if (city === startCityDisplayText) {
                      return busstop.map((busstop) => {
                        return (
                          <a
                            key={busstop.busstop}
                            href="#"
                            className={`w-full inline-block px-4 py-2 text-base text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
                            onClick={() => {
                              handleStartBusStopChange(busstop.busstop);
                            }}
                          >
                            {busstop.busstop}
                          </a>
                        );
                      });
                    }
                  })}
                  fullBodyClassName="mt-4"
                  dropdownLabel="Bus Stop"
                  dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-40"
                  addNewOnClickFunction={undefined}
                />


                {/* DESTINATION */}
                <DropdownComponent
                  topLabel="Desintation"
                  onChangeFunction={handleStartCityChange}
                  onClickFunction={handleStartCityDropClick}
                  dropControllerBool={startCityOpen}
                  displayText={startCityDisplayText}
                  dataSetName={cities}
                  dataSetMapFunction={citiesArray.map(([city]) => {
                    return (
                      <a
                        key={city}
                        href="#"
                        className="w-full inline-block px-4 py-2 text-base text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        onClick={() => {
                          handleStartCityChange(city);
                        }}
                      >
                        {city}
                      </a>
                    );
                  })}
                  fullBodyClassName="mt-6 z-50"
                  dropdownLabel="City"
                  dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-50"
                  addNewOnClickFunction={undefined}
                />

                <DropdownComponent
                  topLabel=""
                  onChangeFunction={handleStartBusStopChange}
                  onClickFunction={handleStartBusStopDropClick}
                  dropControllerBool={startBusStopOpen}
                  displayText={startBusStopDisplayText}
                  dataSetName={cities}
                  dataSetMapFunction={citiesArray.map(([city, busstop]) => {
                    if (city === startCityDisplayText) {
                      return busstop.map((busstop) => {
                        return (
                          <a
                            key={busstop.busstop}
                            href="#"
                            className="w-full inline-block px-4 py-2 text-base text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => {
                              handleStartBusStopChange(busstop.busstop);
                            }}
                          >
                            {busstop.busstop}
                          </a>
                        );
                      });
                    }
                  })}
                  fullBodyClassName="mt-4"
                  dropdownLabel="Bus Stop"
                  dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-40"
                  addNewOnClickFunction={undefined}
                />
              </Modal>
            )
          : null}

        {active === "overview" ? <TripsOverview /> : <BusStopManagement />}
      </div>
    </div>
  );
};

export default MiddleSection;
