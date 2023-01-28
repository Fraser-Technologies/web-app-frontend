import { Modal, Alert, Switch, Space, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
	FaStar,
	FaClock,
	FaCalendar,
	FaCheck,
	FaMinusCircle,
	FaChevronRight,
} from "react-icons/fa";
import { Button } from "../Button";
import moment from "moment";
import { RootState } from "../../state/redux-store";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Trip_interface } from "../../interfaces/trip_interface";
import { currency_formatter } from "../../utils/currency-formatter";
import {
	getTripByDriverAction,
	resetUpdateTripAction,
	updateTripAction,
} from "../../state/action/trip.action";
import { Booking_interface } from "../../interfaces/Booking_interface";

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
	const { trip, loading, error } = useAppSelector(
		(state: RootState) => state.updateTrip
	);
	const [visible, setVisible] = useState(true);
	const [flip, setFlip] = useState<"" | DriverViews>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [onboard, setOnboard] = useState(false);
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

	const verifyPassengerArrived = () => {};

	const TotalRating = (trips: Trip_interface[]): number => {
		let list_of_rating = [];
		for (let index = 0; index < trips.length; index++) {
			const each_rating =
				trips[index]?.ratings.reduce((total, num) => total + num) /
				trips[index].ratings.length;
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
	}, [dispatch, userInfo]);

	useEffect(() => {
		if (trip?._id) {
			dispatch(resetUpdateTripAction());
			dispatch(getTripByDriverAction(userInfo?._id));
		}
	}, [dispatch, trip, userInfo]);
	return (
		<>
			<div className="fixed bottom-0 flex items-center w-full mb-4 lg:hidden place-content-center">
				<div className="flex w-5/6 px-1 text-white bg-black rounded-md">
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
					<div
						className={`text-center w-1/3 py-3 px-4 mx-1 my-2 rounded-md ${
							selection === "Info"
								? "bg-[#00FF6A] text-black"
								: "text-[#929292]"
						}`}
						onClick={() => {
							setSelection("Info");
						}}>
						Info{" "}
					</div>
				</div>
			</div>
			<Space direction="vertical" className="items-center w-full mt-4">
				{visible && (
					<Alert
						className="text-sm"
						message={alertmessage}
						//ALERT MESSAGES INCLUDE - UPCOMING TRIP, TRIP START, TRIP END, NEW TRIP SCHEDULED
						type="success"
						closable
						afterClose={handleClose}
					/>
				)}
			</Space>

			<div className=" lg:mx-[120px] pb-24 lg:pb-0 text-sm">
				<div className="lg:grid lg:grid-cols-8 lg:gap-8">
					<div className={`col-start-1 text-black col-end-6`}>
						<div
							className={`${
								selection === "Schedule" ? "block  mx-[18px]" : "hidden"
							} `}>
							<p className="pb-2 text-lg font-medium mb:text-base">
								Upcoming Trip Schedule
							</p>
							{/* <div className="w-fit bg-[#000000] rounded-mdl py-2 px-4 text-[#00FF6A] font-medium">
              Feb 3rd, 2023
            </div> */}

							<div className="mt-2 lg:mt-4 text-[#929292] lg:bg-black lg:px-4 pb-4 pt-2 rounded-md">
								<div className="p-4 bg-black rounded-md lg:p-0 ">
									<p className="border-b text-[14px] lg:text-sm border-[#353535] py-2">
										Outbound Schedule
									</p>
									{trips
										?.filter(
											(trip: Trip_interface) =>
												trip?.completed_status !== true &&
												trip?.trip_type !== "outbound"
										)
										.map((trip: Trip_interface) => {
											return (
												<div className="items-center justify-between lg:flex lg:mt-3">
													<div className="py-3 rounded-md lg:py-0">
														<p className="text-xl text-white lg:text-base">
															{`${trip?.travel_destination?.from?.city?.city} to ${trip?.travel_destination?.to?.city?.city}`}
														</p>
														<div className="flex mt-2 lg:mt-4">
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

													<div className="w-full mt-6 mb-2 lg:flex lg:mb-0 lg:mt-0 lg:w-2/4">
														<Button
															title="View Manifest"
															type="submit"
															className="w-full h-[48px] lg:h-[40px] mr-4 my-1 mb-3 lg:mb-0 text-xs rounded-md border border-[#ffffff] text-white"
															onClick={() => {
																handleOpenModal(trip, "manifest");
															}}
														/>
														<Button
															title={
																startOutBoundTrip ? "End Trip" : "Start Trip"
															}
															type="submit"
															className={`w-full h-[48px] lg:h-[40px] my-1 lg:mr-4 text-xs rounded-md ${
																startOutBoundTrip
																	? "bg-[#E71D36] text-white"
																	: "bg-[#00FF6A] text-black"
															}`}
															onClick={() => {
																if (!startOutBoundTrip) {
																	handleOpenModal(trip, "startOutBoundTrip");
																}
																if (startOutBoundTrip) {
																	handleOpenModal(trip, "endoutboundtrip");
																}
															}}
														/>
													</div>
												</div>
											);
										})}
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
													trip?.trip_type !== "return"
											)
											.map((trip: Trip_interface) => {
												return (
													<div className="items-center justify-between lg:flex lg:mt-3">
														<div className="py-3 rounded-md lg:py-0">
															<p className="text-xl text-white lg:text-base">
																{`${trip?.travel_destination?.from?.city?.city} to ${trip?.travel_destination?.to?.city?.city}`}
															</p>
															<div className="flex mt-2 lg:mt-4">
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

														<div className="flex w-full mt-6 mb-2 lg:mb-0 lg:mt-0 lg:w-2/4">
															<Button
																title="View Manifest"
																type="submit"
																className="w-full h-[48px] lg:h-[40px] mr-2 my-1 lg:mb-0 text-xs rounded-md border border-[#ffffff] text-white"
																onClick={() => {
																	handleOpenModal(trip, "manifest");
																}}
															/>
															<Button
																title={
																	startReturnTrip ? "End Trip" : "Start Trip"
																}
																type="submit"
																className={`w-full h-[48px] lg:h-[40px] my-1 mr-2 text-xs rounded-md ${
																	startReturnTrip
																		? "bg-[#E71D36] text-white"
																		: "bg-[#00FF6A] text-black"
																}`}
																onClick={() => {
																	if (!startReturnTrip) {
																		handleOpenModal(trip, "startReturnTrip");
																	}
																	if (startReturnTrip) {
																		handleOpenModal(trip, "endreturntrip");
																	}
																}}
															/>
															<div
																className="w-full h-[48px] lg:h-[40px] my-1 lg:mr-4  text-xs rounded-md bg-[#00FF6A] cursor-pointer block lg:hidden flex items-center"
																onClick={() => {
																	handleOpenModal(trip, "tripinformation");
																}}>
																<FaChevronRight className="m-auto text-black" />
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
								selection === "History" ? "block mt-8" : "hidden mt-8"
							} lg:block`}>
							<p className="text-base font-medium ">
								Trip History{" "}
								{trips?.filter(
									(trip: Trip_interface) => trip?.completed_status !== false
								) && (
									<Alert
										type="info"
										message="You haven't completed any trip yet"
									/>
								)}
							</p>
							<table className="w-full mt-2 text-base font-normal text-left text-white table-auto">
								<thead className="bg-black ">
									<tr>
										<th
											scope="col"
											className="px-2 py-4 pl-4 text-sm font-normal rounded-mdlg">
											Trips
										</th>
										<th scope="col" className="py-4 text-sm font-normal">
											Date
										</th>
										<th
											scope="col"
											className="px-4 py-4 text-sm font-normal text-center">
											Passengers
										</th>

										<th
											scope="col"
											className="px-2 py-4 text-sm font-normal text-center">
											Rating
										</th>
										<th
											scope="col"
											className="px-2 py-4 ttrip?.ext-sm font-normal text-center rounded-mdlg">
											Earning
										</th>
									</tr>
								</thead>

								{/* //TABLE ROWS */}

								<tbody className="">
									{trips
										?.filter(
											(trip: Trip_interface) => trip?.completed_status !== false
										)
										.map((trip: Trip_interface) => {
											return (
												<tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
													<td
														onClick={() => {
															handleOpenModal(trip, "view");
														}}
														className="py-4 pl-4 text-sm text-gray-700">
														{`${trip?.travel_destination?.from?.city?.city} to ${trip?.travel_destination?.to?.city?.city}`}
													</td>
													<td
														onClick={() => {
															handleOpenModal(trip, "view");
														}}
														className="py-4 text-sm text-gray-700 ">
														{trip?.arrival_date}
													</td>
													<td
														onClick={() => {
															handleOpenModal(trip, "view");
														}}
														className="px-4 py-4 text-sm text-center text-gray-700">
														{trip?.no_of_seat}
													</td>
													<td
														onClick={() => {
															handleOpenModal(trip, "view");
														}}
														className="text-sm text-center text-gray-700">
														{trip?.ratings?.reduce(
															(total, num) => total + num
														) / trip?.ratings?.length}
													</td>
													<td
														onClick={() => {
															handleOpenModal(trip, "view");
														}}
														className="px-4 py-4 text-sm text-center text-gray-700">
														{currency_formatter(trip?.price)}
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>

					{/* COLUM ON RIGHT */}
					<div className="hidden col-start-6 col-end-9 text-black border rounded-md lg:block">
						<div className="flex px-4 pt-4 pb-6 text-white bg-black border-b rounded-mdlg">
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
								<p className="text-sm mb-2 font-normal text-[#929292]">
									Rating
								</p>
								<h3 className="text-[18px] font-medium flex items-center">
									<FaStar className="text-[#FCAB64] h-[16px] mr-1" />
									{Number(TotalRating)}
								</h3>
							</div>
						</div>
						<div className="w-full px-4 pt-4 pb-4 rounded-mdlg">
							<div className="mb-8">
								<h3 className="mb-4 text-base font-medium">
									Your Availability
								</h3>
								{dates.map((date, index) => (
									<div
										className="flex items-center justify-between px-2 py-2 mb-1 bg-gray-100 rounded-md"
										key={index}>
										<div className="">
											<h3 className="mb-1 font-medium">{date.split(" ")[0]}</h3>
											<p className="text-[#929292] font-light text-[12px]">
												{date.split(" ").slice(1).join(" ")}
											</p>
										</div>
										<Switch
											checkedChildren={<CheckOutlined />}
											unCheckedChildren={<CloseOutlined />}
											defaultChecked={disabledDates.includes(date)}
											disabled={!disabledDates.includes(date)}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* TABLE */}

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
								<div className="mb-1 text-sm text-gray-400">Start</div>
								<div className="text-xs">
									{modalData?.travel_destination?.from?.city?.city}
								</div>
							</div>

							<div>
								<div className="mb-1 text-sm text-gray-400">Destination</div>
								<div className="text-xs">
									{modalData?.travel_destination?.to?.city?.city}
								</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Start Bus Stop</div>
								<div className="text-xs">
									{modalData?.travel_destination?.from?.start_busstop}
								</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">
									Destination Bus Stop
								</div>
								<div className="text-xs">
									{modalData?.travel_destination?.to?.stop_busstop}
								</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Departure Time</div>
								<div className="text-xs">{modalData?.take_off_time}</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Departure Date</div>
								<div className="text-xs">{modalData?.take_off_date}</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Arrival Time</div>
								<div className="text-xs">{modalData?.arrival_time}</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Arrival Date</div>
								<div className="text-xs">{modalData?.arrival_date}</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Rating</div>
								<div className="text-xs">
									{modalData?.ratings?.reduce(
										(total: number, num: number) => total + num
									) / modalData?.ratings?.length}
								</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Amount Earned</div>
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
						<div className="w-full mt-8 text-sm text-center place-items-center">
							{/* <FaExclamationCircle
                size={32}
                className="text-[#E71D36] w-full mt-8 mb-4"
              /> */}
							Starting a trip means all users are aboard, <div></div>
							<div className="mt-4 text-base font-medium">Start the trip?</div>
						</div>

						<div className="flex mt-6">
							<Button
								title="No"
								type="submit"
								className="w-full py-2 mr-2 text-xs text-gray-600 border border-gray-500 rounded-md"
								onClick={() => {}}
							/>
							<Button
								title={`Yes`}
								type="submit"
								className="w-full py-2 text-xs text-white bg-black rounded-md"
								onClick={() => {
									setstartOutBoundTrip(!startOutBoundTrip);
									setVisible(true);
									setAlertMessage("Trip Started, your ETA is 3:00PM");
									setModalVisible(false);
									dispatch();
									updateTripAction(modalData?._id, {
										has_started: true,
										start_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
									});
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
						<div className="w-full mt-8 text-sm text-center place-items-center">
							{/* <FaExclamationCircle
                size={32}
                className="text-[#E71D36] w-full mt-8 mb-4"
              /> */}
							Starting a trip means all users are aboard, <div></div>
							<div className="mt-4 text-base font-medium">Start the trip?</div>
						</div>

						<div className="flex mt-6">
							<Button
								title="No"
								type="submit"
								className="w-full py-2 mr-2 text-xs text-gray-600 border border-gray-500 rounded-md"
								onClick={() => {}}
							/>
							<Button
								title={`Yes`}
								type="submit"
								className="w-full py-2 text-xs text-white bg-black rounded-md"
								onClick={() => {
									// setstartOutBoundTrip(!startOutBoundTrip);
									setstartReturnTrip(!startReturnTrip);
									setVisible(true);
									setAlertMessage("Trip Started, your ETA is 3:00PM");
									setModalVisible(false);
									updateTripAction(modalData?._id, {
										has_started: true,
										start_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
									});
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
						<div className="w-full mt-8 text-sm text-center place-items-center">
							{/* <FaExclamationCircle
                size={32}
                className="text-[#E71D36] w-full mt-8 mb-4"
              /> */}
							Ending a trip means the trip is completed.
							<div className="mt-4 text-base font-medium">End the trip?</div>
						</div>

						<div className="flex mt-6">
							<Button
								title="No"
								type="submit"
								className="w-full py-2 mr-2 text-xs text-gray-600 border border-gray-500 rounded-md"
								onClick={() => {}}
							/>
							<Button
								title={`Yes`}
								type="submit"
								className="w-full py-2 text-xs text-white bg-black rounded-md"
								onClick={() => {
									setstartOutBoundTrip(!startOutBoundTrip);
									setVisible(true);
									setAlertMessage("Great Job! Trip Completed successfully");
									setModalVisible(false);
									updateTripAction(modalData?._id, {
										has_started: false,
										has_ended: true,
										end_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
									});
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
						<div className="w-full mt-8 text-sm text-center place-items-center">
							Ending a trip means the trip is completed.
							<div className="mt-4 text-base font-medium">End the trip?</div>
						</div>

						<div className="flex mt-6">
							<Button
								title="No"
								type="submit"
								className="w-full py-2 mr-2 text-xs text-gray-600 border border-gray-500 rounded-md"
								onClick={() => {}}
							/>
							<Button
								title={`Yes`}
								type="submit"
								className="w-full py-2 text-xs text-white bg-black rounded-md"
								onClick={() => {
									setstartReturnTrip(!startReturnTrip);
									setVisible(true);
									setAlertMessage("Great Job! Trip Completed successfully");
									setModalVisible(false);
									updateTripAction(modalData?._id, {
										has_started: false,
										has_ended: true,
										end_time: moment().format("MMMM Do YYYY, h:mm:ss a"),
									});
								}}
							/>
						</div>
					</Modal>
				)}
				{flip === DriverViews.MANIFEST && modalVisible && (
					<Modal
						title={
							<div className="text-lg font-medium boder-b">
								{`${modalData?.travel_destination?.from?.city?.city} to ${modalData?.travel_destination?.to?.city?.city} Trip`}
							</div>
						}
						onOk={handleOk}
						onCancel={handleCancel}
						open={modalVisible}
						centered={true}
						footer={false}
						closable={true}>
						<div>
							<p className="mt-6 mb-4 text-base font-medium">
								Passenger Manifest
							</p>
							<div className="my-1 text-sm text-gray-400">
								{modalData?.no_of_seat} Passengers,{" "}
								{
									modalData?.bookings?.filter(
										(book: Booking_interface) => book?.verify_onboard === false
									).length
								}{" "}
								Onboard,{" "}
								{
									modalData?.bookings?.filter(
										(book: Booking_interface) => book?.verify_onboard === true
									).length
								}{" "}
								Not Onboard
							</div>
							<table className="w-full mt-2 text-base font-normal text-left text-white table-auto">
								<thead className="bg-black">
									<tr>
										<th
											scope="col"
											className="px-2 py-2 pl-4 text-sm font-normal rounded-mdlg">
											Name
										</th>
										<th
											scope="col"
											className="px-2 py-2 text-sm font-normal text-center rounded-mdlg">
											Action
										</th>
									</tr>
								</thead>

								{/* //TABLE ROWS */}
								<tbody className="mt-4">
									{modalData?.bookings?.map((book: Booking_interface) => {
										return (
											<tr className="border-b cursor-pointer border-slate-100 hover:bg-gray-50">
												<td
													onClick={() => {}}
													className="py-4 pl-4 text-sm text-gray-700">
													{`${book?.user?.first_name} ${book?.user?.last_name}`}
												</td>
												<td
													onClick={() => {}}
													className="text-sm text-center text-gray-700">
													<div className="flex items-center h-full m-auto place-content-end">
														<div
															className={`flex items-center text-black mr-2 py-2 px-4 border rounded-md ${
																onboard
																	? "border-[#00FF6A] bg-[#00FF6A]"
																	: "border-black "
															} `}
															onClick={() => setOnboard(!onboard)}>
															{modalData?.verify_passanger_arrival?.find(
																(passenger: string) => passenger === book?._id
															) ? (
																<FaMinusCircle className="mr-2" />
															) : (
																<FaCheck
																	className="mr-2"
																	onClick={verifyPassengerArrived}
																/>
															)}
															{modalData?.verify_passanger_arrival?.find(
																(passenger: string) => passenger === book?._id
															)
																? "Onboarded"
																: "Onboard"}
														</div>
														<div
															className={`bg-[#00FF6A] px-6 py-2 rounded-md border border-[#00FF6A] text-black ${
																onboard ? "hidden" : "block"
															}`}>
															{/* INITIATE A CALL TO THE USER'S NUMBER */}
															Call
														</div>
													</div>
												</td>
												r
											</tr>
										);
									})}

									{/* )} */}
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
								<div className="mb-1 text-sm text-gray-400">Start</div>
								<div className="text-xs">Start City </div>
							</div>

							<div>
								<div className="mb-1 text-sm text-gray-400">Destination</div>
								<div className="text-xs">Destination City</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Start Bus Stop</div>
								<div className="text-xs">Start Bus Stop</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">
									Destination Bus Stop
								</div>
								<div className="text-xs">Destination Bus Stop</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Departure Time</div>
								<div className="text-xs">Time</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Date</div>
								<div className="text-xs">Date</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Driver</div>
								<div className="text-xs">Driver</div>
							</div>
							<div>
								<div className="mb-1 text-sm text-gray-400">Vehicle</div>
								<div className="text-xs">Vehicle</div>
							</div>
						</div>
						{/* <Button
              title="Continue"
              type="submit"
              className="w-full px-4 py-4 text-sm rounded-md bg-primary-100"
              onClick={() => {
                // setFlip(TripOption.SUCCESS);
              }}
            />
            <Button
              title="Edit"
              type="submit"
              className="w-full px-4 py-4 mt-4 mb-6 text-sm text-gray-500 border border-gray-500 rounded-md"
              onClick={() => {
                // setFlip(TripOption.CREATE);
              }}
            /> */}
					</Modal>
				)}
			</div>
		</>
	);
};

export default DriverOverview;