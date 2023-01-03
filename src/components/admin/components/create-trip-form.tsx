import React, { useEffect, useState } from "react";
import { cities } from "../adminData/busstops-test-data";
import { drivers } from "../adminData/drivers-test-data";
import { data } from "../adminData/trips-test-data";
import { vehicles } from "../adminData/vehicles-test-data";
import DateField from "./datefield";
import DropdownComponent from "./full-dropdown";

const CreateTripFormComponent = (props: any) => {
  const { onSendData } = props;
  // PASS DATA TO PARENT
  const handleSendData = () => {
    onSendData(
      startCityDisplayText,
      startBusStopDisplayText,
      destinationCityDisplayText,
      destinationBuStopDisplayText,
      driverDisplayText,
      vehicleDisplayText,
      year,
      month,
      day
    );
  };

  const citiesArray = Object.entries(cities);

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

  //   DESITNATION CITY CONTROLLERS
  const [destinationCityOpen, setDestinationCityIsOpen] = useState(false);
  const [destinationCityDisplayText, setDestinationCityDisplayText] = useState(
    "Select Destination City"
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
    useState("Select Destination Bus Stop");
  const handleDestinationBusStopChange = (option: any) => {
    setDestinationBusStopDisplayText(option);
    setDestinationBusStopIsOpen(!destinationBusStopOpen);
  };
  const handleDestinationBusStopDropClick = () => {
    setDestinationBusStopIsOpen(!destinationBusStopOpen);
  };

  //   VEHICLE CONTROLLERS
  const [vehicleOpen, setVehicleIsOpen] = useState(false);
  const [vehicleDisplayText, setVehicleDisplayText] =
    useState("Select Vehicle");
  const handleVehicleChange = (option: any) => {
    setVehicleDisplayText(option);
    setVehicleIsOpen(!vehicleOpen);
  };
  const handleVehicleDropClick = () => {
    setVehicleIsOpen(!vehicleOpen);
  };

  //   DRIVER  CONTROLLERS
  const [driverOpen, setDriverIsOpen] = useState(false);
  const [driverDisplayText, setDriverDisplayText] = useState("Select Driver");
  const handleDriverChange = (option: any) => {
    setDriverDisplayText(option);
    setDriverIsOpen(!driverOpen);
  };
  const handleDriverDropClick = () => {
    setDriverIsOpen(!driverOpen);
  };

  // SET YEAR, MONTH AND DAY FROM CHILD COMPONENT (DATEFIELD)
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleDataFromChild = (year: any, month: any, day: any) => {
    setYear(year);
    setMonth(month);
    setDay(day);
  };

  useEffect(() => {
    handleSendData();
    // console.log(
    //   startCityDisplayText,
    //   startBusStopDisplayText,
    //   destinationCityDisplayText,
    //   destinationBuStopDisplayText,
    //   vehicleDisplayText,
    //   driverDisplayText,
    //   year,
    //   month,
    //   day
    // );
  }, [
    startCityDisplayText,
    startBusStopDisplayText,
    destinationCityDisplayText,
    destinationBuStopDisplayText,
    vehicleDisplayText,
    driverDisplayText,
    year,
    month,
    day,
  ]);

  return (
    <div className="">
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
              className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
        addNewOnClickFunction={() => {}}
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
                  className={`w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
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
        addNewOnClickFunction={() => {}}
      />

      {/* DESTINATION */}
      <DropdownComponent
        topLabel="Destination"
        onChangeFunction={handleDestinationCityChange}
        onClickFunction={handleDestinationCityDropClick}
        dropControllerBool={destinationCityOpen}
        displayText={destinationCityDisplayText}
        dataSetName={cities}
        dataSetMapFunction={citiesArray.map(([city]) => {
          return (
            <a
              key={city}
              href="#"
              className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              onClick={() => {
                handleDestinationCityChange(city);
              }}
            >
              {city}
            </a>
          );
        })}
        fullBodyClassName="mt-6 z-50"
        dropdownLabel="City"
        dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-50"
        addNewOnClickFunction={() => {}}
      />

      <DropdownComponent
        topLabel=""
        onChangeFunction={handleDestinationBusStopChange}
        onClickFunction={handleDestinationBusStopDropClick}
        dropControllerBool={destinationBusStopOpen}
        displayText={destinationBuStopDisplayText}
        dataSetName={cities}
        dataSetMapFunction={citiesArray.map(([city, busstop]) => {
          if (city === destinationCityDisplayText) {
            return busstop.map((busstop) => {
              return (
                <a
                  key={busstop.busstop}
                  href="#"
                  className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                  onClick={() => {
                    handleDestinationBusStopChange(busstop.busstop);
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
        addNewOnClickFunction={() => {}}
      />

      <div className="w-full mb-2 text-gray-500 mt-8">Date and time</div>
      <DateField onSendData={handleDataFromChild} className="mt-2" />
      {/* DESTINATION */}
      <DropdownComponent
        topLabel="Vehicle and Driver"
        onChangeFunction={handleDriverChange}
        onClickFunction={handleDriverDropClick}
        dropControllerBool={driverOpen}
        displayText={driverDisplayText}
        dataSetName={drivers}
        dataSetMapFunction={drivers.map((driver: any) => {
          return (
            <a
              key={driver}
              href="#"
              className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              onClick={() => {
                handleDriverChange(driver.driver + " " + driver.lastName);
              }}
            >
              {driver.driver + " " + driver.lastName}
            </a>
          );
        })}
        fullBodyClassName="mt-6 z-50"
        dropdownLabel="Driver"
        dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-50"
        addNewOnClickFunction={() => {}}
      />

      <DropdownComponent
        topLabel=""
        onChangeFunction={handleVehicleChange}
        onClickFunction={handleVehicleDropClick}
        dropControllerBool={vehicleOpen}
        displayText={vehicleDisplayText}
        dataSetName={vehicles}
        dataSetMapFunction={vehicles.map((option: any) => {
          return (
            <a
              key={option}
              href="#"
              className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              onClick={() => {
                handleVehicleChange(
                  option.model + " " + option.registrationNumber
                );
              }}
            >
              {option.model + " " + option.registrationNumber}
            </a>
          );
        })}
        fullBodyClassName="mt-4"
        dropdownLabel="Vehicle"
        dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-40"
        addNewOnClickFunction={() => {}}
      />
    </div>
  );
};

export default CreateTripFormComponent;