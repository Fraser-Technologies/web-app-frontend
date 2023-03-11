/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Alert, Input, message } from "antd";
import { FaCaretDown } from "react-icons/fa";
import { City_interface } from "../../interfaces/city_interface";
import { createTripAction } from "../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import DateField from "./datefield";
import TimePicker from "./time-picker";
import EndDateField from "./endDateField";
import EndTimePicker from "./endTimePicker";
import { resetCreateTrip } from "../../state/slices/trip.slice";
import { User_interface } from "../../interfaces/user.interface";
import LoadingWheel from "../loading-svg";

// FORM TO CREATE A TRIP
const CreateTripFormComponent = () => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state: any) => state?.allCity);
  const { drivers } = useAppSelector((state: any) => state?.allDriver);
  const { loading, trip, error } = useAppSelector(
    (state: any) => state?.createTrip
  );

  // the trip variable
  const [bus, setBus] = useState<string>("");
  const [driver, setDriver] = useState<string>("");
  const [take_off_date, setTake_off_date] = useState<string>("");
  const [take_off_time, setTake_off_time] = useState<string>("");
  const [arrival_time, setArrival_time] = useState<string>("");
  const [arrival_date, setArrival_date] = useState<string>("");
  const [price, setPrice] = useState<string>();
  const [startCity, setStartCity] = useState<string>("");
  const [endCity, setEndCity] = useState<string>("");
  const [startBusStop, setStartBusStop] = useState<string>("");
  const [stopBusStop, setStopBusStop] = useState<string>("");

  const [startCityBusStopList, setStartCityBusStopList] = useState<string[]>(
    []
  );
  const [stopCityBusStopList, setStopCityBusStopList] = useState<string[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  //
  // Display text session
  //

  //   START CITY CONTROLLERS
  const [startCityOpen, setStartCityIsOpen] = useState(false);
  const [startCityDisplayText, setStartCityDisplayText] = useState(
    "Select Start City" || ""
  );

  //   START BUSSTOP CONTROLLERS
  const [startBusStopOpen, setStartBusStopIsOpen] = useState(false);
  const [startBusStopDisplayText, setStartBusStopDisplayText] = useState(
    "Select Start Bus Stop" || ""
  );

  //   DESITNATION CITY CONTROLLERS
  const [destinationCityOpen, setDestinationCityIsOpen] = useState(false);
  const [destinationCityDisplayText, setDestinationCityDisplayText] = useState(
    "Select Destination City" || ""
  );

  //   DESITNATION BUSSTOP CONTROLLERS
  const [destinationBusStopOpen, setDestinationBusStopIsOpen] = useState(false);
  const [destinationBuStopDisplayText, setDestinationBusStopDisplayText] =
    useState("Select Destination Bus Stop" || "");

  // //   VEHICLE CONTROLLERS
  // const [vehicleOpen, setVehicleIsOpen] = useState(false);
  // const [vehicleDisplayText, setVehicleDisplayText] = useState(
  //   "Select Vehicle" || ""
  // );

  //   DRIVER  CONTROLLERS
  const [driverOpen, setDriverIsOpen] = useState(false);
  const [driverDisplayText, setDriverDisplayText] = useState(
    "Select Driver" || " "
  );

  const fullData = {
    bus,
    driver,
    take_off_date,
    take_off_time,
    arrival_date,
    arrival_time,
    price,
    travel_destination: {
      from: {
        city: startCity,
        start_busstop: startBusStop,
      },
      to: {
        city: endCity,
        stop_busstop: stopBusStop,
      },
    },
  };

  const CreateThisTrip = () => {
    if (
      !bus ||
      !driver ||
      !take_off_date ||
      !take_off_time ||
      !arrival_date ||
      !arrival_time ||
      !price ||
      !startCity ||
      !startBusStop ||
      !endCity ||
      !stopBusStop
    ) {
      return messageApi.open({
        type: "warning",
        content: "Please enter all the required details",
      });
    }
    dispatch(createTripAction(fullData));
  };

  const resetAll = () => {
    setBus("");
    setStartBusStop("");
    setArrival_date("");
    setDestinationBusStopDisplayText("Select Destination Bus Stop");
    setDestinationCityDisplayText("Select Destination City");
    setDriverDisplayText("Select Driver");
    setEndCity("");
    setPrice("");
    setStartCityDisplayText("Select Start City");
    setDriver("");
    setDriverDisplayText("Select Driver");
    setStartBusStopDisplayText("Select Start Bus Stop");
    setStartCity("");
    setStartCityBusStopList([]);
    setStopCityBusStopList([]);
    setTake_off_date("");
    setTake_off_time("");
    // setVehicleDisplayText("Select Vehicle");
  };

  useEffect(() => {
    if (trip?._id) {
      messageApi.open({
        type: "success",
        content: "A new trip has been created",
      });

      resetAll();
      dispatch(resetCreateTrip());
    }
  }, [dispatch, messageApi, trip]);

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "error",
        content: error,
      });

      dispatch(resetCreateTrip());
    }
  }, [dispatch, error, messageApi]);

  return (
    <div className="">
      {contextHolder}
      {/* START */}
      <div>
        <p className="w-full mb-2 text-sm text-gray-500">Start</p>
        {error && <Alert type="error" message={error} />}
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
            City
          </div>

          <div className="relative z-50 w-full text-left">
            <button
              className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setStartCityIsOpen(!startCityOpen);
              }}
            >
              {startCityDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {startCityOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-2 pb-4 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {cities
                    .filter(
                      (city: City_interface) =>
                        city.city !== destinationCityDisplayText
                    )
                    .map((city: City_interface) => {
                      return (
                        <a
                          key={city?._id}
                          href="#"
                          className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setStartBusStopDisplayText(city?.city);
                            setStartCityIsOpen(!startCityOpen);
                            setStartCity(city?._id);
                            setStartCityBusStopList(city?.bus_stops);
                            setStartBusStop("");
                            setStartBusStopDisplayText("Select Start Bus Stop");
                            setStartCityDisplayText(city?.city);
                          }}
                        >
                          {city?.city}
                        </a>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
            Busstops
          </div>
          <div className="relative z-40 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setStartBusStopIsOpen(!startBusStopOpen);
              }}
            >
              {startBusStopDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {startBusStopOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-2 pb-4 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {startCityBusStopList?.map((busstop: string) => {
                    return (
                      <a
                        key={busstop}
                        href="#"
                        className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        onClick={() => {
                          setStartBusStop(busstop);
                          setStartBusStopDisplayText(busstop);
                          setStartBusStopIsOpen(!startBusStopOpen);
                        }}
                      >
                        {busstop}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DESTINATION */}
      <div className="mt-3">
        <p className="w-full text-sm text-gray-500 ">Destination</p>
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
            City
          </div>
          <div className="relative z-30 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setDestinationCityIsOpen(!destinationCityOpen);
              }}
            >
              {destinationCityDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {destinationCityOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-2 pb-4 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {cities
                    .filter(
                      (city: City_interface) =>
                        city.city !== startCityDisplayText
                    )
                    ?.map((city: City_interface) => {
                      return (
                        <a
                          key={city?._id}
                          href="#"
                          className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setDestinationCityDisplayText(city.city);
                            setEndCity(city?._id);
                            setStopCityBusStopList(city?.bus_stops);
                            setDestinationBusStopDisplayText(
                              "Select Destination Bus Stop"
                            );
                            setDestinationCityIsOpen(!destinationCityOpen);
                          }}
                        >
                          {city?.city}
                        </a>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
            Busstops
          </div>
          <div className="relative z-20 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() =>
                setDestinationBusStopIsOpen(!destinationBusStopOpen)
              }
            >
              {destinationBuStopDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>
            {destinationBusStopOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-2 pb-4 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {stopCityBusStopList?.map((busstop: string) => {
                    return (
                      <a
                        key={busstop}
                        href="#"
                        className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        onClick={() => {
                          setDestinationBusStopIsOpen(!destinationBusStopOpen);
                          setDestinationBusStopDisplayText(busstop);
                          setStopBusStop(busstop);
                          setDestinationBusStopDisplayText(busstop);
                        }}
                      >
                        {busstop}
                      </a>
                    );
                  })}
                </div>

                {/* <div
									onClick={() => {}}
									className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}>
									+Add New
								</div> */}
              </div>
            )}
          </div>
        </div>
      </div>

      {/*TAKE OFF DATE AND TIME */}
      <div className="w-full pb-2 mt-3 text-sm text-gray-500">
        Takeoff Date and time
      </div>
      <DateField
        setTake_off_date={setTake_off_date}
        take_off_date={undefined}
      />
      <TimePicker
        setTake_off_time={setTake_off_time}
        take_off_time={undefined}
      />

      {/*ARRIVAL DATE AND TIME */}
      <div className="w-full pb-2 mt-3 text-sm text-gray-500">
        Arrival Date and time
      </div>
      <EndDateField
        setArrival_date={setArrival_date}
        arrival_date={undefined}
      />
      <EndTimePicker
        setArrival_time={setArrival_time}
        arrival_time={undefined}
      />

      {/* VEHICLE AND DRIVER */}
      <div className="mt-3">
        <p className="w-full text-sm text-gray-500">Vehicle and Driver</p>
        {/*	<div className="flex items-center w-full mt-2">
					<div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
						Vehicle
					</div>
					<div className="relative z-50 inline w-full text-left">
						<button
							className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
							onClick={() => {
								setVehicleIsOpen(!vehicleOpen);
							}}>
							{vehicleDisplayText}
							<FaCaretDown className="ml-auto" />
						</button>

						{vehicleOpen && (
							<div className="absolute w-full mt-2 rounded-md shadow-lg">
								<div className="w-full py-2 pb-4 overflow-y-scroll bg-white rounded-md shadow-xs ">
									{buses?.map((bus: BusStop_interface) => {
										return (
											<a
												key={bus?._id}
												href="#"
												className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
												onClick={() => {
													setVehicleDisplayText(bus?.name);
													setBus(bus?._id);
													setVehicleIsOpen(!vehicleOpen);
												}}>
												{bus?.name}
											</a>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div> */}

        {/* DRIVERS FROM BACKEND */}
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
            Driver
          </div>
          <div className="relative z-40 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-1 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setDriverIsOpen(!driverOpen);
              }}
            >
              {driverDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {driverOpen && (
              <div className="absolute z-10 w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-2 pb-4 overflow-y-scroll bg-white rounded-md shadow-xs scroll-my-0 h-[120px]">
                  {drivers
                    ?.filter(
                      (d: User_interface) =>
                        d?.driver_verification_status === true
                    )
                    // .filter(
                    //   (e: User_interface) =>
                    //     e?.location === startCityDisplayText
                    // )
                    .map((driver: User_interface) => {
                      return (
                        <a
                          key={driver?._id}
                          href="#"
                          className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setDriver(driver?._id);
                            setDriverDisplayText(
                              `${driver?.first_name} ${driver?.last_name}`
                            );
                            setBus(driver?.bus?._id);
                            setDriverIsOpen(!driverOpen);
                          }}
                        >
                          {driver?.first_name} {driver?.last_name}
                        </a>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRICE */}
      <div className="mt-3">
        <p className="w-full text-sm text-gray-500 ">Price</p>
        <div className="flex items-center w-full mt-2 ">
          <div className="w-1/4 px-4 py-2 mr-2 text-sm text-white bg-black rounded-md ">
            Price
          </div>
          <div className="relative z-30 inline w-full text-left">
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
      </div>

      <button
        className={`w-full p-3 mt-8 mb-2 text-sm rounded-lg ${
          true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
        } `}
        onClick={CreateThisTrip}
      >
        {loading && (
         <LoadingWheel param={loading}/>
        )}
        Create Trip
      </button>
    </div>
  );
};

export default CreateTripFormComponent;
