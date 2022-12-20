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
import { justHoverAnimation, zoomOutAnimation } from "../utils/animation";
import {
  registerUserAction,
  userLoginAction,
} from "../state/action/user.action";
import {
  getAllAvailableTripAction,
  getAvailableTripAction,
} from "../state/action/trip.action";
import { Spinner } from "react-bootstrap";

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

  const { userInfo, error: loginError } = useAppSelector(
    (state: any) => state.userLogin
  );
  const { error: registerUserError, loading: registerUserLoading } =
    useAppSelector((state: any) => state.registerUser);
  const { busStops } = useAppSelector((state: any) => state.allBusStop);

  const handleAvailableTrips = () => {
    if (from && to) {
      dispatch(getAvailableTripAction({ from: from, to: to }));
    } else {
      dispatch(getAllAvailableTripAction());
    }
    navigate("/bookings");
  };

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
    <Layout user="Amen" childClass="">
      {contextHolder}
      <Helmet>
        <meta charSet="utf-8" />
        <title>BookRide - Fraser</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-11/12 mt-10 mb-10 sm:w-3/5 lg:w-2/5">
          <div className="w-full px-8 py-12 bg-white rounded-md">
            <div className="border-b border-[#EFF3EF] pb-10">
              <h1 className="text-3xl font-semibold leading-[54px] tracking-[-5%]">
                Where to?
              </h1>

              <div className="flex flex-col w-full mt-2 mb-2">
                <h3> Coming from </h3>
                <motion.select
                  // variants={zoomOutAnimation}
                  initial="initial"
                  whileHover="hover"
                  value={lag as any}
                  onChange={(e) => setLag(e.target.value)}
                  id="comingFrom"
                  className="w-full h-10 px-2 rounded-sm"
                >
                  <motion.option
                    variants={justHoverAnimation}
                    initial="initial"
                    whileHover="hover"
                    value={"lagos"}
                  >
                    Lagos
                  </motion.option>
                  <motion.option
                    // variants={justHoverAnimation}
                    initial="initial"
                    whileHover="hover"
                    value={"ibadan"}
                  >
                    Ibadan
                  </motion.option>
                </motion.select>
              </div>

              <div className="flex flex-col h-auto max-h-40">
                {lag === "lagos" ? (
                  <>
                    <label className="mt-5">Start bus stop</label>
                    <motion.select
                      // variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      name="bus stop"
                      id="busStops"
                      className="w-full h-10 px-2 rounded-sm"
                    >
                      <option value={""}>From where</option>

                      {busStops?.map((bs: any) => {
                        if (bs?.state !== "Ibadan") {
                          return (
                            <option value={bs?._id}>
                              {bs.name},{bs?.state}
                            </option>
                          );
                        }
                      })}
                    </motion.select>
                    <label className="mt-5">Destination bus stop</label>
                    <motion.select
                      // variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      name="bus stop"
                      id="busStops"
                      className="w-full h-10 px-2 rounded-sm"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    >
                      <option value={""}>Choose your destination</option>
                      {busStops?.map((bs: any) => {
                        if (bs?.state === "Ibadan") {
                          return (
                            <option value={bs?._id}>
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
                      // variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      name="bus stop"
                      id="busStops"
                      className="w-full h-10 px-2 rounded-sm"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    >
                      <option value={""}>From where </option>
                      {busStops?.map((bs: any) => {
                        if (bs?.state === "Ibadan") {
                          return (
                            <option value={bs._id}>
                              {bs.name},{bs?.state}
                            </option>
                          );
                        }
                      })}
                    </motion.select>

                    <label className="mt-5">Destination bus stop</label>
                    <motion.select
                      // variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      name="bus stop"
                      className="w-full h-10 px-2 rounded-sm "
                    >
                      <option value={""}> Choose your destination</option>

                      {busStops?.map((bs: any) => {
                        if (bs?.state !== "Ibadan") {
                          return (
                            <option value={bs?._id}>
                              {bs.name},{bs?.state}
                            </option>
                          );
                        }
                      })}
                    </motion.select>
                  </>
                )}
              </div>

              {/* <div className="relative">
									<div className="relative mt-6">
										<input
											type="text"
											placeholder="Where are you?"
											className="w-full h-12 px-4 pl-12 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
										/>
										<FaBus className="absolute top-4 left-3" />
									</div>
									<div className="absolute z-50 h-10 border-l border-black top-9 left-5"></div>
									<div className="relative mt-4">
										<input
											type="text"
											placeholder="Where are you going to?"
											className="w-full h-12 px-4 pl-12 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
										/>
										<FaBus className="absolute top-4 left-3" />
									</div>
								</div> */}
            </div>
            {/* <div className="mt-8 border-b border-[#EFF3EF] pb-10">
								<h1 className="text-3xl font-semibold leading-[54px] tracking-[-5%]">
									When?
								</h1>
								<div className="flex justify-between mt-6">
									<Button
										title="Today"
										className="px-3 py-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
									/>
									<Button
										title="Tomorrow"
										className="px-3 py-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
									/>
									<div className="relative">
										<Button
											title="Other"
											className="py-2 pl-8 pr-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
										/>

										<BsCalendarDate className="absolute ml-1 text-sm top-3 left-2" />
									</div>
								</div>
							</div> */}
            <motion.div
              // variants={zoomOutAnimation}
              initial="initial"
              whileHover="hover"
            >
              <Button
                title="See available trips"
                className="w-full h-[52px] bg-[#f4f4f4] mt-10 text-sm hover:bg-[#00ff6a]"
                onClick={handleAvailableTrips}
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
                      message={
                        loginError === "sorry an error occoured during login"
                          ? "Please check the number provided"
                          : "Sorry an error occured"
                      }
                      type="warning"
                      showIcon
                      // closable
                      className="bg-blue-50 border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
                      style={{
                        width: "100%",
                        fontSize: "0.8rem",
                        fontWeight: "normal",
                      }}
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
                    // closable
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
                    placeholder="Phone"
                    type="number"
                    value={phone}
                    prefix={"+234"}
                    required={true}
                    onChange={(e) => {
						setPhone(
							e.target.value.startsWith("0")
							  ? e.target.value
							  : "0" + e.target.value
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
                    className="w-full p-3 mt-6 font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                    onClick={CreateUser}
                  >
                    {registerUserLoading && (
                      <Spinner
                        animation="border"
                        className=" text-white"
                        role="status"
                        variant="light"
                        //   style={{ width: "1.5rem", height: "1.5rem" }}
                      />
                    )}
                    Continue
                  </motion.button>

                  <motion.button
                    initial="initial"
                    whileTap="tap"
                    whileHover="hover"
                    className="flex items-center justify-center w-full py-2 mt-4 text-gray-600 font-normal hover:text-green-600 rounded-full"
                    onClick={() => setFlip(!flip)}
                  >
                    I have an account
                  </motion.button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mt-3 mb-3 pt-8">
                  {/* <div className="mb-2">
		  <label
		  className="text-gray-500"
		  >Phone Number</label>
		</div> */}

                  <Input
                    className="hover:border-green-500 active:border-green-600 h-12 w-full"
                    placeholder="0903 123 1234"
                    value={phone}
                    prefix={"+234"}
                    type="number"
                    required={true}
                    onChange={(e) => {
                      setPhone(
                        e.target.value.startsWith("0")
                          ? e.target.value
                          : "0" + e.target.value
                      );
                      
                    }}
                  />
                </div>

                {/* USER LOGIN */}
                <div>
                  <motion.button
                    initial="initial"
                    whileTap="tap"
                    whileHover="hover"
                    className="w-full p-3 mt-6 font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                    onClick={LoginUser}
                  >
                    Continue
                  </motion.button>
                  {loading && (
                    <Spinner
                      animation="border"
                      className="ml-3 text-green-600"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                  )}

                  <motion.button
                    // variants={zoomOutAnimation}
                    initial="initial"
                    whileTap="tap"
                    // whileHover="hover"
                    className="flex items-center justify-center w-full py-2 mt-4 text-gray-600 font-normal hover:text-green-600 rounded-full"
                    onClick={() => setFlip(!flip)}
                  >
                    I don't have an account
                  </motion.button>
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
