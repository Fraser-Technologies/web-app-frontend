/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { useRef } from "react";
import Layout from "../../components/layouts/SignInLayout";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import { Alert, Input, message, Modal } from "antd";
import {
  registerUserAction,
  userLoginAction,
} from "../../state/action/user.action";
import {
  getAllAvailableTripAction,
  getAvailableTripAction,
} from "../../state/action/trip.action";
import GeometricPatterns from "../../components/GeometricPatterns";
import { FaCaretDown } from "react-icons/fa";
import { City_interface } from "../../interfaces/city_interface";
import { getAllCityAction } from "../../state/action/city.action";
import { RootState } from "../../state/redux-store";
import { _paths_ } from "../../utils/routes";
import LoadingWheel from "../../components/loading-svg";
import { FraserButton } from "../../components/Button";
import { FraserDropDown } from "../../components/drop-drown";

const BookRide = () => {
  enum TripValidOption {
    startCityOption = "Set your current city",
    destinationCityOption = "Set your destination",
    destinationBusStopOption = "Select destination bus stop",
    startBusStopOption = "Select start bus stop",
  }

  const {
    userInfo,
    error: loginError,
    loading: userLoginLoading,
  } = useAppSelector((state: RootState) => state.userLogin);
  const { error: registerUserError, loading: userRegisterLoading } =
    useAppSelector((state: RootState) => state.registerUser);
  const { cities } = useAppSelector((state: any) => state.allCity);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [flip, setFlip] = useState("signin");
  const overlayRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [referred_by, setReferred_by] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [startCityIsOpen, setStartCityIsOpen] = useState(false);
  const [startBusStopIsOpen, setStartBusStopIsOpen] = useState(false);
  const [destinationCityIsOpen, setDestinationCityIsOpen] = useState(false);
  const [destinationBusStopIsOpen, setDestinationBusStopIsOpen] =
    useState(false);
  const [startBusStopList, setStartBusStopList] = useState<string[]>([]);
  const [desinationBusStopList, setDestinationBusStopList] = useState<string[]>(
    []
  );

  const [startCity, setStartCity] = useState<string>(
    TripValidOption.startCityOption || ""
  );
  const [destinationCity, setDestinationCity] = useState<string>(
    TripValidOption.destinationCityOption || ""
  );

  const [startBusStop, setStartBusStop] = useState<string>(
    TripValidOption.startBusStopOption || ""
  );
  const handleStartBusStop = (option: any) => {
    setStartBusStop(option);
    setStartBusStopIsOpen(false);
  };
  const handleDestinationBusStop = (option: any) => {
    setDestinationBusStop(option);
    setDestinationBusStopIsOpen(false);
  };

  const [destinationBusStop, setDestinationBusStop] = useState<string>(
    TripValidOption.destinationBusStopOption || ""
  );

  const handleAvailableTrips = () => {
    if (from && to) {
      dispatch(getAvailableTripAction({ from: from, to: to }));
    } else {
      dispatch(getAllAvailableTripAction());
    }
    navigate("/bookings", {
      state: {
        startCity,
        destinationCity,
        destinationBusStop,
        startBusStop,
      },
    });
  };

  const TripValid =
    startCity !== TripValidOption.startCityOption &&
    destinationBusStop !== TripValidOption.destinationBusStopOption &&
    startBusStop !== TripValidOption.startBusStopOption;

  const loginValid = phone !== "" && phone.length === 10;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const signUpValid =
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    phone !== "" &&
    phone.length === 10 &&
    email.match(emailRegex);

  const CreateUser = () => {
    return dispatch(
      registerUserAction({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: "+234" + phone,
        referred_by: referred_by,
      })
    );
  };

  const LoginUser = () => {
    return dispatch(userLoginAction("+234" + phone));
  };

  useEffect(() => {
    if (!userInfo?._id) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (!userInfo && loginError) {
      messageApi.open({
        type: "error",
        content: loginError,
      });
      setFlip("signin");
    }
  }, [loginError, messageApi, userInfo]);

  useEffect(() => {
    if (userInfo?._id) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(getAllCityAction());
  }, [dispatch]);

  return (
    <Layout
      title="Book Intercity Bus Rides in Nigeria | RideFraser"
      pageDescription="Book affordable and comfortable intercity bus rides in Nigeria with Fraser on ridefraser. Choose from multiple routes and travel dates. Book your ride now!"
      pageKeywords="intercity bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser, Fraser"
    >
      {contextHolder}
      <div className="relative h-24 bg-black -z-10 lg:h-32">
        <GeometricPatterns />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full -mt-16 overflow-hidden lg:mt:0">
        <div className="mx-6 my-8 sm:w-3/5">
          <div className="w-full px-8 py-12 bg-white rounded-md">
            <div className="">
              <h1 className="text-xl font-semibold tracking-tight leading-64px">
                Book a Ride
              </h1>
              <p className="w-11/12 pt-2 pb-8 text-sm text-gray-600">
                Easily book a ride to your desired destination. Simply select
                your city, enter your starting and ending locations and Voila!.
              </p>

              {/* START */}
              <div className="mb-4">
                <div className="relative z-50 inline w-full text-left duration-300 ease-in-out">
                  <label className="ml-2 text-sm text-gray-600">
                    Pickup City
                  </label>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 mt-1 mb-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                    onClick={() => {
                      setStartCityIsOpen(!startCityIsOpen);
                    }}
                  >
                    {startCity}
                    <FaCaretDown className="ml-auto" />
                  </button>
                  {startCityIsOpen && (
                    <div className="absolute z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                      {cities
                        ?.filter(
                          (city: City_interface) =>
                            city?.city !== destinationCity
                        )
                        .map((city: City_interface) => {
                          return (
                            <a
                              href="#"
                              className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              onClick={() => {
                                setStartCity(city?.city);
                                setStartBusStopList(city?.bus_stops);
                                setStartCityIsOpen(false);
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
                  className={`ease-in-out duration-300 relative w-full inline text-left z-40 ${
                    startCity === "Set your current city" ? "hidden " : ""
                  }`}
                >
                  <label className="ml-2 text-sm text-gray-600">
                    Pickup Station
                  </label>

                  {/* START BUSSTOP */}
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 mt-1 mb-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                    onClick={() => setStartBusStopIsOpen(!startBusStopIsOpen)}
                    // onClick={() => console.log(startBusStopList)}
                    onChange={handleStartBusStop}
                  >
                    {startBusStop}
                    <FaCaretDown className="ml-auto" />
                  </button>

                  {startBusStopIsOpen && (
                    <div className="absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                      {!startBusStopList ? (
                        <div className="flex px-6 py-2 space-x-4 animate-pulse">
                          <div className="flex-1 py-1 space-y-6">
                            <div className="h-2 rounded bg-slate-200"></div>
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 col-span-2 rounded bg-slate-200"></div>
                                <div className="h-2 col-span-1 rounded bg-slate-200"></div>
                              </div>
                              <div className="h-2 rounded bg-slate-200"></div>
                            </div>
                          </div>
                        </div>
                      ) : startBusStopList.length === 0 ? (
                        <div className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                          Sorry, we currently do not have a stop at this
                          location.
                        </div>
                      ) : (
                        startBusStopList?.map((stops: any) => {
                          return (
                            <a
                              key={stops}
                              href="#"
                              className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                              onClick={() => {
                                handleStartBusStop(stops);
                                setFrom(stops);
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
              </div>

              {/*  */}

              {/* DESTINATION */}

              <div className="relative z-30 inline w-full text-left duration-300 ease-in-out">
                <label className="ml-2 text-sm text-gray-600">
                  Destination City
                </label>

                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 mt-1 mb-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() => {
                    setDestinationCityIsOpen(!destinationCityIsOpen);
                  }}
                >
                  {destinationCity}
                  <FaCaretDown className="ml-auto" />
                </button>
                {destinationCityIsOpen && (
                  <div className="absolute z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                    {cities
                      ?.filter(
                        (city: City_interface) => city.city !== startCity
                      )
                      .map((city: City_interface) => {
                        return (
                          <a
                            href="#"
                            className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => {
                              setDestinationBusStopList(city?.bus_stops);
                              setDestinationCityIsOpen(!destinationCityIsOpen);
                              setDestinationCity(city?.city);
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
                  destinationCity === "Set your destination" ? "hidden " : ""
                }`}
              >
                <label className="ml-2 text-sm text-gray-600">
                  Destination Bus Stop
                </label>

                {/* START BUSSTOP */}

                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 mt-1 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() =>
                    setDestinationBusStopIsOpen(!destinationBusStopIsOpen)
                  }
                  onChange={handleDestinationBusStop}
                >
                  {destinationBusStop}
                  <FaCaretDown className="ml-auto" />
                </button>

                {destinationBusStopIsOpen && (
                  <div className="absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                    {!desinationBusStopList ? (
                      <div className="flex px-6 py-2 space-x-4 animate-pulse">
                        <div className="flex-1 py-1 space-y-6">
                          <div className="h-2 rounded bg-slate-200"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 col-span-2 rounded bg-slate-200"></div>
                              <div className="h-2 col-span-1 rounded bg-slate-200"></div>
                            </div>
                            <div className="h-2 rounded bg-slate-200"></div>
                          </div>
                        </div>
                      </div>
                    ) : desinationBusStopList.length === 0 ? (
                      <div className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                        Sorry, we currently do not have a stop at this location.
                      </div>
                    ) : (
                      desinationBusStopList?.map((stops: any) => {
                        return (
                          <a
                            key={stops}
                            href="#"
                            className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => {
                              handleDestinationBusStop(stops);
                              setTo(stops);
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
            </div>

            {/* BUTTON */}
            <div>
              <FraserButton
                title="See available trips"
                size="regular"
                className="w-full mt-8"
                active={TripValid}
                onClick={() => {
                  if (TripValid) {
                    handleAvailableTrips();
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* MODAL BACKDROP */}

        {/* MODAL */}
        {flip === "signin" && (
          <Modal
            title={
              <div>
                <h1 className="pt-2 text-xl">Welcome Back</h1>
                <p className="pt-1 text-sm font-light text-gray-500">
                  Please enter your phone number to continue
                </p>

                {loginError && (
                  <Alert
                    message={
                      loginError === "user doesn't exist please sign in"
                        ? "Can't find the account, maybe sign up?"
                        : loginError
                    }
                    type="warning"
                    showIcon
                    className="bg-blue-50 w-[100%] text-[0.8rem] font-normal border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
                  />
                )}
              </div>
            }
            open={isModalOpen}
            centered={true}
            footer={false}
            closable={false}
          >
            <div>
              <div className="pt-8 mt-3 mb-3">
                <Input
                  className="w-full h-12 hover:border-green-500 active:border-green-600"
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

              <FraserButton
                title={"Continue"}
                size={"regular"}
                active={loginValid}
                className={"w-full mt-4"}
                loader={userLoginLoading}
                onClick={() => loginValid && LoginUser()}
              />

              <FraserButton
                title={"I don't have an account"}
                buttonType={"tertiary"}
                size={"regular"}
                className={"w-full mt-2"}
                onClick={() => setFlip("signup")}
              />
            </div>
          </Modal>
        )}

        {flip === "signup" && (
          <Modal
            title={
              <div>
                <h1 className="pt-2 text-xl">Let's get you started</h1>
                <p className="pt-1 text-sm font-light text-gray-500">
                  You're almost there, create an account in just one simple
                  step.
                </p>

                <div>
                  {loginError && (
                    <Alert
                      message={
                        loginError === "user doesn't exist please sign in"
                          ? "User not found"
                          : loginError
                      }
                      type="warning"
                      showIcon
                      className="bg-blue-50 w-[100%] text-[0.8rem] font-normal border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
                    />
                  )}
                </div>
              </div>
            }
            open={isModalOpen}
            centered={true}
            footer={false}
            closable={false}
          >
            <div>
              {registerUserError && (
                <Alert
                  message={registerUserError}
                  description={registerUserError}
                  type="warning"
                  showIcon
                />
              )}
              <div className="mt-8 mb-6">
                <div className="mb-1">
                  <label className="text-gray-500">First Name</label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 active:border-green-600"
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
                  className="w-full h-12 hover:border-green-500 active:border-green-600"
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
                  className="w-full h-12 hover:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-gray-500">Referral Code</label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 active:border-green-600"
                  placeholder="Referral Code"
                  value={referred_by}
                  required={true}
                  onChange={(e) => setReferred_by(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-gray-500">Phone Number</label>
                </div>
                <Input
                  className="w-full h-12 hover:border-green-500 active:border-green-600"
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

              <FraserButton
                title={"Continue"}
                size={"small"}
                active={signUpValid === false ? false : true}
                className={"w-full mt-4"}
                onClick={() => signUpValid && CreateUser()}
                loader={userRegisterLoading}
              />
              <FraserButton
                title={"I have an account"}
                buttonType={"tertiary"}
                size={"regular"}
                className={"w-full mt-2"}
                onClick={() => setFlip("signin")}
              />
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default BookRide;
