import React from "react";
import UserOverview from "./user-overview";

const User: React.FC = () => {
	// PAGINATION
	return (
		<div className="h-full col-start-2 col-end-6 mt-12 bg-white ">
			<div className="h-full mt-8 bg-white">
				<UserOverview />
			</div>
		</div>
	);
};

export default User;
