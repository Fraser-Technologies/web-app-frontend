import { Mongo_extra } from "./mongo_extra";
import { User_interface } from "./user.interface";

export interface Entity_interface extends Mongo_extra {
	name: string;
	description: string;
	referral_code: {
		code: string;
		usage: number;
		amount_earned: number;
		amount_paid: number;
	};
	discount_code: {
		code: string;
		discount_percent: number;
		active: boolean;
		usage: number;
		amount_earned: number;
		amount_paid: number;
	};
	referrals: User_interface[];
}
