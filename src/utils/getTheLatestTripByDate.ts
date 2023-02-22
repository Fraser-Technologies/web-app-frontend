import { Trip_interface } from "../interfaces/trip_interface";

export const getTheLatestByDate = (
	tripData: Trip_interface[]
): Trip_interface => {
	return tripData
		?.filter(
			(trip: Trip_interface) =>
				trip?.completed_status === false && trip?.trip_type === "outbound"
		)
		.sort((a, b) => {
			const dateA = new Date(`${a?.take_off_date} ${a?.take_off_time}`);
			const dateB = new Date(`${b?.take_off_date} ${b?.take_off_time}`);
			return dateA.getTime() - dateB.getTime();
		})[0];
};
