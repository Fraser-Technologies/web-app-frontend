/* eslint-disable jsx-a11y/anchor-is-valid */
import { Input, message } from "antd";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Bus_interface } from "../../interfaces/bus_interface";
import { City_interface } from "../../interfaces/city_interface";
import { Trip_interface } from "../../interfaces/trip_interface";
import { User_interface } from "../../interfaces/user.interface";
import { updateTripAction } from "../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { FraserButton } from "../Button";
import LoadingWheel from "../loading-svg";
import DateField from "./datefield";
import EndDateField from "./endDateField";
import EndTimePicker from "./endTimePicker";
import TimePicker from "./time-picker";

const EditTripFormComponent = ({
  trip,
}: {
  trip: Trip_interface | undefined;
}) => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state: any) => state?.allCity);
  const { drivers } = useAppSelector((state: any) => state?.allDriver);
  const { buses } = useAppSelector((state: any) => state.allBus);
  const { loading, error } = useAppSelector((state: any) => state.updateTrip);

  // the trip variable
  const [bus, setBus] = useState<string>(trip?.bus?.make || "");
  const [driver, setDriver] = useState<string>(trip?.driver?._id || "");
  const [take_off_date, setTake_off_date] = useState<string>(
    trip?.take_off_date || ""
  );
  const [take_off_time, setTake_off_time] = useState<string>(
    trip?.take_off_time || ""
  );
  const [arrival_time, setArrival_time] = useState<string>(
    trip?.arrival_date || ""
  );
  const [arrival_date, setArrival_date] = useState<string>(
    trip?.arrival_date || ""
  );
  const [price, setPrice] = useState<string>(String(trip?.price) || "");
  const [startCity, setStartCity] = useState<string>(
    trip?.travel_destination?.from?.city?._id || ""
  );
  const [endCity, setEndCity] = useState<string>(
    trip?.travel_destination?.to?.city?._id || ""
  );
  const [startBusStop, setStartBusStop] = useState<string>(
    trip?.travel_destination?.from?.start_busstop || ""
  );
  const [stopBusStop, setStopBusStop] = useState<string>(
    trip?.travel_destination?.to?.stop_busstop || ""
  );

  const [startCityBusStopList, setStartCityBusStopList] = useState<string[]>(
    []
  );
  const [stopCityBusStopList, setStopCityBusStopList] = useState<string[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  //   START CITY CONTROLLERS
  const [startCityOpen, setStartCityIsOpen] = useState<boolean>(false);
  const [startCityDisplayText, setStartCityDisplayText] = useState<string>(
    trip?.travel_destination?.from?.city?.city || "Select Start City"
  );

  //   START BUSSTOP CONTROLLERS
  const [startBusStopOpen, setStartBusStopIsOpen] = useState(false);
  const [startBusStopDisplayText, setStartBusStopDisplayText] = useState(
    trip?.travel_destination?.from?.start_busstop || "Select Start Bus Stop"
  );

  //   DESITNATION CITY CONTROLLERS
  const [destinationCityOpen, setDestinationCityIsOpen] = useState(false);
  const [destinationCityDisplayText, setDestinationCityDisplayText] = useState(
    trip?.travel_destination?.to?.city?.city || "Select Destination City"
  );

  //   DESITNATION BUSSTOP CONTROLLERS
  const [destinationBusStopOpen, setDestinationBusStopIsOpen] = useState(false);
  const [destinationBuStopDisplayText, setDestinationBusStopDisplayText] =
    useState(
      trip?.travel_destination?.to?.stop_busstop ||
        "Select Destination Bus Stop"
    );

  //   VEHICLE CONTROLLERS
  const [vehicleOpen, setVehicleIsOpen] = useState(false);
  const [vehicleDisplayText, setVehicleDisplayText] = useState(
    trip?.bus?.make || "Select Vehicle"
  );

  //   DRIVER  CONTROLLERS
  const [driverOpen, setDriverIsOpen] = useState(false);
  const [driverDisplayText, setDriverDisplayText] = useState(
    `${trip?.driver?.first_name} ${trip?.driver?.last_name}` || "Select Driver"
  );

  const updateData = {
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

  const updateTripData = () => {
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
    dispatch(updateTripAction(trip?._id || "", updateData));
  };

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "error",
        content: error,
      });
    }
  }, [error, messageApi]);

  return (
    <div className="">
      {contextHolder}
      {/* START */}
      <div>
        <p className="w-full mb-2 text-gray-500">Start</p>
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md">
            City
          </div>
          <div className="relative z-50 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setStartCityIsOpen(!startCityOpen);
              }}
            >
              {startCityDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {startCityOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {cities
                    .filter(
                      (city: City_interface) =>
                        city?.city !== destinationCityDisplayText
                    )
                    .map((city: City_interface) => {
                      return (
                        <a
                          key={city?._id}
                          href="#"
                          className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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

                <div
                  onClick={() => {
                    //FUNCTION TO ADD NEW CITY
                  }}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md">
            Busstops
          </div>
          <div className="relative z-40 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setStartBusStopIsOpen(!startBusStopOpen);
              }}
            >
              {startBusStopDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {startBusStopOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {startCityBusStopList?.map((busstop: string) => {
                    return (
                      <a
                        key={busstop}
                        href="#"
                        className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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

                <div
                  onClick={() => {}}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DESTINATION */}
      <div className="mt-6">
        <p className="w-full text-gray-500">Destination</p>
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md">
            City
          </div>
          <div className="relative z-30 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setDestinationCityIsOpen(!destinationCityOpen);
              }}
            >
              {destinationCityDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {destinationCityOpen && (
              <div className="absolute z-10 w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
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
                          className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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

                <div
                  onClick={() => {
                    //FUNCTION TO ADD NEW CITY
                  }}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BUSSTOPS FROM THE SELECTED CITY ABOVE */}
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md ">
            Busstops
          </div>
          <div className="relative z-20 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() =>
                setDestinationBusStopIsOpen(!destinationBusStopOpen)
              }
            >
              {destinationBuStopDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {destinationBusStopOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {stopCityBusStopList?.map((busstop: string) => {
                    return (
                      <a
                        key={busstop}
                        href="#"
                        className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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

                <div
                  onClick={() => {}}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*TAKE OFF DATE AND TIME */}
      <div className="w-full pb-2 mt-6 text-gray-500">
        Takeoff Date and time
      </div>
      <DateField
        take_off_date={take_off_date}
        setTake_off_date={setTake_off_date}
      />
      <TimePicker
        take_off_time={take_off_time}
        setTake_off_time={setTake_off_time}
      />

      {/*ARRIVAL DATE AND TIME */}
      <div className="w-full pb-2 mt-6 text-gray-500">
        Arrival Date and time
      </div>
      <EndDateField
        arrival_date={arrival_date}
        setArrival_date={setArrival_date}
      />
      <EndTimePicker
        arrival_time={take_off_time}
        setArrival_time={setArrival_time}
      />

      {/* VEHICLE AND DRIVER */}
      <div className="mt-6">
        <p className="w-full text-gray-500">Vehicle and Driver</p>
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md">
            Vehicle
          </div>
          <div className="relative z-50 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setVehicleIsOpen(!vehicleOpen);
              }}
            >
              {vehicleDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {vehicleOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {buses?.map((bus: Bus_interface) => {
                    return (
                      <a
                        key={bus?._id}
                        href="#"
                        className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        onClick={() => {
                          setVehicleDisplayText(bus?.make);
                          setBus(bus?._id);
                          setVehicleIsOpen(!vehicleOpen);
                        }}
                      >
                        {bus?.make}
                      </a>
                    );
                  })}
                </div>

                <div
                  onClick={() => {}}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DRIVERS FROM BACKEND */}
        <div className="flex items-center w-full mt-2">
          <div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md">
            Driver
          </div>
          <div className="relative z-40 inline w-full text-left">
            <button
              className="inline-flex w-full px-4 py-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setDriverIsOpen(!driverOpen);
              }}
            >
              {driverDisplayText}
              <FaCaretDown className="ml-auto" />
            </button>

            {driverOpen && (
              <div className="absolute w-full mt-2 rounded-md shadow-lg">
                <div className="w-full py-4 pb-12 overflow-y-scroll bg-white rounded-md shadow-xs ">
                  {drivers.map((driver: User_interface) => {
                    return (
                      <a
                        key={driver?._id}
                        href="#"
                        className="inline-block w-full px-4 py-4 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                        onClick={() => {
                          setDriver(driver?._id);
                          setDriverDisplayText(
                            `${driver?.first_name} ${driver?.last_name}`
                          );
                          setDriverIsOpen(!driverOpen);
                        }}
                      >
                        {driver?.first_name} {driver?.last_name}
                      </a>
                    );
                  })}
                </div>

                <div
                  onClick={() => {}}
                  className={`absolute bottom-0 cursor-pointer text-[#22B11E] bg-[#EFF3EF] border-t w-full rounded-b-md text-center py-3 z-50`}
                >
                  +Add New
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-6">
          <p className="w-full text-gray-500">Price</p>
          <div className="flex items-center w-full mt-2 ">
            <div className="w-1/4 px-4 py-2 mr-2 text-white bg-black rounded-md ">
              Price
            </div>
            <div className="relative z-50 inline w-full text-left">
              <Input value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
        </div>

        <FraserButton
          loader={loading}
          title={"Create Trip"}
          size={"regular"}
          className={"w-full"}
        />
      </div>
    </div>
  );
};

export default EditTripFormComponent;
