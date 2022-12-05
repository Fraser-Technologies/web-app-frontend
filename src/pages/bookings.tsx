import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layouts/SignInLayout";
import { FaBus } from "react-icons/fa";
import { BsCalendarDate, BsArrowRight } from "react-icons/bs";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Button } from "../components/Button";

const Bookings = () => {
	const [isView, setIsView] = React.useState<boolean>(false);
	const [show, setShow] = React.useState<boolean>(false);

	const handleAvailableTrips = () => {
		setIsView(true);
	};

	const handleBookingToggle = () => {
		setShow(!show);
	};

	return (
		<Layout user="Amen" childClass="">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Bookings - Fraser</title>
			</Helmet>
			{isView === false ? (
				//first view
				<div className="flex flex-col justify-center items-center w-full h-full">
					<div className="w-11/12 sm:w-3/5 lg:w-2/5 mt-10 mb-10">
						<div className="bg-white py-12 px-8 rounded-md w-full">
							<div className="border-b border-[#EFF3EF] pb-10">
								<h1 className="text-3xl font-semibold leading-[54px] tracking-[-5%]">
									Where to?
								</h1>
								<div className="relative">
									<div className="mt-6 relative">
										<input
											type="text"
											placeholder="Where are you?"
											className="w-full h-12 px-4 pl-12 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
										/>
										<FaBus className="top-4 left-3 absolute" />
									</div>
									<div className="border-l border-black h-10 absolute z-50 top-9 left-5"></div>
									<div className="mt-4 relative">
										<input
											type="text"
											placeholder="Where are you going to?"
											className="w-full h-12 px-4 pl-12 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
										/>
										<FaBus className="top-4 left-3 absolute" />
									</div>
								</div>
							</div>
							<div className="mt-8 border-b border-[#EFF3EF] pb-10">
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
											className="pl-8 pr-2 py-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
										/>

										<BsCalendarDate className="top-3 ml-1 left-2 absolute text-sm" />
									</div>
								</div>
							</div>
							<Button
								title="See available trips"
								className="w-full h-[52px] bg-[#f4f4f4] mt-10 text-sm"
								onClick={handleAvailableTrips}
							/>
						</div>
					</div>
				</div>
			) : (
				//second view
				<div className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:mt-15 mt-10 lg:space-x-3">
					<div className="bg-white w-11/12 flex lg:hidden justify-between items-center px-8 py-4 ease-in-out duration-300">
						<h3 className="font-bold text-xl ">Booking</h3>
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
					{/* {where to} */}
					<div
						className={`w-11/12 lg:w-[481px] ease-in-out duration-300 lg:block
							${show === false ? "hidden" : "block"}
						`}
					>
						<div className="bg-white lg:mt-0 -mt-3 pt-2 lg:py-12 px-8 rounded-md w-full">
							<p className="text-sm text-[#949292] hidden lg:block">
								Move, the convenient and affordable way.
							</p>
							<div className="border-b border-[#EFF3EF] pb-10">
								<div className="relative">
									<div className="mt-6 relative">
										<input
											type="text"
											placeholder="Where are you?"
											className="w-full h-12 px-4 pl-12 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
										/>
										<FaBus className="top-4 left-3 absolute" />
									</div>
									<div className="border-l border-black h-10 absolute z-50 top-9 left-5"></div>
									<div className="mt-4 relative">
										<input
											type="text"
											placeholder="Where are you going to?"
											className="w-full h-12 px-4 pl-12 rounded-md border border-gray-300 focus:outline-none focus:border-green-500"
										/>
										<FaBus className="top-4 left-3 absolute" />
									</div>
								</div>
							</div>
							<div className="mt-8 lg:border-b lg:border-[#EFF3EF] pb-10">
								<h1 className="lg:text-3xl md:text-2xl font-semibold leading-[54px] tracking-[-5%] lg:hidden block">
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
											className="pl-8 pr-2 py-2 text-sm border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
										/>

										<BsCalendarDate className="top-3 ml-1 left-2 absolute text-sm" />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* {trip details} */}
					<div className="w-11/12 lg:w-[680px] my-5 lg:mt-0">
						<div className="lg:bg-white lg:py-12 lg:px-8 px-0 rounded-md w-full">
							<div className="flex justify-between lg:justify-start space-x-4 mb-8">
								<Button
									title="Cheapest"
									className="w-2/5 sm:w-1/6 py-2 md:text-sm text-xs border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
								/>
								<Button
									title="Fastest"
									className="w-2/5 sm:w-1/6 py-2 md:text-sm text-xs border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
								/>
								<Button
									title="Earliest"
									className="w-2/5 sm:w-1/6 py-2 md:text-sm text-xs border rounded-3xl hover:bg-primary-100 focus:outline-none focus:bg-primary-100"
								/>
							</div>
							<div className="bg-black flex lg:px-8 px-3 py-5 rounded-lg justify-between">
								<div className="flex justify-between md:space-x-8 space-x-4 relative">
									<div>
										<h3 className="md:text-lg text-xs text-primary-100 mb-2">
											Lagos
										</h3>
										<div className="text-white md:text-sm text-xs">
											<p>06:00</p>
											<p>Wednesday, 3rd Sept</p>
										</div>
									</div>
									<BsArrowRight className="text-primary-100 absolute md:top-2 top-0 left-10 md:left-20" />
									<div>
										<h3 className="md:text-lg text-xs text-primary-100 mb-2">
											Ibadan
										</h3>
										<div className="text-white md:text-sm text-xs">
											<p>07:00</p>
											<p>Wednesday, 3rd Sept</p>
										</div>
									</div>
								</div>
								<div className="border-r my-2 md:mr-0 mr-2"></div>
								<div className="flex flex-col  mb-2">
									<p className="text-primary-100 md:text-lg text-sm font-semibold mb-2">
										NGN 2,500
									</p>
									<Button
										title="Continue"
										className="bg-primary-100 text-black text-sm md:py-2 py-1 md:px-5 px-2"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Bookings;
