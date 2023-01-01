import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Button } from "../Button";
import { _paths_ } from "../../utils/appHelpers";
import ReactPaginate from "react-paginate";
import { data } from "./adminData/dash-test-data";
import { useNavigate } from "react-router-dom";
import TripsOverview from "./Trip-Views/trips-overiew";
import BusStopManagement from "./Trip-Views/bus-stop-mgt";
import { Modal } from "antd";

const MiddleSection = () => {
  // PAGINATION
  const [active, setIsActive] = useState("overview");
  const handleClick = (value: string) => {
    setIsActive(value);
  };
  const navigate = useNavigate();

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
        {flip === "create"
          ? createVisible && (
              <Modal
                title={
                  <div className="boder-b text-lg font-medium">
                    Create a trip
                  </div>
                }
                onOk={handleOk}
                onCancel={handleCancel}
                open={createVisible}
                centered={true}
                footer={false}
                closable={true}
              >
                {/* Modal content */}
              </Modal>
            )
          : null}

        {active == "overview" ? <TripsOverview /> : <BusStopManagement />}
      </div>
    </div>
  );
};

export default MiddleSection;
