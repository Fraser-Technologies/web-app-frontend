import React, { useState } from "react";
import { BsFillGridFill } from "react-icons/bs";

import Layout from "../../components/layouts/SignInLayout";
import { termsofservicedata } from "../../utils/TermsofServiceData";

const TermsOfService = () => {
	const [selectedContent, setSelectedContent] = useState("termsOfUse");

	const handleLinkClick = (content: any) => {
		setSelectedContent(content);
	};

	const [tosToggle, setTosToggle] = React.useState<boolean>(false);
	const tosToggleClick = () => {
		setTosToggle(!tosToggle);
	};
	const [open, setOpen] = React.useState<boolean>(true);
	const openClick = () => {
		setOpen(false);
	};

	const GeometricPatterns = () => {
		return (
			<div className="flex flex-wrap">
				<div className="z-0 w-1/4 h-24 rotate-45 bg-black lg:h-32 shape-circle-sm"></div>
				<div className="z-0 w-1/4 h-24 rotate-90 bg-red-500 lg:h-32 shape-triangle-md"></div>
				<div className="z-0 w-1/4 h-24 bg-green-500 lg:h-32 shape-square-lg rotate-135"></div>
				<div className="z-0 w-1/4 h-24 rotate-180 bg-blue-500 lg:h-32 shape-hexagon-xl"></div>
				<div className="z-0 w-1/4 h-24 bg-purple-500 lg:h-32 shape-octagon-2xl rotate-225"></div>
				<div className="z-0 w-1/4 h-24 bg-orange-500 lg:h-32 shape-ellipse-3xl rotate-270"></div>
				<div className="z-0 w-1/4 h-24 bg-teal-500 lg:h-32 shape-star-4xl rotate-315"></div>
				<div className="z-0 w-1/4 h-24 bg-pink-500 lg:h-32 shape-plus-5xl rotate-360"></div>
			</div>
		);
	};
	return (
		<Layout title="Terms of Service">
			<div className="fixed w-full">
				<div className="bg-black ">
					<div className="h-24 lg:h-40 ">
						<div className="absolute z-10 grid w-full pt-6 ml-4 text-xl font-semibold text-white lg:w-full md:pt-14 lg:ml-4 lg:place-items-center">
							Terms of Service
						</div>
						<div>{GeometricPatterns()}</div>
					</div>

					<div className="fixed w-11/12 ml-4 lg:ml-0 lg:w-4/12 lg:mt-48 lg:my-48 lg:fixed lg:top-0 lg:left-0">
						{/* LEFT COLUMN */}
						{tosToggle === true ? (
							<div
								className={`lg:w-4/12 z-50 lg:mx-16 lg:my-48 lg:fixed rounded-md lg:top-0 lg:left-0 lg:pr-8  md:block
                } ${!tosToggle ? "hidden" : "block"}`}>
								<div className="px-4 py-4 bg-white rounded-md lg:hidden w-fit">
									<BsFillGridFill
										onClick={tosToggleClick}
										className="cursor-pointer"
									/>
								</div>

								<div className="mt-4 bg-white rounded-md lg:mt-0">
									{termsofservicedata?.map((tosData) => (
										<div
											onClick={() => {
												handleLinkClick(tosData.key);
												tosToggleClick();
											}}
											className={`px-6 cursor-pointer py-4 z-50 ease-in-out duration-300 active:bg-[#00ff6a] hover:text-gray-900 active:text-green-500 ${
												selectedContent === tosData.key
													? "bg-[#00ff6a] text-black font-semibold pl-8 text-base"
													: "text-gray-500 text-sm"
											} `}>
											<h3>{tosData.topline}</h3>
										</div>
									))}
								</div>
							</div>
						) : (
							<div
								className={`lg:w-4/12 z-50 lg:mx-16 lg:my-48 lg:fixed rounded-md lg:top-0 lg:left-0 lg:pr-8  md:block
                 ${!tosToggle ? "block" : "hidden"}`}>
								<div className="px-4 py-4 bg-white rounded-md lg:hidden w-fit">
									<BsFillGridFill
										onClick={tosToggleClick}
										className="cursor-pointer"
									/>
								</div>

								<div
									className={`mt-4 lg:mt-0 bg-white rounded-md hidden lg:block`}>
									{termsofservicedata?.map((tosData) => (
										<div
											onClick={() => {
												handleLinkClick(tosData.key);
												tosToggleClick();
											}}
											className={`px-6 cursor-pointer py-4 z-50 ease-in-out duration-300 active:bg-[#00ff6a] hover:text-gray-900 active:text-green-500 ${
												selectedContent === tosData.key
													? "bg-[#00ff6a] text-black font-semibold pl-8 text-base"
													: "text-gray-500 text-sm"
											} `}>
											<h3>{tosData.topline}</h3>
										</div>
									))}
								</div>
							</div>
						)}

						{termsofservicedata?.map((tosData) =>
							selectedContent === tosData.key ? (
								<div
									className={
										"mt-4 lg:mt-0 fixed w-11/12 md:w-full ml-0 lg:ml-8 lg:mt-0 h-5/6 lg:w-7/12 lg:mt-48 bg-white rounded-md lg:mx-16 lg:my-32 overflow-y-scroll scroll-behavior-smooth lg:fixed lg:top-0 lg:right-0"
									}>
									<div className="fixed -mt-1 w-11/12  md:w-full lg:w-7/12 rounded-t-md lg:mx-16 lg:my-48 h-16 lg:h-16 bg-[#ffffff] border-b z-10 justify-center items-center lg:fixed lg:top-0 lg:right-0">
										<p className="pt-4 ml-6 text-lg font-semibold lg:mx-6 lg:ml-12 lg:mt-2">
											{tosData.topline}
										</p>
									</div>

									<div className="w-full px-6 py-6 mt-8 mb-24 overflow-y-scroll bg-white rounded-md lg:mb-16 lg:pb-12 lg:pt-8 lg:px-12 lg:py-0 h-max scroll-behavior-smooth">
										<p className="text-sm leading-5 mt-8 lg:mr-12 text-[#000000]">
											{tosData.text.split("\n").map((text) => (
												<p className="mt-4">{text}</p>
											))}
										</p>
									</div>
								</div>
							) : (
								""
							)
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default TermsOfService;
