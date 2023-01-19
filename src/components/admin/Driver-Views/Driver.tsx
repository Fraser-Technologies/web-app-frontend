import React from "react";
import DriverOverview from "./driver-overview";

const Driver: React.FC = () => {
	return (
		<div className="h-full col-start-2 col-end-6 bg-white ">
			<div className="h-full bg-white">
		
				<DriverOverview />
			</div>
		</div>
	);
};

export default Driver;
