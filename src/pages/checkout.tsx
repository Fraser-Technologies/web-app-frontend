import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp, BsFillPersonFill } from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import { usePaystackPayment } from "react-paystack";
import Layout from "../components/layouts/SignInLayout";
import { Modal, Box } from "@mui/material";
import { ModalStyle } from "../constants/styling";
import SeatReservation from "../components/SeatReservation";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Alert, Form, Input, message } from "antd";
import {
  emptyMyBooking,
  verifyPaymentAction,
} from "../state/action/booking.action";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GeometricPatterns from "../components/GeometricPatterns";
import { RootState } from "../state/redux-store";
import { currency_formatter } from "../utils/currency-formatter";

interface FormData {
  name: string;
  phoneNumber: string;
}

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [check, setCheck] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
  const { myBooking } = useAppSelector((state: RootState) => state.booking);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookingToggle = () => {
    setShow(!show);
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userInfo?.email || "contact@ridefrser.com",
    amount: Number(myBooking?.no_of_ticket * myBooking?.price) * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
  };

  const initializePayment = usePaystackPayment(config as any);

  const onSuccess = () => {
    dispatch(verifyPaymentAction(myBooking));
    message.info("Your ride has been successfully booked!");
    navigate("/");
    dispatch(emptyMyBooking());
  };

  const onClose = () => {
    messageApi.open({
      type: "error",
      content: "An error occured while trying to pay",
    });
  };

  const payWithPaystack = () => {
    if (!check) {
      return setShowAlert(true);
    }

    initializePayment(onSuccess, onClose);
  };

  //DATE FORMATTING
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const [, day, month, year] = myBooking?.take_off_date.match(dateRegex) || [];

  const newDay = String(day);
  let ordinalDay;
  if (newDay.endsWith("1")) {
    ordinalDay = newDay + "st";
  } else if (newDay.endsWith("2")) {
    ordinalDay = newDay + "nd";
  } else if (newDay.endsWith("3")) {
    ordinalDay = newDay + "rd";
  } else {
    ordinalDay = newDay + "th";
  }

  let monthName;
  switch (month) {
    case "01":
      monthName = "Jan.";
      break;
    case "02":
      monthName = "Feb.";
      break;
    case "03":
      monthName = "Mar.";
      break;
    case "04":
      monthName = "Apr.";
      break;
    case "05":
      monthName = "May";
      break;
    case "06":
      monthName = "June";
      break;
    case "07":
      monthName = "July";
      break;
    case "08":
      monthName = "Aug.";
      break;
    case "09":
      monthName = "Sept.";
      break;
    case "10":
      monthName = "Oct.";
      break;
    case "11":
      monthName = "Nov.";
      break;
    case "12":
      monthName = "Dec.";
      break;
  }

  useEffect(() => {
    if (!myBooking) {
      navigate(-1);
    }
  }, [myBooking, navigate]);

  const [formData, setFormData] = useState<FormData[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const data = [...formData];
    data[index] = {
      ...data[index],
      [e.target.name]: e.target.value,
    };
    setFormData(data);
  };

  const inputFields = [];

  for (let i = 0; i < myBooking?.no_of_ticket; i++) {
    inputFields.push(
      <Form.Item key={i}>
        <div className="w-full flex lg:space-x-3">
          <div className="w-full">
            <div className="mb-1">
              <label className="text-gray-500">Name</label>
            </div>
            <Input
              className="w-full h-10 hover:border-green-500 active:border-green-600 focus:border-green-600"
              placeholder="Name"
              name="name"
              value={formData[i]?.name || ""}
              onChange={(e) => handleInputChange(e, i)}
            />
          </div>
          <div className="w-full">
            <div className="mb-1">
              <label className="text-gray-500">Phone Number</label>
            </div>
            <Input
              className="w-full h-10 hover:border-green-500 active:border-green-600 focus:border-green-600"
              placeholder="Phone"
              name="phoneNumber"
              value={formData[i]?.phoneNumber || ""}
              onChange={(e) => handleInputChange(e, i)}
            />
          </div>
        </div>
      </Form.Item>
      //   <div key={i}>
      //     <label htmlFor={`name-${i}`}>Name {i + 1}:</label>
      //     <input
      //       id={`name-${i}`}
      //       type="text"
      //       name="name"
      //       value={formData[i]?.name || ""}
      //       onChange={(e) => handleInputChange(e, i)}
      //     />
      //     <label htmlFor={`phone-${i}`}>Phone {i + 1}:</label>
      //     <input
      //       id={`phone-${i}`}
      //       type="text"
      //       name="phoneNumber"
      //       value={formData[i]?.phoneNumber || ""}
      //       onChange={(e) => handleInputChange(e, i)}
      //     />
      //     <Input
      //       id={`name-${i}`}
      //       className="w-full h-10 hover:border-green-500 active:border-green-600 focus:border-green-600"
      //       placeholder="Passenger Name"
      //       type="text"
      //       value={formData[i]?.name || ""}
      //       required={true}
      //       onChange={(e) => {
      //         handleInputChange(e, i);
      //       }}
      //     />
      //   </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Layout title="Checkout - Fraser">
      {contextHolder}
      <div className="relative h-24 bg-black -z-10 lg:h-40">
        <GeometricPatterns />
      </div>
      <div className="z-10 flex flex-col w-full pb-48 lg:pb-0 lg:flex-row lg:mt-15">
        <div className="h-full mx-4 -mt-16 duration-300 ease-in-out lg:ml-16 lg:-mt-32 lg:mr-8 lg:w-7/12">
          <div className="flex py-6 px-6 md:mt-[30px] lg:mt-16 mb-5 rounded-md items-center justify-between duration-300 ease-in-out bg-white">
            <h3 className="text-lg font-semibold md:text-lg">Checkout</h3>

            <div className="block lg:hidden">
              {!show ? (
                <BsChevronDown
                  onClick={handleBookingToggle}
                  className="cursor-pointer stroke-2 lg:hidden"
                />
              ) : (
                <BsChevronUp
                  onClick={handleBookingToggle}
                  className="cursor-pointer stroke-2 lg:hidden"
                />
              )}
            </div>
          </div>
          <div className={`${!show ? "hidden" : "block"} lg:block`}>
            {/* {passenger details} */}
            <div className="w-full p-8 mb-6 -mt-3 bg-white rounded-md lg:mt-0 lg:pb-12 lg:pt-6">
              <div className="pb-4 border-b border-[#EFF3EF]">
                <h2 className="hidden mb-4 text-base font-semibold md:block md:text-base">
                  Your Details
                </h2>
                <p className="text-[#949292] w-11/12 lg:w-5/6 font-normal md:leading-4 md:text-sm text-sm lg:text-xs">
                  Ready to set off on your adventure? Confirm your details
                  below, proceed to finalize your reservation and start packing
                  your bags!
                </p>
              </div>

              <div className="mt-8">
			  {inputFields}
			  </div>
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
          <div className="px-6 pt-6 pb-8 mx-4 bg-white rounded-md lg:mx-0 lg:w-full lg:-mt-32">
            <div className="border-b border-[#EFF3EF] pb-2">
              <h2 className="mb-2 text-lg font-semibold lg:mb-4 md:text-lg lg:block">
                Your booking
              </h2>
            </div>
            <div className="border-b border-[#EFF3EF] pb-3 mt-4 flex space-x-5 font-semibold text-base md:text-base">
              {/* LEKAN, THIS WOULD BE DYNAMIC NOW */}
              <p> {myBooking?.no_of_ticket} Bus Ticket</p>
              <p>{myBooking?.take_off_date}.</p>
            </div>
            {/* {location and time} */}
            <div className="mt-3 relative border-b border-[#EFF3EF] pb-6">
              <div className="text-[#949292] text-sm flex space-x-8 items-center">
                <p>{myBooking?.take_off_time}</p>
                <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                <p>{`${myBooking?.travel_destination?.from?.start_busstop}, ${myBooking?.travel_destination?.from?.city?.city}`}</p>
              </div>
              <div className="h-4 border-l-[1.5px] ml-20 border-primary-200 mt-2 "></div>
              <div className="text-[#949292] text-sm flex space-x-8 items-center mt-2">
                <p>{myBooking?.arrival_time}</p>
                <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                <p>{`${myBooking?.travel_destination?.to?.stop_busstop}, ${myBooking?.travel_destination?.to?.city?.city}`}</p>
              </div>
            </div>
            {/* {discount, subtotal and VAT} */}
            <div className="border-b border-[#EFF3EF] pb-6">
              {/* <div className="flex justify-between mt-4 text-[#949292]">
								<p className="text-sm md:text-base ">Discount</p>
								<p className="text-sm md:text-base">-NGN 500.00</p>
							</div> */}
              <div className="flex justify-between mt-4 mr-8">
                <p className="text-base ">Subtotal</p>
                <p className="text-base">
                  {currency_formatter(
                    myBooking?.no_of_ticket * myBooking?.price
                  )}
                </p>
              </div>
              {/* <div className="flex justify-between mt-4 mr-8 text-[#949292]">
                <p className="text-sm md:text-xs ">VAT(7.5%)</p>
                <p className="text-sm md:text-xs">
                  NGN {vAT.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")}
                </p>
              </div> */}
            </div>

            {/* {total} */}
            <div className="flex justify-between mt-4 border-b border-[#EFF3EF] pb-8 mr-8">
              <p className="text-lg font-bold md:text-lg">Total</p>
              <p className="text-lg font-bold md:text-lg">
                {currency_formatter(myBooking?.no_of_ticket * myBooking?.price)}
              </p>
            </div>
          </div>

          {/* {terms & conditions} */}
          <div className="fixed bottom-0 w-full lg:static pl-8 pr-12 pt-4 pb-12 bg-white border-t border-[#EFF3EF] rounded-md md:-mt-12 md:rounded-b-md">
            {showAlert && (
              <Alert
                message="Kindly confirm the terms and conditions"
                type="error"
                showIcon
                className="bg-blue-50 w-full text-[0.8rem] mb-4 font-normal border-blue-200 text-blue-500 px-4 py-3 rounded relative mt-4"
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
              <p className="text-sm lg:text-sm w-11/12 pr-2 text-[#949292] md:leading-4">
                By checking this box, I confirm that I have read and understand
                the{" "}
                <button
                  className="text-blue-500"
                  onClick={() => navigate("/termsofservice")}
                >
                  Terms of Service{" "}
                </button>{" "}
                for Bookings and Transit with Fraser
              </p>
            </div>
            {/* {payment button} */}
            <div className="mt-4">
              <motion.button
                initial="initial"
                whileTap="tap"
                whileHover="hover"
                className="w-full h-[48px] lg:h-[48px] p-3 mt-4 text-xs lg:text-sm font-medium bg-[#00ff6a] hover:bg-[#58FF9E]  rounded-lg "
                onClick={payWithPaystack}
              >
                Proceed to Payments
              </motion.button>
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
