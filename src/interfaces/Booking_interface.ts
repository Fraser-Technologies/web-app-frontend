import { Mongo_extra } from "./mongo_extra";
import { User_interface } from "./user.interface";
import { Trip_interface } from "./trip_interface";

export interface Booking_interface extends Mongo_extra {
	trip: Trip_interface;
	user: User_interface;
	comfirmed_payment: boolean;
	completed_trip: boolean;
	seat?: number;
	rating?: number;
	verify_onboard: boolean;
}

export interface Passenger_interface extends Mongo_extra {
	name: string;
	phone: string;
	isOnboard: boolean;
}
