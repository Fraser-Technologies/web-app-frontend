import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import {
	FaCheck,
	FaCheckCircle,
	FaEllipsisV,
	FaExclamationCircle,
	FaMinusCircle
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Passenger_interface } from "../../../interfaces/Booking_interface";
import { Trip_interface } from "../../../interfaces/trip_interface";
import {
	deleteTripByIdAction,
	getAllTripAction,
	getTripByDriverAction,
	resetDeleteTripAction,
	resetUpdateTripAction,
	unverifyPassengerOnboardAction,
	verifyPassengerOnboardAction
} from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { RootState } from "../../../state/redux-store";
import { FraserButton } from "../../../components/Button";
import CreateTripFormComponent from "../../../components/admin-components/create-trip-form";
import EditTripFormComponent from "../../../components/admin-components/edit-trip-form";
import { getTheLatestByDate } from "../../../utils/getTheLatestTripByDate";
import { getBalanceByUserAction } from "../../../state/action/balance.action";
import LoadingWheel from "../../../components/loading-svg";

const TripsOverview: React.FC = () => {
	enum TripOption {
		NONE = "",
		SUCCESS = "success",
		INFO = "info",
		CREATE = "create",
		REVIEW = "review",
		EDIT = "edit",
		DELETE = "delete",
		MANIFEST = "manifest",
		TRANSACTIONHISTORY = "transactionhistory"
	}

	const dispatch = useAppDispatch();
	const { trips } = useAppSelector((state: RootState) => state.allTrip);
	const { trip } = useAppSelector((state: RootState) => state.createTrip);
	const { trip: updatedTrip } = useAppSelector(
		(state: RootState) => state.updateTrip
	);
	const { trip: deletedTrip, loading: deleteLoading } = useAppSelector(
		(state: RootState) => state.deleteTrip
	);
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
	const { trip: onBoardedTrip } = useAppSelector(
		(state: RootState) => state.verifyPassengerOnboard
	);
	const { trip: unBoardedTrip } = useAppSelector(
		(state: RootState) => state.unverifyPassengerOnboard
	);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [modalData, setModalData] = useState<Trip_interface | any>();
	const [flip, setFlip] = useState<
		| ""
		| TripOption.CREATE
		| TripOption.DELETE
		| TripOption.EDIT
		| TripOption.INFO
		| TripOption.REVIEW
		| TripOption.SUCCESS
		| TripOption.MANIFEST
		| TripOption.TRANSACTIONHISTORY
	>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const itemsPerPage = 10; // number of items per page
	const pageRangeDisplayed = 5; // number of pages to display
	const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
	const totalItems = trips?.length; // total number of items
	const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages
	const [menuVisible, setMenuVisible] = useState(false); // ROW ACTION MENU
	const [messageApi] = message.useMessage();

	// function to handle page clicks
	const handlePageClick = (data: any) => {
		setCurrentPage(data.selected); // update the current page
	};

	// calculate the start and end index of the items to display on the current page
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const items = trips
		? trips
				?.filter((trip: Trip_interface) => trip?.completed_status === false)
				.sort(
					(
						a: { take_off_date: any; take_off_time: any },
						b: { take_off_date: any; take_off_time: any }
					) => {
						const dateA = new Date(`${a?.take_off_date} ${a?.take_off_time}`);
						const dateB = new Date(`${b?.take_off_date} ${b?.take_off_time}`);
						return dateA.getTime() - dateB.getTime();
					}
				)
				.slice(startIndex, endIndex)
		: trips; // items to display on the current page

	const handleOpenModal = (data: any, flipValue: any) => {
		setFlip(flipValue);
		setModalData(data);
		setModalVisible(true);
	};

	const openManifest = (flipValue: any) => {
		setFlip(flipValue);
		setModalVisible(true);
	};

	const [loading, setLoading] = useState(false);
	const [loadingIndex, setLoadingIndex] = useState<number>(-1);

	const [visible, setStateModalVisible] = useState<boolean>(false);
	const handleOpenDeleteModal = (data: Trip_interface) => {
		setFlip(TripOption.DELETE);
		setStateModalVisible(true);
		setModalData(data);
	};

	const [menuToggle, setMenuToggle] = useState("");
	const handleSetMenuToggle = (value: string) => {
		if (menuToggle === value) {
			setMenuVisible(!menuVisible);
		} else {
			setMenuToggle(value);
		}
	};

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		if (flip !== "delete") {
			setModalVisible(false);
			setFlip("");
		}
		if (flip === "delete") {
			setModalVisible(false);
			setFlip(TripOption.INFO);
		}
	};

	useEffect(() => {
		if (trip?._id) {
			dispatch(getAllTripAction());
			setMenuVisible(!menuVisible);
			setFlip("");
		}
	}, [dispatch, menuVisible, trip]);

	useEffect(() => {
		if (updatedTrip?._id) {
			setFlip("");
			dispatch(resetUpdateTripAction());
			dispatch(getAllTripAction());
		}
	}, [dispatch, updatedTrip]);

	useEffect(() => {
		if (deletedTrip?._id) {
			messageApi.open({
				type: "info",
				content: "This trip have been deleted"
			});

			dispatch(resetDeleteTripAction());
			dispatch(getAllTripAction());
			setFlip(TripOption.NONE);
		}
	}, [TripOption, deletedTrip, dispatch, messageApi]);

	useEffect(() => {
		if (trips) {
			setModalData(trips.find((trip) => trip._id === modalData?._id));
		}
	}, [trips, onBoardedTrip, unBoardedTrip, modalData]);

	useEffect(() => {
		dispatch(getAllTripAction());
		setLoading(false);
	}, [dispatch, onBoardedTrip, userInfo, unBoardedTrip]);

	useEffect(() => {
		dispatch(getBalanceByUserAction());
	}, [dispatch]);

	useEffect(() => {
		dispatch(resetUpdateTripAction());
		if (trip || onBoardedTrip || unBoardedTrip) {
			dispatch(getTripByDriverAction(userInfo?._id));
		}
	}, [dispatch, onBoardedTrip, trip, unBoardedTrip, userInfo]);

	return (
		<div className="px-4 pt-12">
			{/* TRIPS OVERVIEW VIEW*/}
			{/* BUSSTOPS HEADER */}
			<div>
				<h2 className="fixed w-full py-8 pl-4 mb-4 text-xl font-medium bg-white border-b top-24">
					Trips{" "}
				</h2>
				<div className="flex w-full my-2 mt-24 bg-white place-content-end">
					{/* <h2 className="text-xs font-medium ">Trips</h2> */}
					{/* {loading && <Spinner />} */}
					<FraserButton
						title="+ Create new trip"
						type="submit"
						size="regular"
						onClick={() => {
							setModalVisible(true);
							setFlip(TripOption.CREATE);
						}}
					/>
				</div>

				{/* DATA */}
				<div className="px-4 py-3 my-4 bg-black rounded-md ">
					<div className="flex w-full pt-6 mb-4 justify-evenly">
						<div className="text-center">
							<p className="text-gray-400">Total Trips Executed </p>
							<p className="text-white ">
								{
									(trips?.filter(
										(trip: Trip_interface) => trip?.completed_status === true
									)).length
								}
							</p>
						</div>
						<div className="text-center">
							<p className="text-gray-400">Total Available Trips</p>
							<p className="text-white ">
								{
									trips?.filter(
										(trip: Trip_interface) => trip?.completed_status === false
									).length
								}
							</p>
						</div>
						{/* <div className="text-center">
              <p className="text-gray-400 "> Active Trips</p>
              <p className="text-white ">20,000</p>
            </div> */}
					</div>
				</div>
			</div>

			{/* PAGINATION */}
			<div className="px-6 mb-4 bg-[#F6F8FA] border border-[#d0d7de] rounded-md items-center align-center flex">
				<ReactPaginate
					className="inline-flex items-center w-full py-3"
					pageCount={pageCount}
					pageRangeDisplayed={pageRangeDisplayed}
					marginPagesDisplayed={marginPagesDisplayed}
					onPageChange={handlePageClick}
					containerClassName={"pagination"}
					pageLinkClassName={
						"page-link px-3 py-2 mx-2 leading-tight text-gray-800 rounded-md"
					}
					activeClassName={" bg-gray-300 rounded-md"}
					previousClassName={"previous  mr-6"}
					nextClassName={"next ml-6"}
					previousLabel={"<"}
					nextLabel={">"}
				/>
				<div
					className="w-full items-center align-center cursor-pointer text-[#0969da] justify-end mr-8 flex text-[14px]"
					onClick={() => {
						handleOpenModal(undefined, "transactionhistory");
					}}>
					view history
				</div>
			</div>
			{/* BUSSTOPS LIST - TABLE */}
			<table className="w-full text-base font-normal text-left text-white table-auto">
				<thead className="bg-black ">
					<tr>
						<th scope="col" className="px-2 py-4 pl-4 font-normal rounded-l-md">
							Date
						</th>
						<th scope="col" className="py-4 font-normal ">
							Departure
						</th>
						<th scope="col" className="px-4 py-4 font-normal text-center">
							Start
						</th>
						<th scope="col" className="px-2 py-4 font-normal text-center">
							Destination
						</th>
						<th scope="col" className="px-2 py-4 font-normal text-center">
							Driver
						</th>
						<th scope="col" className="px-2 py-4 font-normal text-center">
							Vehicle
						</th>
						<th scope="col" className="px-2 py-4 font-normal rounded-r-md"></th>
					</tr>
				</thead>

				{/* //TABLE ROWS */}
				<tbody className="">
					{items?.map((trip: Trip_interface, index: Number) => {
						return (
							<tr
								className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50"
								key={trip?._id}>
								<td
									onClick={() => {
										handleOpenModal(trip, "info");
									}}
									className="py-6 pl-4 text-gray-700">
									{trip?.take_off_date}
								</td>
								<td
									onClick={() => {
										handleOpenModal(trip, "info");
									}}
									className="py-4 text-gray-700 ">
									{trip?.take_off_time}
								</td>
								<td
									onClick={() => {
										handleOpenModal(trip, "info");
									}}
									className="px-4 py-4 text-center text-gray-700">
									{trip?.travel_destination?.from?.state?.state}
								</td>
								<td
									onClick={() => {
										handleOpenModal(trip, "info");
									}}
									className="text-center text-gray-700 ">
									{trip?.travel_destination?.to?.state?.state}
								</td>

								<td
									onClick={() => {
										handleOpenModal(trip, "info");
									}}
									className="px-4 py-4 text-center text-gray-700">
									{`${trip?.driver?.first_name} ${trip?.driver?.last_name} `}
								</td>
								<td
									onClick={() => {
										handleOpenModal(trip, "info");
									}}
									className="px-4 py-4 text-center text-gray-700">
									{trip?.bus?.make}
								</td>
								<td
									className="px-4 py-4 text-gray-700"
									onClick={() => {
										// setMenuVisible(!menuVisible);
										handleSetMenuToggle(index.toString());
									}}>
									<div>
										<FaEllipsisV />
									</div>
									{menuToggle === index.toString()
										? menuVisible && (
												<ul className="absolute right-12 z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
													<li
														onClick={() => {
															handleOpenModal(trip, "info");
														}}
														className="px-4 py-2 font-medium text-gray-700 border-b hover:bg-gray-100">
														View
													</li>
													<li
														onClick={() => {
															handleOpenModal(trip, "edit");
														}}
														className="px-4 py-2 font-medium text-gray-700 border-b hover:bg-gray-100">
														Edit
													</li>
													<li
														onClick={() => {
															setFlip(TripOption.DELETE);
															handleOpenDeleteModal(trip);
														}}
														className="px-4 py-2 font-medium text-gray-700 border-b hover:bg-gray-100">
														Delete
													</li>
												</ul>
										  )
										: ""}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* MODALS */}
			{flip === TripOption.CREATE && modalVisible && (
				<Modal
					title={
						<div className="text-xs font-medium boder-b">Create a new trip</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<CreateTripFormComponent />
				</Modal>
			)}
			{flip === TripOption.TRANSACTIONHISTORY && modalVisible && (
				<Modal
					title={
						<div className="text-xl font-medium boder-b"> Trip History </div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="mt-8 h-[70vh] overflow-y-scroll">
						{trips
							?.filter(
								(trip: Trip_interface) => trip?.completed_status === true
							)
							.sort(
								(
									a: { take_off_date: any; take_off_time: any },
									b: { take_off_date: any; take_off_time: any }
								) => {
									const dateA = new Date(
										`${a?.take_off_date} ${a?.take_off_time}`
									);
									const dateB = new Date(
										`${b?.take_off_date} ${b?.take_off_time}`
									);
									return dateA.getTime() - dateB.getTime();
								}
							)
							.map((trip: Trip_interface, index: Number) => {
								return (
									<div className="mb-2 border-b pb-4">
										<div className="flex">
											<div className="text-lg mr-2">
												{trip?.travel_destination?.from?.state?.state} to{" "}
												{trip?.travel_destination?.to?.state?.state}
											</div>
											{/* <div className="items-center flex bg-[#C1D2FF] border border-[#8D98FF] text-[#314075] px-3 rounded-md">
                      {" "}
                      Completed{" "}
                    </div> */}
										</div>
										<div className="flex text-[#929292] items-center">
											<div className="flex items-center">
												<div className="mr-2">{trip?.arrival_date} </div>
												<div className="h-1 w-1 bg-[#353535] rounded-md mr-2"></div>{" "}
												<div className="mr-2">{trip?.arrival_time}</div>
											</div>
											<div className="h-1 w-1 bg-[#353535] rounded-md mr-2"></div>
											<div className="">
												{`${trip?.driver?.first_name} ${trip?.driver?.last_name} `}
											</div>
										</div>
									</div>
								);
							})}
					</div>
					{/* <CreateTripFormComponent /> */}
				</Modal>
			)}

			{flip === TripOption.SUCCESS && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width={240}>
					<div className="w-full text-center place-items-center">
						<FaCheckCircle size={32} className="text-[#00FF6A] w-full mt-8" />
						<div className="mt-4 text-base font-medium boder-b">
							Trip succesfully created
						</div>
					</div>

					<FraserButton
						title="Close"
						type="submit"
						size="regular"
						onClick={() => {
							setModalVisible(false);
						}}
					/>
				</Modal>
			)}
			{flip === TripOption.INFO && modalVisible && (
				<Modal
					title={
						<div>
							<div className="mt-4 text-lg font-medium boder-b">
								Trip Details
							</div>
							<div
								className=" font-normal text-[#22B11E] mt-2 cursor-pointer"
								onClick={() => {
									openManifest("manifest");
								}}>
								{" "}
								View Passenger Manifest
							</div>
						</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="grid grid-cols-2 gap-2 pb-12 mt-8">
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Start</div>
							<div className="text-xs">
								{modalData?.travel_destination?.from?.city?.city}
							</div>
						</div>
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Destination</div>
							<div className="text-xs">
								{modalData?.travel_destination?.to?.city?.city}
							</div>
						</div>
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Start</div>
							<div className="text-xs">
								{modalData?.travel_destination?.from?.start_busstop}
							</div>
						</div>
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Destination</div>
							<div className="text-xs">
								{modalData?.travel_destination?.to?.stop_busstop}
							</div>
						</div>
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Departure Time</div>
							<div className="text-xs">{modalData?.take_off_time}</div>
						</div>
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Date</div>
							<div className="text-xs">{modalData?.take_off_date}</div>
						</div>
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Driver</div>
							<div className="text-xs">
								{`${modalData?.driver?.first_name} ${modalData?.driver?.last_name}`}
							</div>
						</div>
						<div className="bg-[#fcfcfc] rounded-md py-2 px-4">
							<div className="mb-1 text-gray-400">Vehicle</div>
							<div className="text-xs">{modalData?.bus?.make}</div>
						</div>
					</div>
					<FraserButton
						title="Edit"
						type="submit"
						size="regular"
						onClick={() => {
							setFlip(TripOption.EDIT);
						}}
					/>
					<FraserButton
						title="Delete"
						type="submit"
						size="regular"
						onClick={() => {
							setFlip(TripOption.DELETE);
							setStateModalVisible(true);
						}}
					/>
				</Modal>
			)}

			{/* LEKAN, NEW ADDITION */}
			{flip === TripOption.MANIFEST && modalVisible && (
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
																		dispatch(
																			unverifyPassengerOnboardAction(
																				modalData?._id,
																				passenger?._id
																			)
																		);
																	}}>
																	<FaMinusCircle className="mr-2" />
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

			{flip === TripOption.EDIT && modalVisible && (
				<Modal
					title={<div className="text-xs font-medium boder-b">Edit Trip</div>}
					onOk={handleOk}
					onCancel={handleCancel}
					open={true}
					centered={true}
					footer={false}
					closable={true}>
					<EditTripFormComponent trip={modalData} />
				</Modal>
			)}
			{flip === TripOption.DELETE && visible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={visible}
					centered={true}
					footer={false}
					closable={true}
					width={240}>
					<div className="w-full text-center place-items-center">
						<FaExclamationCircle
							size={32}
							className="text-[#E71D36] w-full mt-8"
						/>
						<div className="mt-4 text-base font-medium boder-b">
							Delete {modalData?.travel_destination?.from?.start_busstop} to{" "}
							{modalData?.travel_destination?.to?.stop_busstop} trip?{" "}
							<span>
								{deleteLoading && <LoadingWheel param={deleteLoading} />}
							</span>
						</div>
					</div>

					<FraserButton
						title={`Delete`}
						type="submit"
						size="regular"
						onClick={() => {
							dispatch(deleteTripByIdAction(modalData?._id || ""));
						}}
					/>
					<FraserButton
						title="Cancel"
						type="submit"
						size="regular"
						onClick={() => {
							setFlip(TripOption.INFO);
						}}
					/>
				</Modal>
			)}
			{/* }   SUCESS MODAL SHOWS AFTER API RETURNS SUCCESS FOR TRIP UPDATES */}
			{flip === TripOption.SUCCESS && visible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={visible}
					centered={true}
					footer={false}
					closable={true}
					width={240}>
					<div className="w-full text-center place-items-center">
						<FaCheckCircle size={32} className="text-[#00FF6A] w-full mt-8" />
						<div className="mt-4 text-base font-medium boder-b">
							Trip updated succesfully
						</div>
					</div>

					<FraserButton
						title="View"
						type="submit"
						size="regular"
						onClick={() => {
							//NOT SURE THIS IS USEFUL DURING API CALLS
							setFlip(TripOption.INFO);
						}}
					/>
					<FraserButton
						title="Close"
						type="submit"
						size="regular"
						onClick={() => {
							setModalVisible(false);
							setStateModalVisible(false);
						}}
					/>
				</Modal>
			)}
		</div>
	);
};

export default TripsOverview;
