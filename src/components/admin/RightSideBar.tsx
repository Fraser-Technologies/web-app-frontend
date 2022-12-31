import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const RightSidebar: React.FC = () => {
  return (
    <div className="fixed top-0 right-0 w-2/12 h-screen col-start-5 col-end-6 bg-gray-200">
      <div className="h-full overflow-y-scroll">
        <div className="px-4 py-2 my-27">
          <div className="flex mb-2 items-center font-bold text-lg text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notification 1
            <div className="ml-auto text-gray-600 text-xs">12:00</div>
          </div>
          <div className="flex mb-2 items-center font-bold text-lg text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notification 2
            <div className="ml-auto text-gray-600 text-xs">12:01</div>
          </div>
          <div className="flex mb-2 items-center font-bold text-lg text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notification 3
            <div className="ml-auto text-gray-600 text-xs">12:02</div>
          </div>
          <div className="flex mb-2 items-center font-bold text-lg text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notification 4
            <div className="ml-auto text-gray-600 text-xs">12:03</div>
          </div>
          <div className="flex mb-2 items-center font-bold text-lg text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notification 5
            <div className="ml-auto text-gray-600 text-xs">12:04</div>
          </div>
          <div className="flex mb-2 items-center font-bold text-lg text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notification 6
            <div className="ml-auto text-gray-600 text-xs">12:05</div>
          </div>
          <div className="flex mb-2 items-center font-bold text-lg text-gray-800">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notification 7
            <div className="ml-auto text-gray-600 text-xs">12:06</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
