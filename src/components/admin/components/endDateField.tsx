import { useEffect, useState } from "react";

const EndDateField = (props: { setArrival_date: any; arrival_date: any }) => {
	// PASS DATA TO PARENT
	const { setArrival_date, arrival_date } = props;

	const [year, setYear] = useState<string>(
		arrival_date?.split(",")[2].trim() || ""
	);
	const [month, setMonth] = useState<string>(
		arrival_date?.split(",")[1].trim() || ""
	);
	const [day, setDay] = useState<string>(
		arrival_date?.split(",")[0].trim() || ""
	);

	// Array of years to display in the dropdown menu
	const years = ["Select", 2023, 2024, 2025];

	// Array of months to display in the dropdown menu
	const months = [
		"Select",
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Array of days to display in the dropdown menu (assuming 31 days in every month)
	const days = Array.from({ length: 31 }, (_, i) => i + 1);

	useEffect(() => {
		setArrival_date(`${day}, ${month}, ${year}`);
	}, [day, month, year]);

	return (
		<div className={`w-full flex `}>
			<div className="bg-black w-1/4 text-white py-2 px-4 rounded-md mr-2">
				Date
			</div>
			<select
				className="w-full mr-2 bg-[#EFF3EF] px-2 rounded-md"
				value={year}
				onChange={(e) => {
					setYear(e.target.value);
				}}>
				{years.map((y) => (
					<option key={y} value={y}>
						{y}
					</option>
				))}
			</select>

			<br />
			{/* <label>Month</label> */}
			<select
				className="w-full mx-2 bg-[#EFF3EF] px-2 rounded-md"
				value={month}
				onChange={(b) => {
					setMonth(b.target.value);
				}}>
				{months.map((m) => (
					<option key={m} value={m}>
						{m}
					</option>
				))}
			</select>
			<br />
			{/* <label>Day</label> */}

			<div className="flex w-full">
				<select
					className="w-full ml-2 bg-[#EFF3EF] px-2 rounded-md"
					value={day}
					onChange={(e) => {
						setDay(e.target.value);
					}}>
					{days.map((d) => (
						<option key={d} value={d}>
							{d}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default EndDateField;
