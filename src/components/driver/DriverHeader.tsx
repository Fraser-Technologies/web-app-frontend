import React from "react";
import { BsChevronBarDown } from "react-icons/bs";
import { useAppSelector } from "../../state/hooks";

const DriverHeader = () => {
	const { userInfo } = useAppSelector((state: any) => state.userLogin);
	return (
		<div className="flex flex-col ">
			<div className="py-[8px] px-[10px] flex flex-row w-full justify-between">
				<div className="flex flex-row items-center justify-start">
					<h1>Fraser</h1>
					<span className="ml-[10px]">|</span>
					<span className="ml-[10px]">Driver Portal</span>
				</div>

				<div className="flex flex-row items-center item-center">
					<img className="w-[30px] h-[30px] rounded-full bg-gray-300" alt="" />

					<p className="ml-[10px]">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
					<p className="ml-[10px]">
						<BsChevronBarDown />
					</p>
				</div>
			</div>
			<div className="bg-[#EFF3EF] py-[10px] px-[10px]">
				i am the second session
			</div>
		</div>
	);
};

export default DriverHeader;
