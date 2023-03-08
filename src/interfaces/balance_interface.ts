import { Mongo_extra } from "./mongo_extra";
import { User_interface } from "./user.interface";
import { Transaction_interface } from "./transaction_interface";

export interface Balance_interface extends Mongo_extra {
	user: User_interface;
	available_balance: number;
	transaction_history: Transaction_interface[];
	user_banks_details: {
		bank_name: string;
		account_number: string;
		account_name: string;
	};
}
