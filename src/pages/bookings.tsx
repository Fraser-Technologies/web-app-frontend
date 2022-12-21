import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import BookingCard from "../components/bookingCard";
import Layout from "../components/layouts/SignInLayout";
import { getAllBusStop } from "../state/action/bus.action";
import {
  getAllAvailableTripAction,
  getAvailableTripAction,
} from "../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { justHoverAnimation, zoomOutAnimation } from "../utils/animation";
import { motion } from "framer-motion";
import { Alert, Spin } from "antd";
import { addToMyBookinAction } from "../state/action/booking.action";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Bookings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [show, setShow] = React.useState<boolean>(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [lag, setLag] = useState<string>("lagos");
  const { busStops } = useAppSelector((state: any) => state.allBusStop);
  const [isOpen, setIsOpen] = useState(false);
  const [startOpen, setStartBusStopIsOpen] = useState(false);
  const [destinationOpen, setDestinationIsOpen] = useState(false);

  const handleCityClick = () => {
    setIsOpen(!isOpen);
  };
  const handleStartBusStopClick = () => {
    setStartBusStopIsOpen(!startOpen);
  };
  const handleDestinationClick = () => {
    setDestinationIsOpen(!destinationOpen);
  };

  const [selectedCity, setSelectedCity] = useState("Set your current city");
  const handleOptionClick = (option: any) => {
    setSelectedCity(option);
    // setLag(option);
    setIsOpen(false);
  };
  const [startBusStop, setStartBusStop] = useState("Select pickup busstop");
  const handleStartBusStop = (option: any) => {
    setStartBusStop(option);
    setStartBusStopIsOpen(false);
  };

  const [destinationBusStop, setDestinationBusStop] = useState(
    "Select Destination busstop"
  );

  const handleDestinationBusStop = (option: any) => {
    setDestinationBusStop(option);
    setDestinationIsOpen(false);
  };

  const {
    loading: availableTripLoading,
    error: availableTripError,
    trips: availableTripData,
  } = useAppSelector((state: any) => state.availableTrip);
  // const { trips: allAvailableTripData } = useAppSelector(
  // 	(state: any) => state.allAvailableTrip
  // );

  const handleBookingToggle = () => {
    setShow(!show);
  };

  const FindAvailableTrip = () => {
    if (from && to) {
      dispatch(getAvailableTripAction({ from: from, to: to }));
    } else {
      dispatch(getAllAvailableTripAction());
    }
  };

  useEffect(() => {
    if (!availableTripData) {
      dispatch(getAllAvailableTripAction());
    }
  }, [availableTripData, dispatch]);

  useEffect(() => {
    if (busStops?.length === 0) {
      dispatch(getAllBusStop());
    }
  }, [busStops, dispatch]);

  return (
    <Layout user="Amen" childClass="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BookRide - Fraser</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center mt-10 lg:flex-row lg:items-start lg:mt-15 lg:space-x-3 ">
        <div className="flex items-center justify-between w-11/12 px-8 py-4 duration-300 ease-in-out bg-white lg:hidden">
          <h3 className="text-xl font-bold ">
            Booking <span> {availableTripLoading && <FaSpinner />}</span>
          </h3>
          {show === false ? (
            <BsChevronDown
              onClick={handleBookingToggle}
              className="cursor-pointer"
            />
          ) : (
            <BsChevronUp
              onClick={handleBookingToggle}
              className="cursor-pointer"
            />
          )}
        </div>
        {/* {where to} */}

        {/* ACCORDION */}
        <div
          className={`w-11/12 lg:w-[481px] ease-in-out duration-300 lg:block
							${show === false ? "hidden" : "block"}
						`}
        >
          <div className="w-full px-8 pt-2 -mt-3 bg-white rounded-md lg:mt-0 lg:py-12">
            <div className="border-b border-[#EFF3EF] pb-10">
              <div className="flex flex-col w-full mt-2 mb-2">
                <div className="relative inline text-left z-40">
                  <div>
                    <span className="rounded-md shadow-sm">
                      <button
                        type="button"
                        className="inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                        onClick={handleCityClick}
                        onChange={handleOptionClick}
                      >
                        {selectedCity}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5 ml-auto text"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                  {isOpen && (
                    <div className="w-full absolute mt-2 rounded-md shadow-lg">
                      <div className="w-full rounded-md bg-white shadow-xs">
                        <div className="w-full py-4">
                          <a
                            href="#"
                            className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => handleOptionClick("Lagos")}
                          >
                            Lagos
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => handleOptionClick("Ibadan")}
                          >
                            Ibadan
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* AFTER SELECTION */}
                <motion.div
                  // variants={zoomOutAnimation}
                  initial="initial"
                  className={`flex flex-col h-auto max-h-40 `}
                >
                  <>
                    <label className="ml-4 mt-8 mb-2 text-sm text-gray-600">
                      Pickup Station
                    </label>

                    {/* START BUSSTOP */}
                    <motion.div
                      className="relative inline text-left z-30"
                      // variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                    >
                      <div>
                        <span className="rounded-md shadow-sm">
                          <button
                            type="button"
                            className="inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                            onClick={handleStartBusStopClick}
                            onChange={handleStartBusStop}
                          >
                            {startBusStop}
                            <svg
                              className="-mr-1 ml-2 h-5 w-5 ml-auto text"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>
                      {startOpen && (
                        <>
                          <div className="w-full absolute mt-2 rounded-md shadow-lg">
                            <div className="w-full rounded-md bg-white shadow-xs">
                              <div className="w-full py-4">
                                {busStops?.map((option: any) => {
                                  if (selectedCity === "Lagos") {
                                    if (option?.state !== "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleStartBusStop(option.name);
                                            setFrom(option.target.name);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  } else if (selectedCity === "Ibadan") {
                                    if (option?.state === "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleStartBusStop(option.name);
                                            setFrom(option.target.name);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>

                    {/* DESTINATION BUSSTOP */}

                    <label className="ml-4 mt-4 mb-2 text-sm text-gray-600">
                      Destination
                    </label>

                    <div className="relative inline text-left z-20">
                      <div>
                        <span className="rounded-md shadow-sm">
                          <button
                            type="button"
                            className="inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                            onClick={handleDestinationClick}
                            onChange={handleDestinationBusStop}
                          >
                            {destinationBusStop}
                            <svg
                              className="-mr-1 ml-2 h-5 w-5 ml-auto text"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>
                      {destinationOpen && (
                        <>
                          <div className="w-full absolute mt-2 rounded-md shadow-lg">
                            <div className="w-full rounded-md bg-white shadow-xs">
                              <div className="w-full py-4">
                                {busStops?.map((option: any) => {
                                  if (selectedCity === "Lagos") {
                                    if (option?.state === "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleDestinationBusStop(
                                              option.name
                                            );
                                            setTo(option.target.name);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  } else if (selectedCity === "Ibadan") {
                                    if (option?.state !== "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleDestinationBusStop(
                                              option.name
                                            );
                                            setTo(option.target.name);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                </motion.div>
              </div>

              {/* <div className="flex flex-col h-auto max-h-40">
                  {lag === "lagos" ? (
                    <>
                      <label className="mt-5">Start bus stop</label>
                      <motion.select
                        variants={zoomOutAnimation}
                        initial="initial"
                        whileHover="hover"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        name="bus stop"
                        id="busStops"
                        className="w-full py-3 px-2 rounded-sm"
                      >
                        <option value={""}>From where</option>

                        {busStops?.map((bs: any) => {
                          if (bs?.state !== "Ibadan") {
                            return (
                              <option
                                value={bs?._id}
                                className="w-full  px-2 rounded-sm"
                              >
                                {bs.name},{bs?.state}
                              </option>
                            );
                          }
                        })}
                      </motion.select>
                      <label className="mt-5">Destination bus stop</label>
                      <motion.select
                        variants={zoomOutAnimation}
                        initial="initial"
                        whileHover="hover"
                        name="bus stop"
                        id="busStops"
                        className="w-full py-3 px-2 rounded-sm"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                      >
                        <option value={""}>Choose your destination</option>
                        {busStops?.map((bs: any) => {
                          if (bs?.state === "Ibadan") {
                            return (
                              <option value={bs?._id} className="py-2">
                                {bs.name},{bs?.state}
                              </option>
                            );
                          }
                        })}
                      </motion.select>
                    </>
                  ) : (
                    <>
                      <label className="mt-5">Start bus stop</label>
                      <motion.select
                        variants={zoomOutAnimation}
                        initial="initial"
                        whileHover="hover"
                        name="bus stop"
                        id="busStops"
                        className="w-full py-3 px-2 rounded-sm"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                      >
                        <option value={""}>From where </option>
                        {busStops?.map((bs: any) => {
                          if (bs?.state === "Ibadan") {
                            return (
                              <option value={bs._id} className="py-2">
                                {bs.name},{bs?.state}
                              </option>
                            );
                          }
                        })}
                      </motion.select>

                      <label className="mt-5">Destination bus stop</label>
                      <motion.select
                        variants={zoomOutAnimation}
                        initial="initial"
                        whileHover="hover"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        name="bus stop"
                        className="w-full py-3 px-2 rounded-sm "
                      >
                        <option value={""}> Choose your destination</option>

                        {busStops?.map((bs: any) => {
                          if (bs?.state !== "Ibadan") {
                            return (
                              <option value={bs?._id} className="py-2">
                                {bs.name},{bs?.state}
                              </option>
                            );
                          }
                        })}
                      </motion.select>
                    </>
                  )}

                  <motion.button
                    initial={"initial"}
                    whileHover={"hover"}
                    whileTap={"tap"}
                    onClick={FindAvailableTrip}
                    className="w-full h-10 py-2 mt-10 text-white bg-green-500 hover:cursor-pointer hover:shadow-md"
                  >
                    See available trips
                  </motion.button>
                </div> */}
            </div>
          </div>
        </div>

        {/* {trip details} */}

        <div className="w-11/12 lg:w-[680px] my-5 lg:mt-0">
          <div className="w-full px-0 lg:bg-white lg:py-12 lg:px-8 h-full">
            <div className="flex flex-row w-full px-4 py-5 ">
              <motion.h5
                initial={"initial"}
                className="flex justify-center w-full p-1 px-3 font-bold bg-green-500 aligns-center hover:cursor-pointer"
              >
                Available Trips
              </motion.h5>

              <span className="ml-4">
                {availableTripLoading && (
                  <>
                    <Spin size="small" />
                  </>
                )}
              </span>
            </div>
            {availableTripData?.length === 0 && (
              <Alert
                type="info"
                message="Sorry there are no avialable trip going to this destination "
              />
            )}
            {availableTripError && (
              <Alert
                message="An error occoured"
                description={availableTripError}
                type="error"
                showIcon
              />
            )}

            {availableTripData?.map((trip: any) => {
              return (
                <BookingCard
                  key={trip?._id}
                  from={`${trip?.travel_destination?.from?.name} 
										${trip?.travel_destination?.from?.state}`}
                  to={`${trip?.travel_destination?.to?.name}, ${trip?.travel_destination?.to?.state}`}
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
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
