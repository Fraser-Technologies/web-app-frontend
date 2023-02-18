import React from "react";
import Steps_counter from "./steps_number";
import "./steps_comp.css";

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
			<div className="step-body-container">
				<Steps_counter value={stepNumber} />
				<div className="step-body-content">
					<h4 className="step-body-title">{stepTitle}</h4>
					<p className="step-body-subtitle">{stepSubtitle}</p>
				</div>
			</div>
		</>
	);
};

export default StepComp;
