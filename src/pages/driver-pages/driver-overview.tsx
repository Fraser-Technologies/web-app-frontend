import { Modal, Alert, Space } from "antd";
import { useEffect, useState } from "react";
import {
	FaStar,
	FaClock,
	FaCalendar,
	FaCheck,
	FaMinusCircle,
	FaChevronRight,
	FaPlay,
	FaBook,
	FaUser,
} from "react-icons/fa";
import { FraserButton } from "../../components/Button";
import moment from "moment";
import { RootState } from "../../state/redux-store";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Trip_interface } from "../../interfaces/trip_interface";
import { currency_formatter } from "../../utils/currency-formatter";
import {
	endTripAction,
	getTripByDriverAction,
	resetUpdateTripAction,
	unverifyPassengerOnboardAction,
	updateTripAction,
	verifyPassengerOnboardAction,
} from "../../state/action/trip.action";
import { Passenger_interface } from "../../interfaces/Booking_interface";
import { getBalanceByUserAction } from "../../state/action/balance.action";
import { getTheLatestByDate } from "../../utils/getTheLatestTripByDate";
import LoadingWheel from "../../components/loading-svg";

const DriverOverview = () => {
	enum DriverViews {
		VIEW = "view",
		MANIFEST = "manifest",
		ENDOUTBOUNDTRIP = "endoutboundtrip",
		ENDRETURNTRIP = "endreturntrip",
		STARTOUTBOUNDTRIP = "startOutBoundTrip",
		STARTRETURNTRIP = "startReturnTrip",
		TRIPINFO = "tripinformation",
	}
	const dispatch = useAppDispatch();

	const { trips } = useAppSelector((state: RootState) => state.tripByDriver);
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
	const { trip } = useAppSelector((state: RootState) => state.updateTrip);
	const { trip: endTripSuccess } = useAppSelector(
		(state: RootState) => state.endTrip
	);
	const { trip: onBoardedTrip } = useAppSelector(
		(state: RootState) => state.verifyPassengerOnboard
	);
	const { trip: unBoardedTrip } = useAppSelector(
		(state: RootState) => state.unverifyPassengerOnboard
	);
	const [visible, setVisible] = useState(false);
	const [flip, setFlip] = useState<"" | DriverViews>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [startOutBoundTrip, setstartOutBoundTrip] = useState(false);
	const [startReturnTrip, setstartReturnTrip] = useState(false);
	const [alertmessage, setAlertMessage] = useState("");
	const [selection, setSelection] = useState("Schedule");
	const [modalData, setModalData] = useState<Trip_interface | any>({});

	const handleClose = () => {
		setVisible(false);
	};

	const handleOpenModal = (data: Trip_interface, flipValue: any) => {
		setFlip(flipValue);
		setModalVisible(true);
		setModalData(data);
	};

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
		setFlip("");
	};

	const [dates, setDates] = useState<string[]>([]);
	const [disabledDates, setDisabledDates] = useState<string[]>([]);
	const [loadingIndex, setLoadingIndex] = useState<number>(-1);

	const TotalRating = (trips: Trip_interface[]): number => {
		let list_of_rating = [];
		for (let index = 0; index < trips?.length; index++) {
			const each_rating =
				trips[index]?.ratings?.reduce((total, num) => total + num) /
				trips[index]?.ratings?.length;
			list_of_rating.push(each_rating);
		}

		return (
			list_of_rating.reduce((total, num) => total + num) / list_of_rating.length
		);
	};

	useEffect(() => {
		let dateArray = [];
		for (let i = 0; i <= 7; i++) {
			dateArray.push(moment().add(i, "days").format("dddd Do MMMM YYYY"));
		}
		setDates(dateArray);
		setDisabledDates(dateArray.slice(3));
	}, []);

	useEffect(() => {
		dispatch(getTripByDriverAction(userInfo?._id));
	}, [dispatch, onBoardedTrip, userInfo, unBoardedTrip, endTripSuccess]);

	useEffect(() => {
		dispatch(getBalanceByUserAction());
	}, [dispatch]);

	useEffect(() => {
		dispatch(resetUpdateTripAction());
		if (trip || onBoardedTrip || unBoardedTrip) {
			dispatch(getTripByDriverAction(userInfo?._id));
		}
	}, [dispatch, onBoardedTrip, trip, unBoardedTrip, userInfo]);

	useEffect(() => {
		if (trips) {
			setModalData(trips.find((trip) => trip._id === modalData?._id));
		}
	}, [trips, onBoardedTrip, unBoardedTrip, modalData]);

	useEffect(() => {});
	return (
		<div className="pt-28 lg:pt-32">
			<div className="fixed bottom-0 flex items-center w-full mb-4 lg:hidden place-content-center">
				<div className="flex w-5/6 px-1 bg-black rounded-md">
					<div
						className={`text-center w-1/3 py-3 px-4 mx-1 my-2 rounded-md ${
							selection === "Schedule"
								? "bg-[#00FF6A] text-black"
								: "text-[#929292]"
						}`}
						onClick={() => {
							setSelection("Schedule");
						}}>
						Schedule
					</div>

					<div
						className={`text-center w-1/3 py-3 px-4 mx-1 my-2 rounded-md ${
							selection === "Info"
								? "bg-[#00FF6A] text-black"
								: "text-[#929292]"
						}`}
						onClick={() => {
							setSelection("Info");
						}}>
						Trips{" "}
					</div>
					<div
						className={`text-center w-1/3 py-3 px-4 mx-1 my-2 rounded-md ${
							selection === "History"
								? "bg-[#00FF6A] text-black"
								: "text-[#929292]"
						}`}
						onClick={() => {
							setSelection("History");
						}}>
						{" "}
						History{" "}
					</div>
				</div>
			</div>

			<div className="lg:mx-[120px] pb-24 lg:pb-0 text-[13px]">
				<div className="lg:grid lg:grid-cols-8 lg:gap-8">
					<div className={`col-start-1 text-black col-end-6 lg:mr-12`}>
						<div
							className={`${
								selection === "Schedule" ? "block mx-[18px] lg:mx-0" : "hidden"
							} `}>
							<Space direction="vertical" className="w-full mb-4">
								{visible && (
									<Alert
										className=""
										message={alertmessage}
										// message="thtahtahatatahathat"
										//ALERT MESSAGES INCLUDE - UPCOMING TRIP, TRIP START, TRIP END, NEW TRIP SCHEDULED
										type="error"
										closable
										afterClose={handleClose}
									/>
								)}
							</Space>
							<p className="pb-1 text-lg font-medium mb:text-base">
								Upcoming Trip Schedule
							</p>

							<div className="mt-2 lg:mt-4 lg:bg-black lg:px-6 py-4 rounded-md">
								<div className="p-4 bg-black rounded-md lg:p-0 ">
									<p className="border-b text-[#929292] text-[14px] lg: border-[#353535] py-2">
										Outbound Schedule
									</p>

									{trips?.filter(
										(trip: Trip_interface) =>
											trip?.completed_status === false &&
											trip?.trip_type === "outbound"
									).length === 0 ? (
										<div className="my-4 text-[#929292] ">
											You have no upcoming trips
										</div>
									) : (
										trips
											?.filter(
												(trip: Trip_interface) =>
													trip?.completed_status === false &&
													trip?.trip_type === "outbound"
											)
											.sort((a, b) => {
												const dateA = new Date(
													`${a?.take_off_date} ${a?.take_off_time}`
												);
												const dateB = new Date(
													`${b?.take_off_date} ${b?.take_off_time}`
												);
												return dateA.getTime() - dateB.getTime();
											})
											.slice(0, 1)
											.map((trip: Trip_interface) => {
												return (
													<div className="items-center justify-between lg:flex lg:mt-2">
														<div className="py-3 rounded-md lg:py-0">
															<p className="text-xl text-white lg:text-base">
																{`${trip?.travel_destination?.from?.city?.city} to ${trip?.travel_destination?.to?.city?.city}`}
															</p>
															<div className="text-[#929292] flex mt-2 lg:mt-0">
																<div className="flex items-center mt-1 mr-4">
																	<FaCalendar className="mr-2" />
																	{trip?.take_off_date}
																</div>
																<div className="flex items-center mt-1">
																	<FaClock className="mr-2" />
																	{trip?.take_off_time}
																</div>
															</div>

															{/* SEE MORE IS HIDDEN ON RESPONSIVE VIEW */}
															<div
																className="text-[10px] text-[#00FF6A] mt-3 cursor-pointer hidden lg:block"
																onClick={() => {
																	handleOpenModal(trip, "tripinformation");
																}}>
																see more
															</div>
														</div>

														<div className="flex w-full mt-6 mb-2 lg:mb-0 lg:mt-0 lg:w-2/4">
															<FraserButton
																title="View Manifest"
																type="submit"
																className="lg:block hidden w-full mr-4"
																size="small"
																onClick={() => {
																	handleOpenModal(trip, "manifest");
																}}
																buttonType="secondary"
																buttonActionType={"regular"}
																active={true}
															/>
															<FraserButton
																title={
																	trip?.has_started ? "End Trip" : "Start Trip"
																}
																size="regular"
																type="submit"
																className={`w-full lg:block hidden ${
																	trip?.has_started && "bg-[#E71D36] text-white"
																}`}
																buttonType="primary"
																buttonActionType={
																	!trip?.has_started ? "regular" : "destructive"
																}
																active={true}
																onClick={() => {
																	if (!trip?.has_started) {
																		handleOpenModal(trip, "startOutBoundTrip");
																	}
																	if (trip?.has_started) {
																		handleOpenModal(trip, "endoutboundtrip");
																	}
																}}
															/>

															{/* RESPONSIVE MENU ICONS FOR TRIP SCHEDULE CARD */}
															<div
																className="w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] py-2 lg:py-0 my-1 lg:mr-4 text-xs rounded-md bg-[#161616] cursor-pointer block lg:hidden flex flex-col items-center"
																onClick={() => {
																	handleOpenModal(trip, "manifest");
																}}>
																<div className="flex flex-col items-center m-auto">
																	<FaBook className="m-auto mt-1 mb-2 text-white" />
																	Manifest
																</div>
															</div>
															<div
																className={`w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] my-1 lg:mr-4 text-xs rounded-md cursor-pointer block lg:hidden flex flex-col items-center  ${
																	startOutBoundTrip
																		? "bg-[#E71D36] text-white"
																		: "bg-[#161616]"
																}`}
																onClick={() => {
																	if (!startOutBoundTrip) {
																		handleOpenModal(trip, "startOutBoundTrip");
																	}
																	if (startOutBoundTrip) {
																		handleOpenModal(trip, "endoutboundtrip");
																	}
																}}>
																<div
																	className={`m-auto flex flex-col items-center`}>
																	<FaPlay className="m-auto mt-1 mb-2 text-white" />
																	{startOutBoundTrip
																		? "End Trip"
																		: "Start Trip"}
																</div>
															</div>
															<div
																className="w-full h-[56px] lg:h-[40px] my-1 lg:mr-4  text-xs rounded-md bg-[#161616] lg:bg-[#00FF6A] cursor-pointer block lg:hidden flex items-center"
																onClick={() => {
																	handleOpenModal(trip, "tripinformation");
																}}>
																<div className="flex flex-col items-center m-auto">
																	<FaChevronRight className="m-auto mt-1 mb-2 text-white" />
																	View Details
																</div>
															</div>
														</div>
													</div>
												);
											})
									)}
								</div>

								{/* RETURN */}
								<div className="mt-2 lg:mt-4 text-[#929292] lg:bg-black pb-4 pt-2 rounded-md">
									<div className="p-4 bg-black rounded-md lg:p-0 ">
										<p className="border-b text-[14px] lg:text-sm border-[#353535] py-2">
											Return Schedule
										</p>
										{trips
											?.filter(
												(trip: Trip_interface) =>
													trip?.completed_status !== true &&
													trip?.trip_type === "return"
											)
											.map((trip: Trip_interface) => {
												return (
													<div className="items-center justify-between lg:flex lg:mt-3">
														<div className="py-3 rounded-md lg:py-0">
															<p className="text-xl text-white lg:text-base">
																{`${trip?.travel_destination?.from?.city?.city} to ${trip?.travel_destination?.to?.city?.city}`}
															</p>
															<div className="flex mt-2 lg:mt-0">
																<div className="flex items-center mt-1 mr-4">
																	<FaCalendar className="mr-2" />
																	{trip?.take_off_date}
																</div>
																<div className="flex items-center mt-1">
																	<FaClock className="mr-2" />
																	{trip?.take_off_time}
																</div>
															</div>
															<div
																className="text-[10px] text-[#00FF6A] mt-3 cursor-pointer hidden lg:block"
																onClick={() => {
																	handleOpenModal(trip, "tripinformation");
																}}>
																see more
															</div>
														</div>

														<div className="flex w-full mt-6 mb-2 lg:mb-0 lg:mt-0 lg:w-2/4">
															<FraserButton
																size="regular"
																title="View Manifest"
																type="submit"
																className="lg:block hidden w-full h-[48px] lg:h-[40px] mr-2 my-1 lg:mb-0 text-xs rounded-md border border-[#ffffff] text-white"
																onClick={() => {
																	handleOpenModal(trip, "manifest");
																}}
															/>
															<FraserButton
																size="regular"
																title={
																	startReturnTrip ? "End Trip" : "Start Trip"
																}
																type="submit"
																buttonActionType={
																	startReturnTrip ? "destructive" : "regular"
																}
																className={`lg:block hidden`}
																onClick={() => {
																	if (!startReturnTrip) {
																		handleOpenModal(trip, "startReturnTrip");
																	}
																	if (startReturnTrip) {
																		handleOpenModal(trip, "endreturntrip");
																	}
																}}
															/>
															{/* RESPONSIVE MENU ICONS FOR TRIP SCHEDULE CARD */}
															<div
																className="w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] py-2 lg:py-0 my-1 lg:mr-4 text-xs rounded-md bg-[#161616] cursor-pointer block lg:hidden flex flex-col items-center"
																onClick={() => {
																	handleOpenModal(trip, "manifest");
																}}>
																<div className="flex flex-col items-center m-auto">
																	<FaBook className="m-auto mt-1 mb-2 text-white" />
																	Manifest
																</div>
															</div>
															<div
																className={`w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] my-1 lg:mr-4 text-xs rounded-md cursor-pointer block lg:hidden flex flex-col items-center ${
																	startReturnTrip
																		? "bg-[#E71D36] text-white"
																		: "bg-[#161616]"
																}`}
																onClick={() => {
																	if (!startReturnTrip) {
																		handleOpenModal(trip, "startReturnTrip");
																	}
																	if (startReturnTrip) {
																		handleOpenModal(trip, "endreturntrip");
																	}
																}}>
																<div
																	className={`m-auto flex flex-col items-center `}>
																	<FaPlay className="m-auto mt-1 mb-2 text-white" />
																	{startReturnTrip ? "End Trip" : "Start Trip"}
																</div>
															</div>
															<div
																className="w-full h-[56px] lg:h-[40px] my-1 lg:mr-4  text-xs rounded-md bg-[#161616] lg:bg-[#00FF6A] cursor-pointer block lg:hidden flex items-center"
																onClick={() => {
																	handleOpenModal(trip, "tripinformation");
																}}>
																<div className="flex flex-col items-center m-auto">
																	<FaChevronRight className="m-auto mt-1 mb-2 text-white" />
																	View Details
																</div>
															</div>
														</div>
													</div>
												);
											})}
									</div>
								</div>
							</div>
						</div>

						{/* TRIP HISTORY  */}
						<div
							className={`${
								selection === "History"
									? "block lg:mt-8 mx-[18px] lg:mx-0"
									: "hidden"
							} lg:block`}>
							<p className="pb-2 mt-6 text-lg font-medium lg:mt-8 mb:text-base">
								Trip History
							</p>
							{trips.filter(
								(trip: Trip_interface) => trip?.completed_status === true
							).length === 0 ? (
								<Alert
									type="info"
									message="You haven't completed any trips yet"
									onClick={() => {
										console.log(trips.length);
									}}
									className="w-full"
								/>
							) : (
								<table className="w-full mt-2 font-normal text-left text-white table-auto lg:text-base">
									<thead className="bg-black ">
										<tr>
											<th
												scope="col"
												className="px-2 py-4 pl-4 font-normal rounded-l-md lg">
												Trips
											</th>
											<th scope="col" className="py-4 font-normal">
												Date
											</th>
											<th
												scope="col"
												className="px-4 py-4 font-normal text-center">
												Passengers
											</th>
											<th
												scope="col"
												className="px-2 py-4 font-normal text-center rounded-r-md">
												Earning
											</th>
										</tr>
									</thead>

									{/* //TABLE ROWS */}

									<tbody className="">
										{trips
											.filter(
												(trip: Trip_interface) =>
													trip?.completed_status === true
											)
											?.map((trip: Trip_interface) => {
												return (
													<tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
														<td
															onClick={() => {
																handleOpenModal(trip, "view");
															}}
															className="py-4 pl-4 text-gray-700">
															{`${trip?.travel_destination?.from?.city?.city} to ${trip?.travel_destination?.to?.city?.city}`}
														</td>
														<td
															onClick={() => {
																handleOpenModal(trip, "view");
															}}
															className="py-4 text-gray-700 ">
															{trip?.arrival_date}
														</td>
														<td
															onClick={() => {
																handleOpenModal(trip, "view");
															}}
															className="px-4 py-4 text-center text-gray-700">
															{
																trip?.passengers?.filter(
																	(item: any) => item.isOnboard
																).length
															}
														</td>

														<td
															onClick={() => {
																handleOpenModal(trip, "view");
															}}
															className="px-4 py-4 text-center text-gray-700">
															{currency_formatter(trip?.amount_earned)}
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							)}
						</div>
					</div>

					{/* COLUM ON RIGHT */}
					<div
						className={` col-start-6 mt-6 lg:mt-0 col-end-9 overflow-y-scroll h-[70vh] lg:h-[80vh] text-black border bg-white lg:fixed lg:w-2/6 right-0 lg:mr-[120px] rounded-md  ${
							selection === "Info"
								? "block lg:mt-8 mx-[18px] lg:mx-0"
								: "hidden"
						} lg:block`}>
						<div className="flex px-4 pt-4 pb-6 text-white bg-black border-b lg:fixed lg:w-2/6 rounded-t-md">
							<div className="">
								<p className="text-sm mb-2 font-normal text-[#929292]">
									Trips Completed
								</p>
								<h3 className="text-[18px] font-medium">
									{
										trips?.filter(
											(trip: Trip_interface) => trip.completed_status === true
										).length
									}
								</h3>
							</div>
							<div className="mx-auto ">
								<p className=" mb-2 font-normal text-[#929292]">Rating</p>
								<h3 className="text-[18px] font-medium flex items-center">
									<FaStar className="text-[#FCAB64] h-[16px] mr-1" />
									{Number(TotalRating)}
								</h3>
							</div>
						</div>
						<div className="w-full px-4 pt-4 pb-4 rounded-md lg:mt-24 lg">
							<div className="mb-8">
								<h3 className="mb-4 text-base font-medium">
									Your Upcoming Trips
								</h3>
								{trips?.filter(
									(trip: Trip_interface) => trip?.completed_status === false
								).length === 0 && (
									<Alert
										type="info"
										message="You have no upcoming trips"
										onClick={() => {
											console.log(trips.length);
										}}
										className="w-full"
									/>
								)}
								{trips
									?.filter(
										(trip: Trip_interface) => trip?.completed_status === false
									)
									.sort((a, b) => {
										const dateA = new Date(
											`${a?.take_off_date} ${a?.take_off_time}`
										);
										const dateB = new Date(
											`${b?.take_off_date} ${b?.take_off_time}`
										);
										return dateA.getTime() - dateB.getTime();
									})
									.map((trip: Trip_interface) => (
										<div
											className="flex items-center justify-between px-6 py-4 mb-3 bg-black rounded-md"
											// key={index}
										>
											<div className="py-3 rounded-md lg:py-0">
												<p className="text-xl text-white lg:text-base">
													{`${trip?.travel_destination?.from?.city?.city} to ${trip?.travel_destination?.to?.city?.city}`}
												</p>
												<div className="flex mt-2 text-gray-600 lg:mt-2">
													<div className="flex items-center mt-1 mr-4">
														<FaCalendar className="mr-2" />
														{trip?.take_off_date}
													</div>
													<div className="flex items-center mt-1">
														<FaClock className="mr-2" />
														{trip?.take_off_time}
													</div>
												</div>
												<div
													className="text-[10px] text-[#00FF6A] mt-2 cursor-pointer hidden lg:block"
													onClick={() => {
														handleOpenModal(trip, "tripinformation");
													}}>
													see more
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>

				{/* TABLE */}
			</div>

			{flip === DriverViews.VIEW && modalVisible && (
				<Modal
					title={
						<div className="text-lg font-medium boder-b">
							Lagos to Ibadan Trip
						</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="grid w-full grid-cols-2 gap-8 pb-12 mt-8">
						<div>
							<div className="mb-1 text-gray-400">Start</div>
							<div className="text-xs">
								{modalData?.travel_destination?.from?.city?.city}
							</div>
						</div>

						<div>
							<div className="mb-1 text-gray-400">Destination</div>
							<div className="text-xs">
								{modalData?.travel_destination?.to?.city?.city}
							</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Start Bus Stop</div>
							<div className="text-xs">
								{modalData?.travel_destination?.from?.start_busstop}
							</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Destination Bus Stop</div>
							<div className="text-xs">
								{modalData?.travel_destination?.to?.stop_busstop}
							</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Departure Time</div>
							<div className="text-xs">{modalData?.take_off_time}</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Departure Date</div>
							<div className="text-xs">{modalData?.take_off_date}</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Arrival Time</div>
							<div className="text-xs">{modalData?.arrival_time}</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Arrival Date</div>
							<div className="text-xs">{modalData?.arrival_date}</div>
						</div>

						<div>
							<div className="mb-1 text-gray-400">Amount Earned</div>
							<div className="text-xs">
								{currency_formatter(modalData?.amount_earn)}
							</div>
						</div>
					</div>
				</Modal>
			)}
			{flip === DriverViews.STARTOUTBOUNDTRIP && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width="240px">
					<div className="w-full mt-8 leading-5 text-center place-items-center">
						Starting a trip means all users are aboard <div></div>
						<div className="mt-6 text-base font-medium">Start the trip?</div>
					</div>

					<div className="mt-6">
						<FraserButton
							title={`Yes`}
							size="small"
							className="w-full mb-4"
							onClick={() => {
								dispatch(
									updateTripAction(modalData?._id, {
										has_started: true,
										start_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
									})
								);
								setstartOutBoundTrip(!startOutBoundTrip);
								setVisible(true);
								setAlertMessage(`Trip Started at ${moment().toNow()}`);
								setModalVisible(false);
							}}
						/>
						<FraserButton
							size="small"
							title="No"
							buttonType="secondary"
							secondaryColor="black"
							className="w-full"
							onClick={() => {
								setModalVisible(!modalVisible);
							}}
						/>
					</div>
				</Modal>
			)}
			{flip === DriverViews.STARTRETURNTRIP && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width="240px">
					<div className="w-full mt-8 text-center place-items-center">
						Starting a trip means all users are aboard, <div></div>
						<div className="mt-4 text-base font-medium">Start the trip?</div>
					</div>

					<div className="flex mt-6">
						<FraserButton title="No" size="regular" onClick={() => {}} />
						<FraserButton
							title={`Yes`}
							size="regular"
							type="submit"
							onClick={() => {
								// setstartOutBoundTrip(!startOutBoundTrip);
								setstartReturnTrip(!startReturnTrip);
								setVisible(true);
								setAlertMessage(
									`Trip Started, your ETA is ${moment(Date.now())}`
								);
								setModalVisible(false);
								dispatch(
									updateTripAction(modalData?._id, {
										has_started: true,
										start_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
									})
								);
							}}
						/>
					</div>
				</Modal>
			)}

			{/* WHEN A TRIP ENDS, REMOVE THE TRIP FROM THE UPCOMING SCHEDULE */}
			{flip === DriverViews.ENDOUTBOUNDTRIP && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width="240px">
					<div className="w-full mt-8 text-center place-items-center">
						Ending a trip means the trip is completed.
						<div className="mt-4 text-base font-medium">End the trip?</div>
					</div>

					<div className="flex mt-6">
						<FraserButton
							title="No"
							size="small"
							type="submit"
							className="w-full py-2 mr-2 text-xs text-gray-600 border border-gray-500 rounded-md"
							onClick={() => {}}
						/>
						<FraserButton
							title={`Yes`}
							size="small"
							type="submit"
							className="w-full py-2 text-xs text-white bg-black rounded-md"
							onClick={() => {
								setstartOutBoundTrip(!startOutBoundTrip);
								setVisible(true);
								setAlertMessage("Great Job! Trip Completed successfully");
								setModalVisible(false);
								dispatch(endTripAction(modalData?._id));
							}}
						/>
					</div>
				</Modal>
			)}
			{flip === DriverViews.ENDRETURNTRIP && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width="240px">
					<div className="w-full mt-8 text-center place-items-center">
						Ending a trip means the trip is completed.
						<div className="mt-4 text-base font-medium">End the trip?</div>
					</div>

					<div className="flex mt-6">
						<FraserButton
							title="No"
							size="small"
							type="submit"
							className="w-full py-2 mr-2 text-xs text-gray-600 border border-gray-500 rounded-md"
							onClick={() => {}}
						/>
						<FraserButton
							title={`Yes`}
							size="small"
							type="submit"
							className="w-full py-2 text-xs text-white bg-black rounded-md"
							onClick={() => {
								dispatch(
									updateTripAction(modalData?._id, {
										has_started: false,
										has_ended: true,
										completed_status: true,
										end_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
									})
								);
								setstartReturnTrip(!startReturnTrip);
								setVisible(true);
								setAlertMessage("Great Job! Trip Completed successfully");
								setModalVisible(false);
							}}
						/>
					</div>
				</Modal>
			)}
			{flip === DriverViews.MANIFEST && modalVisible && (
				<Modal
					title={
						<div className="">
							<p className="mb-4 text-lg font-medium">Passenger Manifest</p>
							<p className="text-base font-normal">{`${modalData?.travel_destination?.from?.city?.city} to ${modalData?.travel_destination?.to?.city?.city} Trip`}</p>

							<div className="flex w-full bg-black rounded-md px-2 pt-1 pb-3 font-normal text-[14px] text-white my-2">
								<div className="w-full flex mt-2 mr-2 rounded-md ">
									<div className="ml-2">
										<p className="mb-1 text-gray-500">Passengers</p>
										<p className="text-lg">{modalData?.passengers.length} </p>
									</div>
								</div>
								<div className="w-full flex mt-2 mr-2 rounded-md ">
									<div className="ml-2">
										<p className="mb-1 text-gray-500">Onboard</p>
										<p className=" text-lg">
											{
												modalData?.passengers?.filter(
													(item: any) => item.isOnboard
												).length
											}{" "}
										</p>
									</div>
								</div>
								<div className="w-full flex mt-2 mr-2 rounded-md ">
									<div className="ml-2">
										<p className="mb-1 text-gray-500">Not Onboard</p>
										<p className=" text-lg">
											{
												modalData?.passengers?.filter(
													(item: any) => !item.isOnboard
												).length
											}
										</p>
									</div>
								</div>
							</div>

							<table className="w-full mt-4 text-base font-normal text-left text-white table-auto">
								<thead className="bg-black w-full text-white">
									<tr>
										<th
											scope="col"
											className="px-2 py-2 pl-4 font-normal rounded-l-md">
											Name
										</th>
										<th
											scope="col"
											className="px-2 py-2 font-normal text-center rounded-r-md">
											Action
										</th>
									</tr>
								</thead>
							</table>
						</div>
					}
					className=""
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="h-[60vh] overflow-y-scroll">
						<table className="w-full mt-2 text-base font-normal text-left text-white table-auto">
							{/* //TABLE ROWS */}
							<tbody className="mt-4">
								{modalData?.passengers
									?.slice()
									.sort((a: { isOnboard: any }, b: { isOnboard: any }) => {
										if (a?.isOnboard && !b?.isOnboard) {
											return 1;
										}
										if (!a?.isOnboard && b?.isOnboard) {
											return -1;
										}
										return 0;
									})
									.map((passenger: Passenger_interface, index: number) => {
										const isLoading = loadingIndex === index;
										return (
											<tr
												key={passenger._id}
												className="border-b cursor-pointer border-slate-100 hover:bg-gray-50">
												<td
													onClick={() => {}}
													className="py-4 pl-4 text-gray-700">
													{/* Amen Olabode */}
													{passenger?.name}
												</td>
												<td
													onClick={() => {}}
													className="text-center text-gray-700 ">
													<div className="flex items-center h-full m-auto place-content-end">
														<div
															className={`flex items-center text-black mr-2 py-2 px-4 border rounded-md 
                            														${
																													passenger.isOnboard
																														? "border-[#00FF6A] bg-[#00FF6A]"
																														: "border-black "
																												} `}>
															{passenger.isOnboard ? (
																<div
																	className="flex flex-row items-center"
																	onClick={() => {
																		setLoadingIndex(index);

																		dispatch(
																			unverifyPassengerOnboardAction(
																				modalData?._id,
																				passenger?._id
																			)
																		).finally(() => {
																			setLoadingIndex(-1);
																		});
																	}}>
																	{isLoading ? (
																		<LoadingWheel param={isLoading} />
																	) : (
																		<FaMinusCircle className="mr-2" />
																	)}

																	<span> Onboarded</span>
																</div>
															) : (
																<div
																	className="flex flex-row items-center"
																	onClick={() => {
																		setLoadingIndex(index);
																		dispatch(
																			verifyPassengerOnboardAction(
																				modalData?._id,
																				passenger?._id
																			)
																		).finally(() => {
																			setLoadingIndex(-1);
																		});
																	}}>
																	{isLoading ? (
																		<LoadingWheel param={isLoading} />
																	) : (
																		<FaCheck className="mr-2" />
																	)}
																	<span>Onboard </span>
																</div>
															)}
														</div>
														<a href={`tel:${passenger.phone}`}>
															<div
																className={`bg-[#00FF6A] px-6 py-2 rounded-md border border-[#00FF6A] text-black ${
																	passenger.isOnboard ? "hidden" : "block"
																}`}>
																{/* INITIATE A CALL TO THE USER'S NUMBER */}
																Call
															</div>
														</a>
													</div>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				</Modal>
			)}
			{flip === DriverViews.TRIPINFO && modalVisible && (
				<Modal
					title={
						<div className="text-xs font-medium boder-b">Trip Details</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="grid w-full grid-cols-2 gap-8 pb-12 mt-12">
						<div>
							<div className="mb-1 text-gray-400">Start</div>
							<div className="text-xs">
								{`${modalData?.travel_destination?.from?.city?.city}`}
							</div>
						</div>

						<div>
							<div className="mb-1 text-gray-400">Destination</div>
							<div className="text-xs">
								{`${modalData?.travel_destination?.to?.city?.city}`}
							</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Start Bus Stop</div>
							<div className="text-xs">
								{modalData?.travel_destination?.from?.start_busstop}
							</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Destination Bus Stop</div>
							<div className="text-xs">
								{modalData?.travel_destination?.to?.stop_busstop}
							</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Departure Time</div>
							<div className="text-xs">{modalData?.take_off_time}</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Date</div>
							<div className="text-xs">{modalData?.take_off_date}</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Driver</div>
							<div className="text-xs">{`${modalData?.driver?.first_name} ${modalData?.driver?.last_name}`}</div>
						</div>
						<div>
							<div className="mb-1 text-gray-400">Vehicle</div>
							<div className="text-xs">{modalData?.bus?.name}</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default DriverOverview;
