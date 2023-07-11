/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import Layout from "../../components/layouts/SignInLayout";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import { Alert, Dropdown, Input, message, Modal } from "antd";
import {
	registerUserAction,
	userLoginAction
} from "../../state/action/user.action";
import { getAvailableTripAction } from "../../state/action/trip.action";
import { FaCaretDown } from "react-icons/fa";
import { State_interface } from "../../interfaces/state_interface";
import { getAllStateAction } from "../../state/action/state.action";
import { RootState } from "../../state/redux-store";
import { FraserButton } from "../../components/Button";
import Offeringcard from "../../components/offeringcard";
import StepComp from "../../components/StepComp";
import Accordion from "../../components/Accordion";
import { _paths_ } from "../../utils/routes";
import Footer from "../../components/footer";
import allState from "../../utils/allState";
import { MdOutlineCancel } from "react-icons/md";

const BookRide = () => {
	enum TripValidOption {
		startCityOption = "Current City",
		destinationCityOption = "Where to?",
		destinationBusStopOption = "Station",
		startBusStopOption = "Station"
	}

	const {
		userInfo,
		error: loginError,
		loading: userLoginLoading
	} = useAppSelector((state: RootState) => state.userLogin);
	const { error: registerUserError, loading: userRegisterLoading } =
		useAppSelector((state: RootState) => state.registerUser);
	const { states } = useAppSelector((state: any) => state.allState);

	const { trips: availableTripData } = useAppSelector(
		(state: any) => state.availableTrip
	);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [flip, setFlip] = useState("signin");
	const [referred_by, setReferred_by] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [from, setFrom] = useState<string>("");
	const [to, setTo] = useState<string>("");
	const [homeState, setHomeState] = useState<string>("");
	const [messageApi, contextHolder] = message.useMessage();
	const [startBusStopIsOpen, setStartBusStopIsOpen] = useState(false);
	const [destinationCityIsOpen, setDestinationCityIsOpen] = useState(false);
	const [destinationBusStopIsOpen, setDestinationBusStopIsOpen] =
		useState(false);
	const [startBusStopList, setStartBusStopList] = useState<string[]>([]);
	const [desinationBusStopList, setDestinationBusStopList] = useState<string[]>(
		[]
	);

	const [startCity, setStartCity] = useState<string>(
		TripValidOption.startCityOption || ""
	);
	const [destinationCity, setDestinationCity] = useState<string>(
		TripValidOption.destinationCityOption || ""
	);

	const [startBusStop, setStartBusStop] = useState<string>(
		TripValidOption.startBusStopOption || ""
	);
	const handleStartBusStop = (option: any) => {
		setStartBusStop(option);
		setStartBusStopIsOpen(false);
	};
	const handleDestinationBusStop = (option: any) => {
		setDestinationBusStop(option);
		setDestinationBusStopIsOpen(false);
	};

	const [destinationBusStop, setDestinationBusStop] = useState<string>(
		TripValidOption.destinationBusStopOption || ""
	);

	const handleAvailableTrips = () => {
		if (from && to) {
			dispatch(getAvailableTripAction({ from: from, to: to }));
		}

		navigate("/bookings", {
			state: {
				startCity,
				destinationCity,
				destinationBusStop,
				startBusStop
			}
		});
	};

	const TripValid =
		startCity !== TripValidOption.startCityOption &&
		destinationBusStop !== TripValidOption.destinationBusStopOption &&
		startBusStop !== TripValidOption.startBusStopOption;

	const loginValid = phone !== "" && phone.length === 10;

	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const signUpValid =
		firstName !== "" &&
		lastName !== "" &&
		email !== "" &&
		phone !== "" &&
		phone.length === 10 &&
		email.match(emailRegex);

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

	// useEffect(() => {
	// 	if (!userInfo?._id) {
	// 		setIsModalOpen(true);
	// 	} else {
	// 		setIsModalOpen(false);
	// 	}
	// }, [dispatch, navigate, userInfo]);

	// useEffect(() => {
	// 	if (!userInfo && loginError) {
	// 		messageApi.open({
	// 			type: "error",
	// 			content: loginError
	// 		});
	// 		setFlip("signin");
	// 	}
	// }, [loginError, messageApi, userInfo]);

	useEffect(() => {
		if (userInfo?._id) {
			setFirstName("");
			setLastName("");
			setEmail("");
			setPhone("");
		}
	}, [userInfo]);

	useEffect(() => {
		dispatch(getAllStateAction());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (!userInfo?._id) navigate(_paths_.SIGNIN);
	// }, [navigate, userInfo]);

	return (
		<Layout
			title="Book Intercity Bus Rides in Nigeria | RideFraser"
			pageDescription="Book affordable and comfortable intercity bus rides in Nigeria with Fraser on ridefraser. Choose from multiple routes and travel dates. Book your ride now!"
			pageKeywords="intercity bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser, Fraser">
			{contextHolder}
			<div className="bg-[#000000] -mt-16 md:mt-0 w-full ">
				<div className="flex flex-col py-24 mx-6  md:mx-16 lg:mx-32">
					<h1 className="mt-16 md:mt-0 leading-tight bg-gradient-to-b from-[#00ff6a] to-[#FFEFC1] text-transparent bg-clip-text text-[2.6rem] md:text-[4rem] font-semibold">
						Move Freely <br /> between cities
					</h1>
					<h3 className=" text-[14px] w-10/12 text-gray-400 md:text-[15px] mt-2 font-light">
						Get started by simply inputting your location and destination
					</h3>
					<div className="absolute top-32  right-2 md:right-64 lg:right-96 bg-[#00FF6A] rounded-[100px] p-4">
						<img
							src="/assets/images/paper-airplane.png"
							className=" h-4 filter hue-rotate-90"
							alt=""
						/>
					</div>

					<div className="absolute top-96 -left-8 bg-[#00FF6A] rounded-[100px] p-4">
						<img
							src="/assets/images/idea-bulb.png"
							className=" h-8 filter brightness-75"
							alt=""
						/>
					</div>

					<div className="absolute top-96 md:top-56 lg:top-56 -right-0 md:right-24 lg:right-40 bg-[#FFE28D] p-4 rounded-[100px]">
						{" "}
						<img
							src="/assets/images/bus.png"
							className=" h-8 filter brightness-75"
							alt=""
						/>
					</div>
					<img
						src="/assets/images/bg-overlay-white.png"
						className="absolute  opacity-5 overflow-hidden h-[18vh] lg:h-[40vh]"
						alt=""
					/>

					<div className="z-40 px-4 py-4 mt-12 bg-white rounded-lg md:pt-6 md:px-4 lg:px-8 lg:py-8">
						<div className="mb-4 md:flex">
							<div className="relative z-50 w-full mb-2 mr-4 text-left duration-300 ease-in-out lg:mb-0 lg:mr-6">
								<label className="ml-2 text-gray-600 md:text-[13px]">
									Pickup City
								</label>
								<Dropdown
									menu={{
										items: states?.map((state: State_interface) => {
											return {
												label: (
													<a
														href="#"
														className="z-20 inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
														onClick={() => {
															setStartCity(state?.state);
															setStartBusStopList(state?.bus_stops);
															// setStartCityIsOpen(false);
															setFrom(state?.state);
														}}>
														{state?.state}
													</a>
												),
												key: Math.random() * 2000
											};
										})
									}}
									trigger={["click"]}>
									<button
										type="button"
										className="inline-flex items-center w-full h-12 px-4 py-2 mt-1 mt-2 mb-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
										{startCity}
										<FaCaretDown className="ml-auto" />
									</button>
								</Dropdown>
							</div>

							{/* AFTER START CITY SELECTION */}
							<div
								className={`ease-in-out duration-300 relative w-full text-left z-40 mb-6 lg:mb-0 mr-4 lg:mr-6 ${
									startCity === "Current City" ? "hidden " : ""
								}`}>
								<label className="ml-2 text-gray-600 md:text-[13px]">
									Station
								</label>

								{/* START BUSSTOP */}

								<Dropdown
									trigger={["click"]}
									menu={{
										items: startBusStopList.length
											? startBusStopList?.map((stops: string) => {
													return {
														label: (
															<a
																key={stops}
																href="#"
																className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
																onClick={() => {
																	handleStartBusStop(stops);
																}}>
																{stops}
															</a>
														),
														key: Math.random() + 2000
													};
											  })
											: [
													{
														label: (
															<a className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
																Sorry, we currently do not have a stop at this
																location.
															</a>
														),
														key: Math.random() * 2000
													}
											  ]
									}}>
									<button
										type="button"
										className="z-10 inline-flex items-center w-full h-12 px-4 py-2 mt-1 mt-2 mb-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
										onClick={() => setStartBusStopIsOpen(!startBusStopIsOpen)}
										onChange={handleStartBusStop}>
										{startBusStop}
										<FaCaretDown className="ml-auto" />
									</button>
								</Dropdown>
							</div>

							<div className="relative z-30 w-full mb-2 mr-4 text-left duration-300 ease-in-out lg:mb-0 lg:mr-6">
								<label className="ml-2 text-gray-600 md:text-[13px]">
									Destination City
								</label>
								<Dropdown
									trigger={["click"]}
									menu={{
										items: states.map((state: State_interface) => {
											return {
												label: (
													<a
														href="#"
														className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
														onClick={() => {
															setDestinationBusStopList(state?.bus_stops);
															setDestinationCity(state?.state);
															setTo(state?.state);
														}}>
														{state?.state}
													</a>
												),
												key: Math.random() * 2000
											};
										})
									}}>
									<button
										type="button"
										className="inline-flex items-center w-full h-12 px-4 py-2 mt-1 mt-2 mb-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
										onClick={() => {
											setDestinationCityIsOpen(!destinationCityIsOpen);
										}}>
										{destinationCity}
										<FaCaretDown className="ml-auto" />
									</button>
								</Dropdown>
							</div>
							<div
								className={`ease-in-out duration-300 relative w-full text-left z-20 mr-6 ${
									destinationCity === "Where to?" ? "hidden " : ""
								}`}>
								<label className="ml-2 text-gray-600 md:text-[13px]">
									Station
								</label>

								{/* START BUSSTOP */}

								<Dropdown
									trigger={["click"]}
									menu={{
										items: desinationBusStopList?.length
											? desinationBusStopList?.map((stops: string) => {
													return {
														label: (
															<a
																key={stops}
																href="#"
																className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
																onClick={() => {
																	handleDestinationBusStop(stops);
																	// setTo(stops);
																}}>
																{stops}
															</a>
														),
														key: Math.random() * 2000
													};
											  })
											: [
													{
														label: (
															<a className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
																Sorry, we currently do not have a stop at this
																location.
															</a>
														),
														key: Math.random() * 2000
													}
											  ]
									}}>
									<button
										type="button"
										className="inline-flex items-center w-full h-12 px-4 py-2 mt-1 mt-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
										onClick={() =>
											setDestinationBusStopIsOpen(!destinationBusStopIsOpen)
										}
										onChange={handleDestinationBusStop}>
										{destinationBusStop}
										<FaCaretDown className="ml-auto" />
									</button>
								</Dropdown>
							</div>

							<FraserButton
								title="Search"
								size="regular"
								className="w-full mt-8"
								active={TripValid}
								onClick={() => {
									if (TripValid) {
										if (!userInfo?._id) {
											return setFlip("signin");
										}
										handleAvailableTrips();
									}
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex">
				<div className="pt-[40px] md:my-16 lg:my-24 mx-6 md:mx-16 lg:mx-32 bg-[#fffff] mb-12 md:mb-24">
					<h1 className="text-black text-left md:text-center mb-8 lg:mb-16 md:w-full text-[1.65rem] md:text-[2rem] font-semibold leading-tight spacing-[normal]  ">
						Experience Comfortable and Affordable Intercity Bus Travel with
						Fraser
					</h1>

					<div className="w-full mt-4 mb-0 lg:mb-24 lg:flex lg:mt-10">
						<Offeringcard
							classname="mb-4 mr-4 lg:mb-0"
							title="Safe"
							subtitleClassname="text-[#8E8E93]"
							subtitle="Travel with peace of mind knowing your safety is our top priority. Our experienced drivers and quality buses ensure a safe journey."
						/>
						<Offeringcard
							classname="mb-4 mr-4 bg-primary-100 lg:mb-0"
							title="Comfy"
							subtitleClassname="text-[#353535]"
							subtitle="Enjoy a comfortable journey with free Wi-Fi and entertainment. Book your ticket today and experience stress-free travel."
						/>
						<Offeringcard
							title="Affordable"
							subtitleClassname="text-[#8E8E93]"
							subtitle="Affordable travel made easy. Book with Fraser for guaranteed seats starting at ₦ 1,000. Travel comfortably without breaking the bank."
						/>
					</div>
				</div>
			</div>

			<div className="bg-[#000000] pt-12 md:pt-24">
				<div className="mx-8 md:mx-16 lg:mx-32">
					<h1 className="lg:col-start-1 lg:col-end-6 text-[1.65rem] md:text-[2rem] font-medium text-[#e3e3e3] leading-tight">
						Book a ride in three steps
					</h1>
					<div className="lg:grid lg:grid-cols-12 lg:flex lg:mx-auto lg:mt-12">
						<div className="hidden col-start-1 col-end-6 mt-6 lg:block">
							<img
								src="/assets/images/phone.png"
								alt=""
								className="object-cover flex h-[65vh] ml-4"
							/>
						</div>

						<div className="col-start-6 col-end-13 pb-24 lg:-mt-12 lg:mx-16">
							<div className="flex flex-col justify-between w-full mt-16 lg:mt-32">
								<StepComp
									stepNumber="1"
									stepTitle="Sign up"
									stepSubtitle="This is easy – we only need a few details and then you can get started. It only takes a minute to fill in your details!"
									classname="mb-8"
									cardclassname="bg-primary-100"
								/>
								<StepComp
									stepNumber="2"
									stepTitle="Book a trip"
									classname="mb-8"
									cardclassname="bg-white"
									stepSubtitle="Booking a bus ticket is easy. You can easily buy your tickets in advance and have them delivered straight to your smartphone - register via the mobile app or on the website!"
								/>
								<StepComp
									stepNumber="3"
									stepTitle="Ride"
									stepSubtitle="With fast connections you can travel in comfort. Buses are equipped with Wi-Fi so you can work, catch up on your favourite shows and have fun all on the move."
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white">
					<div className="flex items-center justify-center w-full bg-center ">
						<img
							alt=""
							src={"/assets/images/withfriends.051522d885873700dacd.png"}
							className="mt-12 md:mt-40  md:w-[70%] w-full md:h-[60%] h-full object-contain rounded-lg "
						/>
					</div>

					<div className="landingpageSessionPadding mt-[20px] md:mt-[30px] md:py-[40px] py-[24px] justify-center items-center">
						<h1 className="text-black  md:text-[2rem] lg:text-[3rem] mb-[32px] md:mb-[72px] text-[25px] text-center font-semibold  spacing-[normal]  ">
							Ride with friends and <br />
							enjoy multiple benefits
						</h1>
						<div className="md:mx-12 lg:mx-40">
							<Accordion />
						</div>
					</div>

					{/* All abour session */}

					<div className="px-8 lg:px-32 w-full bg-black py-[100px] flex-col ">
						<h1 className="text-[#00ff6a]  md:text-[55px] text-[25px] font-semibold ">
							All aboard
						</h1>
						<br />
						<FraserButton
							size="regular"
							title="Get Started"
							onClick={() => navigate(_paths_.LANDING_PAGE)}
						/>
					</div>
				</div>
				<Footer />
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
								You're almost there, create an account in just one simple step.
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

							{/* <Input
								className="w-full h-12 hover:border-green-500 active:border-green-600"
								placeholder="Email"
								value={homeState}
								required={true}
								onChange={(e) => setHomeState(e.target.value)}
							/> */}
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
		</Layout>
	);
};

export default BookRide;
