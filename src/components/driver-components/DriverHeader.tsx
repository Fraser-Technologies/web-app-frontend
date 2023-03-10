import { Dropdown, MenuProps } from "antd";
import React, { useState } from "react";
import { FaCaretDown, FaSuitcase, FaThLarge } from "react-icons/fa";
import { logoutUserAction } from "../../state/action/user.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";

type Props = {
	onViewChange: (value: string) => void;
};

const DriverHeader = ({ onViewChange }: Props) => {
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state: any) => state.userLogin);
	const [activeView, setIsActive] = useState("overview");
	const handleToggle = (value: string) => {
		setIsActive(value);
		onViewChange(value);
	};
	const items: MenuProps["items"] = [
		{
			key: "profile",
			label: <span onClick={() => {}}>View Profile</span>,
		},
		{
			key: "logout",
			label: (
				<span
					onClick={() => {
						dispatch(logoutUserAction());
					}}>
					<p className="w-full">Logout</p>
				</span>
			),
		},
	];
	return (
		<div className="fixed w-full top-0 flex flex-col text-white bg-black">
			<div className="my-4 px-[16px] lg:px-[40px] flex flex-row w-full justify-between">
				<div className="flex flex-row items-center justify-start ">
					<div className="py-1 border-r border-[#ffffff]">
						<img
							className="md:pr-[10px] pr-[6px] md:h-[20px] h-[15px]"
							src="/assets/images/fraser-white-logo.svg"
							alt="Fraser"
						/>
					</div>
					<span className="ml-[10px] text-[8px] md:text-[15px] ">
						Driver Portal
					</span>
				</div>

				<Dropdown menu={{ items }} trigger={["click"]}>
					<div className="text-white cursor-pointer">
						<div className="flex flex-row items-center item-center">
							<img
								className="w-[30px] h-[30px] rounded-full bg-gray-300"
								src={
									userInfo?.profile_pic ||
									"/assets/images/shutterstock_1791760502 1fraserlandingpage.png"
								}
								alt=""
							/>
							<p className=" hidden ml-[10px] text-white  lg:flex ">
								{`${userInfo?.first_name} ${userInfo?.last_name}`}
							</p>
							<p className="ml-[10px]">
								<FaCaretDown className="ml-auto" />
							</p>
						</div>
					</div>
				</Dropdown>
			</div>

			<div className="bg-[#E1EDE1] py-[10px] px-[16px] lg:px-[40px]">
				{/* GROUP BUTTON - NAVIGATION */}

				<div className="inline-flex rounded-md" role="group">
					<button
						onClick={() => handleToggle("overview")}
						type="button"
						className={`inline-flex mr-6 items-center font-medium  ${
							activeView === "overview"
								? //   true
								  "text-[#22B11E] font-semibold"
								: "text-gray-400 font-normal"
						}`}>
						<FaThLarge className="mr-2" />
						Overview
					</button>

					<button
						onClick={() => handleToggle("revenue")}
						type="button"
						className={`inline-flex items-center font-medium  ${
							activeView === "revenue"
								? //   false
								  "text-[#22B11E] font-semibold"
								: "text-gray-400 font-normal"
						}`}>
						<FaSuitcase className="mr-2" />
						Revenue
					</button>
				</div>
			</div>
		</div>
	);
};

export default DriverHeader;
