import React, { useState } from "react";

import Layout from "../components/layouts/SignInLayout";
import { termsofservicedata } from "../utils/TermsofServiceData";

const TermsOfService = () => {
	const [selectedContent, setSelectedContent] = useState("termsOfUse");

	const handleLinkClick = (content: any) => {
		setSelectedContent(content);
	};

	return (
		<Layout title="Terms of Service">
			<div className="fixed w-full content-center margin-auto justify-left grid mx-[120px] my-[120px]">
				<div className="flex w-3/4 h-11/12">
					<div className="grid divide-gray-200 w-2/5 h-2/3 overflow-auto bg-white rounded-md">
						<div className="w-full">
							{termsofservicedata?.map((tosData) => (
								<div
									onClick={() => handleLinkClick(tosData.key)}
									className={`px-6 py-4 ease-in-out duration-300 active:bg-[#00ff6a] hover:text-gray-900 active:text-green-500 ${
										selectedContent === tosData.key
											? "bg-[#00ff6a] text-black"
											: "text-gray-500 "
									} `}>
									<h3>{tosData.topline}</h3>
								</div>
							))}
						</div>
					</div>

					{/* CONTENT */}

					<div className="w-3/4 flex h-5/6 overflow-y-scroll scroll-behavior-smooth ease-in-out duration-300 ml-6 bg-white rounded-md ">
						<div className="h-full">
							{termsofservicedata?.map((tosData) =>
								selectedContent === tosData.key ? (
									<div className="w-full">
										<div className="w-2/3 overflow-hidden mx-8 mt-8">
											<p className="text-xl font-semibold">{tosData.topline}</p>
										</div>

										<div className="px-8 mt-8  pb-16">
											<hr className="border-t-2 mr-12 border-gray-100 " />
											<p className="text-sm leading-5 mt-8 mr-12 text-[#000000]">
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
			</div>
		</Layout>
	);
};

export default TermsOfService;
