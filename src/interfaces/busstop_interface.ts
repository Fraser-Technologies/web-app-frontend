import { Mongo_extra } from "./mongo_extra";

export interface BusStop_interface extends Mongo_extra {
	name: string;
	local_government: string;
	state: string;
}
