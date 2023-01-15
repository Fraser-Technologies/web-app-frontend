import Offeringcard from "../components/offeringcard";
import StepComp from "../components/StepComp";
import Accordion from "../components/Accordion";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { _paths_ } from "../utils/appHelpers";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getAllBusStopAction } from "../state/action/busStop.action";
import { useEffect } from "react";

const LandingPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { busStops } = useAppSelector((state: any) => state.allBusStop);

	useEffect(() => {
		if (!busStops?.length) {
			dispatch(getAllBusStopAction());
		}
	}, [busStops?.length, dispatch]);
	return (
		<div className="flex flex-col min-w-full">
			{/* The nav bar session */}
			<div className="flex flex-row items-center justify-between w-full p-5 md:px-10">
				<img
					alt=""
					src={"/assets/images/logo-no-icon.png"}
					className="w-[100px] h-[25px] hover:cursor-pointer"
				/>

				<div className=" flex flex-row md:w-[65%]  items-center justify-between">
					<div className=" flex-row md:flex hidden justify-around w-[65%]">
						<p className="nav-item">Home</p>

						<p className="nav-item">Partners</p>

						<p className="nav-item">About</p>
					</div>

					<Button
						title="Book a Ride"
						onClick={() => navigate(_paths_.BOOKRIDE)}
					/>
				</div>
			</div>

			{/*  The Hero session*/}
			<div className="w-full md:h-[500px] h-[400px] bg-heroImage object-cover flex flex-col back md:pl-[50px] px-10px justify-center md:items-start items-center">
				<h1 className="whiteText  md:text-[60px] sm:text-[45px] text-[30px] md:text-left text-center font-semibold leading-[60px] spacing-[normal]  ">
					Move Freely
					<br /> between cities
				</h1>
				<h3 className="whiteText md:text-[20px] sm:text-[15px] w-[60%] text-[13px] md:w-[35%]  md:text-left text-center mt-[20px] font-light">
					Do you want to travel between cities comfortably, conveniently and
					affordably, use Fraser.
				</h3>

				<div className="flex flex-row items-center justify-around w-full mt-10 md:w-auto sm:justify-center ">
					<span>
						<Button
							title="Book a ride"
							onClick={() => navigate(_paths_.BOOKRIDE)}
						/>
					</span>

					<span className="sm:ml-10 ">
						<Button
							title="Partner with us"
							onClick={() => navigate(_paths_.BOOKRIDE)}
						/>
					</span>
				</div>
			</div>

			{/* Intra city bus */}
			<div className="landingpageSessionPadding mt-[60px]">
				<h1 className="blackText  md:text-[60px] sm:text-[45px] text-[30px] md:text-left text-center font-semibold leading-[60px] spacing-[normal]  ">
					We Offer intercity bus <br />
					trip that are
				</h1>

				<div className="flex flex-row flex-wrap w-full mt-10 md:flex-nowrap">
					<Offeringcard
						title="Safe"
						subtitle="Lorem ipsum dolor sit amet consectetur. Erat egestas suspendisse
            sodales amet phasellus aliquet pulvinar morbi malesuada. Pretium
            elit at integer eget arcu diam id. Et risus diam fames nulla at
            faucibus."
					/>
					<Offeringcard
						title="Comfy"
						subtitle="Our mission is to offer you an affordable and easy way of traveling, without compromising on quality. On board our buses you always have a guaranteed seat, assigned for free when you book your ticket. Additionally, you get to enjoy free Wi-Fi and our Entertainment portal."
					/>
					<Offeringcard
						title="Affordable"
						subtitle="Traveling with Fraser is  affordable. We are ready to take you to your next destination. Get guaranteed seats for as low as NGN 1,000.

              At our core, we are deeply committed to finding new ways to make your trip  affordable, you never have to break the bank to get the comfort you deserve."
					/>
				</div>
			</div>

			{/* step session  */}

			<div className="landingpageSessionPadding mt-[60px] bg-[#f4f4f4] md:py-[100px] py-[50px]">
				<p className="text-[#949292]">Travelling between cities? </p>

				<h1 className="blackText mt-[50px] md:text-[60px] sm:text-[45px] text-[30px] md:text-left text-center font-semibold leading-[60px] spacing-[normal]  ">
					Book a ride in <br />
					three steps
				</h1>

				<div className="w-full flex flex-row mt-[50px] justify-between md:flex-nowrap flex-wrap">
					<StepComp
						stepNumber="1"
						stepTitle="Sign up"
						stepSubtitle="This is easy – we only need a few details and then you can get started. It only takes a minute to fill in your details!"
					/>
					<StepComp
						stepNumber="2"
						stepTitle="Book a trip"
						stepSubtitle="Booking a bus ticket is easy. You can easily buy your tickets in advance and have them delivered straight to your smartphone - register via the mobile app or on the website!"
					/>
					<StepComp
						stepNumber="3"
						stepTitle="Ride"
						stepSubtitle="With fast connections you can travel in comfort. Buses are equipped with Wi-Fi so you can work, catch up on your favourite shows and have fun all on the move."
					/>
				</div>
				<Button
					title="Get Started"
					onClick={() => navigate(_paths_.BOOKRIDE)}
				/>
			</div>

			<div className="flex items-center justify-center w-full bg-center ">
				<img
					alt=""
					src={"/assets/images/withfriends.051522d885873700dacd.png"}
					className="md:w-[70%] w-full md:h-[60%] h-full object-contain rounded-lg "
				/>
			</div>

			<div className="landingpageSessionPadding mt:mt-[20px] md:mt-[30px] md:py-[100px] py-[50px] justify-center items-center">
				<h1 className="blackText  md:text-[55px] mb-[30px] md:mb-[100px] text-[25px] text-center font-semibold  spacing-[normal]  ">
					Ride with friends and <br />
					enjoy multiple benefits
				</h1>
				<Accordion />
			</div>

			{/* All abour session */}

			<div className="landingpageSessionPadding w-full bg-black py-[100px] flex-col ">
				<h1 className="text-[#00ff6a]  md:text-[55px] text-[25px]  font-semibold ">
					All aboard
				</h1>
				<br />
				<Button
					title="Get Started"
					onClick={() => navigate(_paths_.BOOKRIDE)}
				/>
			</div>
		</div>
	);
};

export default LandingPage;
