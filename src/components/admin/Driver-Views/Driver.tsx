import React from "react";
import AdminDriverOverview from "./admin-driver-overview";

const Driver: React.FC = () => {
	return (
		<div className="h-full col-start-2 mt-12 col-end-6 bg-white ">
			<div className="h-full bg-white">
		
				<AdminDriverOverview />
			</div>
		</div>
	);
};

export default Driver;
