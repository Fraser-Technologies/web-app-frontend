import { CircularProgress } from "@mui/material";
import { Alert, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import { State_interface } from "../../../interfaces/state_interface";
import {
	addBusStopToStateAction,
	removeBusStopToStateAction
} from "../../../state/action/busStop.action";
import {
	createStateAction,
	deleteState,
	getAllStateAction
} from "../../../state/action/state.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { FraserButton } from "../../../components/Button";
import LoadingWheel from "../../../components/loading-svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/redux-store";

const BusStopManagement = () => {
	const [flip, setFlip] = useState("");
	const dispatch = useAppDispatch();
	const { loading, error, state } = useAppSelector(
		(state: any) => state?.createState
	);
	const { loading: createBusStopLoading, state: addBusStopToCity } =
		useAppSelector((state: any) => state?.addBusStop);
	const { state: deletedState } = useSelector(
		(state: RootState) => state.deleteState
	);

	type deleteBusStopType = {
		id: string;
		busstop: string;
	};
	const { states } = useAppSelector((state: any) => state?.allState);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [cityName, setCityName] = React.useState("");
	const [cityModalData, setCityModalData] = useState<State_interface>();
	const [busStop, setBusStop] = useState<string>("");
	const [deleteBusStop, setDeleteBusStop] = useState<deleteBusStopType>();

	const handleOpenModal = (data: State_interface, flipValue: any) => {
		setFlip(flipValue);
		setCityModalData(data);
		setModalVisible(true);
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

	const patterns = [
		"bg-blue-900",
		"bg-red-900",
		"bg-yellow-900",
		"bg-green-900",
		"bg-purple-900"
	];
	const pattern = (): string => {
		return patterns[Math.floor(Math.random() * patterns.length)];
	}; // generate a random pattern

	const createCity = () => {
		dispatch(
			createStateAction({
				name: cityName
			})
		);

		setFlip("city");
		setFlip("success");
		setCityName("");
	};

	useEffect(() => {
		if (state?._id) {
			dispatch(getAllStateAction());
		}
	}, [state, dispatch]);

	useEffect(() => {
		if (addBusStopToCity?._id || deletedState?._id) {
			dispatch(getAllStateAction());
		}
	}, [addBusStopToCity?._id, deletedState?._id, dispatch]);

	useEffect(() => {
		if (states) {
			setCityModalData(
				states.find(
					(state: State_interface) => state?._id === cityModalData?._id
				)
			);
		}
	}, [states, cityModalData]);

	return (
		<div className="pt-12 px-4 pb-12">
			<h2 className="mb-4 pl-4 bg-white fixed border-b top-24 py-8 w-full text-xl font-medium">
				Bus Stops{" "}
			</h2>
			<div className="flex place-content-end my-2  mt-24 w-full  bg-white">
				{/* <h2 className=" text-xs font-medium">Trips</h2> */}
				{/* {loading && <Spinner />} */}
				<FraserButton
					title="+ Add new State"
					type="submit"
					size="regular"
					onClick={() => {
						setModalVisible(true);
						setFlip("create");
					}}
				/>
			</div>
			{/* BODY */}

			<div className="grid gap-4 grid-cols-2">
				{states?.map((city: State_interface) => {
					return (
						<div
							key={city?._id}
							className={`w-full h-24 ${pattern()} text-white rounded-md flex flex-col items-center justify-center`}
							onClick={() => {
								handleOpenModal(city, "city");
								setCityModalData(city);
							}}>
							<div className="text-xs">{city?.name}</div>
							<div className="">{city?.bus_stops?.length}</div>
						</div>
					);
				})}
			</div>

			{/* ADD CITY SESSION */}
			{flip === "create" && modalVisible && (
				<Modal
					title={<div className="boder-b text-lg font-medium">Add State</div>}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="mt-8">
						<div className="mb-2">
							<label className="text-gray-500  ml-2">State Name</label>
						</div>
						<Input
							className="hover:border-green-500 focus:border-green-600 h-10 w-full"
							placeholder="State name"
							value={cityName}
							required={true}
							onChange={(e) => {
								setCityName(e.target.value);
							}}
						/>
					</div>
					<br />

					<button
						className={`w-full p-3 mb-2  rounded-lg ${
							true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
						} `}
						onClick={createCity}>
						{loading && (
							<span className="mr-2">
								<LoadingWheel param={loading} />
							</span>
						)}
						Create State
					</button>
				</Modal>
			)}

			{/* CITY SESSION */}
			{
				//  CITY MODAL SHOWS ON CLICK OF CITY CARD
				flip === "city" && modalVisible && (
					<Modal
						title={
							<div>
								<div className="text-lg font-medium">
									{cityModalData?.name}{" "}
								</div>
								<div className=" mt-1 font-normal text-[#949292]">
									Number of Bus stops {cityModalData?.bus_stops?.length}
								</div>
							</div>
						}
						onOk={handleOk}
						onCancel={handleCancel}
						open={modalVisible}
						centered={true}
						footer={false}
						closable={true}>
						<div className="my-2 mt-4">
							{cityModalData?.bus_stops?.map((busstop: string) => {
								return (
									<div
										key={busstop}
										className="flex py-2 border-b place-items-center justify-between w-full">
										{busstop}
										<button
											className={`p-2  font-medium rounded-lg `}
											onClick={() => {
												setDeleteBusStop({
													id: cityModalData?._id,
													busstop: busstop
												});
												setFlip("delete");
											}}>
											<FaTrash />
										</button>
									</div>
								);
							})}
						</div>

						<button
							className={`w-full mt-4 p-3  rounded-md bg-primary-100 ${
								true ? " hover:text-[#1D7225]" : "bg-[#f5f5f5]"
							} `}
							onClick={() => {
								setFlip("createBusStop");
							}}>
							Add new stop
						</button>
						<button
							className={`w-full mt-2 p-3  rounded-lg text-[#E71D36] ${
								true ? " hover:text-[#C81027]" : "bg-[#f5f5f5]"
							} `}
							onClick={() => {
								// setFlip("createBusStop");
								//LEKAN WE'LL NEED TO FIX THIS
								dispatch(deleteState(cityModalData?._id || ""));
								setFlip("");
							}}>
							Delete State
						</button>
					</Modal>
				)
			}

			{/* DELETE SESSION */}
			{flip === "delete" && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width={240}>
					<div className="w-full place-items-center text-center">
						<FaExclamationCircle
							size={32}
							className="text-[#E71D36] w-full mt-8"
						/>
						<div className="boder-b mt-4 text-base font-medium">
							Delete busstop?
						</div>
					</div>

					<FraserButton
						title="Delete"
						type="submit"
						size="regular"
						onClick={() => {
							dispatch(
								removeBusStopToStateAction(
									deleteBusStop?.id || "",
									deleteBusStop?.busstop || ""
								)
							);
							setModalVisible(false);
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

			{flip === "success" && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width={240}>
					<div className="w-full place-items-center text-center">
						<FaCheckCircle size={32} className="text-[#00FF6A] w-full mt-8" />
						<div className="boder-b mt-4 text-base font-medium">
							State created successfully
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

			{/* CREATE BUS STOP */}
			{flip === "createBusStop" && modalVisible && (
				<Modal
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					//   width={240}
				>
					<div className="w-full">
						<div className="boder-b mt-4 w-full text-lg font-medium">
							Add New Bus Stop to {cityModalData?.name}{" "}
							{createBusStopLoading && <CircularProgress />}
						</div>
					</div>

					{error && <Alert type="error" message={error} />}

					<div className="mb-4 mt-8 w-full">
						<div className="mb-1">
							<label className="text-gray-500">Bus Stop Name</label>
						</div>
						<Input
							className="hover:border-green-500 active:border-green-600 focus:border-green-600 h-12 w-full"
							placeholder="Bus Stop Name"
							value={busStop}
							required={true}
							onChange={(e) => {
								setBusStop(e.target.value);
							}}
						/>
					</div>

					<FraserButton
						title="Okay"
						type="submit"
						size="regular"
						onClick={() => {
							if (busStop) {
								dispatch(
									addBusStopToStateAction(cityModalData?._id || "", busStop)
								);
								setFlip("city");
								setCityName("");
								setBusStop("");
							}
						}}
					/>
				</Modal>
			)}
		</div>
	);
};

export default BusStopManagement;
