import React from "react";
import { HiMenu } from "react-icons/hi";

interface Props {
	user?: string;
}

export const Header = ({ user }: Props) => {
	return (
		<div className="bg-black py-6 px-4 md:px-16 flex justify-between items-center">
			<div className="flex md:block space-x-2 md:space-x-0 items-center md:items-start">
				<HiMenu className="text-white text-xl md:hidden block" />
				<div>
					<img
						src="/assets/images/fraser-white-logo.svg"
						alt="Fraser Logo"
						className="w-14 lg:w-20"
					/>
				</div>
			</div>
			<div className="md:flex justify-between items-center space-x-12 hidden">
				<div className="text-white ">Home</div>
				{user && <div className="text-white ">{user}</div>}
				<button className="bg-primary-100 px-3 py-2 rounded-md">
					Book a ride
				</button>
			</div>
		</div>
	);
};
