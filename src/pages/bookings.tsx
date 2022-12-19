import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import BookingCard from "../components/bookingCard";
import Layout from "../components/layouts/SignInLayout";
import { getAllBusStop } from "../state/action/bus.action";
import {
	getAllAvailableTripAction,
	getAvailableTripAction,
} from "../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { justHoverAnimation, zoomOutAnimation } from "../utils/animation";
import { motion } from "framer-motion";
import { Alert, Spin } from "antd";
import { addToMyBookinAction } from "../state/action/booking.action";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Bookings = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [show, setShow] = React.useState<boolean>(false);
	const [from, setFrom] = useState<string>("");
	const [to, setTo] = useState<string>("");
	const [lag, setLag] = useState<string>("lagos");

	const { busStops } = useAppSelector((state: any) => state.allBusStop);

	const {
		loading: availableTripLoading,
		error: availableTripError,
		trips: availableTripData,
	} = useAppSelector((state: any) => state.availableTrip);
	// const { trips: allAvailableTripData } = useAppSelector(
	// 	(state: any) => state.allAvailableTrip
	// );

	const handleBookingToggle = () => {
		setShow(!show);
	};

	const FindAvailableTrip = () => {
		if (from && to) {
			dispatch(getAvailableTripAction({ from: from, to: to }));
		} else {
			dispatch(getAllAvailableTripAction());
		}
	};

	useEffect(() => {
		if (!availableTripData) {
			dispatch(getAllAvailableTripAction());
		}
	}, [availableTripData, dispatch]);

	useEffect(() => {
		if (busStops?.length === 0) {
			dispatch(getAllBusStop());
		}
	}, [busStops, dispatch]);

	return (
		<Layout user="Amen" childClass="">
			<Helmet>
				<meta charSet="utf-8" />
				<title>BookRide - Fraser</title>
			</Helmet>

			<div className="flex flex-col items-center justify-center mt-10 lg:flex-row lg:items-start lg:mt-15 lg:space-x-3 ">
				<div className="flex items-center justify-between w-11/12 px-8 py-4 duration-300 ease-in-out bg-white lg:hidden">
					<h3 className="text-xl font-bold ">
						Booking <span> {availableTripLoading && <FaSpinner />}</span>
					</h3>
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
						`}>
					<div className="w-full px-8 pt-2 -mt-3 bg-white rounded-md lg:mt-0 lg:py-12">
						<p className="text-sm text-[#949292] hidden lg:block">
							Move, the convenient and affordable way.
						</p>
						<div className="border-b border-[#EFF3EF] pb-10">
							<div className="flex flex-col w-full mt-2 mb-2">
								<h3> Coming from </h3>
								<motion.select
									variants={zoomOutAnimation}
									initial="initial"
									whileHover="hover"
									value={lag as any}
									onChange={(e) => setLag(e.target.value)}
									id="comingFrom"
									className="w-full py-3 px-2 rounded-sm">
									<motion.option
										variants={justHoverAnimation}
										initial="initial"
										whileHover="hover"
										value={"lagos"}
										className="py-3 h-8">
										Lagos
									</motion.option>
									<motion.option
										variants={justHoverAnimation}
										initial="initial"
										whileHover="hover"
										value={"ibadan"}>
										Ibadan
									</motion.option>
								</motion.select>
							</div>

							<div className="flex flex-col h-auto max-h-40">
								{lag === "lagos" ? (
									<>
										<label className="mt-5">Start bus stop</label>
										<motion.select
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											value={from}
											onChange={(e) => setFrom(e.target.value)}
											name="bus stop"
											id="busStops"
											className="w-full py-3 px-2 rounded-sm">
											<option value={""}>From where</option>

											{busStops?.map((bs: any) => {
												if (bs?.state !== "Ibadan") {
													return (
														<option
															value={bs?._id}
															className="w-full  px-2 rounded-sm">
															{bs.name},{bs?.state}
														</option>
													);
												}
											})}
										</motion.select>
										<label className="mt-5">Destination bus stop</label>
										<motion.select
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											name="bus stop"
											id="busStops"
											className="w-full py-3 px-2 rounded-sm"
											value={to}
											onChange={(e) => setTo(e.target.value)}>
											<option value={""}>Choose your destination</option>
											{busStops?.map((bs: any) => {
												if (bs?.state === "Ibadan") {
													return (
														<option value={bs?._id} className="py-2">
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
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											name="bus stop"
											id="busStops"
											className="w-full py-3 px-2 rounded-sm"
											value={from}
											onChange={(e) => setFrom(e.target.value)}>
											<option value={""}>From where </option>
											{busStops?.map((bs: any) => {
												if (bs?.state === "Ibadan") {
													return (
														<option value={bs._id} className="py-2">
															{bs.name},{bs?.state}
														</option>
													);
												}
											})}
										</motion.select>

										<label className="mt-5">Destination bus stop</label>
										<motion.select
											variants={zoomOutAnimation}
											initial="initial"
											whileHover="hover"
											value={to}
											onChange={(e) => setTo(e.target.value)}
											name="bus stop"
											className="w-full py-3 px-2 rounded-sm ">
											<option value={""}> Choose your destination</option>

											{busStops?.map((bs: any) => {
												if (bs?.state !== "Ibadan") {
													return (
														<option value={bs?._id} className="py-2">
															{bs.name},{bs?.state}
														</option>
													);
												}
											})}
										</motion.select>
									</>
								)}

								<motion.button
									variants={zoomOutAnimation}
									initial={"initial"}
									whileHover={"hover"}
									whileTap={"tap"}
									onClick={FindAvailableTrip}
									className="w-full h-10 py-2 mt-10 text-white bg-green-500 hover:cursor-pointer hover:shadow-md">
									See available trips
								</motion.button>
							</div>
						</div>
					</div>
				</div>
				{/* {trip details} */}
				<div className="w-11/12 lg:w-[680px] my-5 lg:mt-0">
					<div className="w-full px-0 overflow-y-scroll rounded-md lg:bg-white lg:py-12 lg:px-8 h-full">
						<div className="flex flex-row w-full px-4 py-5 mr-2 rounded-lg ">
							<motion.h5
								variants={zoomOutAnimation}
								initial={"initial"}
								whileHover={"hover"}
								whileTap={"tap"}
								className="flex justify-center w-full p-1 px-3 font-bold bg-green-500 rounded-full aligns-center hover:cursor-pointer"
								onClick={FindAvailableTrip}>
								Available Trips
							</motion.h5>

							<span className="ml-4">
								{availableTripLoading && (
									<>
										<Spin size="small" />
									</>
								)}
							</span>
						</div>
						{availableTripData?.length === 0 && (
							<Alert
								type="info"
								message="Sorry there are no avialable trip going to this destination "
							/>
						)}
						{availableTripError && (
							<Alert
								message="An error occoured"
								description={availableTripError}
								type="error"
								showIcon
							/>
						)}

						{availableTripData?.map((trip: any) => {
							return (
								<BookingCard
									key={trip?._id}
									from={`${trip?.travel_destination?.from?.name} 
										${trip?.travel_destination?.from?.state}`}
									to={`${trip?.travel_destination?.to?.name}, ${trip?.travel_destination?.to?.state}`}
									takeOffTime={trip?.take_off_time}
									takeOffDate={trip?.take_off_date}
									price={trip?.price}
									arrivalTime={trip?.arrival_time}
									arrivalDate={trip?.arrival_date}
									onClick={() => {
										dispatch(addToMyBookinAction(trip));
										navigate("/checkout");
									}}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Bookings;
