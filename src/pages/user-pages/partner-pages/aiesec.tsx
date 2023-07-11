/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import Layout from "../../../components/layouts/SignInLayout";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { FraserButton } from "../../../components/Button";
import allState from "../../../utils/allState";
import BookingCard from "../../../components/bookingCard";
import { Alert, Drawer, Input, Modal, Spin, message } from "antd";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/redux-store";
import { Trip_interface } from "../../../interfaces/trip_interface";
import { getAvailableTripAction } from "../../../state/action/trip.action";
import {
	registerUserAction,
	userLoginAction
} from "../../../state/action/user.action";
import { MdOutlineCancel } from "react-icons/md";
import { addToMyBookinAction } from "../../../state/action/booking.action";
import { State_interface } from "../../../interfaces/state_interface";

const AiesecPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { states } = useAppSelector((state: any) => state.allState);

  const {
    userInfo,
    error: loginError,
    loading: userLoginLoading,
  } = useAppSelector((state: RootState) => state.userLogin);
  const { error: registerUserError, loading: userRegisterLoading } =
    useAppSelector((state: RootState) => state.registerUser);
  // const { trips } = useSelector((state: RootState) => state.allTrip);
  const { loading, trips: availableTripData } = useSelector(
    (state: RootState) => state.availableTrip
  );

	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [isOpen, setisOpen] = useState(false);
	const [stateFilter, setStateFilter] = useState("");
	const [flip, setFlip] = useState("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [homeState, setHomeState] = useState<string>("");
	const [value, setValue] = useState<number>(1);
	const [messageApi, contextHolder] = message.useMessage();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [referred_by, setReferred_by] = useState<string>("");
	const [selectedTrip, setSelectedTrip] = useState<Trip_interface>();

	const loginValid = phone !== "" && phone.length === 10;

	const handleCancel = () => {
		setModalVisible(false);
		setFlip("");
	};

	const handleChange = (e: any) => {
		const inputValue = e.target.value;
		setValue(inputValue);
	};

	const addItem = () => {
		if (selectedTrip)
			if (
				selectedTrip?.bus?.capacity - selectedTrip?.bookings?.length >
				value
			) {
				setValue(value + 1);
			} else {
				setValue(selectedTrip?.bus?.capacity - selectedTrip?.bookings?.length);
			}
	};

	const minusItem = () => {
		if (value > 1) setValue(value - 1);
	};

	const handleOpenModal = (data: any, flipValue: any) => {
		setFlip(flipValue);
		setModalVisible(true);
	};

  const searchForTrip = () => {
    dispatch(
      getAvailableTripAction({
        from: stateFilter,
        to: "Ilaji Hotels and Sports Resort",
      })
    );
  };

	const CreateUser = () => {
		return dispatch(
			registerUserAction({
				first_name: firstName.trim(),
				last_name: lastName.trim(),
				email: email.trim(),
				phone: "+234" + phone.trim(),
				referred_by: referred_by.trim(),
				home_state: homeState
			})
		);
	};

	const LoginUser = () => {
		return dispatch(userLoginAction("+234" + phone));
	};

	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const signUpValid =
		firstName !== "" &&
		lastName !== "" &&
		email !== "" &&
		phone !== "" &&
		phone.length === 10 &&
		email.match(emailRegex);

	useEffect(() => {
		if (!userInfo?._id) {
			setIsModalOpen(true);
		} else {
			setIsModalOpen(false);
		}
	}, [dispatch, navigate, userInfo]);

	useEffect(() => {
		if (!userInfo && loginError) {
			messageApi.open({
				type: "error",
				content: loginError
			});
			setFlip("signin");
		}
	}, [loginError, messageApi, userInfo]);

  // useEffect(() => {
  //   searchForTrip();
  // }, [stateFilter]);

  return (
    <Layout
      title="Book Intercity Bus Rides in Nigeria with Fraser | RideFraser.com"
      pageDescription="Find the best intercity bus transportation options in Nigeria with Fraser. Book your ride today on RideFraser.com and travel in comfort and style."
      pageKeywords="Fraser, intercity bus, Nigeria, ride booking, transportation, travel, comfort, style, RideFraser.com, intercity bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser"
    >
      <div className="bg-black h-screen w-full text-white px-[64px]">
        {contextHolder}
        <div className="w-2/5 leading-[1.2] pt-40 text-[40px] tracking-tight">
          Hey AIESEC, let's go to conference
        </div>

        <div className="w-full bg-white p-8 mt-12 rounded-md text-black">
          <div className="leading-snug text-[18px] font-medium mb-6">
            Where were you posted? {loading && <Spin />}
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
                    stateFilter === "" && "h-content"
                  }`}
                >
                  {states
                    .filter((e: any) =>
                      e.name.toLowerCase().includes(stateFilter.toLowerCase()) && !e.name.includes("Ilaji Hotels and Sports Resort")
                    )
                    .sort((a: State_interface, b: State_interface) =>
                      a.name.localeCompare(b.name)
                    )
                    .map((state: State_interface) => {
                      return (
                        <a
                          href="#"
                          className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setStateFilter(state?.name);
                            setisOpen(false);
                            searchForTrip();
                          }}
                        >
                          {state?.name}
                        </a>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {availableTripData?.map((trip: Trip_interface) => {
            return (
              <div>
                {trip?.type_of_trip === "AIESEC" && (
                  <BookingCard
                    key={trip?._id}
                    from={trip?.travel_destination?.from?.state?.name}
                    to={trip?.travel_destination?.to?.state.name}
                    fromBusStop={trip?.travel_destination?.from?.start_busstop}
                    toBusStop={trip?.travel_destination?.to?.stop_busstop}
                    takeOffTime={trip?.take_off_time}
                    takeOffDate={trip?.take_off_date}
                    price={trip?.price}
                    arrivalTime={trip?.arrival_time}
                    arrivalDate={trip?.arrival_date}
                    onClick={() => {
                      if (!userInfo?._id) {
                        return handleOpenModal(null, "signin");
                      }
                      handleOpenModal(trip, "howmanytickets");
                      setSelectedTrip(trip);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        {flip === "signin" && (
          <Modal
            title={
              <div>
                <div className="flex flex-row w-full items-center justify-between ">
                  <h1 className="pt-2 text-xl">Welcome Back</h1>

									<MdOutlineCancel
										className="text-[25px] hover:cursor-pointer"
										onClick={() => setFlip("")}
									/>
								</div>
								<p className="pt-1 text-sm font-light text-gray-500">
									Please enter your phone number to continue
								</p>

								{loginError && (
									<Alert
										message={loginError}
										type="warning"
										showIcon
										className="bg-blue-50 w-[100%] text-[0.8rem] font-normal border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
									/>
								)}
							</div>
						}
						open={isModalOpen}
						centered={true}
						footer={false}
						closable={false}>
						<div>
							<div className="pt-8 mt-3 mb-3">
								<Input
									className="w-full h-12 hover:border-green-500 active:border-green-600"
									placeholder="903 123 1234"
									value={phone}
									prefix={"+234"}
									type="number"
									required={true}
									onChange={(e) => {
										setPhone(
											e.target.value.startsWith("0")
												? e.target.value.slice(1)
												: e.target.value
										);
									}}
								/>
							</div>

							{/* USER LOGIN */}

							<FraserButton
								title={"Continue"}
								size={"regular"}
								active={loginValid}
								className={"w-full mt-4"}
								loader={userLoginLoading}
								onClick={() => loginValid && LoginUser()}
							/>

							<FraserButton
								title={"I don't have an account"}
								buttonType={"tertiary"}
								size={"regular"}
								className={"w-full mt-2"}
								onClick={() => setFlip("signup")}
							/>
						</div>
					</Modal>
				)}

				{flip === "signup" && (
					<Modal
						title={
							<div>
								<div className="flex flex-row w-full items-center justify-between ">
									<h1 className="pt-2 text-xl">Let's get you started</h1>

									<MdOutlineCancel
										className="text-[25px] hover:cursor-pointer"
										onClick={() => setFlip("")}
									/>
								</div>
								<p className="pt-1 text-sm font-light text-gray-500">
									You're almost there, create an account in just one simple
									step.
								</p>

								<div>
									{registerUserError && (
										<Alert
											message={registerUserError}
											type="warning"
											showIcon
											className="bg-blue-50 w-[100%] text-[0.8rem] font-normal border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
										/>
									)}
								</div>
							</div>
						}
						open={isModalOpen}
						centered={true}
						footer={false}
						closable={false}>
						<div>
							{registerUserError && (
								<Alert
									message={registerUserError}
									description={registerUserError}
									type="warning"
									showIcon
								/>
							)}
							<div className="mt-8 mb-6">
								<div className="mb-1">
									<label className="text-gray-500">First Name</label>
								</div>
								<Input
									className="w-full h-12 hover:border-green-500 active:border-green-600"
									placeholder="Please enter your first name"
									value={firstName}
									required={true}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-gray-500">Last Name</label>
								</div>
								<Input
									className="w-full h-12 hover:border-green-500 active:border-green-600"
									placeholder="Last name"
									value={lastName}
									required={true}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-gray-500">Email Address</label>
								</div>
								<Input
									className="w-full h-12 hover:border-green-500 active:border-green-600"
									placeholder="Email"
									value={email}
									required={true}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-gray-500">Home State</label>
								</div>
								<select
									className="  w-full h-12 hover:border-green-500 bg-transparent border outline-none rounded-md active:border-
							active:border-green-600"
									onChange={(e) => setHomeState(e.target.value)}>
									<option>Select State</option>
									{allState.map((s: string) => {
										return (
											<option key={s} value={s}>
												{s}
											</option>
										);
									})}
								</select>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-gray-500">Referral Code</label>
								</div>
								<Input
									className="w-full h-12 hover:border-green-500 active:border-green-600"
									placeholder="Referral Code"
									value={referred_by}
									required={true}
									onChange={(e) => setReferred_by(e.target.value)}
								/>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-gray-500">Phone Number</label>
								</div>
								<Input
									className="w-full h-12 hover:border-green-500 active:border-green-600"
									placeholder="901 1234 123"
									type="number"
									value={phone}
									prefix={"+234"}
									required={true}
									onChange={(e) => {
										setPhone(
											e.target.value.startsWith("0")
												? e.target.value.slice(1)
												: e.target.value
										);
									}}
								/>
							</div>

							<FraserButton
								title={"Continue"}
								size={"small"}
								active={signUpValid === false ? false : true}
								className={"w-full mt-4"}
								onClick={() => signUpValid && CreateUser()}
								loader={userRegisterLoading}
							/>
							<FraserButton
								title={"I have an account"}
								buttonType={"tertiary"}
								size={"regular"}
								className={"w-full mt-2"}
								onClick={() => setFlip("signin")}
							/>
						</div>
					</Modal>
				)}

				{flip === "howmanytickets" && modalVisible && (
					<Drawer
						title={
							<div>
								<div className="mt-8 text-lg font-medium boder-b">
									Number of Tickets
								</div>
								<div className="text-[#929292] font-light text-xs mt-1">
									{" "}
									Available Seats:{" "}
									{selectedTrip &&
										selectedTrip?.bus?.capacity -
											selectedTrip?.bookings?.length}
								</div>
								<div className="flex-row justify-between px-6 py-4 mt-6 bg-black rounded-lg lg:flex lg:px-8">
									<div className="flex lg:w-4/5">
										<div className="w-1/2 lg:w-1/3">
											<h3 className="mr-8 text-lg md:text-base lg:h-20 lg:mr-0 text-primary-100">
												{/* {modalData?.travel_destination?.from?.start_busstop} */}
												{selectedTrip?.travel_destination?.from?.state?.name}
											</h3>
										</div>
										<BsArrowRight className="top-0 mt-1 mr-8 lg:w-4 lg:mr-0 text-primary-100 md:top-2 left-10 md:left-10" />
										<div className="w-1/2 lg:w-1/3 ">
											<h3 className="text-lg md:text-base lg:h-20 text-primary-100 ">
												{/* {modalData?.travel_destination?.to?.stop_busstop} */}
												{selectedTrip?.travel_destination?.to?.state?.name}
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
								dispatch(
									addToMyBookinAction({ ...selectedTrip, no_of_ticket: value })
								);
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
