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
		<div className="my-4">
			<div>Select Preferred Seat</div>
			<p>1 Passenger</p>
			<div className="container">
				{seat.map((seatName) =>
					seatName === "A1" ? (
						<div className="flex justify-center items-center w-full">
							<div
								key={seatName}
								onClick={(e) => onSeatSelect(seatName)}
								className={`w-24 h-14 flex justify-center items-center border border-black rounded-md cursor-pointer mb-3 mt-8 ${
									seatAvailable?.indexOf(seatName) > -1
										? "bg-white"
										: "bg-primary-100"
								}`}
							>
								{seatName}
							</div>
						</div>
					) : null
				)}
				<div className="grid grid-cols-3 gap-4">
					{seat.map((seatName) =>
						seatName === "A1" ? null : (
							<div>
								<div
									key={seatName}
									onClick={(e) => onSeatSelect(seatName)}
									className={`w-24 h-14 flex justify-center items-center border border-black rounded-md cursor-pointer ${
										seatAvailable?.indexOf(seatName) > -1
											? "bg-white"
											: "bg-primary-100"
									}`}
									// className="w-24 h-14 flex justify-center items-center border border-black rounded-md cursor-pointer"
								>
									{seatName}
								</div>
							</div>
						)
					)}
				</div>
			</div>
			{/* <div className="container">
				{seat.map((seatName) =>
					seatName === "A1" ? (
						<div className="flex justify-center items-center">
							<div className="w-10 h-10 flex justify-center items-center border border-[#EFF3EF] rounded-md cursor-pointer">
								{seatName}
							</div>
						</div>
					) : (
						<div className="bg-gray-200 flex-1" style={{ display: "flex" }}>
							<span className="bg-yellow-100">{seatName}</span>
						</div>
					)
				)} */}
			{/* <div className="grid grid-cols-3 gap-3 mt-8 items-center">
					{seat?.map((row) =>
						row === "A1" ? (
							<div className="flex w-full">
								<div
									// className="col-span-3 border-b border-[#EFF3EF]"
									key={row}
									onClick={(e) => onSeatSelect(row)}
									className={`col-start-2 col-span-3 text-center py-3 w-20 ${
										seatAvailable?.indexOf(row) > -1
											? "bg-white border"
											: "bg-primary-100"
									} cursor-pointer`}
								>
									{row}
								</div>
							</div>
						) : (
							<div
								key={row}
								onClick={(e) => onSeatSelect(row)}
								className={`text-center py-3 w-20 ${
									seatAvailable?.indexOf(row) > -1
										? "bg-white border"
										: "bg-primary-100"
								} cursor-pointer`}
							>
								{row}
							</div>
						)
					)} */}
			{/* </div> */}
			{/* <h3>Available seats</h3> */}
			{/* <AvailableList /> */}
			{/* <h3>Reserved Seats</h3> */}
			{/* <ReservedList /> */}
			{/* </div> */}
		</div>
	);
};

export default SeatReservation;
