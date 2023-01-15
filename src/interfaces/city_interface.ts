import { Mongo_extra } from "./mongo_extra";

export interface City_interface extends Mongo_extra {
	city: string;
	bus_stops: string[];
}
