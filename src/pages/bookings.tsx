/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import BookingCard from "../components/bookingCard";
import Layout from "../components/layouts/SignInLayout";
import { getAllBusStopAction } from "../state/action/busStop.action";
import { Button } from "../components/Button";
import {
  getAllAvailableTripAction,
  getAvailableTripAction,
} from "../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Alert } from "antd";
import { addToMyBookinAction } from "../state/action/booking.action";
import GeometricPatterns from "../components/GeometricPatterns";
import { FaCaretDown } from "react-icons/fa";
import { City_interface } from "../interfaces/city_interface";

const Bookings = () => {
  const { cities } = useAppSelector((state: any) => state.allCity);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //   const [from, setFrom] = useState<string>("");
  //   const [to, setTo] = useState<string>("");
  //   const { busStops } = useAppSelector((state: any) => state.allBusStop);

  //PASSING DATA USING STATE
  const location = useLocation();
  const { startCity, destinationCity, destinationBusStop, startBusStop } =
    location.state || {};
  const [fromCity, setFromCity] = useState(
    startCity || "Set your current city"
  );
  const [toCity, setToCity] = useState(
    destinationCity || "Set your destination"
  );
  const [start, setstart] = useState(startBusStop || "Select start bus stop");
  const [destination, setdestination] = useState(
    destinationBusStop || "Select destination bus stop"
  );

  //FOR DROPDOWNS OPEN AND CLOSE
  const [startCityIsOpen, setStartCityIsOpen] = useState(false);
  const [startBusStopIsOpen, setStartBusStopIsOpen] = useState(false);
  const [destinationCityIsOpen, setDestinationCityIsOpen] = useState(false);
  const [destinationBusStopIsOpen, setDestinationBusStopIsOpen] =
    useState(false);
  const [startBusStopList, setStartBusStopList] = useState<string[]>([]);
  const [desinationBusStopList, setDestinationBusStopList] = useState<string[]>(
    []
  );

  const handleStartBusStop = (option: any) => {
    setstart(option);
    setStartBusStopIsOpen(false);
    setStartBusStopList(option);
  };
  const handleDestinationBusStop = (option: any) => {
    setdestination(option);
    setDestinationBusStopIsOpen(false);
  };

  const handleStartCityOptionClick = (city: any, busstops: any) => {
    setFromCity(city);
    // setFrom(city);
    setStartCityIsOpen(false);
    setStartBusStopList(busstops);
  };

  const handleDestinationCityOptionClick = (city: any, busstops: any) => {
    setToCity(city);
    // setTo(city);
    setDestinationCityIsOpen(false);
    setDestinationBusStopList(busstops);
  };

  //RESPONSIVENESS
  //WHERE TO||LEFT COLUMN
  const [whereToToggle, setwhereToToggle] = useState(false);
  const whereToToggleClick = () => {
    setwhereToToggle(!whereToToggle);
  };

  //
  const {
    loading: availableTripLoading,
    error: availableTripError,
    trips: availableTripData,
  } = useAppSelector((state: any) => state.availableTrip);
  // const { trips: allAvailableTripData } = useAppSelector(
  // 	(state: any) => state.allAvailableTrip
  // );
  //
  const FindAvailableTrip = () => {
    whereToToggleClick();
    if (start && destination) {
      dispatch(getAvailableTripAction({ from: start, to: destination }));
    } else {
      dispatch(getAllAvailableTripAction());
    }
  };

  //VALIDATE BUTTON BEFORE CLICK
  const isValid =
    fromCity !== "Set your current city" &&
    toCity !== "Set your destination" &&
    destination !== "Select destination bus stop" &&
    start !== "Select start bus stop";
  useEffect(() => {
    if (!availableTripData) {
      dispatch(getAllAvailableTripAction());
    }
  }, [availableTripData, dispatch]);

  return (
    <Layout title="Fraser - Book a ride">
      <div className="relative bg-black h-24 -z-10 lg:h-32">
        <GeometricPatterns />
      </div>
      <div className="lg:flex flex-col overflow-y-scroll scroll-behavior-smooth ease-in-out duration-300 items-center justify-center">
        {/* COLUMN */}

        <div className=" lg:w-4/12 -mt-16 rounded-md lg:mt-0 fixed lg:mx-16 lg:my-32 w-full lg:fixed lg:top-0 lg:left-0">
          <div className="mx-4 mb-2 lg:mb-0 lg:mx-0">
            <div
              className={
                whereToToggle === true
                  ? "lg:hidden py-6 px-6 lg:px-12 lg:mr-12 bg-white rounded-t-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
                  : "lg:hidden py-6 px-6 lg:px-12 lg:mr-12 bg-white rounded-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
              }
            >
              {" "}
              <h3 className="text-lg w-1/2 font-semibold">Where to?</h3>{" "}
              {!whereToToggle ? (
                <BsChevronDown
                  onClick={whereToToggleClick}
                  className="cursor-pointer stroke-2 lg:hidden"
                />
              ) : (
                <BsChevronUp
                  onClick={whereToToggleClick}
                  className="cursor-pointer stroke-2 lg:hidden"
                />
              )}
            </div>
          </div>
          <div className="lg:flex w-full flex-col h-full">
            {/* LEFT COLUMN */}
            <div className="w-full">
              <div
                className="lg:w-4/12 lg:mx-16 lg:my-32 mx-4 lg:fixed lg:top-0 lg:left-0 "
                //
              >
                <div
                  className={
                    whereToToggle === true
                      ? "pb-12 pt-8 px-6 lg:px-12 lg:mr-12 bg-white ease-in-out lg:pt-16 duration-300 rounded-b-md lg:rounded-md border-b border-[#EFF3EF]"
                      : "hidden lg:block pb-12 pt-8 px-12 lg:mr-12  ease-in-out lg:pt-16 duration-300 bg-white lg:rounded-md rounded-b-md border-b border-[#EFF3EF]"
                  }
                >
                  {/* CITY SELECTION */}
                  <div className="relative w-full ease-in-out duration-300 inline text-left z-50">
                    <label className="text-sm ml-2 text-gray-600">
                      Pickup City
                    </label>
                    <button
                      type="button"
                      className="mt-1 mb-2 rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      onClick={() => {
                        setStartCityIsOpen(!startCityIsOpen);
                      }}
                    >
                      {fromCity}
                      <FaCaretDown className="ml-auto" />
                    </button>

                    {startCityIsOpen && (
                      <div className="w-full z-10 absolute mt-2 rounded-md shadow-lg bg-white shadow-xs py-4">
                        {cities?.map((city: City_interface) => {
                          return (
                            <a
                              href="#"
                              className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              onClick={() => {
                                handleStartCityOptionClick(
                                  city?.city,
                                  city?.bus_stops
                                );
                              }}
                            >
                              {city?.city}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* AFTER START CITY SELECTION */}
                  <div
                    className={`ease-in-out duration-300 relative w-full inline text-left z-40 `}
                  >
                    <label className="ml-2 text-sm text-gray-600">
                      Pickup Station
                    </label>

                    {/* START BUSSTOP */}
                    <button
                      type="button"
                      className="mt-1 mb-2 rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      onClick={() => setStartBusStopIsOpen(!startBusStopIsOpen)}
                      onChange={handleStartBusStop}
                    >
                      {start}
                      <FaCaretDown className="ml-auto" />
                    </button>

                    {startBusStopIsOpen && (
                      <div className="w-full absolute mt-2 rounded-md shadow-lg bg-white shadow-xs py-4">
                        {!startBusStopList ? (
                          <div className="px-6 py-2 animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-6 py-1">
                              <div className="h-2 bg-slate-200 rounded"></div>
                              <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          startBusStopList?.map((stops: any) => {
                            return (
                              <a
                                key={stops}
                                href="#"
                                className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                onClick={() => {
                                  handleStartBusStop(stops);
                                }}
                              >
                                {stops}
                              </a>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>

                  {/* DESTINATION */}

                  <div className="relative w-full ease-in-out duration-300 inline text-left z-30">
                    <label className="text-sm ml-2 text-gray-600">
                      Destination City
                    </label>
                    <button
                      type="button"
                      className="mt-1 rounded-md mb-2 shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      onClick={() => {
                        setDestinationCityIsOpen(!destinationCityIsOpen);
                      }}
                    >
                      {toCity}
                      <FaCaretDown className="ml-auto" />
                    </button>
                    {destinationCityIsOpen && (
                      <div className="w-full z-10 absolute mt-2 rounded-md shadow-lg bg-white shadow-xs py-4">
                        {cities?.map((city: City_interface) => {
                          return (
                            <a
                              href="#"
                              className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              onClick={() => {
                                handleDestinationCityOptionClick(
                                  city?.city,
                                  city?.bus_stops
                                );
                              }}
                            >
                              {city?.city}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* AFTER DESTINATION CITY SELECTION */}
                  <div
                    className={`ease-in-out duration-300 relative w-full inline text-left z-20 ${
                      destinationCity === "Set your destination"
                        ? "hidden "
                        : ""
                    }`}
                  >
                    <label className="ml-2 text-sm text-gray-600">
                      Destination Bus Stop
                    </label>

                    {/* START BUSSTOP */}
                    <button
                      type="button"
                      className="mt-1 rounded-md shadow-sm inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      onClick={() =>
                        setDestinationBusStopIsOpen(!destinationBusStopIsOpen)
                      }
                      onChange={handleDestinationBusStop}
                    >
                      {destination}
                      <FaCaretDown className="ml-auto" />
                    </button>

                    {destinationBusStopIsOpen && (
                      <div className="w-full absolute mt-2 rounded-md shadow-lg bg-white shadow-xs py-4">
                        {!desinationBusStopList ? (
                          <div className="px-6 py-2 animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-6 py-1">
                              <div className="h-2 bg-slate-200 rounded"></div>
                              <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          desinationBusStopList?.map((stops: any) => {
                            return (
                              <a
                                key={stops}
                                href="#"
                                className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                onClick={() => {
                                  handleDestinationBusStop(stops);
                                }}
                              >
                                {stops}
                              </a>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
				  <div>
                <Button
                  title="Search Trips"
                  loader={availableTripLoading}
                  className={
                    isValid
                      ? "w-full h-[52px] bg-[#00ff6a] hover:bg-[#58FF9E] mt-10 text-sm font-medium rounded-lg"
                      : "w-full h-[52px] bg-[#f5f5f5] text-gray-500 mt-10 text-sm font-medium rounded-lg"
                  }
                  onClick={FindAvailableTrip}
                />
              </div>
                </div>
				
              </div>
              
            </div>

            {/* RIGHT COLUMN */}
            <div className="fixed w-full lg:w-7/12 mt-4 h-5/6 lg:mt-40 rounded-md lg:mx-16 lg:my-32 overflow-y-scroll scroll-behavior-smooth lg:fixed lg:top-0 lg:right-0">
              <div className="fixed w-full ">
                <div className="mx-4 -mt-1 lg:w-7/12 rounded-t-md lg:mx-16 lg:my-32 h-16 bg-[#ffffff] border-b z-10 justify-center items-center lg:fixed lg:top-0 lg:right-0">
                  <h1 className="text-lg mx-6 lg:ml-12 pt-4 lg:mt-2 font-semibold">
                    Available Trips
                  </h1>
                </div>
              </div>
              <div className="mx-4 lg:mx-0 ">
                {/* HEADER */}

                <div className=" rounded-md mt-14 lg:mt-0 lg:mb-16 lg:pb-12 lg:pt-16 w-full px-8 lg:px-12 py-4 lg:py-0 bg-white h-max overflow-y-scroll scroll-behavior-smooth">
                  {availableTripLoading ? (
                    <div className="px-6 py-2 mb-8 animate-pulse flex space-x-4">
                      <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                          </div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ) : availableTripError ? (
                    <Alert
                      message="An error occured"
                      description={availableTripError}
                      type="error"
                      showIcon
                    />
                  ) : availableTripData?.length === 0 ? (
                    <Alert
                      type="info"
                      message="Sorry there are no available trips to the destination selected"
                    />
                  ) : (
                    availableTripData?.map((trip: any) => {
                      if (
                        trip?.travel_destination?.from?.name.includes(start)
                      ) {
                        return (
                          <BookingCard
                            key={trip?._id}
                            from={`${trip?.travel_destination?.from?.name}`}
                            // ${trip?.travel_destination?.from?.state} - removed state from from
                            to={`${trip?.travel_destination?.to?.name} `}
                            // ${trip?.travel_destination?.to?.state} - removed state from to
                            takeOffTime={trip?.take_off_time}
                            takeOffDate={trip?.take_off_date}
                            price={trip?.price}
                            arrivalTime={trip?.arrival_time}
                            arrivalDate={trip?.arrival_date}
                            onClick={() => {
                              dispatch(addToMyBookinAction(trip));
                              navigate("/checkout");
                            }}
                          />
                        );
                      }
                    })
                  )}

                  {/* {availableTripData?.length === 0 && (
                  <Alert
                    type="info"
                    message="Sorry there are no available trips to the destination selected"
                  />
                )}
                {availableTripError && (
                  <Alert
                    message="An error occured"
                    description={availableTripError}
                    type="error"
                    showIcon
                  />
                )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
