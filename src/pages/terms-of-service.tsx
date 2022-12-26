import React, { useState } from "react";

import Layout from "../components/layouts/SignInLayout";
import { termsofservicedata } from "../utils/TermsofServiceData";

const TermsOfService = () => {
  const [selectedContent, setSelectedContent] = useState("termsOfUse");

  const handleLinkClick = (content: any) => {
    setSelectedContent(content);
  };

  const GeometricPatterns = () => {
    return (
      <div className="flex flex-wrap">
        <div className="w-1/4 h-32 bg-black z-0 shape-circle-sm rotate-45"></div>
        <div className="w-1/4 h-32 bg-red-500 z-0  shape-triangle-md rotate-90"></div>
        <div className="w-1/4 h-32 bg-green-500 z-0  shape-square-lg rotate-135"></div>
        <div className="w-1/4 h-32 bg-blue-500 z-0  shape-hexagon-xl rotate-180"></div>
        <div className="w-1/4 h-32 bg-purple-500 z-0  shape-octagon-2xl rotate-225"></div>
        <div className="w-1/4 h-32 bg-orange-500 z-0  shape-ellipse-3xl rotate-270"></div>
        <div className="w-1/4 h-32 bg-teal-500 z-0  shape-star-4xl rotate-315"></div>
        <div className="w-1/4 h-32 bg-pink-500 z-0  shape-plus-5xl rotate-360"></div>
      </div>
    );
  };
  return (
    <Layout title="Terms of Service">
      <div className="bg-black">
        <div className="h-40">
          <div className="absolute w-full z-50 py-16 font-semibold w-full text-white grid place-items-center text-xl">
            Fraser Terms of Service
          </div>
          <div>{GeometricPatterns()}</div>
          {/* <div className="bg-black -z-10 h-48"></div> */}
        </div>

        <div className="fixed w-full content-center m-auto grid mx-[120px] mt-2">
          <div className="flex w-3/4 h-11/12">
            <div className="grid divide-gray-200 w-1/4 h-2/3 overflow-auto bg-white rounded-md">
              <div className="w-full">
                {termsofservicedata?.map((tosData) => (
                  <div
                    onClick={() => handleLinkClick(tosData.key)}
                    className={`px-6 py-4 ease-in-out duration-300 active:bg-[#00ff6a] hover:text-gray-900 active:text-green-500 ${
                      selectedContent === tosData.key
                        ? "bg-[#00ff6a] text-black text-sm"
                        : "text-gray-500 text-sm"
                    } `}
                  >
                    <h3>{tosData.topline}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTENT */}

            <div className="w-3/4 flex h-3/4 overflow-y-scroll scroll-behavior-smooth ease-in-out duration-300 ml-6 bg-white rounded-md ">
              <div className="h-full">
                {termsofservicedata?.map((tosData) =>
                  selectedContent === tosData.key ? (
                    <div className="w-full">
                      <div className="w-2/3 overflow-hidden mx-8 mt-8">
                        <p className="text-lg font-semibold">
                          {tosData.topline}
                        </p>
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
      </div>
    </Layout>
  );
};

export default TermsOfService;
