import { Bus_interface } from "./bus_interface";
import { Mongo_extra } from "./mongo_extra";

export interface City_interface extends Mongo_extra {
	city: string;
	bus_stop: Bus_interface[];
}
