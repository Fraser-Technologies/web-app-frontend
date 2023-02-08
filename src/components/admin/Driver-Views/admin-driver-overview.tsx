import { CircularProgress } from "@mui/material";
import { Alert, Modal } from "antd";
import React, { useState } from "react";
import {
	FaBus,
	FaCheckCircle,
	FaEllipsisV,
	FaExclamationCircle,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Driver_interface } from "../../../interfaces/driver_interface";
import { Trip_interface } from "../../../interfaces/trip_interface";
import { User_interface } from "../../../interfaces/user.interface";
import { getTripByDriverAction } from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Button } from "../../Button";

const AdminDriverOverview: React.FC = () => {
	enum flipType {
		OPEN = "open",
		SUCCESS = "success",
		DEACTIVATE = "deactivate",
	}
	const dispatch = useAppDispatch();
	const [currentPage, setCurrentPage] = useState(0); // current page
	const itemsPerPage = 10; // number of items per page
	const pageRangeDisplayed = 5; // number of pages to display
	const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
	const totalItems = 10; // total number of items
	const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages
	const [modalData, setModalData] = useState<User_interface>();
	const { drivers, loading, error } = useAppSelector(
		(state: any) => state?.allDriver
	);
	const {
		trips: byDriverTrip,
		loading: byDriverLoading,
		error: byDriverError,
	} = useAppSelector((state: any) => state?.tripByDriver);
	// function to handle page clicks
	const handlePageClick = (data: any) => {
		setCurrentPage(data.selected); // update the current page
	};

	// calculate the start and end index of the items to display on the current page
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	//   const items = trips.slice(startIndex, endIndex); // items to display on the current page

	// ROW ACTION MENU
	const [menuVisible, setMenuVisible] = useState(false);

	//TOGGLE
	const handleSetMenuToggle = () => {
		setMenuVisible(!menuVisible);
	};
	const [flip, setFlip] = useState("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleOpenModal = (driver: User_interface) => {
		setModalData(driver);
		setFlip(flipType.OPEN);
		setModalVisible(true);
		dispatch(getTripByDriverAction(driver?._id));
	};

	const [visible, setStateModalVisible] = useState<boolean>(false);

	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
		setFlip("");
	};

	return (
		<>
			{/* TRIPS OVERVIEW VIEW*/}

			{/* BUSSTOPS HEADER */}

			<h2 className="mb-4 pl-4 bg-white fixed border-b top-16 py-6 mt-4 w-full text-xs font-medium">
				Drivers{" "}
				{/* <span>
							{loading && <CircularProgress />}
							{error && <Alert type="error" message={error} />}
						</span> */}
			</h2>

			{/* PAGINATION */}
			<div className="px-4 mt-24">
				<div className="px-6 mb-4 bg-gray-200 rounded-md">
					<ReactPaginate
						className="inline-flex items-center w-full py-2"
						pageCount={pageCount}
						pageRangeDisplayed={pageRangeDisplayed}
						marginPagesDisplayed={marginPagesDisplayed}
						onPageChange={handlePageClick}
						containerClassName={"pagination"}
						pageLinkClassName={
							"page-link px-3 py-2 mx-2 text-sm leading-tight text-gray-800 rounded-md"
						}
						activeClassName={" bg-gray-300 rounded-md"}
						previousClassName={"previous text-sm  mr-6"}
						nextClassName={"next text-sm ml-6"}
						previousLabel={"<"}
						nextLabel={">"}
					/>
				</div>

				{/* BUSSTOPS LIST - TABLE */}
				<table className="w-full text-sm font-normal text-left text-white">
					<thead className=" bg-black">
						<tr className="w-full ">
							<th scope="col" className="px-4 py-4 font-normal rounded-l-md">
								First Name
							</th>
							<th scope="col" className="px-2 py-4  text-center font-normal ">
								Last Name
							</th>
							<th scope="col" className="px-2 py-4 font-normal text-center">
								Phone
							</th>
							<th scope="col" className="px-2 py-4 font-normal text-center">
								Email
							</th>
							<th scope="col" className="px-2 py-4 font-normal text-center">
								Location
							</th>

							<th scope="col" className="px-2 py-4 font-normal text-center">
								Vehicle
							</th>

							<th scope="col" className="px-2 py-4 font-normal text-center">
								Verified
							</th>
							<th scope="col" className="px-2 pl-16 py-4 font-normal">
								Availability
							</th>
							<th
								scope="col"
								className="px-2 py-4 font-normal rounded-r-md"></th>
						</tr>
					</thead>

					{/* //TABLE ROWS */}
					<tbody className="">
						{drivers?.map((driver: User_interface) => {
							return (
								<tr
									className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50"
									key={driver?._id}>
									<td
										onClick={() => {
											handleOpenModal(driver);
										}}
										className="px-4 py-4 text-xs font-normal text-gray-700">
										{driver?.first_name}
									</td>
									<td className="text-xs font-normal text-center text-gray-700 ">
										{driver?.last_name}
									</td>
									<td
										onClick={() => {
											handleOpenModal(driver);
										}}
										className="px-4 py-4 text-xs text-center font-normal text-gray-700">
										{driver?.phone}
									</td>
									<td
										onClick={() => {
											handleOpenModal(driver);
										}}
										className="px-4 py-4 text-xs text-center font-normal text-gray-700">
										{driver?.email}
									</td>
									<td
										onClick={() => {
											handleOpenModal(driver);
										}}
										className="px-4 py-4 text-xs text-center font-normal text-gray-700">
										{driver?.location}
									</td>

									<td
										onClick={() => {
											handleOpenModal(driver);
										}}
										className="px-4 py-4 text-xs text-center font-normal text-gray-700">
										{driver?.bus?.make}
									</td>

									<td
										onClick={() => {
											handleOpenModal(driver);
										}}
										className="px-4 py-4 text-xs text-center font-normal text-gray-700">
										{`${driver?.driver_verification_status}`.toUpperCase()}
									</td>

									<td
										onClick={() => {
											handleOpenModal(driver);
										}}
										className="px-4 py-4 pl-16 text-xs font-normal text-gray-700">
										<div className="bg-[#D1FAD0] text-[#22B11E] py-2 text-center rounded-md">
											{`${driver?.available}`}
										</div>
									</td>
									<td
										className="px-4 py-6 text-xs font-normal text-gray-700"
										onClick={() => {
											handleSetMenuToggle();
										}}>
										<div>
											<FaEllipsisV />
										</div>
										{menuVisible && (
											<ul className="absolute z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
												<li
													onClick={() => {
														handleOpenModal(driver);
													}}
													className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
													View
												</li>

												<li
													onClick={() => {
														setModalData(driver);
														setFlip(flipType.DEACTIVATE);
													}}
													className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
													Deactivate
												</li>
											</ul>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* MODALS */}
			{flip === flipType.OPEN && modalVisible && (
				<Modal
					title={
						<div className="text-lg font-medium boder-b">
							Driver Details
							<span>
								{byDriverLoading && <CircularProgress />}{" "}
								{byDriverError && (
									<Alert type="error" message={byDriverError} />
								)}
							</span>
						</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="h-5/6">
						<div className="text-center py-8">
							<div className="text-lg font-medium mb-2">
								{modalData?.first_name} {modalData?.last_name}
							</div>
							<div className="text-[#949292]">{modalData?.email}</div>
							<div className="text-[#949292]">{modalData?.phone}</div>

							<div className="bg-[#FAD0D0] text-[#E71D36] mt-2 py-2 text-center rounded-md">
								{modalData?.available}
							</div>
						</div>

						<div>
							<div className="text-lg font-medium">Trip History</div>

							{byDriverTrip?.map((trip: Trip_interface) => {
								return (
									<div
										className="flex overflow-hidden justify-between border-b py-2 my-4 text-gray-800"
										key={trip?._id}>
										<div className="flex">
											<div className="mt-2 mr-4">
												<FaBus />
											</div>
											<div>
												<div className="truncate text-base">
													{trip?.travel_destination?.from?.city?.city} to{" "}
													{trip?.travel_destination?.to?.city?.city}
												</div>
												<div className="text-[#949292] text-xs">
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
					</div>
				</Modal>
			)}

			{flip === flipType.DEACTIVATE && modalVisible && (
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

					<Button
						title="Deactivate"
						type="submit"
						className="w-full py-2 mt-8 text-xs rounded-md bg-[#E71D36] text-white"
						onClick={() => {
							setFlip("success");
						}}
					/>
					<Button
						title="Cancel"
						type="submit"
						className="w-full py-2 mt-4 mb-4 text-xs text-gray-600 border border-gray-500 rounded-md"
						onClick={() => {
							setFlip("info");
						}}
					/>
				</Modal>
			)}
			{/* SUCESS MODAL SHOWS AFTER API RETURNS SUCCESS FOR TRIP UPDATES */}
			{flip === flipType.SUCCESS && modalVisible && (
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
							User deactivated succesfully
						</div>
					</div>

					<Button
						title="Close"
						type="submit"
						className="w-full py-2 mt-8 text-xs rounded-md bg-[#00FF6A] text-black"
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

export default AdminDriverOverview;
