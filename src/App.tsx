import React from "react";
import AdminApp from "./Apps/adminApp";
import DriverApp from "./Apps/driverApp";
import UserApp from "./Apps/userApp";
import { getSubdomain } from "./utils/route_helper";

const App = () => {
	const subdomains = getSubdomain(window.location.hostname);
	const checkSubDommain = subdomains[0];
	console.log(subdomains)

	if(checkSubDommain === "driver") {
		return <DriverApp />
	}

	if(checkSubDommain === "admin") {
		return <AdminApp />
	}

	return (
		<>
			<UserApp />
		</>
	);
};

export default App;
