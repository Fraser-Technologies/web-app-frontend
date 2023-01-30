import { User_interface } from "./user.interface";
import { Mongo_extra } from "./mongo_extra";

export interface Withdraw_interface extends Mongo_extra {
	user: User_interface;
	amount: number;
	bank: string;
	transaction_time: string;
}
