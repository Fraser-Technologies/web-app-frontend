import { Mongo_extra } from "./mongo_extra";

export interface State_interface extends Mongo_extra {
	state: string;
	bus_stops: string[];
}
