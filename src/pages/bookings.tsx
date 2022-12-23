import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import BookingCard from "../components/bookingCard";
import Layout from "../components/layouts/SignInLayout";
import { getAllBusStop } from "../state/action/bus.action";
import { Button } from "../components/Button";
import {
  getAllAvailableTripAction,
  getAvailableTripAction,
} from "../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Alert } from "antd";
import { addToMyBookinAction } from "../state/action/booking.action";

const Bookings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const { busStops } = useAppSelector((state: any) => state.allBusStop);

  //PASSING DATA USING STATE
  const location = useLocation();
  const { selectedCity, destinationBusStop, startBusStop } =
    location.state || {};
  const [city, setcity] = useState(selectedCity || "Set your current city");
  const [start, setstart] = useState(startBusStop || "Select start bus stop");
  const [destination, setdestination] = useState(
    destinationBusStop || "Select destination bus stop"
  );

  //FOR DROPDOWNS OPEN AND CLOSE
  const [isOpen, setIsOpen] = useState(false);
  const [startOpen, setstartIsOpen] = useState(false);
  const [destinationOpen, setDestinationIsOpen] = useState(false);

  const handleCityClick = () => {
    setIsOpen(!isOpen);
  };
  const handlestartClick = () => {
    setstartIsOpen(!startOpen);
  };
  const handleDestinationClick = () => {
    setDestinationIsOpen(!destinationOpen);
  };

  //SET CITY, START AND DESTINATION VALUES
  const handleOptionClick = (option: any) => {
    setcity(option);
    // setLag(option);
    setIsOpen(false);
  };

  const handlestart = (option: any) => {
    setstart(option);
    setstartIsOpen(false);
  };

  const handledestination = (option: any) => {
    setdestination(option);
    setDestinationIsOpen(false);
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

  const FindAvailableTrip = () => {
    // if (isValid) {
    // 	FindAvailableTrip();
    // 	if (availableTripData?.length !== 0) {
    // 		whereToToggleClick();
    // 	} else {
    // 		return;
    // 	}
    // }
    if (from && to) {
      dispatch(getAvailableTripAction({ from: from, to: to }));
    } else {
      dispatch(getAllAvailableTripAction());
    }
  };

  console.log("the from part is ", from);
  console.log(" the to part is ", to);

  //VALIDATE BUTTON BEFORE CLICK
  const isValid =
    city !== "Set your current city" &&
    destination !== "Select Destination busstop" &&
    start !== "Select pickup busstop";

  //
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
    <Layout childClass="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fraser - Book a ride</title>
      </Helmet>

      <div className="lg:flex w-full flex-col h-full overflow-y-scroll scroll-behavior-smooth items-center justify-center">
        {/* h-full w-full overflow-y-scroll scroll-behavior-smooth items-center justify-center */}
        {/* LEFT COLUMN */}
        <div
          className="lg:w-4/12 fixed lg:mx-16 lg:my-32 w-full lg:fixed lg:top-0 lg:left-0"
          //top-24 left-6
          // style={{ position: "fixed", top: "0", left: "0" }}
        >
          <div
            className={
              whereToToggle === true
                ? "py-6 px-6 lg:px-12  lg:mr-12 bg-white rounded-t-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
                : "py-6 px-6 lg:px-12  lg:mr-12 bg-white rounded-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
            }
          >
            {" "}
            <h3 className="text-lg font-semibold">Where to?</h3>{" "}
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
          <div className="lg:flex w-full flex-col h-full">
            {/* h-full w-full overflow-y-scroll scroll-behavior-smooth items-center justify-center */}
            {/* LEFT COLUMN */}
            <div
              className="lg:w-4/12 lg:mx-16 lg:my-32 w-full lg:fixed lg:top-0 lg:left-0 "
              //
            >
              <div
                className={
                  whereToToggle === true
                    ? "pb-12 pt-8 px-12    lg:mr-12 bg-white rounded-b-md border-b border-[#EFF3EF]"
                    : "hidden lg:block   pb-12 pt-8 px-12 lg:mr-12 bg-white rounded-b-md border-b border-[#EFF3EF]"
                }
              >
                {/* CITY SELECTION */}
                <div className="relative inline text-left z-40">
                  <div>
                    <span className="rounded-md shadow-sm">
                      <button
                        type="button"
                        className="inline-flex justify-left w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                        onClick={handleCityClick}
                        onChange={handleOptionClick}
                      >
                        {city}
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
                            onClick={handlestartClick}
                            onChange={handlestart}
                          >
                            {start}
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
                                  // availableTripLoading ? {}
                                  if (city === "Lagos") {
                                    if (option?.state !== "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handlestart(option.name);
                                            setFrom(option?._id);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  } else if (city === "Ibadan") {
                                    if (option?.state === "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handlestart(option.name);
                                            setFrom(option?._id);
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
                            onChange={handledestination}
                          >
                            {destination}
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
                                  if (city === "Lagos") {
                                    if (option?.state === "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handledestination(option.name);
                                            setTo(option?._id);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  } else if (city === "Ibadan") {
                                    if (option?.state !== "Ibadan") {
                                      return (
                                        <a
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handledestination(option.name);
                                            setTo(option?._id);
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

                <div>
                  <Button
                    title="Search Trips"
                    loader={availableTripLoading}
                    className={
                      isValid
                        ? "w-full h-[52px] bg-[#00ff6a] mt-10 text-sm font-medium rounded-lg"
                        : "w-full h-[52px] bg-[#f5f5f5] text-gray-500 mt-10 text-sm font-medium rounded-lg"
                    }
                    onClick={FindAvailableTrip}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div
              className={
                "fixed w-full mt-4 h-5/6 lg:w-7/12 lg:mt-40 rounded-t-md lg:mx-16 lg:my-32 overflow-y-scroll scroll-behavior-smooth lg:fixed lg:top-0 lg:right-0"
              }
            >
              <div className="fixed -mt-1 w-full lg:w-7/12 rounded-t-md lg:mx-16 lg:my-32 h-16 bg-[#ffffff] border-b z-10 justify-center items-center lg:fixed lg:top-0 lg:right-0">
                <h1 className="text-lg mx-6 lg:ml-12 pt-4 lg:mt-2 font-semibold">
                  Available Trips
                </h1>
              </div>

              <div className="mt-14 lg:mt-0 lg:mb-16 lg:pb-12 lg:pt-16 w-full px-6 lg:px-12 py-6 lg:py-0 bg-white h-max overflow-y-scroll scroll-behavior-smooth">
                {availableTripData?.length === 0 && (
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
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
