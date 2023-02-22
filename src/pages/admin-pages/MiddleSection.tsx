import React from "react";
import { useAppSelector } from "../../state/hooks";
import Driver from "./Driver-Views/Driver";
import Trips from "./Trip-Views/Trips";
import User from "./User-Views/User";
import Vehicle from "./Vehicle-Views/Vehicle";

const MiddleSection = () => {
	const { page } = useAppSelector((state: any) => state.adminPage);
	return (
		<>
			{page === 0 && <Trips />}
			{page === 1 && <User />}
			{page === 2 && <Vehicle />}
			{page === 3 && <Driver />}
		</>
	);
};

export default MiddleSection;
