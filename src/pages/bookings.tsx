/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import BookingCard from "../components/bookingCard";
import Layout from "../components/layouts/SignInLayout";
import { Button } from "../components/Button";
import {
	getAllAvailableTripAction,
	getAvailableTripAction,
} from "../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Alert, Drawer, Modal } from "antd";
import { addToMyBookinAction } from "../state/action/booking.action";
import GeometricPatterns from "../components/GeometricPatterns";
import { FaCaretDown, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { City_interface } from "../interfaces/city_interface";
import { getAllCityAction } from "../state/action/city.action";
import { Trip_interface } from "../interfaces/trip_interface";

const Bookings = () => {
	enum BookingViews {
		NOOFTICKETS = "howmanytickets",
	}

	const { cities } = useAppSelector((state: any) => state.allCity);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [from, setFrom] = useState<string>("");
	const [to, setTo] = useState<string>("");
	const [flip, setFlip] = useState<"" | BookingViews>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [value, setValue] = useState(1);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [useDrawer, setUseDrawer] = useState(false);

	//PASSING DATA USING STATE
	const location = useLocation();
	const { startCity, destinationCity, destinationBusStop, startBusStop } =
		location.state || {};

	const [fromCity, setFromCity] = useState<string>(
		startCity || "Set your current city"
	);
	const [toCity, setToCity] = useState<string>(
		destinationCity || "Set your destination"
	);
	const [start, setstart] = useState<string>(
		startBusStop || "Select start bus stop"
	);
	const [destination, setdestination] = useState<string>(
		destinationBusStop || "Select destination bus stop"
	);

	//FOR DROPDOWNS OPEN AND CLOSE
	const [startCityIsOpen, setStartCityIsOpen] = useState(false);
	const [startBusStopIsOpen, setStartBusStopIsOpen] = useState(false);
	const [destinationCityIsOpen, setDestinationCityIsOpen] = useState(false);
	const [destinationBusStopIsOpen, setDestinationBusStopIsOpen] =
		useState(false);
	const [startBusStopList, setStartBusStopList] = useState<string[]>([]);
	const [desinationBusStopList, setDestinationBusStopList] = useState<string[]>(
		[]
	);
	const timeRegex = /^(\d{1,2}):(\d{2})(am|pm)$/;

	//RESPONSIVENESS
	//WHERE TO||LEFT COLUMN
	const [whereToToggle, setwhereToToggle] = useState(false);
	const whereToToggleClick = () => {
		setwhereToToggle(!whereToToggle);
	};

	//
	const {
		loading: availableTripLoading,
		error: availableTripError,
		trips: availableTripData,
	} = useAppSelector((state: any) => state.availableTrip);

	const FindAvailableTrip = () => {
		whereToToggleClick();
		if (from && to) {
			dispatch(getAvailableTripAction({ from: from, to: to }));
		} else {
			dispatch(getAllAvailableTripAction());
		}
	};

	const [modalData, setModalData] = useState<Trip_interface>(availableTripData);
	const handleOpenModal = (data: any, flipValue: any) => {
		setFlip(flipValue);
		setModalData(data);
		setModalVisible(true);
	};

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
		setFlip("");
	};

	const handleChange = (e: any) => {
		const inputValue = e.target.value;
		setValue(inputValue);
		// const formattedValue = inputValue.replace(regex, ",");
		// setValue(formattedValue);
	};

	const addItem = (noOfSeats: number) => {
		if (value < noOfSeats) {
			setValue(Number(value) + 1);
		}
	};
	const minusItem = () => {
		if (value > 1) setValue(Number(value) - 1);
	};

	//Check ScreenWidth to check what element to render
	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
		}

		if (screenWidth < 640) {
			setUseDrawer(true);
		} else {
			setUseDrawer(false);
		}

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [screenWidth]);

	//VALIDATE BUTTON BEFORE CLICK
	const isValid =
		fromCity !== "Set your current city" &&
		toCity !== "Set your destination" &&
		destination !== "Select destination bus stop" &&
		start !== "Select start bus stop";

	useEffect(() => {
		if (!availableTripData) {
			dispatch(getAllAvailableTripAction());
		}
	}, [availableTripData, dispatch]);

	useEffect(() => {
		if (!cities.length) {
			dispatch(getAllCityAction());
		}
	}, [cities, dispatch]);

	return (
		<Layout title="Fraser - Book a ride">
			<div className="relative h-24 bg-black -z-10 lg:h-32">
				<GeometricPatterns />
			</div>
			<div className="flex-col items-center justify-center overflow-y-scroll duration-300 ease-in-out lg:flex scroll-behavior-smooth">
				{/* COLUMN */}

				<div className="fixed w-full -mt-16 rounded-md lg:w-4/12 lg:mt-0 lg:mx-16 lg:my-32 lg:fixed lg:top-0 lg:left-0">
					<div className="mx-4 mb-2 lg:mb-0 lg:mx-0">
						<div
							className={
								whereToToggle === true
									? "lg:hidden py-6 px-6 lg:px-12 lg:mr-12 bg-white rounded-t-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
									: "lg:hidden py-6 px-6 lg:px-12 lg:mr-12 bg-white rounded-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
							}>
							{" "}
							<h3 className="w-1/2 text-lg font-semibold">Where to?</h3>{" "}
							{!whereToToggle ? (
								<BsChevronDown
									onClick={whereToToggleClick}
									className="cursor-pointer stroke-2 lg:hidden"
								/>
							) : (
								<BsChevronUp
									onClick={whereToToggleClick}
									className="cursor-pointer stroke-2 lg:hidden"
								/>
							)}
						</div>
					</div>
					<div className="flex-col w-full h-full lg:flex">
						{/* LEFT COLUMN */}
						<div className="w-full">
							<div
								className="mx-4 lg:w-4/12 lg:mx-16 lg:my-32 lg:fixed lg:top-0 lg:left-0 "
								//
							>
								<div
									className={
										whereToToggle === true
											? "pb-12 pt-8 px-6 lg:px-12 lg:mr-12 bg-white ease-in-out lg:pt-16 duration-300 rounded-b-md lg:rounded-md border-b border-[#EFF3EF]"
											: "hidden lg:block pb-12 pt-8 px-12 lg:mr-12  ease-in-out lg:pt-16 duration-300 bg-white lg:rounded-md rounded-b-md border-b border-[#EFF3EF]"
									}>
									{/* CITY SELECTION */}
									<div className="relative z-50 inline w-full text-left duration-300 ease-in-out">
										<label className="ml-2 text-sm text-gray-600">
											Pickup City
										</label>
										<button
											type="button"
											className="inline-flex w-full px-4 py-2 mt-1 mb-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
											onClick={() => {
												setStartCityIsOpen(!startCityIsOpen);
											}}>
											{fromCity}
											<FaCaretDown className="ml-auto" />
										</button>

										{startCityIsOpen && (
											<div className="absolute z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
												{cities
													.filter(
														(city: City_interface) => city?.city !== toCity
													)
													?.map((city: City_interface) => {
														return (
															<a
																key={city?._id}
																href="#"
																className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
																onClick={() => {
																	setFromCity(city?.city);
																	setStartBusStopList(city?.bus_stops);
																	setStartCityIsOpen(!startCityIsOpen);
																}}>
																{city?.city}
															</a>
														);
													})}
											</div>
										)}
									</div>

									{/* AFTER START CITY SELECTION */}
									<div
										className={`ease-in-out duration-300 relative w-full inline text-left z-40 `}>
										<label className="ml-2 text-sm text-gray-600">
											Pickup Station
										</label>

										{/* START BUSSTOP */}
										<button
											type="button"
											className="inline-flex w-full px-4 py-2 mt-1 mb-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
											onClick={() =>
												setStartBusStopIsOpen(!startBusStopIsOpen)
											}>
											{start}
											<FaCaretDown className="ml-auto" />
										</button>

										{startBusStopIsOpen && (
											<div className="absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
												{!startBusStopList ? (
													<div className="flex px-6 py-2 space-x-4 animate-pulse">
														<div className="flex-1 py-1 space-y-6">
															<div className="h-2 rounded bg-slate-200"></div>
															<div className="space-y-3">
																<div className="grid grid-cols-3 gap-4">
																	<div className="h-2 col-span-2 rounded bg-slate-200"></div>
																	<div className="h-2 col-span-1 rounded bg-slate-200"></div>
																</div>
																<div className="h-2 rounded bg-slate-200"></div>
															</div>
														</div>
													</div>
												) : (
													startBusStopList?.map((stops: string) => {
														return (
															<a
																key={stops}
																href="#"
																className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
																onClick={() => {
																	setstart(stops);
																	setFrom(stops);
																	setStartBusStopIsOpen(!startBusStopIsOpen);
																}}>
																{stops}
															</a>
														);
													})
												)}
											</div>
										)}
									</div>

									{/* DESTINATION */}

									<div className="relative z-30 inline w-full text-left duration-300 ease-in-out">
										<label className="ml-2 text-sm text-gray-600">
											Desitnation City
										</label>
										<button
											type="button"
											className="inline-flex w-full px-4 py-2 mt-1 mb-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
											onClick={() => {
												setDestinationCityIsOpen(!destinationCityIsOpen);
											}}>
											{toCity}
											<FaCaretDown className="ml-auto" />
										</button>
										{destinationCityIsOpen && (
											<div className="absolute z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
												{cities
													?.filter(
														(city: City_interface) => city?.city !== fromCity
													)
													?.map((city: City_interface) => {
														return (
															<a
																key={city?._id}
																href="#"
																className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
																onClick={() => {
																	setToCity(city?.city);
																	setDestinationCityIsOpen(
																		!destinationCityIsOpen
																	);
																	setDestinationBusStopList(city?.bus_stops);
																}}>
																{city?.city}
															</a>
														);
													})}
											</div>
										)}
									</div>

									{/* AFTER DESTINATION CITY SELECTION */}
									<div
										className={`ease-in-out duration-300 relative w-full inline text-left z-20 ${
											destinationCity === "Set your destination"
												? "hidden "
												: ""
										}`}>
										<label className="ml-2 text-sm text-gray-600">
											Destination Bus Stop
										</label>

										{/* START BUSSTOP */}
										<button
											type="button"
											className="inline-flex w-full px-4 py-2 mt-1 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
											onClick={() =>
												setDestinationBusStopIsOpen(!destinationBusStopIsOpen)
											}>
											{destination}
											<FaCaretDown className="ml-auto" />
										</button>

										{destinationBusStopIsOpen && (
											<div className="absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
												{!desinationBusStopList ? (
													<div className="flex px-6 py-2 space-x-4 animate-pulse">
														<div className="flex-1 py-1 space-y-6">
															<div className="h-2 rounded bg-slate-200"></div>
															<div className="space-y-3">
																<div className="grid grid-cols-3 gap-4">
																	<div className="h-2 col-span-2 rounded bg-slate-200"></div>
																	<div className="h-2 col-span-1 rounded bg-slate-200"></div>
																</div>
																<div className="h-2 rounded bg-slate-200"></div>
															</div>
														</div>
													</div>
												) : (
													desinationBusStopList?.map((stops: string) => {
														return (
															<a
																key={stops}
																href="#"
																className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
																onClick={() => {
																	setdestination(stops);
																	setTo(stops);
																	setDestinationBusStopIsOpen(
																		!destinationBusStopIsOpen
																	);
																}}>
																{stops}
															</a>
														);
													})
												)}
											</div>
										)}
									</div>
									<div>
										<Button
											title="Search Trips"
											loader={availableTripLoading}
											className={
												isValid
													? "w-full h-[52px] bg-[#00ff6a] hover:bg-[#58FF9E] mt-10 text-sm font-medium rounded-lg"
													: "w-full h-[52px] bg-[#f5f5f5] text-gray-500 mt-10 text-sm font-medium rounded-lg"
											}
											onClick={FindAvailableTrip}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* RIGHT COLUMN */}
						<div className="fixed w-full mt-4 overflow-y-scroll rounded-md lg:w-7/12 h-5/6 lg:mt-40 lg:mx-16 lg:my-32 scroll-behavior-smooth lg:fixed lg:top-0 lg:right-0">
							<div className="fixed w-full ">
								<div className="mx-4 -mt-1 lg:w-7/12 rounded-t-md lg:mx-16 lg:my-32 h-16 bg-[#ffffff] border-b z-10 justify-center items-center lg:fixed lg:top-0 lg:right-0">
									<h1 className="pt-4 mx-6 text-lg font-semibold lg:ml-12 lg:mt-2">
										Available Trips
									</h1>
								</div>
							</div>
							<div className="mx-4 lg:mx-0 ">
								{/* HEADER */}

								<div className="w-full px-8 py-4 pb-24 overflow-y-scroll bg-white rounded-md mt-14 lg:mt-0 lg:mb-16 lg:pb-12 lg:pt-16 lg:px-12 lg:py-0 h-max scroll-behavior-smooth">
									{availableTripLoading ? (
										<div className="flex px-6 py-2 mb-8 space-x-4 animate-pulse">
											<div className="flex-1 py-1 space-y-6">
												<div className="h-2 rounded bg-slate-200"></div>
												<div className="space-y-3">
													<div className="grid grid-cols-3 gap-4">
														<div className="h-2 col-span-2 rounded bg-slate-200"></div>
														<div className="h-2 col-span-1 rounded bg-slate-200"></div>
													</div>
													<div className="h-2 rounded bg-slate-200"></div>
												</div>
											</div>
										</div>
									) : availableTripError ? (
										<Alert
											message="An error occured"
											description={availableTripError}
											type="error"
											showIcon
										/>
									) : availableTripData?.length === 0 ? (
										<Alert
											type="info"
											message="Sorry there are no available trips to the destination selected"
										/>
									) : (
										availableTripData?.map((trip: Trip_interface) => {
											return (
												<BookingCard
													key={trip?._id}
													from={trip?.travel_destination?.from?.start_busstop}
													to={trip?.travel_destination?.to?.stop_busstop}
													takeOffTime={trip?.take_off_time}
													takeOffDate={trip?.take_off_date}
													price={trip?.price}
													arrivalTime={trip?.arrival_time}
													arrivalDate={trip?.arrival_date}
													onClick={() => {
														// console.log(trip?.no_of_seat);
														handleOpenModal(trip, "howmanytickets");
														// dispatch(addToMyBookinAction(trip));
														// navigate("/checkout");
													}}
												/>
											);
										})
									)}

									{/* {availableTripData?.length === 0 && (
                  <Alert
                    type="info"
                    message="Sorry there are no available trips to the destination selected"
                  />
                )}
                {availableTripError && (
                  <Alert
                    message="An error occured"
                    description={availableTripError}
                    type="error"
                    showIcon
                  />
                )} */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{useDrawer && flip === BookingViews.NOOFTICKETS && modalVisible && (
				<Drawer
					title={
						<div>
							<div className="mt-8 text-lg font-medium boder-b">
								Number of Tickets
							</div>
							<div className="text-[#929292] font-light text-xs mt-1">
								{" "}
								Available Seats: {modalData?.no_of_seat}
							</div>
							<div className="flex-row justify-between px-6 py-4 mt-6 bg-black rounded-lg lg:flex lg:px-8">
								<div className="flex lg:w-4/5">
									<div className="w-1/2 lg:w-1/3">
										<h3 className="mr-8 text-lg md:text-base lg:h-20 lg:mr-0 text-primary-100">
											{modalData?.travel_destination?.from?.start_busstop}
										</h3>
									</div>

									<BsArrowRight className="top-0 mt-1 mr-8 lg:w-4 lg:mr-14 lg:mr-0 text-primary-100 md:top-2 left-10 md:left-10" />
									<div className="w-1/2 lg:w-1/3 ">
										<h3 className="text-lg md:text-base lg:h-20 text-primary-100 ">
											{modalData?.travel_destination?.to?.stop_busstop}
										</h3>
									</div>
								</div>
							</div>
						</div>
					}
					placement="bottom"
					closable={false}
					onClose={handleCancel}
					open={modalVisible}
					key="bottom"
					className="rounded-t-xl"
					height="60vh">
					<div className="flex items-center mx-6 justify-evenly">
						<FaMinusCircle
							size={32}
							onClick={minusItem}
							className="cursor-pointer"
						/>
						<div className="w-full my-12 place-content-center">
							<input
								type="number"
								value={value}
								onChange={handleChange}
								placeholder="0"
								className=" w-full text-center rounded-md focus:outline-none focus:shadow-outline-blue placeholder-black text-[28px]"
							/>
						</div>
						<FaPlusCircle
							size={32}
							onClick={() => {
								addItem(modalData?.no_of_seat);
							}}
							className="cursor-pointer"
						/>
					</div>
					<Button
						title="Continue"
						className="w-full h-[48px] mb-8 lg:h-[40px] p-3 mt-4 lg:text-sm font-medium bg-[#00ff6a] hover:bg-[#58FF9E] hover:bg-[#58FF9E] rounded-lg "
						onClick={() => {
							dispatch(addToMyBookinAction(modalData));
							navigate("/checkout");
						}}
					/>
				</Drawer>
			)}

			{!useDrawer && flip === BookingViews.NOOFTICKETS && modalVisible && (
				<Modal
					title={
						<div>
							<div className="mt-8 text-lg font-medium boder-b">
								Number of Tickets
							</div>
							<div className="text-[#929292] font-light text-xs mt-1">
								{" "}
								Available Seats: {modalData?.no_of_seat}
							</div>
							<div className="flex-row px-6 py-4 mt-6 text-center bg-black rounded-lg justify-evenly lg:flex lg:px-8">
								<div className="flex lg:w-4/5">
									<div className="w-1/2 lg:w-1/3">
										<h3 className="mr-8 text-lg md:text-base lg:mr-0 text-primary-100">
											{modalData?.travel_destination?.from?.start_busstop}
										</h3>
									</div>

									<BsArrowRight className="top-0 mt-1 lg:w-4 lg:mr-0 text-primary-100 md:top-2 left-10 md:left-10" />
									<div className="w-1/2 lg:w-1/3 ">
										<h3 className="text-lg md:text-base text-primary-100 ">
											{modalData?.travel_destination?.to?.stop_busstop}
										</h3>
									</div>
								</div>
							</div>
						</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					//   width="240px"
				>
					<div className="flex items-center mt-6 justify-evenly">
						<FaMinusCircle
							size={32}
							onClick={minusItem}
							className="cursor-pointer"
						/>
						<div className="w-full my-8 place-content-center">
							<input
								type="number"
								value={value}
								onChange={handleChange}
								placeholder="0"
								className=" w-full text-center rounded-md focus:outline-none focus:shadow-outline-blue placeholder-black text-[28px]"
							/>
						</div>
						<FaPlusCircle
							size={32}
							onClick={() => {
								addItem(modalData?.no_of_seat);
							}}
							className="cursor-pointer"
						/>
					</div>
					<Button
						title="Continue"
						className="w-full h-[48px] mb-8 lg:h-[40px] p-3 mt-4 lg:text-sm font-medium bg-[#00ff6a] hover:bg-[#58FF9E] hover:bg-[#58FF9E] rounded-lg "
						onClick={() => {
							dispatch(addToMyBookinAction(modalData));
							navigate("/checkout");
						}}
					/>
				</Modal>
			)}
		</Layout>
	);
};

export default Bookings;
