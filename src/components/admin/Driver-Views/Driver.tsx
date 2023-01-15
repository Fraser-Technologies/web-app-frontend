import React from "react";
import DriverOverview from "./driver-overview";

const Driver: React.FC = () => {
	return (
		<div className="h-full col-start-2 col-end-6 bg-white ">
			<div className="h-full px-6 bg-white">
				{/* GROUP BUTTON - NAVIGATION */}
				<div className="w-full py-4 mt-8 mb-2 border-b">
					<div className="inline-flex rounded-md" role="group"></div>
				</div>
				<DriverOverview />
			</div>
		</div>
	);
};

export default Driver;
