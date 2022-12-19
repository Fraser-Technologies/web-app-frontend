/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layouts/SignInLayout";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import { Alert, Input, message, Modal, Spin } from "antd";
import { motion } from "framer-motion";
import { justHoverAnimation, zoomOutAnimation } from "../utils/animation";
import {
	registerUserAction,
	userLoginAction,
} from "../state/action/user.action";
import {
	getAllAvailableTripAction,
	getAvailableTripAction,
} from "../state/action/trip.action";

const BookRide = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [flip, setFlip] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [from, setFrom] = useState<string>("");
	const [to, setTo] = useState<string>("");
	const [lag, setLag] = useState<string>("lagos");
	const [referred_by, setReferred_by] = useState<string>("");
	const [messageApi, contextHolder] = message.useMessage();

	const { userInfo, error: loginError } = useAppSelector(
		(state: any) => state.userLogin
	);
	const { error: registerUserError, loading: registerUserLoading } =
		useAppSelector((state: any) => state.registerUser);
	const { busStops } = useAppSelector((state: any) => state.allBusStop);

	const handleAvailableTrips = () => {
		if (from && to) {
			dispatch(getAvailableTripAction({ from: from, to: to }));
		} else {
			dispatch(getAllAvailableTripAction());
		}
		navigate("/bookings");
	};

	const CreateUser = () => {
		return dispatch(
			registerUserAction({
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone: "+234" + phone,
				referred_by,
			})
		);
	};

	const LoginUser = () => {
		dispatch(userLoginAction("+234" + phone));
	};

	useEffect(() => {
		if (!userInfo?._id) {
			setIsModalOpen(true);
		} else {
			setIsModalOpen(false);
		}
	}, [dispatch, userInfo]);

	useEffect(() => {
		if (!userInfo && loginError) {
			messageApi.open({
				type: "error",
				content: loginError,
			});
			setFlip(true);
		}
	}, [loginError, messageApi, userInfo]);

	return (
		<Layout user="Amen" childClass="">
			{contextHolder}
			<Helmet>
				<meta charSet="utf-8" />
				<title>BookRide - Fraser</title>
			</Helmet>
			<div className="flex flex-col items-center justify-center w-full h-full">
				<div className="w-11/12 mt-10 mb-10 sm:w-3/5 lg:w-2/5">
					<div className="w-full px-8 py-12 bg-white rounded-md">
						<div className="border-b border-[#EFF3EF] pb-10">
							<h1 className="text-3xl font-semibold leading-[54px] tracking-[-5%]">
								Where to?
							</h1>

							<div className="flex flex-col w-full mt-2 mb-2">
								<h3> Coming from </h3>
								<motion.select
									variants={zoomOutAnimation}
									initial="initial"
									whileHover="hover"
									value={lag as any}
									onChange={(e) => setLag(e.target.value)}
									id="comingFrom"
									className="w-full h-10 px-2 rounded-sm">
									<motion.option
										variants={justHoverAnimation}
										initial="initial"
										whileHover="hover"
										value={"lagos"}>
										Lagos
									</motion.option>
									<motion.option
										variants={justHoverAnimation}
										initial="initial"
										whileHover="hover"
										value={"ibadan"}>
										Ibadan
									</motion.option>
								</motion.select>
							</div>

							<div className="flex flex-col h-auto max-h-40">
								{lag === "lagos" ? (
									<>
										<label className="mt-5">Start bus stop</label>
										<motion.select
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											value={from}
											onChange={(e) => setFrom(e.target.value)}
											name="bus stop"
											id="busStops"
											className="w-full h-10 px-2 rounded-sm">
											<option value={""}>From where</option>

											{busStops?.map((bs: any) => {
												if (bs?.state !== "Ibadan") {
													return (
														<option value={bs?._id}>
															{bs.name},{bs?.state}
														</option>
													);
												}
											})}
										</motion.select>
										<label className="mt-5">Destination bus stop</label>
										<motion.select
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											name="bus stop"
											id="busStops"
											className="w-full h-10 px-2 rounded-sm"
											value={to}
											onChange={(e) => setTo(e.target.value)}>
											<option value={""}>Choose your destination</option>
											{busStops?.map((bs: any) => {
												if (bs?.state === "Ibadan") {
													return (
														<option value={bs?._id}>
															{bs.name},{bs?.state}
														</option>
													);
												}
											})}
										</motion.select>
									</>
								) : (
									<>
										<label className="mt-5">Start bus stop</label>
										<motion.select
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											name="bus stop"
											id="busStops"
											className="w-full h-10 px-2 rounded-sm"
											value={from}
											onChange={(e) => setFrom(e.target.value)}>
											<option value={""}>From where </option>
											{busStops?.map((bs: any) => {
												if (bs?.state === "Ibadan") {
													return (
														<option value={bs._id}>
															{bs.name},{bs?.state}
														</option>
													);
												}
											})}
										</motion.select>

										<label className="mt-5">Destination bus stop</label>
										<motion.select
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											value={to}
											onChange={(e) => setTo(e.target.value)}
											name="bus stop"
											className="w-full h-10 px-2 rounded-sm ">
											<option value={""}> Choose your destination</option>

											{busStops?.map((bs: any) => {
												if (bs?.state !== "Ibadan") {
													return (
														<option value={bs?._id}>
															{bs.name},{bs?.state}
														</option>
													);
												}
											})}
										</motion.select>
									</>
								)}
							</div>

							{/* <div className="relative">
									<div className="relative mt-6">
										<input
											type="text"
											placeholder="Where are you?"
											className="w-full h-12 px-4 pl-12 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
										/>
										<FaBus className="absolute top-4 left-3" />
									</div>
									<div className="absolute z-50 h-10 border-l border-black top-9 left-5"></div>
									<div className="relative mt-4">
										<input
											type="text"
											placeholder="Where are you going to?"
											className="w-full h-12 px-4 pl-12 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
										/>
										<FaBus className="absolute top-4 left-3" />
									</div>
								</div> */}
						</div>
						{/* <div className="mt-8 border-b border-[#EFF3EF] pb-10">
								<h1 className="text-3xl font-semibold leading-[54px] tracking-[-5%]">
									When?
								</h1>
								<div className="flex justify-between mt-6">
									<Button
										title="Today"
										className="px-3 py-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
									/>
									<Button
										title="Tomorrow"
										className="px-3 py-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
									/>
									<div className="relative">
										<Button
											title="Other"
											className="py-2 pl-8 pr-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
										/>

										<BsCalendarDate className="absolute ml-1 text-sm top-3 left-2" />
									</div>
								</div>
							</div> */}
						<motion.div
							variants={zoomOutAnimation}
							initial="initial"
							whileHover="hover">
							<Button
								title="See available trips"
								className="w-full h-[52px] bg-[#f4f4f4] mt-10 text-sm hover:bg-[#00ff6a]"
								onClick={handleAvailableTrips}
							/>
						</motion.div>
					</div>
				</div>
				<Modal
					title={flip ? "Create a profile" : "Login user"}
					open={isModalOpen}
					centered={true}
					footer={false}>
					{flip ? (
						<div>
							{registerUserError ? (
								<Alert
									message={registerUserError}
									description={registerUserError}
									type="warning"
									showIcon
									closable
								/>
							) : (
								<></>
							)}
							<div className="mt-3 mb-3">
								<label>First Name:</label>
								<Input
									className="w-full"
									placeholder="First name"
									value={firstName}
									required={true}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label>Last Name:</label>
								<Input
									className="w-full"
									placeholder="Last name"
									value={lastName}
									required={true}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label>Email:</label>
								<Input
									className="w-full"
									placeholder="Email"
									value={email}
									required={true}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label>Phone:</label>
								<Input
									className="w-full"
									placeholder="Phone"
									type="number"
									value={phone}
									prefix={"+234"}
									required={true}
									onChange={(e) => {
										setPhone(e.target.value);
									}}
								/>
							</div>

							<div className="mb-3">
								<label>Referral code(if any):</label>
								<Input
									className="w-full"
									placeholder="Referral code"
									type="text"
									value={referred_by}
									onChange={(e) => {
										setReferred_by(e.target.value);
									}}
								/>
							</div>

							<div>
								<motion.button
									variants={zoomOutAnimation}
									initial="initial"
									whileTap="tap"
									whileHover="hover"
									className="w-full p-3 mt-3 font-extrabold text-green-900 bg-green-600 hover:text-white"
									onClick={CreateUser}>
									{registerUserLoading ? (
										<Spin size="small" className="ml-1 text-white" />
									) : (
										<></>
									)}
									Let get Started
								</motion.button>

								<motion.button
									variants={zoomOutAnimation}
									initial="initial"
									whileTap="tap"
									whileHover="hover"
									className="flex items-center justify-center w-full py-2 mt-3 hover:bg-green-400"
									onClick={() => setFlip(!flip)}>
									Login
								</motion.button>
							</div>
						</div>
					) : (
						<div>
							{loginError ? (
								<Alert
									message={loginError}
									description={loginError}
									type="warning"
									showIcon
									closable
								/>
							) : (
								<></>
							)}
							<div className="mt-3 mb-3">
								<label>Phone:</label>
								<Input
									className="w-full"
									placeholder="Phone"
									value={phone}
									prefix={"+234"}
									type="number"
									required={true}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div>
								<motion.button
									variants={zoomOutAnimation}
									initial="initial"
									whileTap="tap"
									whileHover="hover"
									className="w-full p-3 mt-3 font-extrabold text-green-900 bg-green-600 hover:text-white"
									onClick={LoginUser}>
									Let get started
								</motion.button>

								<motion.button
									variants={zoomOutAnimation}
									initial="initial"
									whileTap="tap"
									whileHover="hover"
									className="flex items-center justify-center w-full py-2 mt-3 hover:bg-green-400"
									onClick={() => setFlip(!flip)}>
									Create Account
								</motion.button>
							</div>
						</div>
					)}
				</Modal>
			</div>
		</Layout>
	);
};

export default BookRide;
