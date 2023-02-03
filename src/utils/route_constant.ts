import AdminRouteList from "../routers/adminRouteList";
import DriverRouteList from "../routers/driverRouteList";
import UserRouteList from "../routers/userRouteList";

export const APPS = [
	{
		subdomain: "www",
		app: UserRouteList,
		main: true,
	},

	{
		subdomain: "driver",
		app: DriverRouteList,
		main: false,
	},

	{
		subdomain: "admin",
		app: AdminRouteList,
		main: false,
	},
];
