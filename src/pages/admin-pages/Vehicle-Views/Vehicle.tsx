import React from "react";
import VehicleOverview from "./vehicle-overview";

const Vehicle: React.FC = () => {
	// PAGINATION
	return (
		<div className="h-full col-start-2 col-end-8 mt-40 bg-white ">
			<div className="h-full bg-white">
			
				<VehicleOverview />
			</div>
		</div>
	);
};

export default Vehicle;
