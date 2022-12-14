import React from "react";

const Offeringcard = ({ title, subtitle }) => {
	return (
		<>
			<div className="p-[20px] bg-[#22b11e] rounded-[24px] min-w-[200px] m-3">
				<img
					src={"/assets/images/W55sUXVqufgAAAABJRU5ErkJggg==.png"}
					alt=""
					className="h-[30px] w-[30px]"
				/>
				<h3 className="lg:text-[50px] md:text-[35px] sm:text-[30px] text-[20px]  font-semibold text-white">
					{title}
				</h3>
				<p className="text-white">{subtitle}</p>
			</div>
		</>
	);
};

export default Offeringcard;
