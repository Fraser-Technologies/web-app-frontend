import React, { useState } from "react";
import { BsFillPersonFill, BsChevronUp } from "react-icons/bs";
import { FaBus, FaIdCard, FaCog, FaCar } from "react-icons/fa";
import { changePageAction } from "../../state/action/adminPageAction";
import { useAppDispatch } from "../../state/hooks";

const LeftSidebar: React.FC = () => {
	const dispatch = useAppDispatch();
	const menuItems = [
		{
			id: "trips",
			label: "Trips",
			icon: FaCar,
		},
		{
			id: "users",
			label: "Users",
			icon: BsFillPersonFill,
		},
		{
			id: "vehicles",
			label: "Vehicles",
			icon: FaBus,
		},
		{
			id: "drivers",
			label: "Drivers",
			icon: FaIdCard,
		},
		{
			id: "settings",
			label: "Settings",
			icon: FaCog,
		},
	];

	const [active, setIsActive] = useState("trips");

	const handleClick = (value: string) => {
		setIsActive(value);
	};

	return (
		<div className="fixed w-2/12 h-screen col-start-1 col-end-2">
			<div className="bg-white border-r h-full">
				<ul className="pt-4 px-4">
					{menuItems.map((item: any, i: number) => {
						return (
							<li
								key={item.id}
								onClick={() => dispatch(changePageAction(i))}
								className={`flex text-sm items-center my-4 py-4 px-6 ${
									active === item.id
										? "bg-black text-white rounded-md font-medium"
										: "text-gray-500 font-normal"
								}`}>
								<item.icon
									className={`mr-4 ${active === item.id ? "text-white" : ""}`}
								/>
								{item.label}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default LeftSidebar;
