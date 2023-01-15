import React from "react";
import VehicleOverview from "./vehicle-overview";

const Vehicle: React.FC = () => {
	// PAGINATION
	return (
		<div className="h-full col-start-2 col-end-6 bg-white ">
			<div className="h-full px-6 bg-white">
				<div className="w-full py-4 mt-8 mb-2 border-b">
					<div className="inline-flex rounded-md" role="group"></div>
				</div>
				<VehicleOverview />
			</div>
		</div>
	);
};

export default Vehicle;
