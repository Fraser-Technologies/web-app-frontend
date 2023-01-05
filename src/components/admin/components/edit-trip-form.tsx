/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BusStop_interface } from "../../../interfaces/busstop_interface";
import { City_interface } from "../../../interfaces/city_interface";
import { useAppSelector } from "../../../state/hooks";
import { cities } from "../adminData/busstops-test-data";
import { drivers } from "../adminData/drivers-test-data";
import { data } from "../adminData/trips-test-data";
import { vehicles } from "../adminData/vehicles-test-data";
import DateField from "./datefield";
import DropdownComponent from "./full-dropdown";
import TimePicker from "./time-picker";

const EditTripFormComponent = (props: any) => {
	const { onSendData } = props;

	const { cities, loading, error } = useAppSelector(
		(state: any) => state?.allCity
	);
	const { busStops } = useAppSelector((state: any) => state?.allBusStop);
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
			day,
			time
		);
	};

	const citiesArray = Object.entries(cities);

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

	useEffect(() => {
		handleSendData();
		Cookies.set("startCity", startCityDisplayText, { expires: 1 });
		Cookies.set("startBusStop", startBusStopDisplayText, { expires: 1 });
		Cookies.set("destinationCity", destinationCityDisplayText, { expires: 1 });
		Cookies.set("destinationBusStop", startBusStopDisplayText, { expires: 1 });
		Cookies.set("vehicle", vehicleDisplayText, { expires: 1 });
		Cookies.set("driver", driverDisplayText, { expires: 1 });
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
		time,
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
							className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
							onClick={() => {
								handleStartCityChange(city);
							}}>
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
						return busStops.map((busstop: BusStop_interface) => {
							return (
								<a
									key={busstop?._id}
									href="#"
									className={`w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
									onClick={() => {
										handleStartBusStopChange(busstop?._id);
									}}>
									{busstop?.name}
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
				dataSetMapFunction={cities.map((city: City_interface) => {
					return (
						<a
							key={city?._id}
							href="#"
							className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
							onClick={() => {
								handleDestinationCityChange(city?._id);
							}}>
							{city?.city}
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
						return busStops.map((busstop: BusStop_interface) => {
							return (
								<a
									key={busstop?._id}
									href="#"
									className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
									onClick={() => {
										handleDestinationBusStopChange(busstop?._id);
									}}>
									{busstop?.name}
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

			<div className="w-full mt-8 mb-2 text-gray-500">Date and time</div>
			<DateField onSendData={handleDateFromChild} className="mt-2" />

			<TimePicker onTimeChange={handleTimeFromChild} />
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
							className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
							onClick={() => {
								handleDriverChange(driver.driver + " " + driver.lastName);
							}}>
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
							className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
							onClick={() => {
								handleVehicleChange(
									option.model + " " + option.registrationNumber
								);
							}}>
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

export default EditTripFormComponent;
