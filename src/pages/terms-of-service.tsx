import { Layout } from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { termsofservicedata } from "../utils/TermsofServiceData";

const TermsOfService = () => {
  const [selectedContent, setSelectedContent] = useState("welcome");

  const handleLinkClick = (content: any) => {
    setSelectedContent(content);
  };

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Terms of Service</title>
      </Helmet>

      <div className="fixed w-full content-center margin-auto justify-left grid px-[120px] py-[120px]">
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
                  } `}
                >
                  <h3>{tosData.topline}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT */}

          <div className="w-4/5 h-full flex h-2/3 ml-6 overflow-auto">
            {/* {renderContent()} */}
            {termsofservicedata?.map((tosData) =>
              selectedContent === tosData.key ? (
                <div>
                  <p className="text-xl font-bold">{tosData.topline}</p>
                  <p className="text-base">{tosData.text}</p>
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
