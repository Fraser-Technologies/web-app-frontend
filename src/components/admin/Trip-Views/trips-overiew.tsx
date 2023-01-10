import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
	FaCheckCircle,
	FaEllipsisV,
	FaExclamationCircle,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Trip_interface } from "../../../interfaces/trip_interface";
import { getAllTripAction } from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Button } from "../../Button";
import CreateTripFormComponent from "../components/create-trip-form";
import EditTripFormComponent from "../components/edit-trip-form";

const TripsOverview: React.FC = () => {
	const { loading, trips } = useAppSelector((state: any) => state.allTrip);

	const [currentPage, setCurrentPage] = useState<number>(0);
	const [modalData, setModalData] = useState<Trip_interface>(); // current page
	const [flip, setFlip] = useState("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
  
	const itemsPerPage = 10; // number of items per page
	const pageRangeDisplayed = 5; // number of pages to display
	const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
	const totalItems = trips?.length; // total number of items
	const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages
	const [menuVisible, setMenuVisible] = useState(false); // ROW ACTION MENU

	// function to handle page clicks
	const handlePageClick = (data: any) => {
		setCurrentPage(data.selected); // update the current page
	};

	// calculate the start and end index of the items to display on the current page
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const items = trips.slice(startIndex, endIndex); // items to display on the current page

	//TOGGLE
	const handleSetMenuToggle = (value: string) => {
		setMenuVisible(!menuVisible);

		// if (menuToggle === value) {
		//   setMenuVisible(!menuVisible);
		// } else {
		//   setMenuToggle(value);
		// }
	};

	const handleOpenModal = (data: any, flipValue: any) => {
		setFlip(flipValue);
		setModalData(data);
		setModalVisible(true);
	};

	const [visible, setStateModalVisible] = useState<boolean>(false);
	const handleOpenDeleteModal = (data: any) => {
		setFlip("delete");
		setStateModalVisible(true);
		setModalData(data);
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
			setFlip("info");
		}
	};

	const updateTripData = () => {
		if (true) {
			setFlip("success");
			setStateModalVisible(true);
			// Flip to success modal
		}
	};

	return (
		<>
			{/* TRIPS OVERVIEW VIEW*/}

			{/* BUSSTOPS HEADER */}
			<div className="w-full my-2 border-b h-14">
				<div className="flex justify-between">
					<h2 className="mt-2 text-lg font-medium">Busstops</h2>{" "}
					{loading && <Spinner />}
					<Button
						title="+ Create new trip"
						type="submit"
						className="px-4 py-2 text-xs rounded-md bg-primary-100"
						onClick={() => {
							//PASS THE DATA THAT CONTAINS ALL TRIP INFORMATION WHERE - UNDEFINED
							//I COMMENTED OUT THE MODALDATA CALLS IN THE FLIP (INFO), SO CHECK
							handleOpenModal(undefined, "create");
						}}
					/>
				</div>
			</div>
			{/* PAGINATION */}
			<div className="px-6 mb-4 bg-gray-200 rounded-md">
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
          previousClassName={"previous mr-6"}
          nextClassName={"next ml-6"}
          previousLabel={"<"}
          nextLabel={">"}
        />
			</div>

			{/* BUSSTOPS LIST - TABLE */}
			<table className="w-full text-base font-normal text-left text-white table-auto">
				<thead className="uppercase bg-black">
					<tr>
						<th scope="col" className="px-4 py-4 font-normal rounded-l-md">
							Start
						</th>
						<th scope="col" className="px-2 py-4 font-normal text-center">
							Destination
						</th>
						<th scope="col" className="px-2 py-4 font-normal text-center">
							Date
						</th>
						<th scope="col" className="px-2 py-4 font-normal text-center">
							Departure
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
					{items?.map((_item: Trip_interface, index: Number) => {
						return (
							<tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
								<td
									onClick={() => {
										handleOpenModal(items, "info");
									}}
									className="px-4 py-4 text-xs font-normal text-gray-700">
									{items.travel_destination?.from?.city?.city}
								</td>
								<td className="text-xs font-normal text-center text-gray-700">
									{items.travel_destination?.to?.city?.city}
								</td>
								<td
									onClick={() => {
										handleOpenModal(items, "info");
									}}
									className="px-4 py-4 text-xs font-normal text-center text-gray-700">
									{items?.take_off_date}
								</td>
								<td
									onClick={() => {
										handleOpenModal(items, "info");
									}}
									className="px-4 py-4 text-xs font-normal text-center text-gray-700">
									{items?.take_off_time}
								</td>
								<td
									onClick={() => {
										handleOpenModal(items, "info");
									}}
									className="px-4 py-4 text-xs font-normal text-center text-gray-700">
									{`${items?.driver?.first_name} ${items?.driver?.last_name} `}
								</td>
								<td
									onClick={() => {
										handleOpenModal(items, "info");
									}}
									className="px-4 py-4 text-xs font-normal text-center text-gray-700">
									{items?.bus?.name}
								</td>
								<td
									className="px-4 py-6 text-xs font-normal text-gray-700"
									onClick={() => {
										handleSetMenuToggle("value");
									}}>
									<div>
										<FaEllipsisV />
									</div>
									{menuVisible && (
										<ul className="absolute z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
											<li
												onClick={() => {
													handleOpenModal(items, "info");
												}}
												className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
												View
											</li>
											<li
												onClick={() => {
													handleOpenModal(items, "edit");
												}}
												className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
												Edit
											</li>
											<li
												onClick={() => {
													setFlip("delete");
													handleOpenDeleteModal(items);
												}}
												className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100">
												Delete
											</li>
										</ul>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{/* MODALS */}
			{flip === "create" && modalVisible && (
				<Modal
					title={
						<div className="text-lg font-medium boder-b">Create a new trip</div>
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

			{flip === "review" && modalVisible && (
				<Modal
					title={
						<div className="text-lg font-medium boder-b">Trip Details</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="grid w-full grid-cols-2 gap-8 pb-12 mt-12">
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Start
							</div>
							<div className="text-lg">Start City </div>
						</div>

						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Destination
							</div>
							<div className="text-lg">Destination City</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Start Bus Stop
							</div>
							<div className="text-lg">Start Bus Stop</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Destination Bus Stop
							</div>
							<div className="text-lg">Destination Bus Stop</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Departure Time
							</div>
							<div className="text-lg">Time</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">Date</div>
							<div className="text-lg">Date</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Driver
							</div>
							<div className="text-lg">Driver</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Vehicle
							</div>
							<div className="text-lg">Vehicle</div>
						</div>
					</div>
					<Button
						title="Continue"
						type="submit"
						className="w-full px-4 py-3 text-xs rounded-md bg-primary-100"
						onClick={() => {
							//API CALL FOR CREATING TRIP
							//THEN SET FLIP IF SUCCESS. TO SUCCESS AS SHOWN BELOW
							setFlip("success");
						}}
					/>
					<Button
						title="Edit"
						type="submit"
						className="w-full px-4 py-3 mt-4 mb-6 text-xs text-gray-500 border border-gray-500 rounded-md"
						onClick={() => {
							setFlip("create");
						}}
					/>
				</Modal>
			)}

			{flip === "success" && modalVisible && (
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
						className="w-full py-2 mt-8 mb-4 text-xs rounded-md bg-[#00FF6A] text-black"
						onClick={() => {
							setModalVisible(false);
						}}
					/>
				</Modal>
			)}

			{flip === "info" && modalVisible && (
				<Modal
					title={
						<div className="text-lg font-medium boder-b">Trip Details</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="grid w-full grid-cols-2 gap-8 pb-12 mt-12">
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Start
							</div>
							<div className="text-lg">
								{modalData?.travel_destination?.from?.city?.city}
							</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Destination
							</div>
							<div className="text-lg">
								{modalData?.travel_destination?.to?.city?.city}
							</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Start
							</div>
							<div className="text-lg">
								{modalData?.travel_destination?.from?.busstop}
							</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Destination
							</div>
							<div className="text-lg">
								{modalData?.travel_destination?.to?.busstop}
							</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Departure Time
							</div>
							<div className="text-lg">{modalData?.take_off_time}</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">Date</div>
							<div className="text-lg">{modalData?.take_off_date}</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Driver
							</div>
							<div className="text-lg">
								{`${modalData?.driver?.first_name} ${modalData?.driver?.last_name}`}
							</div>
						</div>
						<div>
							<div className="mb-1 text-sm font-normal text-gray-400">
								Vehicle
							</div>
							<div className="text-lg">{modalData?.bus?.name}</div>
						</div>
					</div>
					<Button
						title="Edit"
						type="submit"
						className="w-full px-4 py-3 text-xs rounded-md bg-primary-100"
						onClick={() => {
							setFlip("edit");
						}}
					/>
					<Button
						title="Delete"
						type="submit"
						className="w-full px-4 py-3 mt-4 mb-6 text-xs text-red-600 border border-red-500 rounded-md"
						onClick={() => {
							setFlip("delete");
							setStateModalVisible(true);
						}}
					/>
				</Modal>
			)}

			{flip === "edit" && modalVisible && (
				<Modal
					title={<div className="text-lg font-medium boder-b">Edit Trip</div>}
					onOk={handleOk}
					onCancel={handleCancel}
					open={true}
					centered={true}
					footer={false}
					closable={true}>
					<EditTripFormComponent trip={modalData} />
				</Modal>
			)}

			{flip === "delete" && visible && (
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
							Delete startCityData to destinationCityData trip?
						</div>
					</div>

					<Button
						title="Delete"
						type="submit"
						className="w-full py-2 mt-8 text-xs rounded-md bg-[#E71D36] text-white"
						onClick={() => {}}
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
			{/* }   SUCESS MODAL SHOWS AFTER API RETURNS SUCCESS FOR TRIP UPDATES */}
			{flip === "success" && visible && (
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
						className="w-full py-2 mt-8 text-xs rounded-md bg-[#00FF6A] text-black"
						onClick={() => {
							//NOT SURE THIS IS USEFUL DURING API CALLS
							setFlip("info");
						}}
					/>
					<Button
						title="Close"
						type="submit"
						className="w-full py-2 mt-4 mb-4 text-xs text-gray-600 border border-gray-500 rounded-md"
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

export default TripsOverview;
