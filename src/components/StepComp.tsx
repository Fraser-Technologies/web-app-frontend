import React from "react";
// import Steps_counter from "./steps_number";

const StepComp = ({
	stepNumber,
	stepTitle,
	stepSubtitle,
}: {
	stepNumber: string;
	stepTitle: string;
	stepSubtitle: string;
}) => {
	return (
		<>
			<div className="md:mt-0 mb-[50px] m-3">
				{/* <Steps_counter value={stepNumber} /> */}
				<p className="bg-[#00FF6a] rounded-full md:h-[40px] md:w-[40px]  h-[30px] w-[30px] flex justify-center items-center ">
					{stepNumber}
				</p>
				<div className=" mt-[30px]">
					<h4 className="font-semibold md:text-[20px] text-[15px] ">
						{stepTitle}
					</h4>
					<p className="mt-[15px] text-[#949292] font-light md:text-[15px] text-[12px]">
						{stepSubtitle}
					</p>
				</div>
			</div>
		</>
	);
};

export default StepComp;
