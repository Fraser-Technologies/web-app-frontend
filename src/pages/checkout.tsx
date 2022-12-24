import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BsChevronDown, BsChevronUp, BsFillPersonFill } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import { usePaystackPayment } from "react-paystack";
import Layout from "../components/layouts/SignInLayout";
import { Modal, Box } from "@mui/material";
import { ModalStyle } from "../constants/styling";
import SeatReservation from "../components/SeatReservation";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Alert, Input, message } from "antd";
import {
  emptyMyBooking,
  verifyPaymentAction,
} from "../state/action/booking.action";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [check, setCheck] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isView, setIsView] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const { userInfo } = useAppSelector((state: any) => state.userLogin);
  const { myBooking } = useAppSelector((state: any) => state.booking);

  console.log("the trip details is ", myBooking);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookingToggle = () => {
    setShow(!show);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userInfo?.email || "contact@ridefrser.com",
    amount: Number(myBooking?.price) * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
  };

  const initializePayment = usePaystackPayment(config as any);

  const onSuccess = () => {
    dispatch(verifyPaymentAction(myBooking));
    message.info("Your booking have been created successfully!");
    navigate("/");
    dispatch(emptyMyBooking());
  };

  const onClose = () => {
    messageApi.open({
      type: "error",
      content: "An error occoured while trying to pay",
    });
  };

  const payWithPaystack = () => {
    if (!check) {
      return setShowAlert(true);
    }

    initializePayment(onSuccess, onClose);
  };

  const vAT = myBooking?.price * 0.075;
  const Total = myBooking?.price + vAT;

  return (
    <Layout childClass="">
      {contextHolder}

      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout - Fraser</title>
      </Helmet>

      <div className="flex w-full fixed flex-col lg:flex-row lg:mt-15">
        <div className=" ml-16 mr-8 lg:w-7/12 ease-in-out duration-300 h-full">
          <div className="flex py-4 px-8 mt-16 mb-5 rounded-md items-center justify-between duration-300 ease-in-out bg-white">
            <h3 className="text-lg font-semibold md:text-lg">Checkout</h3>

            <div className="block lg:hidden">
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
          </div>
          <div className={`${show === false ? "hidden" : "block"} md:block`}>
            {/* {passenger details} */}
            <div className="w-full p-8 -mt-3 bg-white rounded-md lg:mt-0 lg:py-12">
              <div className="border-b border-[#EFF3EF]">
                <h2 className="mb-4 text-base font-semibold md:text-base">
                  Your Details
                </h2>
                <p className="text-[#949292] w-5/6 font-normal md:leading-4 md:text-sm text-xs">
                  Ready to set off on your adventure? Confirm your details
                  below, proceed to finalize your reservation and start packing
                  your bags!
                </p>
              </div>
              <div className="flex mt-8 space-x-3 border-b border-[#EFF3EF] pb-6">
                <div className="h-12 rounded-md flex items-center space-x-2 border py-3 md:px-6 w-3/6">
                  <BsFillPersonFill />
                  <p className="text-sm truncate md:text-sm">{`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
                </div>
                <div className="h-12 rounded-md flex items-center space-x-2 border py-3 md:px-6 w-3/6">
                  <MdPhoneInTalk />
                  <p className="text-sm truncate md:text-sm ">
                    {userInfo?.phone.replace(
                      /^(\+\d{3})(\d{3})(\d{3})(\d{4})/,
                      "$1 $2 $3 $4"
                    )}
                  </p>
                </div>
              </div>
              {/* <div className="flex justify-center mt-5">
								<div className="flex items-center space-x-2 text-primary-200">
									<AiFillPlusCircle />
									<p className="text-sm md:text-base">Add new passenger</p>
								</div>
							</div> */}
            </div>
            {/* {seat reservation} */}
            {/* <div className="w-full p-8 mt-4 bg-white rounded-md lg:py-12">
							<div className="border-b border-[#EFF3EF] pb-2">
								<h2 className="mb-3 text-sm font-medium md:text-base">
									Seat Reservation
								</h2>
							</div>
							<div className="flex items-center justify-between border border-[#E0E0E0] px-3 py-2">
								<div className="flex items-center space-x-2">
									<p className="text-sm md:text-base">Select preferred seat</p>
									<span className="p-2 text-xs rounded-md text-primary-200 bg-primary-50 md:text-sm">
										+NGN250
									</span>
								</div>
								<BsArrowRight />
							</div>
						</div> */}
            {/* {luggage weigh} */}
            {/* <div className="w-full p-8 mt-4 bg-white rounded-md lg:py-12">
							<div className="border-b border-[#EFF3EF] pb-4">
								<h2 className="mb-3 text-sm font-medium md:text-base">
									Luggage weigh-in (Optional)
								</h2>
								<p className="text-[#949292] font-normal leading-5 md:text-sm text-xs">
									If you do not know the exact dimaensions of your luggage, you
									can weigh in before your trip. Luggages above 15kg attract a
									fee.
								</p>
							</div>
							<div className="flex items-center justify-between border border-[#E0E0E0] px-3 py-4 mt-5">
								<p className="text-sm">Select Luggage Type</p>
								<BsChevronDown />
							</div>
							<div className="flex mt-6 space-x-3">
								<input
									className="border border-[#E0E0E0] py-3 md:px-6 px-3.5 w-3/6 md:text-sm text-xs"
									placeholder="Estimated Height"
								/>
								<input
									className="border border-[#E0E0E0] py-3 md:px-6 px-3.5 w-3/6 md:text-sm text-xs"
									placeholder="Estimated Width"
								/>
							</div>
						</div> */}
          </div>
        </div>

        {/* {payment details} */}
        <div className="w-full lg:w-5/12 lg:mr-16 lg:mt-16">
          <div className="w-full pt-6 pb-8 px-8 bg-white rounded-md">
            <div className="border-b border-[#EFF3EF] pb-2">
              <h2 className="mb-4 text-lg font-semibold md:text-lg lg:block">
                Your booking
              </h2>
            </div>
            <div className="border-b border-[#EFF3EF] pb-3 mt-4 flex space-x-5 font-semibold text-sm md:text-base">
              <p>1 Bus Ticket</p>
              <p>{myBooking?.take_off_date}.</p>
            </div>
            {/* {location and time} */}
            <div className="mt-3 relative border-b border-[#EFF3EF] pb-6">
              <div className="text-[#949292] text-sm flex space-x-8 items-center">
                <p>{myBooking?.take_off_time}</p>
                <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                <p>{`${myBooking?.travel_destination?.from?.name}, ${myBooking?.travel_destination?.from?.state}`}</p>
              </div>
              <div className="h-4 border-l-[1.5px] border-primary-200 absolute left-[64.2px] md:left-20 top-5 md:top-4"></div>
              <div className="text-[#949292] text-sm flex space-x-8 items-center mt-4">
                <p>{myBooking?.arrival_time}</p>
                <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                <p>{`${myBooking?.travel_destination?.to?.name}, ${myBooking?.travel_destination?.to?.state}`}</p>
              </div>
            </div>
            {/* {discount, subtotal and VAT} */}
            <div className="border-b border-[#EFF3EF] pb-6">
              {/* <div className="flex justify-between mt-4 text-[#949292]">
								<p className="text-sm md:text-base ">Discount</p>
								<p className="text-sm md:text-base">-NGN 500.00</p>
							</div> */}
              <div className="flex justify-between mt-4 mr-8">
                <p className="text-sm md:text-base ">Subtotal</p>
                <p className="text-sm md:text-base">
                  NGN{" "}
                  {myBooking?.price
                    .toString()
                    .replace(/(\d)(?=(\d{3})+$)/g, "$1,")}
                </p>
              </div>
              <div className="flex justify-between mt-4 mr-8 text-[#949292]">
                <p className="text-sm md:text-xs ">VAT(7.5%)</p>
                <p className="text-sm md:text-xs">
                  NGN {vAT.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")}
                </p>
              </div>
            </div>

            {/* {total} */}
            <div className="flex justify-between mt-4 border-b border-[#EFF3EF] pb-8 mr-8">
              <p className="text-sm font-bold md:text-lg">Total</p>
              <p className="text-sm font-bold md:text-lg">
                NGN {Total.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")}
              </p>
            </div>
          </div>

          {/* {terms & conditions} */}
          <div className="pl-8 pr-12 pt-4 pb-12 bg-white border-t border-[#EFF3EF] rounded-md md:-mt-12 md:rounded-b-md">
            {showAlert && (
              <Alert
                message="Kindly confirm the terms and conditions"
                type="error"
                showIcon
                className="bg-blue-50 w-full text-[0.8rem] mb-4 -ml-1 font-normal border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
              />
            )}
            <div className="flex items-start space-x-3">
              <div className="pt-1">
                <input
                  type="checkbox"
                  style={{ height: "18px", width: "18px" }}
                  checked={check}
                  onChange={() => {
                    setCheck(!check);
                    setShowAlert(false);
                  }}
                />
              </div>
              <p className="text-xs lg:text-sm w-11/12 pr-2 text-[#949292] md:leading-4">
                By checking this box, I confirm that I have read and understand
                the Privacy Policy and the Terms and Conditions for Bookings and
                Transit with Fraser
              </p>
            </div>
            {/* {payment button} */}
            <div className="mt-4">
              <motion.button
                initial="initial"
                whileTap="tap"
                whileHover="hover"
                className="w-full h-[48px] lg:h-[40px] p-3 mt-4 text-sm font-medium bg-[#00ff6a] hover:bg-[#58FF9E] hover:bg-[#58FF9E] rounded-lg "
                onClick={payWithPaystack}
              >
                Proceed to pay
              </motion.button>

              {/* <Button
                title="Proceed to pay"
                className="w-full py-3 font-medium text-black bg-primary-100"
                onClick={payWithPaystack}
              /> */}
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={ModalStyle}>
                <SeatReservation />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
