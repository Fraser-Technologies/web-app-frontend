/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from "js-cookie";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Bus_interface } from "../../../interfaces/bus_interface";
import { City_interface } from "../../../interfaces/city_interface";
import { Driver_interface } from "../../../interfaces/driver_interface";
import { Trip_interface } from "../../../interfaces/trip_interface";
import { updateTripAction } from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import DateField from "./datefield";
import TimePicker from "./time-picker";

const EditTripFormComponent = ({
	trip,
}: {
	trip: Trip_interface | undefined;
}) => {
	const dispatch = useAppDispatch();
	const { cities } = useAppSelector((state: any) => state?.allCity);
	const { drivers } = useAppSelector((state: any) => state?.allDriver);
	const { buses } = useAppSelector((state: any) => state.allBus);

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

	// the trip variable
	const [bus, setBus] = useState<string>(trip?.bus?.name || "");
	const [driver, setDriver] = useState<string>(trip?.driver?._id || "");
	const [take_off_date, setTake_off_date] = useState<string>(
		trip?.take_off_date || ""
	);
	const [take_off_time, setTake_off_time] = useState<string>(
		trip?.take_off_time || ""
	);
	const [price, setPrice] = useState<number>(trip?.price || 0);
	const [startCity, setStartCity] = useState<string>(
		trip?.travel_destination?.from?.city?._id || ""
	);
	const [endCity, setEndCity] = useState<string>(
		trip?.travel_destination?.to?.city?._id || ""
	);
	const [startBusStop, setStartBusStop] = useState<string>(
		trip?.travel_destination?.from?.busstop || ""
	);
	const [stopBusStop, setStopBusStop] = useState<string>(
		trip?.travel_destination?.to?.busstop || ""
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
	const handleDriverChange = (driver: Driver_interface) => {
		setDriverDisplayText(`${driver?.first_name} ${driver?.last_name}`);
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

	const updateTripData = () => {
		dispatch(
			updateTripAction(trip?._id || "", {
				bus,
				driver,
				take_off_date,
				take_off_time,
				travel_destination: {
					from: {
						city: startCity,
						busstop: startBusStop,
					},
					to: {
						city: endCity,
						busstop: stopBusStop,
					},
				},
				price,
			})
		);
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
													handleStartCityChange(city?.city);
													setStartCity(city?._id);
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
													setStartBusStop(busStop);
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
												key={city?._id}
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													handleDestinationCityChange(city?.city);
													setDestinationBusStopList(city?.bus_stops);
													setEndCity(city?._id);
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
												key={busstop}
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													handleDestinationBusStopChange(busstop);
													setStopBusStop(busstop);
												}}>
												{busstop}
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
									{buses?.map((bus: Bus_interface) => {
										return (
											<a
												key={bus?._id}
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													handleVehicleChange(bus?.name);
													setBus(bus?._id);
												}}>
												{bus?.name}
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

				{/* DRIVERS FROM BACKEND */}
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4  px-4 py-2 mr-2 text-white bg-black rounded-md">
						Driver
					</div>
					<div className="relative z-40 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={handleDriverDropClick}
							// onChange={handleDriverChange}
						>
							{driverDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{driverOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg">
								<div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
									{drivers?.map((driver: Driver_interface) => {
										return (
											<a
												key={driver?._id}
												href="#"
												className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													handleDriverChange(driver);
													setDriver(driver?._id);
												}}>
												{driver?.first_name} {driver?.last_name}
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

				<button
					className={`w-full p-3 mt-8 mb-8 font-medium rounded-lg ${
						true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
					} `}
					onClick={updateTripData}>
					<svg
						className={`${
							//API Call Loading?
							true ? "animate-spin" : "hidden"
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
					</svg>
					Update Trip
				</button>
			</div>
		</div>
	);
};

export default EditTripFormComponent;
