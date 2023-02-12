import { Mongo_extra } from "./mongo_extra";
import { User_interface } from "./user.interface";

export interface Bus_interface extends Mongo_extra {
	make: string;
	model: string;
	image: string;
	capacity: number;
	status: "available" | "unavailable" | "in use";
	registration_number: string;
	driver: User_interface;
	bus_insurance: string;
	road_worthiness_cert: string;
}
