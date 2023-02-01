import { Mongo_extra } from "./mongo_extra";

export interface Bus_interface extends Mongo_extra {
	name: string;
	plate_number: string;
	type: string;
	image: string;
	capacity: number;
	status: "available" | "unavailable" | "in use";
}
