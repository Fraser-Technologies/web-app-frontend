import AdminApp from "../Apps/adminApp";
import DriverApp from "../Apps/driverApp";
import UserApp from "../Apps/userApp";

export const APPS = [
	{
		subdomain: "www",
		app: UserApp,
		main: true,
	},

	{
		subdomain: "driver",
		app: DriverApp,
		main: false,
	},

	{
		subdomain: "admin",
		app: AdminApp,
		main: false,
	},
];
