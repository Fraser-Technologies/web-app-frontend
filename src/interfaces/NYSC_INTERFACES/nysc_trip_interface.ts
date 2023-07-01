import { Booking_interface, Passenger_interface } from "../Booking_interface";
import { Bus_interface } from "../bus_interface";
import { Mongo_extra } from "../mongo_extra";

export interface NYSCTrip_interface extends Mongo_extra {
	bus: Bus_interface;
	passengers?: Passenger_interface[];
	take_off_time: string;
	take_off_date: string;
	arrival_time: string;
	arrival_date: string;
	bookings: Booking_interface[];
	travel_destination: {
		from: { state: string; start_busstop: string };
		to: { state: string; stop_busstop: string };
	};
	verified_passengers_onboard?: string[];
	price: number;
	currency?: string;
	completed_status: boolean;
	amount_earned: number;
	ratings: number[];
	has_started: boolean;
	start_time: string;
	has_ended: boolean;
	end_time: string;
	trip_type: "outbound" | "return";
}
