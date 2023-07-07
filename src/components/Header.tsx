import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose, AiOutlinePoweroff } from "react-icons/ai";
import { Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FraserButton } from "./Button";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Alert, Dropdown, Input, Modal, message } from "antd";
import type { MenuProps } from "antd";
import {
	logoutUserAction,
	registerUserAction,
	userLoginAction
} from "../state/action/user.action";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { _paths_ } from "../utils/routes";
import { FaCopy } from "react-icons/fa";

import { RootState } from "../state/redux-store";
import allState from "../utils/allState";

export const Header = () => {
	const {
		userInfo,
		error: loginError,
		loading: userLoginLoading
	} = useAppSelector((state: any) => state.userLogin);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [openNavBar, setOpenNavBar] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [flip, setFlip] = useState("signin");
	const [referred_by, setReferred_by] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [homeState, setHomeState] = useState<string>("");

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setFlip("");
	};

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

	const { error: registerUserError, loading: userRegisterLoading } =
		useAppSelector((state: RootState) => state.registerUser);

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
		).finally(registerUserError ? setIsModalOpen(true) : setIsModalOpen(false));
	};

	const LoginUser = () => {
		return dispatch(userLoginAction("+234" + phone)).finally(
			loginError ? setIsModalOpen(true) : setIsModalOpen(false)
		);
	};

	const logOutUser = () => {
		dispatch(logoutUserAction());
		navigate("/");
		setOpenNavBar(false);
	};

	const getList = () => {
		return (
			<div className="flex justify-start  w-full h-full pl-[20px] pr-[100px] py-8 bg-black ">
				<div className="flex justify-end">
					<AiOutlineClose
						className="text-2xl font-bold text-white"
						onClick={() => setOpenNavBar(false)}
					/>
				</div>
				<div className="flex-col items-center justify-center w-full mt-24 space-y-8 text-white">
					<Link to="/">
						<h1 className="mb-4 text-[20px] font-semibold ">Home</h1>
					</Link>
					<h1
						className="flex flex-row items-center text-[20px] font-semibold hover:cursor-pointer"
						onClick={() => setOpenOptions(!openOptions)}>
						Partner With Fraser
						<span className="ml-[10px]">
							{openOptions ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
						</span>
					</h1>

					{openOptions && (
						<div className="mt-[10px] flex flex-col pl-[30px] text-white">
							<p className="hover:cursor-pointer">Driver</p>
							<p className="mt-[30px] mb-[30px] hover:cursor-pointer">
								Bus Owner
							</p>
							<p className="hover:cursor-pointer">Ticket Outlet</p>
						</div>
					)}

					<h1 className="mb-4 text-[20px] font-semibold ">
						{userInfo?.first_name}
					</h1>
				</div>

				<div className="absolute bottom-12 hover:cursor-pointer">
					{userInfo?._id && (
						<div className="text-white text-[16px]">
							<span
								className="flex mb-2"
								onClick={() => {
									navigator.clipboard.writeText(`${userInfo?.referral_code}`);
									messageApi.info({
										type: "info",
										content: `Referral code ${userInfo?.referral_code} has been copied to clipboard!`,
										duration: 1.5
									});
								}}>
								Referral Code: {userInfo?.referral_code}{" "}
								<FaCopy className="ml-2" />
							</span>
							<div className="mb-8 border-b pb-8">
								{/* Total Referrals: {userInfo.referrals.length} */}
							</div>

							<div
								className="flex flex-row items-center font-medium"
								onClick={() => logOutUser()}>
								Logout
								<span className="ml-[10px]">
									<AiOutlinePoweroff />
								</span>
							</div>
						</div>
					)}
					{!userInfo?._id && (
						<FraserButton
							title="Sign in"
							size="regular"
							type="submit"
							onClick={() => {
								setIsModalOpen(true);
								setFlip("signin");
								setOpenNavBar(false);
							}}
						/>
					)}
				</div>
			</div>
		);
	};

	const items: MenuProps["items"] = [
		{
			key: `${userInfo?.referral_code}`,
			label: (
				<div>
					<span
						className="flex"
						onClick={() => {
							navigator.clipboard.writeText(`${userInfo?.referral_code}`);
							messageApi.info({
								type: "info",
								content: `Referral code ${userInfo?.referral_code} has been copied to clipboard!`,
								duration: 1.5
							});
						}}>
						Referral Code: {userInfo?.referral_code} <FaCopy className="ml-2" />
					</span>
					<div className="mb-2 pb-2 border-b">
						{/* Total Referrals: {userInfo.referrals.length} */}
					</div>
				</div>
			)
		},
		{
			key: "logout",
			label: <span onClick={() => logOutUser()}>Logout</span>
		}
	];

	return (
		<div className="fixed top-0 z-50 flex flex-col w-full h-auto ">
			{contextHolder}

			{/* <div className="px-4 w-full bg-white flex flex-row justify-end py-3 md:px-16 z-50">
				<p className="mr-4 text-gray-500 md:text-[13px] text-[12px]">
					Partner with Fraser as a
				</p>
				<p
					className="text-[#22B11E] ml-3 mr-3 cursor-pointer md:text-[12px] text-[10px]"
					onClick={() => {
						window.location.href = "https://driver.ridefraser.com";
					}}>
					Driver
				</p>
				<p className="text-[#22B11E] ml-3 mr-3 cursor-pointer md:text-[12px] text-[10px]">
					Bus Owner
				</p>
				<p className="text-[#22B11E] cursor-pointer md:text-[12px] text-[10px]">
					Ticket Outlet
				</p>
			</div> */}
			<div className="flex items-center justify-between w-full px-4 py-3 bg-black md:px-16">
				<div className="flex items-center space-x-2 md:block md:space-x-0 md:items-start">
					<HiMenu
						className="block text-xl text-white md:hidden"
						onClick={() => setOpenNavBar(true)}
					/>
					<Drawer
						open={openNavBar}
						anchor={"left"}
						className="w-[200px]"
						onClose={() => setOpenNavBar(false)}>
						{getList()}
					</Drawer>
					<div>
						<Link to="/" className="text-white ">
							<img
								src="/assets/images/fraser-white-logo.svg"
								alt="Fraser Logo"
								className="w-14 lg:w-20"
							/>
						</Link>
					</div>
				</div>
				<div className="items-center justify-between hidden space-x-8 md:flex">
					<Link to="/" className="text-white ">
						Home
					</Link>
					<Link to="/nysc" className="text-white ">
						Nysc Trip
					</Link>

					<Dropdown
						className={`${!userInfo && "hidden"}`}
						menu={{ items }}
						trigger={["click"]}>
						<div className="text-white cursor-pointer">
							{userInfo?.first_name}
						</div>
					</Dropdown>

					{!userInfo?._id && (
						<FraserButton
							title="Sign in"
							size="regular"
							type="submit"
							onClick={() => {
								setIsModalOpen(true);
								setFlip("signin");
							}}
						/>
					)}
					{userInfo?._id && (
						<FraserButton
							title="Book a ride"
							size="regular"
							type="submit"
							onClick={() => {
								navigate(_paths_.BOOKRIDE);
							}}
						/>
					)}
				</div>
			</div>

			{flip === "signin" && (
				<Modal
					title={
						<div>
							<h1 className="pt-2 text-xl">Welcome Back</h1>
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
					onOk={handleOk}
					onCancel={handleCancel}
					// closable={false}
				>
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
							<h1 className="pt-2 text-xl">Let's get you started</h1>
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
					onOk={handleOk}
					onCancel={handleCancel}
					// closable={false}
				>
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
		</div>
	);
};
