import React from "react";

const SeatReservation = () => {
	const inititalState = [
		"A1",
		"B1",
		"B2",
		"B3",
		"C1",
		"C2",
		"C3",
		"D1",
		"D2",
		"D3",
		"E1",
		"E2",
		"E3",
	];
	const [seat, setSeat] = React.useState(inititalState);
	const [seatAvailable, setSeatAvailable] = React.useState(inititalState);
	const [seatReserved, setSeatReserved] = React.useState([]);

	const onSeatSelect = (seat: any) => {
		if (seatAvailable.indexOf(seat) > -1) {
			setSeatAvailable(seatAvailable?.filter((s) => s !== seat));
			setSeatReserved(seatReserved?.concat(seat));
		} else {
			setSeatReserved(seatReserved?.filter((s) => s !== seat));
			setSeatAvailable(seatAvailable?.concat(seat));
		}
	};
	// console.log(seatAvailable, "availableSeats");
	// console.log(seatReserved, "seatReserved");

	const AvailableList: any = () => {
		return seatAvailable?.map((seat) => (
			<div
				key={seat}
				onClick={() => onSeatSelect(seat)}
				className="w-10 h-10 flex justify-center items-center border border-[#EFF3EF] rounded-md cursor-pointer"
			>
				{seat}
			</div>
		));
	};

	const ReservedList: any = () => {
		return seatReserved?.map((seat) => (
			<div
				key={seat}
				onClick={() => onSeatSelect(seat)}
				className="w-10 h-10 flex justify-center items-center border border-[#EFF3EF] rounded-md cursor-pointer"
			>
				{seat}
			</div>
		));
	};

	return (
		<div>
			<div>Select Preferred Seat</div>
			<p>1 Passenger</p>
			<div className="container">
				{seat.map((seatName) =>
					seatName === "A1" ? (
						<div className="flex justify-center items-center w-full">
							<div className="w-24 h-14 flex justify-center items-center border border-[#EFF3EF] rounded-md cursor-pointer mb-3 mt-8">
								{seatName}
							</div>
						</div>
					) : null
				)}
				<div className="grid grid-cols-3 gap-4">
					{seat.map((seatName) =>
						seatName === "A1" ? null : (
							<div>
								<div className="w-24 h-14 flex justify-center items-center border border-[#EFF3EF] rounded-md cursor-pointer">
									{seatName}
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default SeatReservation;
