/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Alert, Dropdown, Input, message } from "antd";
import { FaCaretDown } from "react-icons/fa";
import { State_interface } from "../../interfaces/state_interface";
import { createTripAction } from "../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import DateField from "./datefield";
import TimePicker from "./time-picker";
import EndDateField from "./endDateField";
import EndTimePicker from "./endTimePicker";
import { resetCreateTrip } from "../../state/slices/trip.slice";
import { User_interface } from "../../interfaces/user.interface";
import { FraserButton } from "../Button";
import TripTypes from "../../utils/allTripType";
import AllState from "../../utils/allState";

// FORM TO CREATE A TRIP
const CreateTripFormComponent = () => {
	const dispatch = useAppDispatch();
	const { states } = useAppSelector((state: any) => state?.allState);
	const { drivers } = useAppSelector((state: any) => state?.allDriver);
	const { loading, trip, error } = useAppSelector(
		(state: any) => state?.createTrip
	);

	// the trip variable
	const [bus, setBus] = useState<string>("");
	const [driver, setDriver] = useState<string>("");
	const [take_off_date, setTake_off_date] = useState<string>("");
	const [take_off_time, setTake_off_time] = useState<string>("");
	const [arrival_time, setArrival_time] = useState<string>("");
	const [arrival_date, setArrival_date] = useState<string>("");
	const [price, setPrice] = useState<string>();
	const [startCity, setStartCity] = useState<string>("");
	const [endCity, setEndCity] = useState<string>("");
	const [startBusStop, setStartBusStop] = useState<string>("");
	const [stopBusStop, setStopBusStop] = useState<string>("");
	const [type_of_trip, setType_of_trip] = useState<string>("");

	const [startCityBusStopList, setStartCityBusStopList] = useState<string[]>(
		[]
	);
	const [stopCityBusStopList, setStopCityBusStopList] = useState<string[]>([]);

	const [messageApi, contextHolder] = message.useMessage();

	//   START CITY CONTROLLERS
	const [startCityOpen, setStartCityIsOpen] = useState(false);
	const [startCityDisplayText, setStartCityDisplayText] = useState(
		"Select Start City" || ""
	);

	//   START BUSSTOP CONTROLLERS
	const [startBusStopDisplayText, setStartBusStopDisplayText] = useState(
		"Select Start Bus Stop" || ""
	);

	const [tripTypeDisplayText, setTripTypeDisplayText] = useState(
		"Select a trip type" || ""
	);

	//   DESITNATION CITY CONTROLLERS
	const [destinationCityOpen, setDestinationCityIsOpen] = useState(false);
	const [destinationCityDisplayText, setDestinationCityDisplayText] = useState(
		"Select Destination City" || ""
	);

	//   DESITNATION BUSSTOP CONTROLLERS
	const [destinationBusStopOpen, setDestinationBusStopIsOpen] = useState(false);
	const [destinationBuStopDisplayText, setDestinationBusStopDisplayText] =
		useState("Select Destination Bus Stop" || "");

	//   DRIVER  CONTROLLERS
	const [driverOpen, setDriverIsOpen] = useState(false);
	const [driverDisplayText, setDriverDisplayText] = useState(
		"Select Driver" || " "
	);

	const fullData = {
		bus,
		driver,
		take_off_date,
		take_off_time,
		arrival_date,
		arrival_time,
		price,
		type_of_trip,
		travel_destination: {
			from: {
				state: startCity,
				start_busstop: startBusStop
			},
			to: {
				state: endCity,
				stop_busstop: stopBusStop
			}
		}
	};

	const CreateThisTrip = () => {
		if (
			!bus ||
			!driver ||
			!take_off_date ||
			!take_off_time ||
			!arrival_date ||
			!arrival_time ||
			!price ||
			!startCity ||
			!startBusStop ||
			!endCity ||
			!stopBusStop
		) {
			return messageApi.open({
				type: "warning",
				content: "Please enter all the required details"
			});
		}
		dispatch(createTripAction(fullData));
	};

	const resetAll = () => {
		setBus("");
		setStartBusStop("");
		setArrival_date("");
		setDestinationBusStopDisplayText("Select Destination Bus Stop");
		setDestinationCityDisplayText("Select Destination City");
		setDriverDisplayText("Select Driver");
		setEndCity("");
		setPrice("");
		setStartCityDisplayText("Select Start City");
		setDriver("");
		setDriverDisplayText("Select Driver");
		setStartBusStopDisplayText("Select Start Bus Stop");
		setStartCity("");
		setStartCityBusStopList([]);
		setStopCityBusStopList([]);
		setTake_off_date("");
		setTake_off_time("");
		// setVehicleDisplayText("Select Vehicle");
	};

	useEffect(() => {
		if (trip?._id) {
			messageApi.open({
				type: "success",
				content: "A new trip has been created"
			});

			resetAll();
			dispatch(resetCreateTrip());
		}
	}, [dispatch, messageApi, trip]);

	useEffect(() => {
		if (error) {
			messageApi.open({
				type: "error",
				content: error
			});

			dispatch(resetCreateTrip());
		}
	}, [dispatch, error, messageApi]);

	return (
		<div className="">
			{contextHolder}
			{/* START */}
			<div>
				<div>
					<p className="w-full mb-2 text-sm text-gray-500">Type of Trip</p>
					<div className="flex items-center w-full mt-5">
						<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
							Trip type
						</div>

						<div className="relative z-50 w-full text-left">
							<Dropdown
								menu={{
									items: TripTypes?.map((tripType: string) => {
										return {
											label: (
												<a
													onClick={() => {
														setTripTypeDisplayText(tripType);
														setType_of_trip(tripType);
													}}>
													{tripType}
												</a>
											),
											key: `${tripType}`
										};
									})
								}}
								trigger={["click"]}>
								<button className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
									{tripTypeDisplayText}
									<FaCaretDown className="ml-auto" />
								</button>
							</Dropdown>
						</div>
					</div>
				</div>

				<p className="w-full mb-2 text-sm text-gray-500">Start</p>
				{error && <Alert type="error" message={error} />}

				<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
						State
					</div>

					<div className="relative z-50 w-full text-left">
						<Dropdown
							menu={{
								items: states.map((state: State_interface) => {
									return {
										label: (
											<a
												key={Math.random() * 1000}
												href="#"
												className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													setStartBusStopDisplayText(state?.state);
													setStartCity(state?._id);
													setStartCityBusStopList(state?.bus_stops);
													setStartBusStop("");
													setStartBusStopDisplayText("Select Start Bus Stop");
													setStartCityDisplayText(state?.state);
												}}>
												{state?.state}
											</a>
										),
										key: Math.random() * 4000
									};
								})
							}}
							trigger={["click"]}>
							<button
								className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
								onClick={() => {
									setStartCityIsOpen(!startCityOpen);
								}}>
								{startCityDisplayText}
								<FaCaretDown className="ml-auto" />
							</button>
						</Dropdown>
					</div>
				</div>

				{/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
						Busstops
					</div>
					<div className="relative z-40 inline w-full text-left">
						<Dropdown
							trigger={["click"]}
							menu={{
								items: startCityBusStopList?.map((busstop: string) => {
									return {
										label: (
											<a
												key={Math.random() * 1000}
												onClick={() => {
													setStartBusStop(busstop);
													setStartBusStopDisplayText(busstop);
												}}>
												{busstop}
											</a>
										),
										key: Math.random() * 2000
									};
								})
							}}>
							<button className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
								{" "}
								{startBusStopDisplayText}
								<FaCaretDown className="ml-auto" />
							</button>
						</Dropdown>
					</div>
				</div>
			</div>

			{/* DESTINATION */}
			<div className="mt-3">
				<p className="w-full text-sm text-gray-500 ">Destination</p>
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
						State
					</div>
					<div className="relative z-30 inline w-full text-left">
						<Dropdown
							trigger={["click"]}
							menu={{
								items: states?.map((state: State_interface) => {
									return {
										label: (
											<a
												key={Math.random() * 1000}
												onClick={() => {
													setDestinationCityDisplayText(state?.state);
													setEndCity(state?._id);
													setStopCityBusStopList(state?.bus_stops);
												}}>
												{state?.state}
											</a>
										),
										key: Math.random() * 6000
									};
								})
							}}>
							<button
								className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
								onClick={() => {
									setDestinationCityIsOpen(!destinationCityOpen);
								}}>
								{destinationCityDisplayText}
								<FaCaretDown className="ml-auto" />
							</button>
						</Dropdown>
					</div>
				</div>

				{/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
						Busstops
					</div>

					<div className="relative z-20 inline w-full text-left">
						<Dropdown
							trigger={["click"]}
							menu={{
								items: stopCityBusStopList?.map((busstop: string) => {
									return {
										label: (
											<a
												key={Math.random() * 6000}
												onClick={() => {
													setDestinationBusStopDisplayText(busstop);
													setStopBusStop(busstop);
												}}>
												{busstop}
											</a>
										),
										key: Math.random() * 6000
									};
								})
							}}>
							<button className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
								{destinationBuStopDisplayText}
								<FaCaretDown className="ml-auto" />
							</button>
						</Dropdown>
					</div>
				</div>
			</div>

			{/*TAKE OFF DATE AND TIME */}
			<div className="w-full pb-2 mt-3 text-sm text-gray-500">
				Takeoff Date and time
			</div>
			<DateField
				setTake_off_date={setTake_off_date}
				take_off_date={undefined}
			/>
			<TimePicker
				setTake_off_time={setTake_off_time}
				take_off_time={undefined}
			/>

			{/*ARRIVAL DATE AND TIME */}
			<div className="w-full pb-2 mt-3 text-sm text-gray-500">
				Arrival Date and time
			</div>
			<EndDateField
				setArrival_date={setArrival_date}
				arrival_date={undefined}
			/>
			<EndTimePicker
				setArrival_time={setArrival_time}
				arrival_time={undefined}
			/>

			{/* VEHICLE AND DRIVER */}
			<div className="mt-3">
				<p className="w-full text-sm text-gray-500">Vehicle and Driver</p>

				{/* DRIVERS FROM BACKEND */}
				<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
						Driver
					</div>
					<div className="relative z-40 inline w-full text-left">
						<Dropdown
							trigger={["click"]}
							menu={{
								items: drivers
									?.filter(
										(d: User_interface) =>
											d?.driver_verification_status === true
									)
									.map((driver: User_interface) => {
										return {
											label: (
												<a
													onClick={() => {
														setDriver(driver?._id);
														setDriverDisplayText(
															`${driver?.first_name} ${driver?.last_name}`
														);
														setBus(driver?.bus?._id);
													}}>
													{" "}
													{driver?.first_name} {driver?.last_name}
												</a>
											),
											key: driver?._id
										};
									})
							}}>
							<button
								className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
								onClick={() => {
									setDriverIsOpen(!driverOpen);
								}}>
								{driverDisplayText}
								<FaCaretDown className="ml-auto" />
							</button>
						</Dropdown>
					</div>
				</div>
			</div>

			{/* PRICE */}
			<div className="mt-3">
				<p className="w-full text-sm text-gray-500 ">Price</p>
				<div className="flex items-center w-full mt-2 ">
					<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
						Price
					</div>
					<div className="relative z-30 inline w-full text-left">
						<Input value={price} onChange={(e) => setPrice(e.target.value)} />
					</div>
				</div>
			</div>

			<FraserButton
				loader={loading}
				title={"Create Trip"}
				size={"regular"}
				className={"w-full mt-4"}
				onClick={CreateThisTrip}
			/>
		</div>
	);
};

export default CreateTripFormComponent;
