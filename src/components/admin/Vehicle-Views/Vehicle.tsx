import React from "react";
import VehicleOverview from "./vehicle-overview";

const Vehicle: React.FC = () => {
	// PAGINATION
	return (
		<div className="h-full col-start-2 col-end-6 mt-12 bg-white ">
			<div className="h-full bg-white">
			
				<VehicleOverview />
			</div>
		</div>
	);
};

export default Vehicle;
