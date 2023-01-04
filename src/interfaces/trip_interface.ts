import { Mongo_extra } from "./mongo_extra";
import { Booking_interface } from "./Booking_interface";
import { BusStop_interface } from "./busstop_interface";
import { Bus_interface } from "./bus_interface";
import { Driver_interface } from "./driver_interface";

export interface Trip_interface extends Mongo_extra {
	bus: Bus_interface;
	driver: Driver_interface;
	take_off_time: string;
	arrival_time: string;
	arrival_date: string;
	bookings: Booking_interface[];
	travel_destination: {
		from: BusStop_interface;
		to: BusStop_interface;
	};
	verify_passenger_arrival?: [
		{
			booking: Booking_interface;
			verify: boolean;
		}
	];
	price: number;
	currency?: string;
	completed_status: boolean;
	no_of_seat: number;
}