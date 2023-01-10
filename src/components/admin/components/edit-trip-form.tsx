/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { City_interface } from "../../../interfaces/city_interface";
import { Trip_interface } from "../../../interfaces/trip_interface";
import { useAppSelector } from "../../../state/hooks";
import DateField from "./datefield";
import TimePicker from "./time-picker";

const EditTripFormComponent = ({
	trip,
}: {
	trip: Trip_interface | undefined;
}) => {
	const { cities } = useAppSelector((state: any) => state?.allCity);

	console.log("the trip is ", trip);
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
	const [startCityDisplayText, setStartCityDisplayText] = useState<string>(
		trip?.travel_destination?.from?.city?.city || "Select Start City"
	);
	const [startBusStopList, setStartBusStopList] = useState<string[]>([]);
	const [destinationBusStopList, setDestinationBusStopList] = useState<
		string[]
	>([]);

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
		trip?.travel_destination?.to?.busstop || "Select Start Bus Stop"
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
		trip?.travel_destination?.to?.city?.city || "Select Destination City"
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
			trip?.travel_destination?.to?.busstop || "Select Destination Bus Stop"
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
		trip?.bus?.name || "Select Vehicle"
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
		`${trip?.driver?.first_name} ${trip?.driver?.last_name}` || "Select Driver"
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
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md">
						City
					</div>
					<div className="relative z-50 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={handleStartCityDropClick}
							onChange={handleStartCityChange}>
							{startCityDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{startCityOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg">
								<div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
									{cities?.map((city: City_interface) => {
										return (
											<a
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													handleStartCityChange("Lagos");
													setStartBusStopList(city?.bus_stops);
												}}>
												{city?.city}
											</a>
										);
									})}
								</div>

								<div
									onClick={() => {
										//FUNCTION TO ADD NEW CITY
									}}
									className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}>
									+Add New
								</div>
							</div>
						)}
					</div>
				</div>

				{/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4  px-4 py-2 mr-2 text-white bg-black rounded-md">
						Busstops
					</div>
					<div className="relative z-40 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={handleStartBusStopDropClick}
							onChange={handleStartBusStopChange}>
							{startBusStopDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{startBusStopOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg">
								<div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
									{startBusStopList.map((busStop: string) => {
										return (
											<a
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													handleStartBusStopChange(busStop);
												}}>
												{busStop}
											</a>
										);
									})}
								</div>

								<div
									onClick={() => {}}
									className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}>
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
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4  px-4 py-2 mr-2 text-white bg-black rounded-md">
						City
					</div>
					<div className="relative z-30 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={handleDestinationCityDropClick}
							onChange={handleDestinationCityChange}>
							{destinationCityDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{destinationCityOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg z-10">
								<div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
									{cities?.map((city: City_interface) => {
										return (
											<a
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													handleDestinationCityChange(city);
													setDestinationBusStopList(city?.bus_stops);
												}}>
												{city?.city}
											</a>
										);
									})}
								</div>

								<div
									onClick={() => {
										//FUNCTION TO ADD NEW CITY
									}}
									className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}>
									+Add New
								</div>
							</div>
						)}
					</div>
				</div>

				{/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4  px-4 py-2 mr-2 text-white bg-black rounded-md">
						Busstops
					</div>
					<div className="relative z-20 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={handleDestinationBusStopDropClick}
							onChange={handleDestinationBusStopChange}>
							{destinationBuStopDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{destinationBusStopOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg">
								<div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
									{destinationBusStopList?.map((busstop: string) => {
										return (
											<a
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => handleDestinationBusStopChange(busstop)}>
												busstop
											</a>
										);
									})}
								</div>
								<div
									onClick={() => {}}
									className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}>
									+Add New
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* DATE AND TIME */}
			<div className="w-full pb-2 mt-6 text-gray-500">Date and time</div>
			<DateField onSendData={handleDateFromChild} />
			<TimePicker onTimeChange={handleTimeFromChild} />

			{/* VEHICLE AND DRIVER */}
			<div className="mt-6">
				<p className="w-full text-gray-500">Vehicle and Driver</p>
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md">
						Vehicle
					</div>
					<div className="relative z-50 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={handleVehicleDropClick}
							onChange={handleVehicleChange}>
							{vehicleDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{vehicleOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg">
								<div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
									<a
										href="#"
										className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
										onClick={() => handleVehicleChange("Bus")}>
										Bus
									</a>
									<a
										href="#"
										className="block px-4 py-4 leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
										onClick={() => handleVehicleChange("Ibadan")}>
										Car
									</a>
								</div>

								<div
									onClick={() => {
										//FUNCTION TO ADD NEW CITY
									}}
									className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}>
									+Add New
								</div>
							</div>
						)}
					</div>
				</div>

				{/* DRIVERS FROM BACKEND */}
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4  px-4 py-2 mr-2 text-white bg-black rounded-md">
						Driver
					</div>
					<div className="relative z-40 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={handleDriverDropClick}
							onChange={handleDriverChange}>
							{driverDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{driverOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg">
								<div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
									{}{" "}
									<a
										href="#"
										className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
										onClick={() => handleDriverChange("Driver 1")}>
										Driver 1
									</a>
									<a
										href="#"
										className="block px-4 py-4 leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
										onClick={() => handleDestinationBusStopChange("Driver 2")}>
										Driver 2
									</a>
								</div>

								<div
									onClick={() => {}}
									className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}>
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
