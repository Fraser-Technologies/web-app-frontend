import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Button = ({ name, onClick }: { name: string, onClick?: any }) => {
	return (
		<button
			className="button px-5 py-2 rounded-full  flex flex-row items-center font-semibold md:text-[15px] text-[12px]"
			onClick={onClick}>
			{name}
			<span className="ml-2">{<FaArrowRight />}</span>
		</button>
	);
};

export default Button;
