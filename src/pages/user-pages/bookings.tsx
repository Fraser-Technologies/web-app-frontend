/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { BsArrowRight, BsChevronDown, BsChevronUp } from "react-icons/bs";
import BookingCard from "../../components/bookingCard";
import Layout from "../../components/layouts/SignInLayout";
import { getAvailableTripAction } from "../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Alert, Drawer, Input, message, Modal } from "antd";
import { addToMyBookinAction } from "../../state/action/booking.action";
import GeometricPatterns from "../../components/GeometricPatterns";
import { FaCaretDown, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { State_interface } from "../../interfaces/state_interface";
import { getAllStateAction } from "../../state/action/state.action";
import { Trip_interface } from "../../interfaces/trip_interface";
import { RootState } from "../../state/redux-store";
import { FraserButton } from "../../components/Button";
import {
  registerUserAction,
  userLoginAction,
} from "../../state/action/user.action";
import allState from "../../utils/allState";

const Bookings = () => {
  const {
    userInfo,
    error: loginError,
    loading: userLoginLoading,
  } = useAppSelector((state: RootState) => state.userLogin);
  const { error: registerUserError, loading: userRegisterLoading } =
    useAppSelector((state: RootState) => state.registerUser);

  const { states } = useAppSelector((state: RootState) => state.allState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [flip, setFlip] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [value, setValue] = useState<number>(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [useDrawer, setUseDrawer] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [homeState, setHomeState] = useState<string>("");

  //PASSING DATA USING STATE
  const location = useLocation();
  const { startCity, destinationCity, destinationBusStop, startBusStop } =
    location.state || {};

  const [fromCity, setFromCity] = useState<string>(
    startCity || "Set your current city"
  );
  const [toCity, setToCity] = useState<string>(
    destinationCity || "Set your destination"
  );
  const [start, setstart] = useState<string>(
    startBusStop || "Select start bus stop"
  );
  const [destination, setdestination] = useState<string>(
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
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [referred_by, setReferred_by] = useState<string>("");
  // const [flip, setFlip] = useState("signin");

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
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: "+234" + phone.trim(),
        referred_by: referred_by.trim(),
        home_state: homeState,
      })
    );
  };

  const LoginUser = () => {
    return dispatch(userLoginAction("+234" + phone));
  };

  //RESPONSIVENESS
  //WHERE TO||LEFT COLUMN
  const [whereToToggle, setwhereToToggle] = useState(false);
  const whereToToggleClick = () => {
    setwhereToToggle(!whereToToggle);
  };

  const {
    loading: availableTripLoading,
    error: availableTripError,
    trips: availableTripData,
  } = useAppSelector((state: any) => state.availableTrip);

  const FindAvailableTrip = () => {
    whereToToggleClick();

    if (location?.state) {
      dispatch(
        getAvailableTripAction({ from: startCity, to: destinationCity })
      );
    }

    if (from && to) {
      dispatch(getAvailableTripAction({ from: from, to: to }));
    }
    // else {
    // 	dispatch(getAllAvailableTripAction());
    // }
  };

  const [modalData, setModalData] = useState<Trip_interface | any>(
    availableTripData
  );
  const handleOpenModal = (data: any, flipValue: any) => {
    setFlip(flipValue);
    setModalData(data);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    if (modalData?.bus?.capacity - modalData?.bookings?.length >= inputValue) {
      setValue(inputValue);
    } else {
      setValue(modalData?.bus?.capacity - modalData?.bookings?.length);
    }
    // const formattedValue = inputValue.replace(regex, ",");
    // setValue(formattedValue);
  };

  const addItem = () => {
    if (modalData?.bus?.capacity - modalData?.bookings?.length > value) {
      setValue(value + 1);
    } else {
      setValue(modalData?.bus?.capacity - modalData?.bookings?.length);
    }
  };

  const minusItem = () => {
    if (value > 1) setValue(value - 1);
  };

  //VALIDATE BUTTON BEFORE CLICK
  const isValid =
    fromCity !== "Set your current city" &&
    toCity !== "Set your destination" &&
    destination !== "Select destination bus stop" &&
    start !== "Select start bus stop";

  useEffect(() => {
    if (!userInfo?._id) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (!userInfo && loginError) {
      messageApi.open({
        type: "error",
        content: loginError,
      });
      setFlip("signin");
      // handleOpenModal(undefined, "signin");
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

  //Check ScreenWidth to check what element to render
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    if (screenWidth < 640) {
      setUseDrawer(true);
    } else {
      setUseDrawer(false);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  // useEffect(() => {
  // 	if (!availableTripData) {
  // 		dispatch(getAllAvailableTripAction());
  // 	}
  // }, [availableTripData, dispatch]);

  useEffect(() => {
    if (!states.length) {
      dispatch(getAllStateAction());
    }
  }, [states, dispatch]);

  useEffect(() => {
    if (!userInfo?._id || loginError) {
      setModalVisible(true);
      setFlip("signin");
    } else {
      setModalVisible(false);
    }
  }, [dispatch, loginError, navigate, userInfo]);

  useEffect(() => {
    if (!userInfo && loginError) {
      messageApi.open({
        type: "error",
        content: loginError,
      });
      setFlip("signin");
      // handleOpenModal(undefined, "signin");
    }
  }, [loginError, messageApi, userInfo, dispatch, navigate]);

  useEffect(() => {
    if (userInfo?._id) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    }
  }, [userInfo]);

  return (
    <Layout
      title="Book Intercity Bus Rides in Nigeria with Fraser | RideFraser.com"
      pageDescription="Find the best intercity bus transportation options in Nigeria with Fraser. Book your ride today on RideFraser.com and travel in comfort and style."
      pageKeywords="Fraser, intercity bus, Nigeria, ride booking, transportation, travel, comfort, style, RideFraser.com, intercity bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser"
    >
      {contextHolder}

      <div className="relative h-24 bg-black -z-10 lg:h-32">
        <GeometricPatterns />
      </div>
      <div className="flex-col items-center justify-center overflow-y-scroll duration-300 ease-in-out lg:flex scroll-behavior-smooth">
        {/* COLUMN */}

        <div className="fixed w-full -mt-16 rounded-md lg:w-4/12 lg:mt-0 lg:mx-16 lg:my-32 lg:fixed lg:top-0 lg:left-0">
          <div className="mx-4 mb-2 lg:mb-0 lg:mx-0">
            <div
              className={
                whereToToggle === true
                  ? "lg:hidden py-6 px-6 lg:px-12 lg:mr-12 bg-white rounded-t-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
                  : "lg:hidden py-6 px-6 lg:px-12 lg:mr-12 bg-white rounded-md border-b border-[#EFF3EF] flex space-between items-center justify-between"
              }
            >
              {" "}
              <h3 className="w-1/2 text-lg font-semibold">Where to?</h3>{" "}
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
          <div className="flex-col w-full h-full lg:flex">
            {/* LEFT COLUMN */}
            <div className="w-full">
              <div
                className="mx-4 lg:w-4/12 lg:mx-16 lg:my-32 lg:fixed lg:top-0 lg:left-0 "
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
                      {fromCity}
                      <FaCaretDown className="ml-auto" />
                    </button>

                    {startCityIsOpen && (
                      <div className="absolute z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                        {states
                          .filter(
                            (state: State_interface) => state?.state !== toCity
                          )
                          ?.map((city: State_interface) => {
                            return (
                              <a
                                key={city?._id}
                                href="#"
                                className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                onClick={() => {
                                  setFromCity(city?.state);
                                  setStartBusStopList(city?.bus_stops);
                                  setStartCityIsOpen(!startCityIsOpen);
                                  setFrom(city.state);
                                }}
                              >
                                {city?.state}
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
                      className="inline-flex w-full px-4 py-2 mt-1 mb-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      onClick={() => setStartBusStopIsOpen(!startBusStopIsOpen)}
                    >
                      {start}
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
                        ) : (
                          startBusStopList?.map((stops: string) => {
                            return (
                              <a
                                key={stops}
                                href="#"
                                className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                onClick={() => {
                                  setstart(stops);
                                  // setFrom(stops);
                                  setStartBusStopIsOpen(!startBusStopIsOpen);
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
                      {toCity}
                      <FaCaretDown className="ml-auto" />
                    </button>
                    {destinationCityIsOpen && (
                      <div className="absolute z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
                        {states
                          ?.filter(
                            (city: State_interface) => city?.state !== fromCity
                          )
                          ?.map((city: State_interface) => {
                            return (
                              <a
                                key={city?._id}
                                href="#"
                                className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                onClick={() => {
                                  setToCity(city?.state);
                                  setDestinationCityIsOpen(
                                    !destinationCityIsOpen
                                  );
                                  setDestinationBusStopList(city?.bus_stops);
                                  setTo(city?.state);
                                }}
                              >
                                {city?.state}
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
                      className="inline-flex w-full px-4 py-2 mt-1 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      onClick={() =>
                        setDestinationBusStopIsOpen(!destinationBusStopIsOpen)
                      }
                    >
                      {destination}
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
                        ) : (
                          desinationBusStopList?.map((stops: string) => {
                            return (
                              <a
                                key={stops}
                                href="#"
                                className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                onClick={() => {
                                  setdestination(stops);
                                  // setTo(stops);
                                  setDestinationBusStopIsOpen(
                                    !destinationBusStopIsOpen
                                  );
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

                  <FraserButton
                    title="Search Trips"
                    loader={availableTripLoading}
                    size="regular"
                    className="w-full mt-8"
                    active={isValid}
                    onClick={FindAvailableTrip}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="fixed w-full mt-4 overflow-y-scroll rounded-md lg:w-7/12 h-5/6 lg:mt-40 lg:mx-16 lg:my-32 scroll-behavior-smooth lg:fixed lg:top-0 lg:right-0">
              <div className="fixed w-full ">
                <div className="mx-4 -mt-1 lg:w-7/12 rounded-t-md lg:mx-16 lg:my-32 h-16 bg-[#ffffff] border-b z-10 justify-center items-center lg:fixed lg:top-0 lg:right-0">
                  <h1 className="pt-4 mx-6 text-lg font-semibold lg:ml-12 lg:mt-2">
                    Available Trips
                  </h1>
                </div>
              </div>
              <div className="mx-4 lg:mx-0 ">
                {/* HEADER */}

                <div className="w-full px-8 py-4 pb-24 overflow-y-scroll bg-white rounded-md mt-14 lg:mt-0 lg:mb-16 lg:pb-12 lg:pt-16 lg:px-12 lg:py-0 h-max scroll-behavior-smooth">
                  {availableTripLoading && (
                    <div className="flex px-6 py-2 mb-8 space-x-4 animate-pulse">
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
                  )}{" "}
                  {!availableTripLoading && availableTripData?.length === 0 && (
                    <div>
                      <Alert
                        type="info"
                        message="Sorry there are no available trips to the destination selected"
                      />
                      <p className="mt-4 text-[14px] text-gray-500">
                        Request a route or
                        <a href={`tel:09076736877`}>
                          <span className="text-blue-500"> contact us</span>
                        </a>
                      </p>
                    </div>
                  )}
                  {!availableTripLoading &&
                    availableTripData?.map((trip: Trip_interface) => {
                      return (
                        <div>
                          <BookingCard
                            key={trip?._id}
                            from={trip?.travel_destination?.from?.start_busstop}
                            to={trip?.travel_destination?.to?.stop_busstop}
                            takeOffTime={trip?.take_off_time}
                            takeOffDate={trip?.take_off_date}
                            price={trip?.price}
                            arrivalTime={trip?.arrival_time}
                            arrivalDate={trip?.arrival_date}
                            onClick={() => {
                              handleOpenModal(trip, "howmanytickets");
                            }}
                          />
                          <p className="mt-4 text-[14px] text-gray-500">
                            Request a route or
                            <a href={`tel:09076736877`}>
                              <span className="text-blue-500"> contact us</span>
                            </a>
                          </p>
                        </div>
                      );
                    })}
                  {!availableTripLoading && availableTripError && (
                    <Alert
                      message="An error occured"
                      description={availableTripError}
                      type="error"
                      showIcon
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {useDrawer && flip === "howmanytickets" && modalVisible && (
        <Drawer
          title={
            <div>
              <div className="mt-8 text-lg font-medium boder-b">
                Number of Tickets
              </div>
              <div className="text-[#929292] font-light text-xs mt-1">
                {" "}
                Available Seats:
                {modalData?.bus?.capacity - modalData?.bookings?.length}
              </div>
              <div className="flex-row justify-between px-6 py-4 mt-6 bg-black rounded-lg lg:flex lg:px-8">
                <div className="flex lg:w-4/5">
                  <div className="w-1/2 lg:w-1/3">
                    <h3 className="mr-8 text-lg md:text-base lg:h-20 lg:mr-0 text-primary-100">
                      {modalData?.travel_destination?.from?.start_busstop}
                    </h3>
                  </div>

                  <BsArrowRight className="top-0 mt-1 mr-8 lg:w-4 lg:mr-0 text-primary-100 md:top-2 left-10 md:left-10" />
                  <div className="w-1/2 lg:w-1/3 ">
                    <h3 className="text-lg md:text-base lg:h-20 text-primary-100 ">
                      {modalData?.travel_destination?.to?.stop_busstop}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          }
          placement="bottom"
          closable={false}
          onClose={handleCancel}
          open={modalVisible}
          key="bottom"
          className="rounded-t-xl"
          height="60vh"
        >
          <div className="flex items-center mx-6 justify-evenly">
            <FaMinusCircle
              size={32}
              onClick={minusItem}
              className="cursor-pointer"
            />
            <div className="w-full my-12 place-content-center">
              <input
                type="number"
                value={value}
                onChange={handleChange}
                placeholder="0"
                className=" w-full text-center rounded-md focus:outline-none focus:shadow-outline-blue placeholder-black text-[28px]"
              />
            </div>
            <FaPlusCircle
              size={32}
              onClick={addItem}
              className="cursor-pointer"
            />
          </div>
          <FraserButton
            title="Continue"
            size="regular"
            onClick={() => {
              dispatch(
                addToMyBookinAction({ ...modalData, no_of_ticket: value })
              );
              navigate("/checkout");
            }}
          />
        </Drawer>
      )}

      {!useDrawer && flip === "howmanytickets" && modalVisible && (
        <Modal
          title={
            <div>
              <div className="mt-8 text-lg font-medium boder-b">
                Number of Tickets
              </div>
              <div className="text-[#929292] font-light text-xs mt-1">
                {" "}
                Available Seats:{" "}
                {modalData?.bus?.capacity - modalData?.bookings?.length}
              </div>
              <div className="flex-row px-6 py-4 mt-6 text-center bg-black rounded-lg justify-evenly lg:flex lg:px-8">
                <div className="flex lg:w-4/5">
                  <div className="w-1/2 lg:w-1/3">
                    <h3 className="mr-8 text-lg md:text-base lg:mr-0 text-primary-100">
                      {modalData?.travel_destination?.from?.start_busstop}
                    </h3>
                  </div>

                  <BsArrowRight className="top-0 mt-1 lg:w-4 lg:mr-0 text-primary-100 md:top-2 left-10 md:left-10" />
                  <div className="w-1/2 lg:w-1/3 ">
                    <h3 className="text-lg md:text-base text-primary-100 ">
                      {modalData?.travel_destination?.to?.stop_busstop}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          }
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          //   width="240px"
        >
          <div className="flex items-center mt-6 justify-evenly">
            <FaMinusCircle
              size={32}
              onClick={minusItem}
              className="cursor-pointer"
            />
            <div className="w-full my-8 place-content-center">
              <input
                type="number"
                value={value}
                onChange={handleChange}
                placeholder="0"
                className=" w-full text-center rounded-md focus:outline-none focus:shadow-outline-blue placeholder-black text-[28px]"
              />
            </div>
            <FaPlusCircle
              size={32}
              onClick={addItem}
              className="cursor-pointer"
            />
          </div>
          <FraserButton
            title="Continue"
            size="regular"
            className="w-full mt-8"
            onClick={() => {
              dispatch(
                addToMyBookinAction({ ...modalData, no_of_ticket: value })
              );
              navigate("/checkout");
            }}
          />
        </Modal>
      )}

      {flip === "signin" && modalVisible && (
        <Modal
          title={
            <div>
              <h1 className="pt-2 text-xl">You need to login to continue</h1>
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
          open={modalVisible}
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

      {flip === "signup" && modalVisible && (
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
          open={modalVisible}
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
                <label className="text-gray-500">Home State</label>
              </div>
              <select
                className="  w-full h-12 hover:border-green-500 bg-transparent border outline-none rounded-md active:border-
							active:border-green-600"
                onChange={(e) => setHomeState(e.target.value)}
              >
                <option>Select State</option>
                {allState.map((s: string) => {
                  return (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  );
                })}
              </select>

              {/* <Input
								className="w-full h-12 hover:border-green-500 active:border-green-600"
								placeholder="Email"
								value={homeState}
								required={true}
								onChange={(e) => setHomeState(e.target.value)}
							/> */}
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

export default Bookings;
