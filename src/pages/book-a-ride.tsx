/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layouts/SignInLayout";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import { Alert, Input, message, Modal, Spin } from "antd";
import { motion } from "framer-motion";
import {
  registerUserAction,
  userLoginAction,
} from "../state/action/user.action";
import {
  getAllAvailableTripAction,
  getAvailableTripAction,
} from "../state/action/trip.action";
import { Spinner } from "react-bootstrap";
import { CircularProgress } from "@mui/material";

const BookRide = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [flip, setFlip] = useState<boolean>(false);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [lag, setLag] = useState<string>("lagos");
  const [referred_by, setReferred_by] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
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

  const [startBusStop, setStartBusStop] = useState("Select start bus stop");
  const handleStartBusStop = (option: any) => {
    setStartBusStop(option);
    setStartBusStopIsOpen(false);
  };

  const [destinationBusStop, setDestinationBusStop] = useState(
    "Select destination bus stop"
  );
  const handleDestinationBusStop = (option: any) => {
    setDestinationBusStop(option);
    setDestinationIsOpen(false);
  };

  const { userInfo, error: loginError } = useAppSelector(
    (state: any) => state.userLogin
  );
  const { error: registerUserError, loading: registerUserLoading } =
    useAppSelector((state: any) => state.registerUser);
  const { busStops } = useAppSelector((state: any) => state.allBusStop);

  // console.log("the start is ", from);
  // console.log("the end is ", to);

  const handleAvailableTrips = () => {
    // console.log(selectedCity, destinationBusStop, startBusStop);
    // console.log(typeof from, from, typeof to, to);

    // AMEN - TYPE CONFLICT, NO IDEA WHY
    if (from && to) {
      dispatch(getAvailableTripAction({ from: from, to: to }));
    } else {
      dispatch(getAllAvailableTripAction());
    }
    navigate("/bookings", {
      state: {
        selectedCity,
        destinationBusStop,
        startBusStop,
      },
    });
  };

  const isValid =
    selectedCity !== "Set your current city" &&
    destinationBusStop !== "Select destination bus stop" &&
    startBusStop !== "Select start bus stop";

  const CreateUser = () => {
    return dispatch(
      registerUserAction({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: "+234" + phone,
        referred_by,
      })
    );
  };

  const LoginUser = () => {
    setLoading(true);
    dispatch(userLoginAction("+234" + phone)).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!userInfo?._id) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo && loginError) {
      messageApi.open({
        type: "error",
        content: loginError,
      });
      setFlip(true);
    }
  }, [loginError, messageApi, userInfo]);

  return (
    <Layout childClass="">
      {contextHolder}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Book a Ride</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className=" mt-10 mb-10 sm:w-3/5">
          <div className="w-full px-8 py-12 bg-white rounded-md">
            <div className="border-b border-[#EFF3EF] pb-10">
              <h1 className="text-xl font-semibold leading-64px tracking-tight">
                Book a Ride
              </h1>
              <p className="text-sm text-gray-600 pt-2 pb-8 w-3/4">
                {" "}
                Easily book a ride to your desired destination. Simply select
                your city, enter your starting and ending locations and Voila!.{" "}
              </p>

              {/* <label className="ml-4 mt-8 mb-2 text-sm text-gray-600">Set Current City</label> */}
              {/* CURRENT CITY */}
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
                className={`flex flex-col h-auto max-h-40 ${
                  selectedCity === "Set your current city" ? "hidden " : ""
                }`}
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
                              {busStops == null ? (
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
                                busStops?.map((option: any) => {
                                  if (selectedCity === "Lagos") {
                                    if (option?.state !== "Ibadan") {
                                      return (
                                        <a
                                          key={option?.name}
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleStartBusStop(option.name);
                                            setFrom(option?._id);
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
                                          key={option}
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleStartBusStop(option.name);
                                            setFrom(option?._id);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  }
                                })
                              )}
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
                              {busStops == null ? (
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
                                busStops?.map((option: any) => {
                                  if (selectedCity === "Lagos") {
                                    if (option?.state === "Ibadan") {
                                      return (
                                        <a
                                          key={option?.state}
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleDestinationBusStop(
                                              option.name
                                            );
                                            setTo(option?._id);
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
                                          key={option?._id}
                                          href="#"
                                          className="w-full inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                          onClick={() => {
                                            handleDestinationBusStop(
                                              option.name
                                            );
                                            setTo(option?._id);
                                          }}
                                        >
                                          {option.name}
                                        </a>
                                      );
                                    }
                                  }
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              </motion.div>
            </div>

            {/* BUTTON */}
            <motion.div
              // variants={zoomOutAnimation}
              initial="initial"
              whileHover="hover"
            >
              <Button
                title="See available trips"
                className={
                  isValid
                    ? "w-full h-[52px] bg-[#00ff6a] mt-10 text-sm p-3 font-medium rounded-lg"
                    : "w-full h-[52px] bg-[#f5f5f5] text-gray-500 mt-10 text-sm p-3 font-medium rounded-lg"
                }
                onClick={() => {
                  if (isValid) {
                    handleAvailableTrips();
                  }
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* MODAL BACKDROP */}

        <div>
          <div
            ref={overlayRef}
            className={`fixed top-0 left-0 w-full h-full bg-black opacity-90 z-50 ${
              isModalOpen ? "" : "hidden"
            }`}
          ></div>

          {/* MODAL */}
          <Modal
            title={
              <div>
                <h1 className="text-xl pt-2">
                  {flip ? "Let's get you started" : "Welcome Back"}
                </h1>
                <p className="text-gray-500 text-sm font-light pt-1">
                  {flip
                    ? "You're almost there, create an account in just one simple step. "
                    : "Please enter your phone number to continue"}
                </p>

                <div>
                  {loginError ? (
                    <Alert
                      message={loginError}
                      type="warning"
                      showIcon
                      className="bg-blue-50 w-[100%] text-[0.8rem] font-normal border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            }
            open={isModalOpen}
            centered={true}
            footer={false}
            closable={false}
          >
            {flip ? (
              <div>
                {registerUserError ? (
                  <Alert
                    message={registerUserError}
                    description={registerUserError}
                    type="warning"
                    showIcon
                  />
                ) : (
                  <></>
                )}
                <div className="mb-6 mt-8">
                  <div className="mb-1">
                    <label className="text-gray-500">First Name</label>
                  </div>
                  <Input
                    className="hover:border-green-500 active:border-green-600 h-12 w-full"
                    placeholder="Please enter your first name"
                    value={firstName}
                    required={true}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <div className="mb-1">
                    <label className="text-gray-500">Last Name</label>
                  </div>
                  <Input
                    className="hover:border-green-500 active:border-green-600 h-12 w-full"
                    placeholder="Last name"
                    value={lastName}
                    required={true}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <div className="mb-1">
                    <label className="text-gray-500">Email Address</label>
                  </div>
                  <Input
                    className="hover:border-green-500 active:border-green-600 h-12 w-full"
                    placeholder="Email"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <div className="mb-1">
                    <label className="text-gray-500">Phone Number</label>
                  </div>
                  <Input
                    className="hover:border-green-500 active:border-green-600 h-12 w-full"
                    placeholder="901 1234 123"
                    type="number"
                    value={phone}
                    prefix={"+234"}
                    required={true}
                    onChange={(e) => {
                      setPhone(
                        e.target.value.startsWith("0")
                          ? e.target.value.slice(1)
                          : e.target.value
                      );
                    }}
                  />
                </div>

                {/* <div className="mb-6">
                  <div className="mb-1">
				  <label
				  className="text-gray-500"
				  >Referral code(if any)</label>
				  </div>
                  <Input
                    className="hover:border-green-500 active:border-green-600 h-12 w-full"
                    placeholder="Referral code"
                    type="text"
                    value={referred_by}
                    onChange={(e) => {
                      setReferred_by(e.target.value);
                    }}
                  />
                </div>
				 */}

                <div>
                  <motion.button
                    initial="initial"
                    whileTap="tap"
                    whileHover="hover"
                    className="w-full p-3 mt-6 font-medium bg-[#00ff6a] hover:bg-[#58FF9E] rounded-lg"
                    onClick={CreateUser}
                  >
                    Continue
                    <span className="ml-[2px]">
                      {registerUserLoading && (
                        <Spinner
                          animation="border"
                          className=" text-white"
                          role="status"
                          variant="light"
                        />
                      )}
                    </span>
                  </motion.button>

                  <motion.button
                    initial="initial"
                    whileTap="tap"
                    whileHover="hover"
                    className="flex items-center justify-center w-full py-2 mt-4 text-gray-600 font-normal hover:text-[#22B11E] rounded-full"
                    onClick={() => setFlip(!flip)}
                  >
                    I have an account
                  </motion.button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mt-3 mb-3 pt-8">
                  <Input
                    className="hover:border-green-500 active:border-green-600 h-12 w-full"
                    placeholder="903 123 1234"
                    value={phone}
                    prefix={"+234"}
                    type="number"
                    required={true}
                    onChange={(e) => {
                      setPhone(
                        e.target.value.startsWith("0")
                          ? e.target.value.slice(1)
                          : e.target.value
                      );
                    }}
                  />
                </div>

                {/* USER LOGIN */}
                <div>
                  <button
                    className="w-full p-3 mt-6 font-medium bg-[#00ff6a] hover:bg-[#58FF9E] rounded-lg"
                    onClick={LoginUser}
                  >
                    Continue
                    <span className="ml-[2px]">
                      {loading && (
                        <Spinner
                          animation="border"
                          className="ml-3 text-green-600"
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      )}
                    </span>
                  </button>

                  <button
                    className="flex items-center justify-center w-full py-2 mt-4 text-gray-600 font-normal hover:text-[#22B11E] rounded-full"
                    onClick={() => setFlip(!flip)}
                  >
                    I don't have an account
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default BookRide;
