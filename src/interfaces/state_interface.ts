import { Mongo_extra } from "./mongo_extra";

export interface State_interface extends Mongo_extra {
	name: string;
	bus_stops: string[];
	for: "REGULAR" | "NYSC" | "AIESEC";
}
