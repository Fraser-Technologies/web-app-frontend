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

      <div className="fixed w-full content-center justify-left grid px-[120px] py-[120px]">
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

          <div className="w-4/5 h-full overflow-auto">
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
            {/* {selectedContent === "about" && (
              <div>
                <p className="text-xl font-bold">
                  Who we are and how to contact us
                </p>
                <p className="text-base">
                  Fraser is a site operated by Deevo Technologies Limited
                  ("Deevo"). Deevo is registered in the Federal Republic of
                  Nigeria with RC number 1990830. To contact us, please email
                  contact@ridefraser.com
                </p>
              </div>
            )}
            {selectedContent === "terms" && (
              <div>
                <p className="text-xl font-bold">
                  Other terms that apply to you
                </p>
                <p className="text-base">
                  In addition to these terms of use, there are other terms that
                  apply to your use of our site:
                </p>
                <ul className="list-disc pl-4">
                  <li className="text-base">
                    Our Privacy Policy sets out how we will use your personal
                    information.
                  </li>
                  <li className="text-base">
                    Our Cookie Policy explains how we use cookies on our site.
                  </li>
                </ul>
              </div>
            )}
            {selectedContent === "changes" && (
              <div>
                <p className="text-xl font-bold">
                  Changes to these terms and our site
                </p>
                <p>
                  We may update and change our site and these terms from time to
                  time to reflect changes to our product/service offerings, user
                  needs, and business priorities. Every time you wish to use our
                  site, please check these terms to ensure you understand the
                  terms that apply at that time. We do not guarantee that our
                  site, or any content on it, will always be available or be
                  uninterrupted. We may suspend or withdraw or restrict the
                  availability of all or any part of our site for business and
                  operational reasons. We will try to give you reasonable notice
                  of any suspension or withdrawal.
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
