import { User_interface } from "./user.interface";
import { Mongo_extra } from "./mongo_extra";

export interface Transaction_interface extends Mongo_extra {
	user: User_interface;
	amount: number;
	bank: string;
	transaction_type: "debit" | "credit";
	trasaction_time: string;
}
