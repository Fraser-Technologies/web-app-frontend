import React, { useEffect, useState } from "react";

const TimePicker = (props: { setTake_off_time: any; take_off_time: any }) => {
	const { setTake_off_time, take_off_time } = props;

	const [time, setTime] = useState<string>(take_off_time || "");

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTime(event.target.value);
	};

	useEffect(() => {
		setTake_off_time(time);
	}, [time]);

	return (
		<div className="mt-4 flex rounded-md ">
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

export default TimePicker;
