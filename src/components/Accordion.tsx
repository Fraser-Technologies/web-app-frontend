import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "../styles/Accordion.css";
import { accordiondata } from "../utils/AccordionData";
import Button from "./button";

const Accordion = () => {
	const [selected, setSelection] = useState(null);

	const toggle = (i: any) => {
		if (selected === i) {
			return setSelection(null);
		}
		setSelection(i);
	};
	return (
		<>
			<div className="w-full">
				{accordiondata?.map((accordiondata, i) => (
					<div className="item" onClick={() => toggle(i)}>
						<div className="flex items-center justify-between w-full">
							<h2 className="font-semibold lg:text-[25px] md:text-[16px] text-[12px] blackText">
								{" "}
								{accordiondata?.topline}{" "}
							</h2>
							<span>
								{" "}
								<FaChevronDown
									className={selected === i ? "iconshow" : ""}
								/>{" "}
							</span>
						</div>
						<div className={selected === i ? "show" : "content"}>
							<p className="md:text-[15px] text-[12px]">{accordiondata.text}</p>

							<div className="mt-5">
								<Button name={"Get Started"} />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Accordion;
