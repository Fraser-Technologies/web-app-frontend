/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/SignInLayout";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import { Alert, Dropdown, Input, message, Modal } from "antd";
import {
	registerUserAction,
	userLoginAction
} from "../../state/action/user.action";
import { getAvailableTripAction } from "../../state/action/trip.action";
import { State_interface } from "../../interfaces/state_interface";
import { getAllStateAction } from "../../state/action/state.action";
import { RootState } from "../../state/redux-store";
import { FraserButton } from "../../components/Button";
import { _paths_ } from "../../utils/routes";
import Footer from "../../components/footer";
import allState from "../../utils/allState";
import { MdOutlineCancel } from "react-icons/md";

const BookRide = () => {
	enum TripValidOption {
		startStateOption = "Current State",
		destinationStateOption = "Where to?",
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
	const [startBusStopList, setStartBusStopList] = useState<string[]>([]);
	const [desinationBusStopList, setDestinationBusStopList] = useState<string[]>(
		[]
	);
	const [startStateFilter, setStartStateFilter] = useState("");
	const [destinationStateFilter, setDestinationStateFilter] = useState("");

	const [startState, setStartState] = useState<string>(
		TripValidOption.startStateOption || ""
	);
	const [destinationState, setDestinationState] = useState<string>(
		TripValidOption.destinationStateOption || ""
	);

	const [startBusStop, setStartBusStop] = useState<string>(
		TripValidOption.startBusStopOption || ""
	);

	const [destinationBusStop, setDestinationBusStop] = useState<string>(
		TripValidOption.destinationBusStopOption || ""
	);

	const handleAvailableTrips = () => {
		if (from && to) {
			dispatch(getAvailableTripAction({ from: from, to: to }));
		}

		navigate("/bookings", {
			state: {
				startState,
				destinationState,
				destinationBusStop,
				startBusStop
			}
		});
	};

	const TripValid =
		startState !== TripValidOption.startStateOption &&
		destinationState !== TripValidOption.destinationStateOption;

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

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
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

	useEffect(() => {
		if (userInfo?._id) {
			setFlip("");
		}
	}, [userInfo?._id]);

	// useEffect(() => {
	// 	if (!userInfo?._id) navigate(_paths_.SIGNIN);
	// }, [navigate, userInfo]);

	return (
		<Layout
			title="Book InterState Bus Rides in Nigeria | RideFraser"
			pageDescription="Book affordable and comfortable interState bus rides in Nigeria with Fraser on ridefraser. Choose from multiple routes and travel dates. Book your ride now!"
			pageKeywords="interState bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser, Fraser">
			{contextHolder}

			<div className="bg-black">
				<div className="absolute top-32  right-2 md:right-64 lg:right-96 bg-[#00FF6A] rounded-[100px] p-4">
					<img
						src="/assets/images/paper-airplane.png"
						className=" h-4 filter hue-rotate-90"
						alt=""
					/>
				</div>

				<div className="absolute md:top-96 md:-left-8 bg-[#00FF6A] rounded-[100px] p-4">
					<img
						src="/assets/images/idea-bulb.png"
						className=" h-8 filter brightness-75"
						alt=""
					/>
				</div>

				<div className="hidden md:block absolute top-12 md:top-56 lg:top-56 -right-0 md:right-24 lg:right-40 bg-[#FFE28D] p-4 rounded-[100px]">
					{" "}
					<img
						src="/assets/images/bus.png"
						className=" h-8 filter brightness-75"
						alt=""
					/>
				</div>
				<img
					src="/assets/images/bg-overlay-white.png"
					className="md:absolute left-32 h-3/4 opacity-10 overflow-hidden"
					alt=""
				/>

				<div
					className="flex flex-col md:items-center md:w-1/2 mx-4  md:mx-auto md:pt-72 pb-16 md:pb-32 bg-cover bg-no-repeat bg-center"
					// style={{ backgroundImage: `url(../assets/images/bg-overlay-white.png)` }}
				>
					<h1 className="text-gray-100 leading-tight text-[1.8rem] md:text-[3rem] font-medium">
						Interstate Bus Trips
					</h1>

					<div className="z-10 w-full pt-6 pb-6 px-5 mt-6 md:mt-12 md:p-8 bg-white rounded-lg  shadow-sm border border-gray-200">
						<div className="md:flex">
							<div className="relative w-full mr-4 md:-mr-3 mb-3 text-left duration-300 ease-in-out ">
								<Dropdown
									menu={{
										items: states
											?.filter((e: State_interface) => e.for === "REGULAR")
											?.map((state: State_interface) => {
												return {
													label: (
														<a
															href="#"
															className="z-20 inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
															onClick={() => {
																setStartStateFilter(state?.name);
																setStartState(state?.name);
																setStartBusStopList(state?.bus_stops);
																setFrom(state?.name);
															}}>
															{state?.name}
														</a>
													),
													key: Math.random() * 20000
												};
											})
									}}
									trigger={["click"]}>
									<div className="relative flex">
										<input
											type="text"
											className="inline-flex items-center w-full h-12 pl-12 pr-4 mb-2 md:mb-0 leading-5 text-gray-700 bg-white border border-gray-300 rounded-md justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
											placeholder="Where From?"
											onChange={(e) => {
												setStartStateFilter(e.target.value);
											}}
											value={startStateFilter}
										/>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											focusable="false"
											className=" h-full absolute ml-4 pb-2 md:pb-0 text-gray-600">
											<path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"></path>
										</svg>
									</div>
								</Dropdown>
							</div>
							<div className="absolute md:relative -mt-7 md:mt-2 ml-2 md:ml-0 bg-white h-6 w-6 z-10 p-4 rounded-[24px] border border-gray-300">
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									focusable="false"
									className="-mt-2 -ml-2">
									<path d="M17 4l-1.41 1.41L18.17 8H11v2h7.17l-2.58 2.59L17 14l5-5-5-5zM7 20l1.41-1.41L5.83 16H13v-2H5.83l2.58-2.59L7 10l-5 5 5 5z"></path>
								</svg>
							</div>
							<div className="relative w-full mb-2 mr-4 md:-ml-3 text-left duration-300 ease-in-out lg:mb-0 lg:mr-6">
								<Dropdown
									menu={{
										items: states
											.filter((fil: State_interface) => fil?.for === "REGULAR")
											.map((state: State_interface) => {
												return {
													label: (
														<a
															href="#"
															className="z-20 inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
															onClick={() => {
																setDestinationStateFilter(state?.name);
																setDestinationBusStopList(state?.bus_stops);
																setDestinationState(state?.name);
																setTo(state?.name);
															}}>
															{state?.name}
														</a>
													),
													key: Math.random() * 3000
												};
											})
									}}
									trigger={["click"]}>
									<div className="relative flex">
										<input
											type="text"
											className="inline-flex items-center w-full h-[52px] pl-12 pr-4 mb-2 md:mb-0 leading-5 text-gray-700 bg-white border border-gray-300 rounded-md justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
											placeholder="Where to?"
											value={destinationStateFilter}
										/>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											focusable="false"
											className=" h-full absolute ml-4 pb-2 md:pb-0 text-gray-600">
											<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
											<circle cx="12" cy="9" r="2.5"></circle>
										</svg>
									</div>
								</Dropdown>
							</div>

							<FraserButton
								title="Search"
								size="regular"
								className=" w-full md:w-content cursor-pointer"
								active={TripValid}
								onClick={() => {
									if (!userInfo?._id) {
										showModal();
										return setFlip("signin");
									}
									handleAvailableTrips();
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full pt-8 pb-14 bg-white px-4 ">
				<div className="md:w-1/2  mx-auto">
					<h3 className="text-gray-500 text-[16px] font-medium">
						Partner Trips
					</h3>
					<div className="md:flex mt-4">
						{/*  */}
						<div
							className="cursor-pointer w-full md:mr-6 mb-4 md:mb-0 flex rounded-lg border border-gray-300 items-center pr-8"
							onClick={() => navigate(_paths_.AIESEC_PAGE)}>
							<div
								className="bg-cover bg-no-repeat bg-center h-24 md:h-28 w-32 md:w-40 rounded-l-md"
								style={{
									backgroundImage: `url(../assets/images/aiesec.png)`
								}}></div>
							<div className="p-4">
								<div className="text-gray-700 text-[18px] md:text-[24px] font-semibold">
									AIESEC
								</div>
								<div className="flex items-center">
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										focusable="false"
										// className=" h-full absolute ml-4 text-gray-600"
									>
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
										<circle cx="12" cy="9" r="2.5"></circle>
									</svg>
									<div className="ml-2 text-[14px] md:text-[16px] text-gray-500">
										Conference Trip
									</div>
								</div>
							</div>
						</div>

						{/*  */}
						<div
							className="w-full flex rounded-lg border border-gray-300 items-center cursor-pointer"
							onClick={() => navigate(_paths_.NYSC_PAGE)}>
							<div
								className="bg-cover bg-no-repeat bg-center h-24 md:h-28 w-32 md:w-40 rounded-l-md"
								style={{
									backgroundImage: `url(../assets/images/nysc.jpg)`
								}}></div>
							<div className="p-4">
								<div className="text-gray-700 text-[18px] md:text-[24px] font-semibold">
									NYSC
								</div>
								<div className="flex items-center">
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										focusable="false"
										// className=" h-full absolute ml-4 text-gray-600"
									>
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
										<circle cx="12" cy="9" r="2.5"></circle>
									</svg>
									<div className="ml-2 text-[14px] md:text-[16px] text-gray-500">
										Camp Trips
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />

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
					closable={false}
					onCancel={handleCancel}
					onOk={handleOk}>
					<div>
						<div className="pt-8 mt-3 mb-3">
							<Input
								className="w-full h-[52px] hover:border-green-500 active:border-green-600"
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
					closable={false}
					onOk={handleOk}
					onCancel={handleCancel}>
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
		</Layout>
	);
};

export default BookRide;
