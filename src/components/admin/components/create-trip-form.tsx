import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { City_interface } from "../../../interfaces/city_interface";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import DateField from "./datefield";
import DropdownComponent from "./full-dropdown";
import TimePicker from "./time-picker";

// FORM TO CREATE A TRIP
const CreateTripFormComponent = (props: any) => {
	const { cities, loading, error } = useAppSelector(
		(state: any) => state?.allCity
	);
	const dispatch = useAppDispatch();
	const { onSendData } = props;
	// PASS DATA TO PARENT
	const handleSendData = () => {
		onSendData(
			startCityDisplayText,
			startBusStopDisplayText,
			destinationCityDisplayText,
			destinationBuStopDisplayText,
			driverDisplayText,
			vehicleDisplayText,
			year,
			month,
			day,
			time
		);
	};

	//   START CITY CONTROLLERS
	const [startCityOpen, setStartCityIsOpen] = useState(false);
	const [startCityDisplayText, setStartCityDisplayText] = useState(
		Cookies.get("startCity") || "Select Start City"
	);
	const handleStartCityChange = (option: any) => {
		setStartCityDisplayText(option);
		setStartCityIsOpen(!startCityOpen);
	};
	const handleStartCityDropClick = () => {
		setStartCityIsOpen(!startCityOpen);
	};

	//   START BUSSTOP CONTROLLERS
	const [startBusStopOpen, setStartBusStopIsOpen] = useState(false);
	const [startBusStopDisplayText, setStartBusStopDisplayText] = useState(
		Cookies.get("startBusStop") || "Select Start Bus Stop"
	);
	const handleStartBusStopChange = (option: any) => {
		setStartBusStopDisplayText(option);
		setStartBusStopIsOpen(!startBusStopOpen);
	};
	const handleStartBusStopDropClick = () => {
		setStartBusStopIsOpen(!startBusStopOpen);
	};

	//   DESITNATION CITY CONTROLLERS
	const [destinationCityOpen, setDestinationCityIsOpen] = useState(false);
	const [destinationCityDisplayText, setDestinationCityDisplayText] = useState(
		Cookies.get("destinationCity") || "Select Destination City"
	);
	const handleDestinationCityChange = (option: any) => {
		setDestinationCityDisplayText(option);
		setDestinationCityIsOpen(!destinationCityOpen);
	};
	const handleDestinationCityDropClick = () => {
		setDestinationCityIsOpen(!destinationCityOpen);
	};

	//   DESITNATION BUSSTOP CONTROLLERS
	const [destinationBusStopOpen, setDestinationBusStopIsOpen] = useState(false);
	const [destinationBuStopDisplayText, setDestinationBusStopDisplayText] =
		useState(
			Cookies.get("destinationBusStop") || "Select Destination Bus Stop"
		);
	const handleDestinationBusStopChange = (option: any) => {
		setDestinationBusStopDisplayText(option);
		setDestinationBusStopIsOpen(!destinationBusStopOpen);
	};
	const handleDestinationBusStopDropClick = () => {
		setDestinationBusStopIsOpen(!destinationBusStopOpen);
	};

	//   VEHICLE CONTROLLERS
	const [vehicleOpen, setVehicleIsOpen] = useState(false);
	const [vehicleDisplayText, setVehicleDisplayText] = useState(
		Cookies.get("vehicle") || "Select Vehicle"
	);
	const handleVehicleChange = (option: any) => {
		setVehicleDisplayText(option);
		setVehicleIsOpen(!vehicleOpen);
	};
	const handleVehicleDropClick = () => {
		setVehicleIsOpen(!vehicleOpen);
	};

	//   DRIVER  CONTROLLERS
	const [driverOpen, setDriverIsOpen] = useState(false);
	const [driverDisplayText, setDriverDisplayText] = useState(
		Cookies.get("driver") || "Select Driver"
	);
	const handleDriverChange = (option: any) => {
		setDriverDisplayText(option);
		setDriverIsOpen(!driverOpen);
	};
	const handleDriverDropClick = () => {
		setDriverIsOpen(!driverOpen);
	};

	// SET YEAR, MONTH AND DAY FROM CHILD COMPONENT (DATEFIELD)
	const [year, setYear] = useState(Cookies.get("year"));
	const [month, setMonth] = useState(Cookies.get("month"));
	const [day, setDay] = useState(Cookies.get("day"));

	const handleDateFromChild = (year: any, month: any, day: any) => {
		setYear(year);
		setMonth(month);
		setDay(day);
	};

	//SET TIME FROM CHILD COMPONENT
	const [time, setTime] = useState("");
	const handleTimeFromChild = (time: any) => {
		setTime(time);
	};

	useEffect(() => {
		handleSendData();
		Cookies.set("startCity", startCityDisplayText, { expires: 1 });
		Cookies.set("startBusStop", startBusStopDisplayText, { expires: 1 });
		Cookies.set("destinationCity", destinationCityDisplayText, { expires: 1 });
		Cookies.set("destinationBusStop", startBusStopDisplayText, { expires: 1 });
		Cookies.set("vehicle", vehicleDisplayText, { expires: 1 });
		Cookies.set("driver", driverDisplayText, { expires: 1 });
		// console.log(
		//   startCityDisplayText,
		//   startBusStopDisplayText,
		//   destinationCityDisplayText,
		//   destinationBuStopDisplayText,
		//   vehicleDisplayText,
		//   driverDisplayText,
		//   year,
		//   month,
		//   day,
		//   time
		// );
	}, [
		startCityDisplayText,
		startBusStopDisplayText,
		destinationCityDisplayText,
		destinationBuStopDisplayText,
		vehicleDisplayText,
		driverDisplayText,
		year,
		month,
		day,
		time,
	]);

	useEffect(() => {}, []);

	return (
		<div className="">
			<DropdownComponent
				topLabel="Start"
				onChangeFunction={handleStartCityChange}
				onClickFunction={handleStartCityDropClick}
				dropControllerBool={startCityOpen}
				displayText={startCityDisplayText}
				// dataSetName={cities}
				// dataSetMapFunction={citiesArray.map(([city]) => {
				//   return (
				//     <a
				//       key={city}
				//       href="#"
				//       className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
				//       onClick={() => {
				//         handleStartCityChange(city);
				//       }}
				//     >
				//       {city}
				//     </a>
				//   );
				// })}
				fullBodyClassName="mt-6 z-50"
				dropdownLabel="City"
				dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-50"
				addNewOnClickFunction={() => {}}
				dataSetName={undefined}
				dataSetMapFunction={cities?.map((city: City_interface) => {
					return (
						<a
							// key={city}
							href="#"
							className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
							onClick={() => {}}>
							{city?.city}
						</a>
					);
				})}
			/>

			<DropdownComponent
				topLabel=""
				onChangeFunction={handleStartBusStopChange}
				onClickFunction={handleStartBusStopDropClick}
				dropControllerBool={startBusStopOpen}
				displayText={startBusStopDisplayText}
				// dataSetName={cities}
				// dataSetMapFunction={citiesArray.map(([city, busstop]) => {
				//   if (city === startCityDisplayText) {
				//     return busstop.map((busstop) => {
				//       return (
				//         <a
				//           key={busstop.busstop}
				//           href="#"
				//           className={`w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900`}
				//           onClick={() => {
				//             handleStartBusStopChange(busstop.busstop);
				//           }}
				//         >
				//           {busstop.busstop}
				//         </a>
				//       );
				//     });
				//   }
				// })}
				fullBodyClassName="mt-4"
				dropdownLabel="Bus Stop"
				dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-40"
				addNewOnClickFunction={() => {}}
				dataSetName={undefined}
				dataSetMapFunction={undefined}
			/>

			{/* DESTINATION */}
			<DropdownComponent
				topLabel="Destination"
				onChangeFunction={handleDestinationCityChange}
				onClickFunction={handleDestinationCityDropClick}
				dropControllerBool={destinationCityOpen}
				displayText={destinationCityDisplayText}
				// dataSetName={cities}
				// dataSetMapFunction={citiesArray.map(([city]) => {
				//   return (
				//     <a
				//       key={city}
				//       href="#"
				//       className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
				//       onClick={() => {
				//         handleDestinationCityChange(city);
				//       }}
				//     >
				//       {city}
				//     </a>
				//   );
				// })}
				fullBodyClassName="mt-6 z-50"
				dropdownLabel="City"
				dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-50"
				addNewOnClickFunction={() => {}}
				dataSetName={undefined}
				dataSetMapFunction={undefined}
			/>

			<DropdownComponent
				topLabel=""
				onChangeFunction={handleDestinationBusStopChange}
				onClickFunction={handleDestinationBusStopDropClick}
				dropControllerBool={destinationBusStopOpen}
				displayText={destinationBuStopDisplayText}
				// dataSetName={cities}
				// dataSetMapFunction={citiesArray.map(([city, busstop]) => {
				//   if (city === destinationCityDisplayText) {
				//     return busstop.map((busstop) => {
				//       return (
				//         <a
				//           key={busstop.busstop}
				//           href="#"
				//           className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
				//           onClick={() => {
				//             handleDestinationBusStopChange(busstop.busstop);
				//           }}
				//         >
				//           {busstop.busstop}
				//         </a>
				//       );
				//     });
				//   }
				// })}
				fullBodyClassName="mt-4"
				dropdownLabel="Bus Stop"
				dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-40"
				addNewOnClickFunction={() => {}}
				dataSetName={undefined}
				dataSetMapFunction={undefined}
			/>

			<div className="w-full mb-2 text-gray-500 mt-8">Date and time</div>
			<DateField onSendData={handleDateFromChild} className="mt-2" />

			<TimePicker onTimeChange={handleTimeFromChild} />
			{/* DESTINATION */}
			<DropdownComponent
				topLabel="Vehicle and Driver"
				onChangeFunction={handleDriverChange}
				onClickFunction={handleDriverDropClick}
				dropControllerBool={driverOpen}
				displayText={driverDisplayText}
				// dataSetName={drivers}
				// dataSetMapFunction={drivers.map((driver: any) => {
				//   return (
				//     <a
				//       key={driver}
				//       href="#"
				//       className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
				//       onClick={() => {
				//         handleDriverChange(driver.driver + " " + driver.lastName);
				//       }}
				//     >
				//       {driver.driver + " " + driver.lastName}
				//     </a>
				//   );
				// })}
				fullBodyClassName="mt-6 z-50"
				dropdownLabel="Driver"
				dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-50"
				addNewOnClickFunction={() => {}}
				dataSetName={undefined}
				dataSetMapFunction={undefined}
			/>

			<DropdownComponent
				topLabel=""
				onChangeFunction={handleVehicleChange}
				onClickFunction={handleVehicleDropClick}
				dropControllerBool={vehicleOpen}
				displayText={vehicleDisplayText}
				// dataSetName={vehicles}
				// dataSetMapFunction={vehicles.map((option: any) => {
				//   return (
				//     <a
				//       key={option}
				//       href="#"
				//       className="w-full inline-block px-4 py-2 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
				//       onClick={() => {
				//         handleVehicleChange(
				//           option.model + " " + option.registrationNumber
				//         );
				//       }}
				//     >
				//       {option.model + " " + option.registrationNumber}
				//     </a>
				//   );
				// })}
				fullBodyClassName="mt-4"
				dropdownLabel="Vehicle"
				dropDownClassName="w-full absolute mt-2 rounded-md shadow-lg z-40"
				addNewOnClickFunction={() => {}}
				dataSetName={undefined}
				dataSetMapFunction={undefined}
			/>

			<button
				className={`w-full p-3 mt-8 mb-8 font-medium rounded-lg ${
					true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
				} `}
				onClick={() => {}}>
				{/* <svg
							className={`${
								true === true ? "animate-spin" : "hidden"
							} inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="white"
								stroke="white"
								stroke-width="5"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="green"
								stroke="green"
								stroke-width="5"
							/>
						</svg> */}
				Proceed to review
			</button>
		</div>
	);
};

export default CreateTripFormComponent;
