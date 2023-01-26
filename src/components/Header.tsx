import React from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { _paths_ } from "../utils/appHelpers";
import { logoutUserAction } from "../state/action/user.action";

export const Header = () => {
	const { userInfo } = useAppSelector((state: any) => state.userLogin);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [openNavBar, setOpenNavBar] = React.useState(false);

	const logOutUser = () => {
		dispatch(logoutUserAction());
		setOpenNavBar(false);
	};

	const getList = () => {
		return (
			<div className="fixed flex-col items-center w-3/4 h-full px-4 py-8 bg-black ">
				<div className="flex justify-end">
					<AiOutlineClose
						className="text-2xl text-white"
						onClick={() => setOpenNavBar(false)}
					/>
				</div>
				<div
					className="flex-col items-center justify-center w-full mt-24 space-y-8 text-white"
					onClick={() => setOpenNavBar(false)}>
					<Link to="/">
						<h1 className="mb-4 text-xl font-bold text-center">Home</h1>
					</Link>
					<h1 className="text-xl font-bold text-center">
						{`${userInfo?.first_name}`}
					</h1>
				</div>

				<div
					className="absolute w-full text-xl font-bold text-center text-white bottom-5 hover:text-gray-200"
					onClick={() => logOutUser()}>
					LogOut
				</div>
			</div>
		);
	};

	const items: MenuProps["items"] = [
		{
			key: "logout",
			label: <span onClick={() => logOutUser()}>Logout</span>,
		},
		{
			key: "admin dashboard",
			label: userInfo?.is_admin && (
				<span onClick={() => navigate("/admin")}>Admin Dashboard</span>
			),
		},
	];

	return (
		<div className="fixed top-0 z-10 flex items-center justify-between w-full px-4 py-6 bg-black md:px-16">
			<div className="flex items-center space-x-2 md:block md:space-x-0 md:items-start">
				<HiMenu
					className="block text-xl text-white md:hidden"
					onClick={() => setOpenNavBar(true)}
				/>
				<Drawer
					open={openNavBar}
					anchor={"left"}
					className="w-full"
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
				<Button
					title="Book a ride"
					type="submit"
					className="px-4 py-2 text-xs rounded-md bg-primary-100"
					onClick={() => {
						navigate(_paths_.AVAILABLE_TRIP);
					}}
				/>
			</div>
		</div>
	);
};
