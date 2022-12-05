import React from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface Props {
	user?: string;
}

export const Header = ({ user }: Props) => {
	const [openNavBar, setOpenNavBar] = React.useState(false);

	const navigate = useNavigate();

	const getList = () => (
		<div className="w-[320px] flex-col h-full items-center bg-black py-8 px-4">
			<div className="flex justify-end">
				<AiOutlineClose
					className="text-white text-2xl"
					onClick={() => setOpenNavBar(false)}
				/>
			</div>
			<div
				className="w-full flex-col items-center justify-center mt-24 text-white space-y-8"
				onClick={() => setOpenNavBar(false)}
			>
				<Link to="/">
					<h1 className="text-center text-xl font-bold mb-4">Home</h1>
				</Link>
				<Link to="/">
					<h1 className="text-center text-xl font-bold">Amen</h1>
				</Link>
				<Button
					title="Book a ride"
					type="submit"
					className="bg-primary-100 px-3 py-2 rounded-md w-full text-lg font-bold text-black mt-8"
				/>
			</div>
		</div>
	);
	return (
		<div className="bg-black py-6 px-4 md:px-16 flex justify-between items-center">
			<div className="flex md:block space-x-2 md:space-x-0 items-center md:items-start">
				<HiMenu
					className="text-white text-xl md:hidden block"
					onClick={() => setOpenNavBar(true)}
				/>
				<Drawer
					open={openNavBar}
					anchor={"left"}
					className="w-full"
					onClose={() => setOpenNavBar(false)}
				>
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
			<div className="md:flex justify-between items-center space-x-12 hidden">
				<Link to="/" className="text-white ">
					Home
				</Link>
				{user && (
					<Link to="/" className="text-white ">
						{user}
					</Link>
				)}
				<Button
					title="Book a ride"
					type="submit"
					className="bg-primary-100 px-3 py-2 rounded-md"
					onClick={() => {
						console.log("Book a ride");
						navigate("/book-a-ride");
					}}
				/>
			</div>
		</div>
	);
};
