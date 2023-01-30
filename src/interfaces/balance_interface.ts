import { Withdraw_interface } from "./withdraw_interface";
import { Mongo_extra } from "./mongo_extra";
import { User_interface } from "./user.interface";

export interface Balance_interface extends Mongo_extra {
	user: User_interface;
	available_balance: number;
	total_earnings: number;
	total_withdraw: number;
	withdraw_history: Withdraw_interface;
	user_banks_details: {
		bank_name: string;
		account_number: string;
		account_name: string;
	}[];
}
