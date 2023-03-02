import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import {
	FaCheck,
	FaCheckCircle,
	FaEllipsisV,
	FaExclamationCircle,
	FaMinusCircle,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Booking_interface } from "../../../interfaces/Booking_interface";
import { Trip_interface } from "../../../interfaces/trip_interface";
import {
	deleteTripByIdAction,
	getAllTripAction,
	getTripByDriverAction,
	resetDeleteTripAction,
	resetUpdateTripAction,
	unverifyPassangerOnboardAction,
	verifyPassangerOnboardAction,
} from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { RootState } from "../../../state/redux-store";
import { Button } from "../../../components/Button";
import CreateTripFormComponent from "../../../components/admin-components/create-trip-form";
import EditTripFormComponent from "../../../components/admin-components/edit-trip-form";
import { getTheLatestByDate } from "../../../utils/getTheLatestTripByDate";
import { getBalanceByUserAction } from "../../../state/action/balance.action";

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
		(state: RootState) => state.verifyPassangerOnboard
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
		.slice(startIndex, endIndex); // items to display on the current page

	const handleOpenModal = (data: Trip_interface, flipValue: any) => {
		setFlip(flipValue);
		setModalData(data);
		setModalVisible(true);
	};

	const openManifest = (flipValue: any) => {
		setFlip(flipValue);
		setModalVisible(true);
	};

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
				content: "This trip have been deleted",
			});

			dispatch(resetDeleteTripAction());
			dispatch(getAllTripAction());
			setFlip(TripOption.NONE);
		}
	}, [TripOption, deletedTrip, dispatch, messageApi]);

	const [onboard, setOnboard] = useState(false);

	useEffect(() => {
		if (trips) {
			setModalData(trips.find((trip) => trip._id === modalData?._id));
		}
	}, [trips, onBoardedTrip, unBoardedTrip, modalData]);

	useEffect(() => {
		dispatch(getAllTripAction());
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
					<Button
						title="+ Create new trip"
						type="submit"
						className="px-4 py-2 mb-2 rounded-md bg-primary-100"
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
			<div className="px-4 mb-2 bg-gray-200 rounded-md">
				<ReactPaginate
					className="inline-flex items-center w-full py-2"
					pageCount={pageCount}
					pageRangeDisplayed={pageRangeDisplayed}
					marginPagesDisplayed={marginPagesDisplayed}
					onPageChange={handlePageClick}
					containerClassName={"pagination"}
					pageLinkClassName={
						"page-link px-2 mx-2  leading-tight text-gray-800 rounded-md"
					}
					activeClassName={" bg-gray-300 rounded-md"}
					previousClassName={"previous  mr-6"}
					nextClassName={"next  ml-6"}
					previousLabel={"<"}
					nextLabel={">"}
				/>
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
									{trip?.travel_destination?.from?.city?.city}
								</td>
								<td
									onClick={() => {
										handleOpenModal(trip, "info");
									}}
									className="text-center text-gray-700 ">
									{trip?.travel_destination?.to?.city?.city}
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
												<ul className="absolute z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
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

					<Button
						title="Close"
						type="submit"
						className="w-full py-2 mt-8 mb-4  rounded-md bg-[#00FF6A] text-black"
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
									console.log("the modal data", modalData);
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
					<Button
						title="Edit"
						type="submit"
						className="w-full px-4 py-4 rounded-md bg-primary-100"
						onClick={() => {
							setFlip(TripOption.EDIT);
						}}
					/>
					<Button
						title="Delete"
						type="submit"
						className="w-full px-4 py-4 mt-4 mb-6 text-red-600 border border-red-500 rounded-md"
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
						<div className="text-lg font-medium boder-b">
							{`${modalData?.travel_destination?.from?.city?.city} to
							${modalData?.travel_destination?.to?.city?.city} Trip`}
						</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div>
						<div className="mt-6 mb-4 text-base font-medium">
							Passenger Manifest
						</div>
						<div className="my-1 text-gray-400">
							{modalData?.bookings.length} Passengers,{" "}
							{modalData?.verified_passengers_onboard?.length}
							Onboard,{" "}
							{modalData?.bookings?.length -
								modalData?.verified_passengers_onboard?.length}{" "}
							Not Onboard
						</div>
						<table className="w-full mt-2 text-base font-normal text-left text-white table-auto">
							<thead className="bg-black">
								<tr>
									<th
										scope="col"
										className="px-2 py-2 pl-4 font-normal rounded-mdlg">
										Name
									</th>
									<th
										scope="col"
										className="px-2 py-2 font-normal text-center rounded-mdlg">
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
												className="py-4 pl-4 text-gray-700">
												{/* Amen Olabode */}
												{`${book?.user?.first_name} ${book?.user?.last_name}`}
											</td>
											<td
												onClick={() => {}}
												className="text-center text-gray-700 ">
												<div className="flex items-center h-full m-auto place-content-end">
													<div
														className={`flex items-center text-black mr-2 py-2 px-4 border rounded-md 
                            														${
																													modalData?.verified_passengers_onboard?.includes(
																														book?._id
																													)
																														? "border-[#00FF6A] bg-[#00FF6A]"
																														: "border-black "
																												} `}>
														{modalData?.verified_passengers_onboard?.find(
															(passenger: string) => passenger === book?._id
														) ? (
															<div
																className="flex flex-row items-center"
																onClick={() => {
																	dispatch(
																		unverifyPassangerOnboardAction(
																			modalData?._id,
																			book?._id
																		)
																	);
																	setOnboard(!onboard);
																}}>
																<FaMinusCircle className="mr-2" />
																<span> Onboarded</span>
															</div>
														) : (
															<div
																className="flex flex-row items-center"
																onClick={() => {
																	dispatch(
																		verifyPassangerOnboardAction(
																			modalData?._id,
																			book?._id
																		)
																	);
																	setOnboard(!onboard);
																}}>
																<FaCheck className="mr-2" onClick={() => {}} />
																<span>Onboard</span>
															</div>
														)}
													</div>
													<div
														className={`bg-[#00FF6A] px-6 py-2 rounded-md border border-[#00FF6A] text-black ${
															modalData?.verified_passengers_onboard?.includes(
																book?._id
															)
																? "hidden"
																: "block"
														}`}>
														{/* INITIATE A CALL TO THE USER'S NUMBER */}
														Call
													</div>
												</div>
											</td>
										</tr>
									);
								})}

								{/* )} */}
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
								{deleteLoading && (
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
								)}
							</span>
						</div>
					</div>

					<Button
						title={`Delete`}
						type="submit"
						className="w-full py-2 mt-8 text-xs rounded-md bg-[#E71D36] text-white"
						onClick={() => {
							dispatch(deleteTripByIdAction(modalData?._id || ""));
						}}
					/>
					<Button
						title="Cancel"
						type="submit"
						className="w-full py-2 mt-4 mb-4 text-xs text-gray-600 border border-gray-500 rounded-md"
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

					<Button
						title="View"
						type="submit"
						className="w-full py-2 mt-8  rounded-md bg-[#00FF6A] text-black"
						onClick={() => {
							//NOT SURE THIS IS USEFUL DURING API CALLS
							setFlip(TripOption.INFO);
						}}
					/>
					<Button
						title="Close"
						type="submit"
						className="w-full py-2 mt-4 mb-4 text-gray-600 border border-gray-500 rounded-md"
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
