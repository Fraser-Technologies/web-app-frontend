import React from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useAppSelector } from "../state/hooks";

interface Props {
	user?: string;
}

export const Header = ({ user }: Props) => {
	const [openNavBar, setOpenNavBar] = React.useState(false);
	const { userInfo } = useAppSelector((state: any) => state.userLogin);
	const navigate = useNavigate();

	const getList = () => (
		<div className="w-[320px] flex-col h-full items-center bg-black py-8 px-4 ">
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
				{/* <Link to=""> */}
				<h1 className="text-xl font-bold text-center">
					{userInfo?.first_name}
				</h1>
				{/* </Link> */}
				{/* <Button
					title="Book a ride"
					type="submit"
					className="w-full px-3 py-2 mt-8 text-lg font-bold text-black rounded-md bg-primary-100"
				/> */}
			</div>
		</div>
	);

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
					<img
						src="/assets/images/fraser-white-logo.svg"
						alt="Fraser Logo"
						className="w-14 lg:w-20"
					/>
				</div>
			</div>
			<div className="items-center justify-between hidden space-x-12 md:flex">
				<Link to="/" className="text-white ">
					Home
				</Link>
				{userInfo && (
					// <Link to="#" className="text-white ">
					<div className="text-white">{userInfo?.first_name}</div>

					// </Link>
				)}
				<Button
					title="Book a ride"
					type="submit"
					className="px-3 py-2 rounded-md bg-primary-100"
					onClick={() => {
						console.log("Book a ride");
						navigate("/book-a-ride");
					}}
				/>
			</div>
		</div>
	);
};
