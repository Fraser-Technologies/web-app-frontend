import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const RightSidebar: React.FC = () => {
  const notifications = [
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      time: "12:00 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 2",
      time: "12:01 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 3",
      time: "12:02 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 4",
      time: "12:03 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 5",
      time: "12:04 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 6",
      time: "12:05 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 7",
      time: "12:06 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      time: "12:00 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 2",
      time: "12:01 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 3",
      time: "12:02 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 4",
      time: "12:03 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 5",
      time: "12:04 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 6",
      time: "12:05 AM",
    },
    {
      icon: <FontAwesomeIcon icon={faBell} className="mr-2" />,
      message: "Notification 7",
      time: "12:06 AM",
    },
  ];
  return (
    <div className="fixed px-4 py-2 top-0 right-0 pt-32 w-2/12 h-screen col-start-5 col-end-8 bg-[#EFF3EF] border-l">
      <div className="text-lg font-semibold pb-2 pt-4 border-b">
        Notifications
      </div>
      <div className="h-full overflow-y-scroll">
        <div className="mt-4 pb-16">
          {notifications.map((notification, index) => {
            return (
              <div
                key={index}
                className="flex overflow-hidden border-b py-2 my-2 text-gray-800"
              >
                <div className="py-1 mr-2">{notification.icon}</div>
                <div className="truncate">
                  {notification.message}

                  <div className="text-gray-400 ml-auto text-sm">
                    {notification.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
