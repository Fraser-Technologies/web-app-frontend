import { Mongo_extra } from "./mongo_extra";
import { Trip_interface } from "./trip_interface";

export interface Driver_interface extends Mongo_extra {
	first_name: string;
	last_name: string;
	email?: string;
	phone: string;
	completed_trips: [Trip_interface];
}
