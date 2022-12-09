import React from "react";
import { Helmet } from "react-helmet";
import {
	BsChevronDown,
	BsChevronUp,
	BsFillPersonFill,
	BsArrowRight,
} from "react-icons/bs";
import { MdPhoneInTalk } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import Layout from "../components/layouts/SignInLayout";
import { Modal, Box, Typography } from "@mui/material";
import { ModalStyle } from "../constants/styling";
import SeatReservation from "../components/SeatReservation";
import { Button } from "../components/Button";


const Checkout = () => {
	const [isView, setIsView] = React.useState<boolean>(false);
	const [show, setShow] = React.useState<boolean>(false);
	const [ open, setOpen ] = React.useState( false );

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleBookingToggle = () => {
		setShow(!show);
	};

	return (
		<Layout user="Amen" childClass="">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Checkout - Fraser</title>
			</Helmet>
			<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:mt-15 mt-10 lg:space-x-3">
				{/* {where to} */}
				<div className={`w-11/12 lg:w-[687px] ease-in-out duration-300`}>
					<div className="bg-white mb-5 flex  justify-between items-center px-8 py-6 ease-in-out duration-300">
						<h3 className="font-bold md:text-3xl text-2xl hidden lg:block">
							Checkout
						</h3>
						<h3 className="font-bold md:text-3xl text-2xl lg:hidden block">
							Your Details
						</h3>
						<div className="lg:hidden block">
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
						<div className="bg-white lg:mt-0 -mt-3 lg:py-12 p-8 rounded-md w-full">
							<div className="border-b border-[#EFF3EF] pb-5">
								<h2 className="font-medium md:text-base text-sm mb-3">
									Passenger Details
								</h2>
								<p className="text-[#949292] font-normal leading-5 md:text-sm text-xs">
									If you’re travelling with friends, book for them as well, and
									enjoy up to 10% discount on your next trip. We will prompt
									them to complete the process.
								</p>
							</div>
							<div className="flex mt-8 space-x-3 border-b border-[#EFF3EF] pb-6">
								<div className="flex items-center space-x-2 border border-[#E0E0E0] py-3 md:px-6 px-2 w-3/6">
									<BsFillPersonFill />
									<p className="text-xs md:text-base truncate">Olabode Amen</p>
								</div>
								<div className="flex items-center space-x-2 border border-[#E0E0E0] py-3 md:px-6 px-2 w-3/6">
									<MdPhoneInTalk />
									<p className="text-sm md:text-base truncate">09076736877</p>
								</div>
							</div>
							<div className="flex justify-center mt-5">
								<div className="flex items-center text-primary-200 space-x-2">
									<AiFillPlusCircle />
									<p className="text-sm md:text-base">Add new passenger</p>
								</div>
							</div>
						</div>
						{/* {seat reservation} */}
						<div className="bg-white mt-4 lg:py-12 p-8 rounded-md w-full">
							<div className="border-b border-[#EFF3EF] pb-2">
								<h2 className="font-medium md:text-base text-sm mb-3">
									Seat Reservation
								</h2>
							</div>
							<div className="flex items-center justify-between border border-[#E0E0E0] px-3 py-2">
								<div className="flex items-center space-x-2">
									<p className="text-sm md:text-base">Select preferred seat</p>
									<span className="text-primary-200 bg-primary-50 p-2 rounded-md md:text-sm text-xs">
										+NGN250
									</span>
								</div>
								<BsArrowRight />
							</div>
						</div>
						{/* {luggage weigh} */}
						<div className="bg-white mt-4 lg:py-12 p-8 rounded-md w-full">
							<div className="border-b border-[#EFF3EF] pb-4">
								<h2 className="font-medium md:text-base text-sm mb-3">
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
								{/* <div className="flex items-center space-x-2 border border-[#E0E0E0] py-2 px-6 w-3/6">
									<BsFillPersonFill />
									<p>Olabode Amen</p>
								</div> */}
								<input
									className="border border-[#E0E0E0] py-3 md:px-6 px-3.5 w-3/6 md:text-sm text-xs"
									placeholder="Estimated Height"
								/>
								<input
									className="border border-[#E0E0E0] py-3 md:px-6 px-3.5 w-3/6 md:text-sm text-xs"
									placeholder="Estimated Width"
								/>
							</div>
						</div>
					</div>
				</div>
				{/* {payment details} */}
				<div className="w-11/12 lg:w-[481px] my-5 lg:mt-0">
					<div className="bg-white lg:py-12 p-8 rounded-md w-full">
						<div className="border-b border-[#EFF3EF] pb-2">
							<h2 className="font-bold md:text-3xl text-2xl mb-3">
								Your booking
							</h2>
						</div>
						<div className="border-b border-[#EFF3EF] pb-3 mt-4 flex space-x-5 font-bold text-sm md:text-base">
							<p>1 Bus Ticket</p>
							<p>Tue, 4th Sept.</p>
						</div>
						{/* {location and time} */}
						<div className="mt-3 relative border-b border-[#EFF3EF] pb-6">
							<div className="text-[#949292] text-sm md:text-base flex space-x-8 items-center">
								<p>5:00 AM</p>
								<div className="h-2 w-2 rounded-full bg-primary-200"></div>
								<p>Lagos Bus Station</p>
							</div>
							<div className="h-4 border-l-[1.5px] border-primary-200 absolute left-[89.2px] md:left-24 top-5 md:top-6"></div>
							<div className="text-[#949292] text-sm md:text-base flex space-x-8 items-center mt-4">
								<p>7:00 AM</p>
								<div className="h-2 w-2 rounded-full bg-primary-200"></div>
								<p>Ibadan Bus Station</p>
							</div>
						</div>
						{/* {discount, subtotal and VAT} */}
						<div className="border-b border-[#EFF3EF] pb-6">
							<div className="flex justify-between mt-4 text-[#949292]">
								<p className="text-sm md:text-base ">Discount</p>
								<p className="text-sm md:text-base">-NGN 500.00</p>
							</div>
							<div className="flex justify-between mt-4">
								<p className="text-sm md:text-base ">Subtotal</p>
								<p className="text-sm md:text-base">NGN 4,500.00</p>
							</div>
							<div className="flex justify-between mt-4 text-[#949292]">
								<p className="text-sm md:text-base ">VAT(7.5%)</p>
								<p className="text-sm md:text-base">NGN 337.50</p>
							</div>
						</div>
						{/* {total} */}
						<div className="flex justify-between mt-4 border-b border-[#EFF3EF] pb-6">
							<p className="text-sm md:text-base font-bold">Total</p>
							<p className="text-sm md:text-base font-bold">NGN 4,737.50</p>
						</div>
					</div>
					{/* {terms & conditions} */}
					<div className="mt-4 md:-mt-2 md:px-8 px-4 bg-white py-4 rounded-md md:rounded-b-md">
						<div className="flex items-start space-x-2">
							<div>
								<input type="checkbox" />
							</div>
							<p className="text-xs md:text-sm lg:text-base">
								I declare to have read the Privacy Policy and I agree to the T&C
								of Booking and T&C of Carriage
							</p>
						</div>
						{/* {payment button} */}
						<div className="mt-4">
							<Button
								title="Proceed to pay"
								className="bg-primary-100 py-3 w-full text-black font-medium"
								onClick={handleOpen}
							/>
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
