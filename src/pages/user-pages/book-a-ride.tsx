/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
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
// import { _paths_ } from "../../utils/routes";
import { FraserButton } from "../../components/Button";
import Offeringcard from "../../components/offeringcard";
import StepComp from "../../components/StepComp";

const BookRide = () => {
  enum TripValidOption {
    startCityOption = "Current City",
    destinationCityOption = "Where to?",
    destinationBusStopOption = "Station",
    startBusStopOption = "Station",
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
  const [referred_by, setReferred_by] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
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
      <div className="bg-[#000000] -mt-16 md:mt-0 w-full">
        <div className="flex flex-col py-24 mx-6 md:mx-16 lg:mx-32">
          <h1 className="mt-16 md:mt-0 leading-tight bg-gradient-to-b from-[#00ff6a] to-[#FFEFC1] text-transparent bg-clip-text text-[2.6rem] md:text-[4rem] font-semibold">
            Move Freely <br /> between cities
          </h1>
          <h3 className="text-white text-[16px] md:text-[15px] mt-2 font-light">
            Get started by simply inputting your location and destination
          </h3>
          <div className="absolute top-32 z-0 right-2 md:right-64 lg:right-96 bg-[#00FF6A] rounded-[100px] p-4">
            <img
              src="/assets/images/paper-airplane.png"
              className=" h-4 z-0 filter hue-rotate-90"
              alt=""
            />
          </div>

          <div className="absolute top-96 -left-8 bg-[#00FF6A] rounded-[100px] p-4">
            <img
              src="/assets/images/idea-bulb.png"
              className=" h-8 z-0 filter brightness-75 "
              alt=""
            />
          </div>

          <div className="absolute top-56 lg:top-56 -right-12 md:right-24 lg:right-40 bg-[#FFE28D] p-4 rounded-[100px]">
            {" "}
            <img
              src="/assets/images/bus.png"
              className=" h-8 z-0 filter brightness-75"
              alt=""
            />
          </div>
          <img
            src="/assets/images/bg-overlay-white.png"
            className="absolute z-0 opacity-5 overflow-hidden h-[40vh]"
            alt=""
          />

          <div className="z-50 lg:z-10 md:pt-6 px-4 py-4 md:px-4 lg:px-8 lg:py-8 bg-white rounded-lg mt-12">
            <div className="mb-4 md:flex">
              <div className="relative z-50 lg:z-20 inline w-full text-left duration-300 ease-in-out mr-4 lg:mr-6">
                <label className="ml-2 text-gray-600 md:text-[13px]">
                  Pickup City
                </label>
                <button
                  type="button"
                  className="h-12 items-center mt-2 inline-flex w-full px-4 py-2 mt-1 mb-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() => {
                    setStartCityIsOpen(!startCityIsOpen);
                  }}
                >
                  {startCity}
                  <FaCaretDown className="ml-auto" />
                </button>
                {startCityIsOpen && (
                  <div className="absolute z-50 lg:z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                    {cities
                      ?.filter(
                        (city: City_interface) => city?.city !== destinationCity
                      )
                      .map((city: City_interface) => {
                        return (
                          <a
                            href="#"
                            className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
                className={`ease-in-out duration-300 relative w-full inline text-left z-20 mr-4 lg:mr-6 ${
                  startCity === "Current City" ? "hidden " : ""
                }`}
              >
                <label className="ml-2 text-gray-600 md:text-[13px]">
                  Station
                </label>

                {/* START BUSSTOP */}
                <button
                  type="button"
                  className="h-12 items-center mt-2 inline-flex w-full px-4 py-2 mt-1 mb-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                  onClick={() => setStartBusStopIsOpen(!startBusStopIsOpen)}
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
                      <div className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                        Sorry, we currently do not have a stop at this location.
                      </div>
                    ) : (
                      startBusStopList?.map((stops: any) => {
                        return (
                          <a
                            key={stops}
                            href="#"
                            className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
              <div className="relative z-10 inline w-full text-left duration-300 ease-in-out mr-4 lg:mr-6">
                <label className="ml-2 text-gray-600 md:text-[13px]">
                  Destination City
                </label>

                <button
                  type="button"
                  className="h-12 items-center mt-2 inline-flex w-full px-4 py-2 mt-1 mb-2 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
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
                            className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
              <div
                className={`ease-in-out duration-300 relative w-full inline text-left z-10 mr-6 ${
                  destinationCity === "Where to?" ? "hidden " : ""
                }`}
              >
                <label className="ml-2 text-gray-600 md:text-[13px]">
                  Station
                </label>

                {/* START BUSSTOP */}

                <button
                  type="button"
                  className="h-12 items-center mt-2 inline-flex w-full px-4 py-2 mt-1 font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
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
                      <div className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                        Sorry, we currently do not have a stop at this location.
                      </div>
                    ) : (
                      desinationBusStopList?.map((stops: any) => {
                        return (
                          <a
                            key={stops}
                            href="#"
                            className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
              <div>
                <FraserButton
                  title="Search"
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
        </div>
      </div>
      <div className="flex">
        <div className="pt-[16px] md:pt-[24px] lg:pt-[40px] md:my-16 lg:my-24 mx-12 md:mx-16 lg:mx-32 bg-[#fffff] mb-24">
          <h1 className="text-[#353535] mb-16 md:w-full lg:w-2/3 text-[2rem] md:text-left text-center font-semibold leading-tight spacing-[normal]  ">
            Experience Comfortable and Affordable Intercity Bus Travel with
            Fraser
          </h1>

          <div className="mb-24 lg:flex w-full mt-10">
            <Offeringcard
              classname="mr-4 mb-4 lg:mb-0"
              title="Safe"
              subtitleClassname="text-[#8E8E93]"
              subtitle="Travel with peace of mind knowing your safety is our top priority. Our experienced drivers and quality buses ensure a safe journey."
            />
            <Offeringcard
              classname="mr-4 bg-primary-100 mb-4 lg:mb-0"
              title="Comfy"
              subtitleClassname="text-[#353535]"
              subtitle="Enjoy a comfortable journey with free Wi-Fi and entertainment. Book your ticket today and experience stress-free travel."
            />
            <Offeringcard
              title="Affordable"
              subtitleClassname="text-[#8E8E93]"
              subtitle="Affordable travel made easy. Book with Fraser for guaranteed seats starting at ₦ 1,000. Travel comfortably without breaking the bank."
            />
          </div>
        </div>
      </div>

      <div className="bg-[#000000] pt-24">
        <div className="md:mx-24 lg:mx-32">
          <h1 className="lg:col-start-1 lg:col-end-6 text-[2rem] font-medium text-[#e3e3e3] leading-tight">
            Book a ride in three steps
          </h1>
          <div className="lg:grid lg:grid-cols-12 lg:flex lg:mx-auto lg:mt-12">
            <div className="hidden lg:block mt-6 col-start-1 col-end-6">
              <img
                src="/assets/images/phone.png"
                alt=""
                className="object-cover flex h-[75vh] ml-4"
              />
            </div>

            <div className="lg:-mt-12 lg:mx-16 col-start-6 col-end-13 pb-24">
              <div className="w-full flex mt-16 lg:mt-32 justify-between flex-col">
                <StepComp
                  stepNumber="1"
                  stepTitle="Sign up"
                  stepSubtitle="This is easy – we only need a few details and then you can get started. It only takes a minute to fill in your details!"
                  classname="mb-6"
                  cardclassname="bg-primary-100"
                />
                <StepComp
                  stepNumber="2"
                  stepTitle="Book a trip"
                  classname="mb-6"
                  cardclassname="bg-white"
                  stepSubtitle="Booking a bus ticket is easy. You can easily buy your tickets in advance and have them delivered straight to your smartphone - register via the mobile app or on the website!"
                />
                <StepComp
                  stepNumber="3"
                  stepTitle="Ride"
                  stepSubtitle="With fast connections you can travel in comfort. Buses are equipped with Wi-Fi so you can work, catch up on your favourite shows and have fun all on the move."
                />
              </div>
              {/* <FraserButton
                size="regular"
                title="Get Started"
                onClick={() => {}}
              /> */}
            </div>
          </div>
        </div>
      </div>

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
                  message={loginError}
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
                You're almost there, create an account in just one simple step.
              </p>

              <div>
                {registerUserError && (
                  <Alert
                    message={registerUserError}
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
    </Layout>
  );
};

export default BookRide;
