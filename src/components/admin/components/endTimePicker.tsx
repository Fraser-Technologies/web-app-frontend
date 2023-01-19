import React, { useEffect, useState } from "react";

const EndTimePicker = (props: { setArrival_time: any; arrival_time: any }) => {
	const { setArrival_time, arrival_time } = props;

	console.log("the arrival time is ", arrival_time);
	const [time, setTime] = useState<string>(arrival_time || "");

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTime(event.target.value);
	};

	useEffect(() => {
		setArrival_time(time);
	}, [time]);

	return (
		<div className="mt-2 flex rounded-md text-sm">
			<div className=" bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
				Time
			</div>
			<input
				className="w-full bg-[#EFF3EF] px-4"
				type="time"
				value={time}
				onChange={handleTimeChange}
			/>
		</div>
	);
};

export default EndTimePicker;
