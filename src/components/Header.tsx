import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose, AiOutlinePoweroff } from "react-icons/ai";
import { Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FraserButton } from "./Button";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { logoutUserAction } from "../state/action/user.action";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { _paths_ } from "../utils/routes";
import { FaCopy } from "react-icons/fa";

export const Header = () => {
	const { userInfo } = useAppSelector((state: any) => state.userLogin);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [openNavBar, setOpenNavBar] = useState(false);
	const [openOptions, setOpenOptions] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const logOutUser = () => {
		dispatch(logoutUserAction());
		navigate(_paths_.LANDING_PAGE);
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

				<div className="absolute bottom-12 text-[16px] text-white hover:cursor-pointer">
					<span
						className="flex mb-2"
						onClick={() => {
							navigator.clipboard.writeText(`${userInfo?.referral_code}`);
							messageApi.info({
								type: "info",
								content: `Referral code ${userInfo?.referral_code} has been copied to clipboard!`,
								duration: 1.5,
							});
						}}>
						Referral Code: {userInfo?.referral_code} <FaCopy className="ml-2" />
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
								duration: 1.5,
							});
						}}>
						Referral Code: {userInfo?.referral_code} <FaCopy className="ml-2" />
					</span>
					<div className="mb-2 pb-2 border-b">
						{/* Total Referrals: {userInfo.referrals.length} */}
					</div>
				</div>
			),
		},
		{
			key: "logout",
			label: <span onClick={() => logOutUser()}>Logout</span>,
		},
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
				<div className="items-center justify-between hidden space-x-12 md:flex">
					<Link to="/" className="text-white ">
						Home
					</Link>
					{userInfo && (
						<>
							<Dropdown menu={{ items }} trigger={["click"]}>
								<div className="text-white cursor-pointer">
									{userInfo?.first_name}
								</div>
							</Dropdown>
						</>
					)}
					<FraserButton
						title="Book a ride"
						size="regular"
						type="submit"
						onClick={() => {
							navigate(_paths_.LANDING_PAGE);
						}}
					/>
				</div>
			</div>
		</div>
	);
};
