import React, { useState } from "react";
import { Button } from "../Button";
import { _paths_ } from "../../utils/appHelpers";
import TripsOverview from "./Trip-Views/trips-overiew";
import BusStopManagement from "./Trip-Views/bus-stop-mgt";
import { Modal } from "antd";
import CreateTripFormComponent from "./components/create-trip-form";

const MiddleSection: React.FC = () => {
  // PAGINATION
  const [active, setIsActive] = useState("overview");
  const handleClick = (value: string) => {
    setIsActive(value);
  };

  const [flip, setFlip] = useState("");
  const [createVisible, setCreateModalVisible] = useState<boolean>(false);
  const handleOpenCreateModal = () => {
    setFlip("create");
    setCreateModalVisible(true);
    // setModalData(data);
  };
  const handleOk = () => {
    setCreateModalVisible(false);
  };

  const handleCancel = () => {
    if (flip === "create") {
      setCreateModalVisible(false);
      setFlip("");
    }
  };

  return (
    <div className="bg-white h-full col-start-2 col-end-6 ">
      <div className="bg-white h-full px-6">
        {/* GROUP BUTTON - NAVIGATION */}
        <div className="border-b w-full mt-8 py-4 mb-2">
          <div className="inline-flex rounded-md" role="group">
            <button
              onClick={() => handleClick("overview")}
              type="button"
              className={`inline-flex items-center py-2 px-6 text-base font-medium  ${
                active === "overview"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Trips Overview
            </button>

            <button
              onClick={() => handleClick("management")}
              type="button"
              className={`inline-flex items-center py-2 px-8 text-base font-medium  ${
                active === "management"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Bus Stops Management
            </button>
          </div>
        </div>

        {/* BUSSTOPS HEADER */}
        <div className="border-b h-14 w-full my-2">
          <div className="flex justify-between">
            <h2 className="text-lg mt-2 font-medium">Busstops</h2>
            {active === "overview" ? (
              <Button
                title="+ Create new trip"
                type="submit"
                className="px-4 py-2 text-xs rounded-md bg-primary-100"
                onClick={() => {
                  handleOpenCreateModal();
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* CREATE TRIP MODAL */}
        {flip === "create"
          ? createVisible && (
              <Modal
                title={
                  <div className="boder-b text-lg font-medium">
                    Create a new trip
                  </div>
                }
                onOk={handleOk}
                onCancel={handleCancel}
                open={createVisible}
                centered={true}
                footer={false}
                closable={true}
              >
                <CreateTripFormComponent />
                <button
                  className={`w-full p-3 mt-8 mb-8 font-medium rounded-lg ${
                    true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
                  } `}
                  onClick={() => {}}
                >
                  <svg
                    className={`${
                      true === true ? "animate-spin" : "hidden"
                    } inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="white"
                      stroke="white"
                      stroke-width="5"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="green"
                      stroke="green"
                      stroke-width="5"
                    />
                  </svg>
                  Continue
                </button>
              </Modal>
            )
          : null}

        {active === "overview" ? <TripsOverview /> : <BusStopManagement />}
      </div>
    </div>
  );
};

export default MiddleSection;
