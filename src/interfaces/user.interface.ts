import { Balance_interface } from "./balance_interface";
import { Bus_interface } from "./bus_interface";
import { Booking_interface } from "./Booking_interface";
import { Mongo_extra } from "./mongo_extra";
export interface User_interface extends Mongo_extra {
	first_name: string;
	last_name: string;
	image: string;
	email: string;
	referrals: User_interface[];
	referral_code: string;
	phone?: string;
	bookings: Booking_interface[];
	is_admin: boolean;
	password?: string;
	is_blocked: boolean;
	user_type: "user" | "driver";
	location: string;
	user_token?: string;
	available: boolean;
	driver_license: string;
	driver_verification_status?: boolean;
	bus: Bus_interface;
	balance: Balance_interface;
	home_state: string;
}
