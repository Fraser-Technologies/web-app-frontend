import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { usePaystackPayment } from "react-paystack";
import Layout from "../../components/layouts/SignInLayout";
import { Modal, Box } from "@mui/material";
import { ModalStyle } from "../../constants/styling";
import SeatReservation from "../../components/SeatReservation";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Alert, Form, Input, message } from "antd";
import {
	emptyMyBooking,
	verifyPaymentAction
} from "../../state/action/booking.action";
import { useNavigate } from "react-router-dom";
import GeometricPatterns from "../../components/GeometricPatterns";
import { RootState } from "../../state/redux-store";
import { currency_formatter } from "../../utils/currency-formatter";
import { FraserButton } from "../../components/Button";
import { getUserByDiscountCodeAction } from "../../state/action/discountAction";

interface FormData {
	name: string;
	phone: string;
}

// const couponCodes = [
// 	{
// 		Description: "First Ride",
// 		Code: "NEW15",
// 		value: 25,
// 	},
// 	{
// 		Description: "Referral",
// 		Code: "REF210",
// 		value: 25,
// 	},
// 	{
// 		Description: "Easter",
// 		Code: "EA124",
// 		value: 25,
// 	},
// ];

const Checkout = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [check, setCheck] = useState<boolean>(false);
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [show, setShow] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const [alertMessage, setAlertMessage] = useState<string>("");
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
	const { myBooking } = useAppSelector((state: RootState) => state.booking);
	const { app_type } = useAppSelector((state: RootState) => state.appState);
	const { user: couponOwner, loading: getCouponLoading } = useAppSelector(
		(state: RootState) => state.userByDiscountCode
	);
	const [formData, setFormData] = useState<FormData[]>([]);

	const [couponCode, setCouponCode] = useState("");
	const [discountPercentage, setDiscountPercentage] = useState(0);

	const newUser = userInfo?.bookings?.length === 0;
	// useEffect(() => {
	// 	if (newUser) {
	// 		setCouponCode("NEW15");
	// 		setDiscountPercentage(15);
	// 	}
	// }, [newUser]);

	const [discountalert, showDiscountAlert] = useState(false);
	const [alertType, setAlertType] = useState<"success" | "error">("success");

	const applyCoupon = () => {
		dispatch(
			getUserByDiscountCodeAction({
				code: couponCode,
				ticket_amount: myBooking?.price,
				number_of_booking: myBooking?.no_of_ticket
			})
		);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleBookingToggle = () => {
		setShow(!show);
	};

	const config = {
		reference: new Date().getTime().toString(),
		email: userInfo?.email || "contact@ridefrser.com",
		amount:
			Number(
				myBooking?.no_of_ticket * myBooking?.price -
					myBooking?.no_of_ticket * myBooking?.price * discountPercentage
			) * 100,
		publicKey:
			app_type === "production"
				? process.env.REACT_APP_PAYSTACK_KEY
				: process.env.REACT_APP_PAYSTACK_TEST_KEY
	};

	const initializePayment = usePaystackPayment(config as any);

	const onSuccess = () => {
		dispatch(verifyPaymentAction(myBooking, formData));
		message.info("Your ride has been booked successfully!");
		navigate("/");
		dispatch(emptyMyBooking());
	};

	const onClose = () => {
		messageApi.open({
			type: "error",
			content: "An error occured while trying to pay"
		});
	};

	const payWithPaystack = () => {
		if (!check) {
			return setShowAlert(true);
		}
		initializePayment(onSuccess, onClose);
	};

	useEffect(() => {
		if (!myBooking) {
			navigate(-1);
		}
	}, [myBooking, navigate]);

	useEffect(() => {
		// showDiscountAlert(false);
		if (couponOwner?.discount_code?.active) {
			showDiscountAlert(true);
			setAlertType("success");
			setAlertMessage(
				`You have applied a coupon of ${
					couponOwner?.discount_code?.discount_percent * 100
				}% discount`
			);
			setDiscountPercentage(couponOwner?.discount_code?.discount_percent);
		} else if (!couponOwner?.discount_code?.active) {
			showDiscountAlert(true);
			setAlertType("error");
			setAlertMessage("Invalid or expired coupon");
		} else {
			showDiscountAlert(true);
			setAlertType("success");
			setAlertMessage("You have applied 0% discount");
			setDiscountPercentage(0);
		}
	}, [couponOwner]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const data = [...formData];
		data[index] = {
			...data[index],
			[e.target.name]: e.target.value
		};
		setFormData(data);
	};

	const inputFields = [];

	for (let i = 0; i < myBooking?.no_of_ticket; i++) {
		inputFields.push(
			<Form.Item key={i}>
				<div className="flex w-full lg:space-x-3">
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
							required
						/>
					</div>
					<div className="w-full">
						<div className="mb-1">
							<label className="text-gray-500">Phone Number</label>
						</div>
						<Input
							className="w-full h-10 hover:border-green-500 active:border-green-600 focus:border-green-600"
							placeholder="Phone"
							name="phone"
							value={formData[i]?.phone || ""}
							onChange={(e) => handleInputChange(e, i)}
							required
						/>
					</div>
				</div>
			</Form.Item>
		);
	}

	return (
		<Layout
			title="Book Affordable Intercity Bus Rides in Nigeria | RideFraser.com | Checkout"
			pageDescription="Book affordable and comfortable intercity bus rides in Nigeria on RideFraser.com. Our buses are equipped with modern amenities to make your journey pleasant."
			pageKeywords="intercity bus booking, affordable bus rides, comfortable journey, modern amenities, Nigeria transportation, online booking, RideFraser.com, Fraser, intercity bus, Nigeria, ride booking, transportation, travel, comfort, style, RideFraser.com, intercity bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser">
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

							<div className="mt-8">{inputFields}</div>
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
							<div> {myBooking?.no_of_ticket} Bus Ticket</div>
							<div>{myBooking?.take_off_date}.</div>
						</div>
						{/* {location and time} */}
						<div className="mt-3 relative border-b border-[#EFF3EF] pb-6">
							<div className="text-[#949292] text-sm flex space-x-8 items-center">
								<div>{myBooking?.take_off_time}</div>
								<div className="w-2 h-2 rounded-full bg-primary-200"></div>
								<div>{`${myBooking?.travel_destination?.from?.start_busstop}, ${myBooking?.travel_destination?.from?.city?.city}`}</div>
							</div>
							<div className="h-4 border-l-[1.5px] ml-20 border-primary-200 mt-2 "></div>
							<div className="text-[#949292] text-sm flex space-x-8 items-center mt-2">
								<div>{myBooking?.arrival_time}</div>
								<div className="w-2 h-2 rounded-full bg-primary-200"></div>
								<div>{`${myBooking?.travel_destination?.to?.stop_busstop}, ${myBooking?.travel_destination?.to?.city?.city}`}</div>
							</div>
						</div>

						<div className="my-6 mr-8">
							<div className="flex">
								<Input
									className="w-full h-10 mr-4 hover:border-green-500 active:border-green-600"
									placeholder="Discount Code"
									value={couponCode}
									required={true}
									onChange={(e) => setCouponCode(e.target.value)}
								/>
								<FraserButton
									title={"Apply"}
									size={"small"}
									active={couponCode !== ""}
									onClick={applyCoupon}
									loader={getCouponLoading}
								/>
							</div>
							{discountalert && (
								<Alert
									type={alertType}
									closable={true}
									className="mt-4"
									message={alertMessage}
								/>
							)}
							<div className="flex text-[14px] mt-4 ">
								<p className="mr-2 text-[14px] font-medium text-gray-700 ">
									Don't have a discount code?
								</p>
								<div
									className="text-blue-500"
									onClick={() => {
										navigator.clipboard.writeText(`${userInfo?.referral_code}`);
										alert(
											`Referral code ${userInfo?.referral_code} has been copied to clipboard!`
										);
									}}>
									{" "}
									Share
								</div>
							</div>

							<p className="text-[12px] text-gray-500 mt-1 ">
								Share your code with friends and get up to 25% discount when
								they signup.
							</p>
						</div>

						{/* {discount, subtotal and VAT} */}
						<div className="border-y border-[#EFF3EF] pb-6">
							<div className="flex justify-between mt-4 mr-8">
								<p className="text-base ">Subtotal</p>
								<p className="text-base">
									{currency_formatter(
										myBooking?.no_of_ticket * myBooking?.price
									)}
								</p>
							</div>
							<div className="flex justify-between mt-4 mr-8">
								<div className="flex">
									<p className="text-base ">Discounts</p>

									{/* {alertMessage === "success" &&
										couponDescription !== "Coupon code not found" && (
											<div className="ml-2 bg-[#ffefc1] text-[#756031] border border-[#ffe28d] rounded-md px-2 py-1 text-sm">
												{couponDescription}
											</div>
										)} */}
								</div>
								<p className="text-base">
									{currency_formatter(
										myBooking?.no_of_ticket *
											myBooking?.price *
											discountPercentage
									)}
								</p>
							</div>
						</div>

						{/* {total} */}
						<div className="flex justify-between mt-4 border-b border-[#EFF3EF] pb-8 mr-8">
							<p className="text-lg font-bold md:text-lg">Total</p>
							<p className="text-lg font-bold md:text-lg">
								{currency_formatter(
									myBooking?.no_of_ticket * myBooking?.price -
										myBooking?.no_of_ticket *
											myBooking?.price *
											discountPercentage
								)}
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
									onClick={() => navigate("/termsofservice")}>
									Terms of Service{" "}
								</button>{" "}
								for Bookings and Transit with Fraser
							</p>
						</div>
						{/* {payment button} */}

						<FraserButton
							title="Proceed to Payments"
							size="regular"
							onClick={payWithPaystack}
							className={"w-full mt-8"}
						/>

						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description">
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
