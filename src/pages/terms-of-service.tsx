import React, { useState } from "react";
import { BsChevronDown, BsChevronUp, BsFillGridFill } from "react-icons/bs";

import Layout from "../components/layouts/SignInLayout";
import { termsofservicedata } from "../utils/TermsofServiceData";

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
        <div className="w-1/4 h-24 lg:h-32 bg-black z-0 shape-circle-sm rotate-45"></div>
        <div className="w-1/4 h-24 lg:h-32 bg-red-500 z-0  shape-triangle-md rotate-90"></div>
        <div className="w-1/4 h-24 lg:h-32 bg-green-500 z-0  shape-square-lg rotate-135"></div>
        <div className="w-1/4 h-24 lg:h-32 bg-blue-500 z-0  shape-hexagon-xl rotate-180"></div>
        <div className="w-1/4 h-24 lg:h-32 bg-purple-500 z-0  shape-octagon-2xl rotate-225"></div>
        <div className="w-1/4 h-24 lg:h-32 bg-orange-500 z-0  shape-ellipse-3xl rotate-270"></div>
        <div className="w-1/4 h-24 lg:h-32 bg-teal-500 z-0  shape-star-4xl rotate-315"></div>
        <div className="w-1/4 h-24 lg:h-32 bg-pink-500 z-0  shape-plus-5xl rotate-360"></div>
      </div>
    );
  };
  return (
    <Layout title="Terms of Service">
      <div className="w-full fixed">
        <div className="bg-black ">
          <div className="h-24 lg:h-40 ">
            <div className="absolute lg:w-full pt-6 md:pt-14 ml-4 lg:ml-4 z-10 font-semibold w-full text-white grid lg:place-items-center text-xl">
              Terms of Service
            </div>
            <div>{GeometricPatterns()}</div>
          </div>

          <div className="ml-4 lg:ml-0 lg:w-4/12 fixed lg:mt-48 lg:my-48 w-11/12 lg:fixed lg:top-0 lg:left-0">
            {/* LEFT COLUMN */}
            {tosToggle === true ? (
              <div
                className={`lg:w-4/12 z-50 lg:mx-16 lg:my-48 lg:fixed rounded-md lg:top-0 lg:left-0 lg:pr-8  md:block
                } ${!tosToggle ? "hidden" : "block"}`}
              >
                <div className=" lg:hidden py-4 px-4 bg-white rounded-md w-fit">
                  <BsFillGridFill
                    onClick={tosToggleClick}
                    className="cursor-pointer"
                  />
                </div>

                <div className="mt-4 lg:mt-0 bg-white rounded-md">
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
                      } `}
                    >
                      <h3>{tosData.topline}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`lg:w-4/12 z-50 lg:mx-16 lg:my-48 lg:fixed rounded-md lg:top-0 lg:left-0 lg:pr-8  md:block
                 ${!tosToggle ? "block" : "hidden"}`}
              >
                <div className="lg:hidden py-4 px-4 bg-white rounded-md w-fit">
                  <BsFillGridFill
                    onClick={tosToggleClick}
                    className="cursor-pointer"
                  />
                </div>

                <div
                  className={`mt-4 lg:mt-0 bg-white rounded-md hidden lg:block`}
                >
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
                      } `}
                    >
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
                  }
                >
                  <div className="fixed -mt-1 w-11/12  md:w-full lg:w-7/12 rounded-t-md lg:mx-16 lg:my-48 h-16 lg:h-16 bg-[#ffffff] border-b z-10 justify-center items-center lg:fixed lg:top-0 lg:right-0">
                    <p className="text-lg lg:mx-6 ml-6 lg:ml-12 pt-4 lg:mt-2 font-semibold">
                      {tosData.topline}
                    </p>
                  </div>

                  <div className=" rounded-md mt-8 mb-24 lg:mb-16 lg:pb-12 lg:pt-8 w-full px-6 lg:px-12 py-6 lg:py-0 bg-white h-max overflow-y-scroll scroll-behavior-smooth">
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
