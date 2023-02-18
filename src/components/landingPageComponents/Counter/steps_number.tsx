import React from "react";
import "./steps_comp.css";

const Steps_counter = ({ value }: { value: string }) => {
	return (
		<>
			<div className="counter-container">
				<p className="counter-number">{value}</p>
			</div>
		</>
	);
};

export default Steps_counter;
