import { Booking_interface } from "./Booking_interface";
import { Mongo_extra } from "./mongo_extra";
export interface User_interface extends Mongo_extra {
	first_name: string;
	last_name: string;
	image: string;
	email: string;
	referrals: User_interface[];
	referral_code: string;
	phone: string;
	bookings: Booking_interface[];
	is_admin: boolean;
	password?: string;
	is_blocked: boolean;
	user_type: "user" | "driver";
	location: string;
}
