import { useEffect, useState } from "react";
import Layout from "../../components/layouts/SignInLayout";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { FraserButton } from "../../components/Button";
import allState from "../../utils/allState";
import BookingCard from "../../components/bookingCard";
import { Drawer } from "antd";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/hooks";
import { addToMyBookinAction } from "../../state/action/booking.action";
import { getAvailableNYSCTripAction } from "../../state/NYSC_STATE/nysc_actions/nysc_trip_slice";
import { useSelector } from "react-redux";
import { RootState } from "../../state/redux-store";
import { NYSCTrip_interface } from "../../interfaces/NYSC_INTERFACES/nysc_trip_interface";

const AiesecPage = () => {
	const dispatch = useAppDispatch();
	const [isOpen, setisOpen] = useState(false);
	const [stateFilter, setStateFilter] = useState("");
	const [flip, setFlip] = useState("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [value, setValue] = useState<number>(1);
	const navigate = useNavigate();
	const { loading, error, trips } = useSelector(
		(state: RootState) => state.availableNYSCTrip
	);

	const handleCancel = () => {
		setModalVisible(false);
		setFlip("");
	};

	const handleChange = (e: any) => {
		const inputValue = e.target.value;
		setValue(inputValue);
	};

	const addItem = () => {
		if (value >= 1) {
			setValue(value + 1);
		}
	};

	const minusItem = () => {
		if (value > 1) setValue(value - 1);
	};

	const handleOpenModal = (data: any, flipValue: any) => {
		setFlip(flipValue);
		setModalVisible(true);
	};

	useEffect(() => {
		dispatch(
			getAvailableNYSCTripAction({
				from: "Oyo",
				to: stateFilter
			})
		);
	}, [stateFilter]);

	return (
		<Layout
			title="Book Intercity Bus Rides in Nigeria with Fraser | RideFraser.com"
			pageDescription="Find the best intercity bus transportation options in Nigeria with Fraser. Book your ride today on RideFraser.com and travel in comfort and style."
			pageKeywords="Fraser, intercity bus, Nigeria, ride booking, transportation, travel, comfort, style, RideFraser.com, intercity bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser">
			<div className="bg-black h-screen w-full text-white px-[64px]">
				<div className="w-2/5 leading-[1.2] pt-40 text-[40px] tracking-tight">
					Get the best deals to get you to camp
				</div>

				<div className="w-full bg-white p-8 mt-12 rounded-md text-black">
					<div className="leading-snug text-[18px] font-medium mb-6">
						Where were you posted?
					</div>
					<div className={`${stateFilter !== "" && "mb-8"} flex`}>
						<div className="relative z-30 w-full text-left duration-300 ease-in-out lg:mb-0">
							<input
								type="text"
								className="inline-flex  items-center w-full h-[48px] px-2 py-2 mb-2 leading-5 text-gray-700 bg-white border border-gray-300 rounded-[4px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
								placeholder="State"
								onClick={() => setisOpen(!isOpen)}
								onChange={(e) => {
									setStateFilter(e.target.value);
								}}
								value={stateFilter}
							/>

							{isOpen && (
								<div
									className={`absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg overflow-y-scroll ${
										stateFilter === "" && "h-80"
									}`}>
									{allState
										?.filter((e) =>
											e.toLowerCase().includes(stateFilter.toLowerCase())
										)
										.map((e: any) => {
											return (
												// eslint-disable-next-line jsx-a11y/anchor-is-valid
												<a
													key={e}
													href="#"
													className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
													onClick={() => {
														setStateFilter(e);
														setisOpen(false);
													}}>
													{e}
												</a>
											);
										})}
								</div>
							)}
						</div>
						{/* <FraserButton
              title={"Proceed"}
              size={"regular"}
              icon={<FaChevronRight />}
              iconposition="right"
            /> */}
					</div>
					{trips?.map((trip: NYSCTrip_interface) => (
						<BookingCard
							key={trip?._id}
							from={"Oyo"}
							to={stateFilter}
							takeOffTime={trip?.take_off_time}
							takeOffDate={trip?.take_off_date}
							price={trip?.price}
							//Set Price from Corresponding DataSet
							arrivalTime={trip?.arrival_time}
							//Set Price from Corresponding DataSet
							arrivalDate={trip?.arrival_date}
							//Set Price from Corresponding DataSet
							onClick={() => {
								handleOpenModal(null, "howmanytickets");
							}}
						/>
					))}
				</div>
				{flip === "howmanytickets" && modalVisible && (
					<Drawer
						title={
							<div>
								<div className="mt-8 text-lg font-medium boder-b">
									Number of Tickets
								</div>
								<div className="flex-row justify-between px-6 py-4 mt-6 bg-black rounded-lg lg:flex lg:px-8">
									<div className="flex lg:w-4/5">
										<div className="w-1/2 lg:w-1/3">
											<h3 className="mr-8 text-lg md:text-base lg:h-20 lg:mr-0 text-primary-100">
												{/* {modalData?.travel_destination?.from?.start_busstop} */}
												Ibadan
											</h3>
										</div>
										<BsArrowRight className="top-0 mt-1 mr-8 lg:w-4 lg:mr-0 text-primary-100 md:top-2 left-10 md:left-10" />
										<div className="w-1/2 lg:w-1/3 ">
											<h3 className="text-lg md:text-base lg:h-20 text-primary-100 ">
												{/* {modalData?.travel_destination?.to?.stop_busstop} */}
												{stateFilter}
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
								onClick={addItem}
								className="cursor-pointer"
							/>
						</div>
						<FraserButton
							title="Continue"
							size="regular"
							onClick={() => {
								navigate("/checkout");
							}}
						/>
					</Drawer>
				)}
			</div>
		</Layout>
	);
};

export default AiesecPage;
