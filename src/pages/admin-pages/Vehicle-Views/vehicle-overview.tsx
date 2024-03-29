import { CircularProgress } from "@mui/material";
import { Alert, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
	FaBus,
	FaCheckCircle,
	FaEllipsisV,
	FaExclamationCircle
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { FraserButton } from "../../../components/Button";
import { Bus_interface } from "../../../interfaces/bus_interface";
import { Trip_interface } from "../../../interfaces/trip_interface";
import {
	getAllBusAction,
	resetUpdateBusAction,
	updateBusAction
} from "../../../state/action/bus.action";
import { getTripByBusAction } from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";

const VehicleOverview: React.FC = () => {
	enum tripType {
		SUCCESS = "success",
		DEACTIVATE = "deactivate",
		OPEN = "open",
		CLOSE = ""
	}
	const { buses } = useAppSelector((state: any) => state?.allBus);
	const { loading, error, trips } = useAppSelector(
		(state: any) => state?.tripByBus
	);
	const { bus: updatedBus } = useAppSelector((state: any) => state?.updateBus);

	const dispatch = useAppDispatch();
	const [currentPage, setCurrentPage] = useState(0); // current page
	const itemsPerPage = 10; // number of items per page
	const pageRangeDisplayed = 5; // number of pages to display
	const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
	const totalItems = buses.length; // total number of items
	const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages

	// function to handle page clicks
	const handlePageClick = (data: any) => {
		setCurrentPage(data.selected); // update the current page
	};
	const [busModalData, setBusModalData] = useState<Bus_interface>();
	const [messageApi, contextHolder] = message.useMessage();

	// calculate the start and end index of the items to display on the current page
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const items = buses.slice(startIndex, endIndex); // items to display on the current page

	// ROW ACTION MENU
	const [menuVisible, setMenuVisible] = useState(false);

	//TOGGLE
	const handleSetMenuToggle = () => {
		setMenuVisible(!menuVisible);
	};
	const [flip, setFlip] = useState<string>(tripType.CLOSE);

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const handleOpenModal = (bus: Bus_interface) => {
		setBusModalData(bus);
		setFlip(tripType.OPEN);
		setModalVisible(true);
		dispatch(getTripByBusAction(bus?._id));
	};

	const [visible, setStateModalVisible] = useState<boolean>(false);

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
		setFlip("");
	};

	useEffect(() => {
		if (updatedBus?._id) {
			messageApi.open({
				type: "info",
				content: "bus have been updated"
			});

			dispatch(getAllBusAction());
			dispatch(resetUpdateBusAction());
		}
	}, [dispatch, messageApi, updatedBus]);

	return (
		<>
			{contextHolder}
			<h2 className="mb-4 pl-4 bg-white fixed border-b top-24 py-8 w-full text-xl font-medium">
				Vehicles
			</h2>{" "}
			{/* PAGINATION */}
			<div className="px-4 mt-24">
				<div className="px-6 mb-4 bg-[#F6F8FA] border border-[#d0d7de] rounded-md items-center align-center flex">
					<ReactPaginate
						className="inline-flex items-center w-full py-2"
						pageCount={pageCount}
						pageRangeDisplayed={pageRangeDisplayed}
						marginPagesDisplayed={marginPagesDisplayed}
						onPageChange={handlePageClick}
						containerClassName={"pagination"}
						pageLinkClassName={
							"page-link px-3 py-2 mx-2 leading-tight text-gray-800 rounded-md"
						}
						activeClassName={" bg-gray-300 rounded-md"}
						previousClassName={"previous   mr-6"}
						nextClassName={"next  ml-6"}
						previousLabel={"<"}
						nextLabel={">"}
					/>
				</div>
				{/* BUSSTOPS LIST - TABLE */}
				<table className="w-full  font-normal text-left text-white">
					<thead className="bg-black ">
						<tr className="w-full ">
							<th scope="col" className="px-4 font-normal rounded-l-md">
								Number
							</th>
							<th scope="col" className="px-2  font-normal text-center ">
								Make
							</th>
							<th scope="col" className="px-2  font-normal text-center">
								Capacity
							</th>
							<th scope="col" className="px-2  font-normal text-center">
								Driver
							</th>
							<th scope="col" className="px-2  font-normal text-center">
								Location
							</th>
							<th scope="col" className="px-2 pl-16 font-normal">
								Availability
							</th>
							<th
								scope="col"
								className="px-2 py-6  font-normal rounded-r-md"></th>
						</tr>
					</thead>

					{/* //TABLE ROWS */}
					<tbody className="">
						{items?.map((bus: Bus_interface) => {
							return (
								<tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
									<td
										className=" font-normal text-center text-gray-700 "
										onClick={() => {
											handleOpenModal(bus);
										}}>
										{bus?.registration_number}
									</td>
									<td
										className=" font-normal text-center text-gray-700 "
										onClick={() => {
											handleOpenModal(bus);
										}}>
										{bus?.make}
									</td>
									<td
										onClick={() => {
											handleOpenModal(bus);
										}}
										className="px-4  font-normal text-center text-gray-700">
										{bus?.capacity}
									</td>
									<td
										onClick={() => {
											handleOpenModal(bus);
										}}
										className="px-4  font-normal text-center text-gray-700">
										{`${bus?.driver?.first_name} ${bus?.driver?.last_name}`}
									</td>
									<td
										onClick={() => {
											handleOpenModal(bus);
										}}
										className="px-4  font-normal text-center text-gray-700">
										{bus?.driver?.location}
									</td>
									<td
										onClick={() => {
											handleOpenModal(bus);
										}}
										className="px-4 pl-16  font-normal text-gray-700">
										<div
											className={` py-2 text-center rounded-md ${
												bus?.status?.toUpperCase() === "UNAVAILABLE"
													? "bg-[#FAD0D0] text-[#E71D36]"
													: "bg-[#D1FAD0] text-[#22B11E]"
											}`}>
											{bus?.status?.toUpperCase()}
										</div>
									</td>
									<td
										className="px-4 py-6  font-normal text-gray-700"
										onClick={() => {
											handleSetMenuToggle();
										}}>
										<div>
											<FaEllipsisV />
										</div>
										{menuVisible && (
											<ul className="absolute right-12 z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
												<li
													onClick={() => {
														handleOpenModal(bus);
													}}
													className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100">
													View
												</li>

												<li
													onClick={() => {
														setBusModalData(bus);
														setFlip(tripType.DEACTIVATE);
														dispatch(
															updateBusAction(bus?._id, {
																status: "unavailable"
															})
														);
													}}
													className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100">
													Deactivate
												</li>
											</ul>
										)}
									</td>
									ƒ
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/* MODALS */}
			{flip === tripType.OPEN && modalVisible && (
				<Modal
					title={
						<div className="text-lg font-medium boder-b">Vehicle Details</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="h-5/6">
						<div className="py-8 text-center">
							<div className="mb-2 text-lg font-medium">
								{busModalData?.make}
							</div>
							<div className="text-[#949292]">
								{busModalData?.registration_number}
							</div>
							<div className="bg-[#FAD0D0] text-[#E71D36] mt-2 py-2 text-center rounded-md">
								{busModalData?.status}
							</div>
						</div>

						<div>
							<div className="text-lg font-medium">
								Trip History <span> {loading && <CircularProgress />} </span>
							</div>
							{error && <Alert type="error" message={error} />}

							{trips?.map((trip: Trip_interface) => {
								return (
									<div className="flex justify-between py-2 my-4 overflow-hidden text-gray-800 border-b">
										<div className="flex">
											<div className="mt-2 mr-4">
												<FaBus />
											</div>
											<div>
												<div className="text-base truncate">
													{trip?.travel_destination?.from?.state?.name} to{" "}
													{trip?.travel_destination?.to?.state?.name}
												</div>
												<div className="text-[#949292] ">
													{trip?.take_off_date}
												</div>
											</div>
										</div>
										<div className="text-base font-medium">
											{trip?.driver?.first_name}
										</div>
									</div>
								);
							})}
						</div>

						<div className="flex justify-between py-2 my-4 overflow-hidden text-gray-800 border-b">
							<div className="flex">
								<div className="mt-2 mr-4">
									<FaBus />
								</div>
								<div>
									<div className="text-base truncate">Lagos to Ibadan</div>
									<div className="text-[#949292] ">3rd Sept.</div>
								</div>
							</div>
							<div className="text-base font-medium">Josiah</div>
						</div>
					</div>
				</Modal>
			)}
			{flip === tripType.DEACTIVATE && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
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
							Deactivate Amen Olabode?
						</div>
					</div>

					<FraserButton
						title="Deactivate"
						type="submit"
						size="regular"
						onClick={() => {
							setFlip("success");
						}}
					/>
					<FraserButton
						title="Cancel"
						type="submit"
						size="regular"
						onClick={() => {
							setFlip("info");
						}}
					/>
				</Modal>
			)}
			{/* SUCESS MODAL SHOWS AFTER API RETURNS SUCCESS FOR TRIP UPDATES */}
			{flip === tripType.SUCCESS && modalVisible && (
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
							Vehicle deactivated succesfully
						</div>
					</div>

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
		</>
	);
};

export default VehicleOverview;
