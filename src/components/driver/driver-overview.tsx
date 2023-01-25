import { Modal, Alert, Switch, Space, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  FaStar,
  FaClock,
  FaCalendar,
  FaCheck,
  FaMinusCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { Button } from "../Button";
import moment from "moment";

const DriverOverview = () => {
  enum DriverViews {
    VIEW = "view",
    MANIFEST = "manifest",
    endoutboundtrip = "endoutboundtrip",
    endreturntrip = "endreturntrip",
    startOutBoundTrip = "startOutBoundTrip",
    startReturnTrip = "startReturnTrip",
    TRIPINFO = "tripinformation",
  }
  const [visible, setVisible] = useState(true);
  const [flip, setFlip] = useState<"" | DriverViews>("");
  // const [modalData, setModalData] = useState();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [menuVisible, setMenuVisible] = useState(false);
  const [onboard, setOnboard] = useState(false);
  // const [menuToggle, setMenuToggle] = useState("");
  const [startOutBoundTrip, setstartOutBoundTrip] = useState(false);
  const [startReturnTrip, setstartReturnTrip] = useState(false);
  const [alertmessage, setAlertMessage] = useState("");

  const handleClose = () => {
    setVisible(false);
  };

  const handleOpenModal = (data: any, flipValue: any) => {
    setFlip(flipValue);
    // setModalData(data);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  const [dates, setDates] = useState<string[]>([]);
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  React.useEffect(() => {
    let dateArray = [];
    for (let i = 0; i <= 7; i++) {
      dateArray.push(moment().add(i, "days").format("dddd Do MMMM YYYY"));
    }
    setDates(dateArray);
    setDisabledDates(dateArray.slice(3));
  }, []);

  return (
    <>
      <Space direction="vertical" className="items-center w-full mt-4">
        {visible && (
          <Alert
            className="text-sm"
            message={alertmessage}
            //ALERT MESSAGES INCLUDE - UPCOMING TRIP, TRIP START, TRIP END, NEW TRIP SCHEDULED
            type="success"
            closable
            afterClose={handleClose}
          />
        )}
      </Space>

      <div className="mx-[120px] text-sm">
        <div className="grid grid-cols-8 gap-8">
          <div className="col-start-1 text-black col-end-6">
            <p className="text-base font-medium pb-2">Upcoming Trip Schedule</p>
            {/* <div className="w-fit bg-[#000000] rounded-2xl py-2 px-4 text-[#00FF6A] font-medium">
              Feb 3rd, 2023
            </div> */}

            <div className="mt-4 text-[#929292] bg-black px-8 pb-4 pt-2 rounded-md">
              <div>
                <p className="border-b border-[#353535] py-2">
                  Outbound Schedule
                </p>
                <div className="flex justify-between mt-3 items-center">
                  <div>
                    <p className="text-base text-white">Ibadan to Lagos</p>
                    <div className="flex ">
                      <div className="flex items-center mt-1 mr-4">
                        <FaCalendar className="mr-2" />
                        Feb 3rd, 2023
                      </div>
                      <div className="flex items-center mt-1">
                        <FaClock className="mr-2" />
                        6:00 AM
                      </div>
                    </div>
                    <div
                      className="text-[10px] text-[#00FF6A] mt-2 cursor-pointer"
                      onClick={() => {
                        handleOpenModal(undefined, "tripinformation");
                      }}
                    >
                      see more
                    </div>
                  </div>

                  <div className="flex w-2/4">
                    <Button
                      title="View Manifest"
                      type="submit"
                      className="w-full h-[40px] mr-4 my-1 text-xs rounded-md border border-[#ffffff] text-white"
                      onClick={() => {
                        handleOpenModal(undefined, "manifest");
                      }}
                    />
                    <Button
                      title={startOutBoundTrip ? "End Trip" : "Start Trip"}
                      type="submit"
                      className={`w-full h-[40px] my-1 mr-4 text-xs rounded-md ${
                        startOutBoundTrip
                          ? "bg-[#E71D36] text-white"
                          : "bg-[#00FF6A] text-black"
                      }`}
                      onClick={() => {
                        if (!startOutBoundTrip) {
                          handleOpenModal(undefined, "startOutBoundTrip");
                        }
                        if (startOutBoundTrip) {
                          handleOpenModal(undefined, "endoutboundtrip");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* RETURN */}
              <div className="mt-8 mb-8">
                <p className="border-b border-[#353535] py-2">
                  Return Schedule
                </p>
                <div className="flex justify-between mt-3 items-center">
                  <div>
                    <p className="text-base text-white">Ibadan to Lagos</p>
                    <div className="flex ">
                      <div className="flex items-center mt-1 mr-4">
                        <FaCalendar className="mr-2" />
                        Feb 3rd, 2023
                      </div>
                      <div className="flex items-center mt-1">
                        <FaClock className="mr-2" />
                        6:00 AM
                      </div>
                    </div>
                    <div
                      className="text-[10px] text-[#00FF6A] mt-2 cursor-pointer"
                      onClick={() => {
                        handleOpenModal(undefined, "tripinformation");
                      }}
                    >
                      see more
                    </div>
                  </div>

                  <div className="flex w-2/4">
                    <Button
                      title="View Manifest"
                      type="submit"
                      className="w-full h-[40px] mr-4 my-1 text-xs rounded-md border border-[#ffffff] text-white"
                      onClick={() => {
                        handleOpenModal(undefined, "manifest");
                      }}
                    />
                    <Button
                      title={startReturnTrip ? "End Trip" : "Start Trip"}
                      type="submit"
                      className={`w-full h-[40px] my-1 mr-4 text-xs rounded-md ${
                        startReturnTrip
                          ? "bg-[#E71D36] text-white"
                          : "bg-[#00FF6A] text-black"
                      }`}
                      onClick={() => {
                        if (!startReturnTrip) {
                          handleOpenModal(undefined, "startReturnTrip");
                        }
                        if (startReturnTrip) {
                          handleOpenModal(undefined, "endreturntrip");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE  */}
            <p className="mt-8 text-base font-medium">Trip History</p>
            <table className="mt-2 w-full text-base font-normal text-left text-white table-auto">
              <thead className=" bg-black">
                <tr>
                  <th
                    scope="col"
                    className="pl-4 px-2 py-4 font-normal text-sm rounded-l-md"
                  >
                    Trips
                  </th>
                  <th scope="col" className="py-4 font-normal text-sm">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 font-normal text-sm text-center"
                  >
                    Passengers
                  </th>

                  <th
                    scope="col"
                    className="px-2 py-4 font-normal text-sm text-center"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 font-normal text-sm text-center rounded-r-md"
                  >
                    Earning
                  </th>
                </tr>
              </thead>

              {/* //TABLE ROWS */}
              <tbody className="">
                <tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
                  <td
                    onClick={() => {
                      handleOpenModal(undefined, "view");
                    }}
                    className="pl-4 py-4 text-sm text-gray-700"
                  >
                    Lagos to Ibadan
                  </td>
                  <td
                    onClick={() => {
                      handleOpenModal(undefined, "view");
                    }}
                    className=" py-4 text-sm  text-gray-700"
                  >
                    8, January, 2023
                  </td>
                  <td
                    onClick={() => {
                      handleOpenModal(undefined, "view");
                    }}
                    className="px-4 py-4 text-sm text-center text-gray-700"
                  >
                    25
                  </td>
                  <td
                    onClick={() => {
                      handleOpenModal(undefined, "view");
                    }}
                    className="text-sm text-center text-gray-700"
                  >
                    4.1
                  </td>
                  <td
                    onClick={() => {
                      handleOpenModal(undefined, "view");
                    }}
                    className="px-4 py-4 text-sm text-center text-gray-700"
                  >
                    NGN 24,000
                  </td>
                </tr>

                {/* )} */}
              </tbody>
            </table>
          </div>

          {/* COLUM ON RIGHT */}
          <div className="col-start-6 col-end-9 text-black border rounded-md">
            <div className="flex rounded-t-md pt-4 px-4 text-white bg-black border-b pb-6">
              <div className="">
                <p className="text-sm mb-2 font-normal text-[#929292]">
                  Trips Completed
                </p>
                <h3 className="text-[18px] font-medium">128,000</h3>
              </div>
              <div className=" mx-auto ">
                <p className="text-sm mb-2 font-normal text-[#929292]">
                  Rating
                </p>
                <h3 className="text-[18px] font-medium flex items-center">
                  {" "}
                  <FaStar className="text-[#FCAB64] h-[16px] mr-1" /> 4.5
                </h3>
              </div>
            </div>
            <div className=" rounded-b-md px-4 pt-4 pb-4 w-full">
              <div className="mb-8">
                <h3 className="font-medium text-base mb-4">
                  Your Availability
                </h3>
                {dates.map((date, index) => (
                  <div
                    className="flex justify-between bg-gray-100 mb-1 items-center rounded-md px-2 py-2"
                    key={index}
                  >
                    <div className="">
                      <h3 className="font-medium mb-1">{date.split(" ")[0]}</h3>
                      <p className="text-[#929292] font-light text-[12px]">
                        {date.split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked={disabledDates.includes(date)}
                      disabled={!disabledDates.includes(date)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}

        {flip === DriverViews.VIEW && modalVisible && (
          <Modal
            title={
              <div className="text-lg font-medium boder-b">
                Lagos to Ibadan Trip
              </div>
            }
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
          >
            <div className="grid w-full grid-cols-2 gap-8 pb-12 mt-8">
              <div>
                <div className="mb-1 text-sm text-gray-400">Start</div>
                <div className="text-xs">Start City </div>
              </div>

              <div>
                <div className="mb-1 text-sm text-gray-400">Destination</div>
                <div className="text-xs">Destination City</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Start Bus Stop</div>
                <div className="text-xs">Start Bus Stop</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">
                  Destination Bus Stop
                </div>
                <div className="text-xs">Destination Bus Stop</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Departure Time</div>
                <div className="text-xs">Departure Time</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Departure Date</div>
                <div className="text-xs">Departure Date</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Arrival Time</div>
                <div className="text-xs">Arrival Time</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Arrival Date</div>
                <div className="text-xs">Arrival Date</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Rating</div>
                <div className="text-xs">4.1</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Amount Earned</div>
                <div className="text-xs">NGN 24,000</div>
              </div>
            </div>
          </Modal>
        )}
        {flip === DriverViews.startOutBoundTrip && modalVisible && (
          <Modal
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
            width="240px"
          >
            <div className="w-full mt-8 text-sm text-center place-items-center">
              {/* <FaExclamationCircle
                size={32}
                className="text-[#E71D36] w-full mt-8 mb-4"
              /> */}
              Starting a trip means all users are aboard, <div></div>
              <div className="mt-4 text-base font-medium">Start the trip?</div>
            </div>

            <div className="flex mt-6">
              <Button
                title="No"
                type="submit"
                className="w-full py-2 text-xs mr-2 text-gray-600 border border-gray-500 rounded-md"
                onClick={() => {}}
              />
              <Button
                title={`Yes`}
                type="submit"
                className="w-full py-2 text-xs rounded-md bg-black text-white"
                onClick={() => {
                  setstartOutBoundTrip(!startOutBoundTrip);
                  setVisible(true);
                  setAlertMessage("Trip Started, your ETA is 3:00PM");
                  setModalVisible(false);
                }}
              />
            </div>
          </Modal>
        )}
        {flip === DriverViews.startReturnTrip && modalVisible && (
          <Modal
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
            width="240px"
          >
            <div className="w-full mt-8 text-sm text-center place-items-center">
              {/* <FaExclamationCircle
                size={32}
                className="text-[#E71D36] w-full mt-8 mb-4"
              /> */}
              Starting a trip means all users are aboard, <div></div>
              <div className="mt-4 text-base font-medium">Start the trip?</div>
            </div>

            <div className="flex mt-6">
              <Button
                title="No"
                type="submit"
                className="w-full py-2 text-xs mr-2 text-gray-600 border border-gray-500 rounded-md"
                onClick={() => {}}
              />
              <Button
                title={`Yes`}
                type="submit"
                className="w-full py-2 text-xs rounded-md bg-black text-white"
                onClick={() => {
                  // setstartOutBoundTrip(!startOutBoundTrip);
                  setstartReturnTrip(!startReturnTrip)
                  setVisible(true);
                  setAlertMessage("Trip Started, your ETA is 3:00PM");
                  setModalVisible(false);
                }}
              />
            </div>
          </Modal>
        )}
        {flip === DriverViews.endoutboundtrip && modalVisible && (
          <Modal
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
            width="240px"
          >
            <div className="w-full mt-8 text-sm text-center place-items-center">
              {/* <FaExclamationCircle
                size={32}
                className="text-[#E71D36] w-full mt-8 mb-4"
              /> */}
              Ending a trip means the trip is completed.
              <div className="mt-4 text-base font-medium">End the trip?</div>
            </div>

            <div className="flex mt-6">
              <Button
                title="No"
                type="submit"
                className="w-full py-2 text-xs mr-2 text-gray-600 border border-gray-500 rounded-md"
                onClick={() => {}}
              />
              <Button
                title={`Yes`}
                type="submit"
                className="w-full py-2 text-xs rounded-md bg-black text-white"
                onClick={() => {
                  setstartOutBoundTrip(!startOutBoundTrip);
                  setVisible(true);
                  setAlertMessage("Great Job! Trip Completed successfully");
                  setModalVisible(false);
                }}
              />
            </div>
          </Modal>
        )}
        {flip === DriverViews.endreturntrip && modalVisible && (
          <Modal
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
            width="240px"
          >
            <div className="w-full mt-8 text-sm text-center place-items-center">
              {/* <FaExclamationCircle
                size={32}
                className="text-[#E71D36] w-full mt-8 mb-4"
              /> */}
              Ending a trip means the trip is completed.
              <div className="mt-4 text-base font-medium">End the trip?</div>
            </div>

            <div className="flex mt-6">
              <Button
                title="No"
                type="submit"
                className="w-full py-2 text-xs mr-2 text-gray-600 border border-gray-500 rounded-md"
                onClick={() => {}}
              />
              <Button
                title={`Yes`}
                type="submit"
                className="w-full py-2 text-xs rounded-md bg-black text-white"
                onClick={() => {
                  setstartReturnTrip(!startReturnTrip);
                  setVisible(true);
                  setAlertMessage("Great Job! Trip Completed successfully");
                  setModalVisible(false);
                }}
              />
            </div>
          </Modal>
        )}
        {flip === DriverViews.MANIFEST && modalVisible && (
          <Modal
            title={
              <div className="text-lg font-medium boder-b">
                Lagos to Ibadan Trip
              </div>
            }
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
          >
            <div>
              <p className="mt-6 mb-4 text-base font-medium">
                Passenger Manifest
              </p>
              <div className="my-1 text-sm text-gray-400">
                15 Passengers, 2 Onboard, 13 Not Onboard
              </div>
              <table className="mt-2 w-full text-base font-normal text-left text-white table-auto">
                <thead className="bg-black">
                  <tr>
                    <th
                      scope="col"
                      className="pl-4 px-2 py-2 font-normal text-sm rounded-l-md"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 font-normal text-sm text-center rounded-r-md"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {/* //TABLE ROWS */}
                <tbody className="mt-4">
                  <tr className="border-b cursor-pointer border-slate-100 hover:bg-gray-50">
                    <td
                      onClick={() => {}}
                      className="pl-4 py-4 text-sm text-gray-700"
                    >
                      Amen Olabode
                    </td>
                    <td
                      onClick={() => {}}
                      className="text-sm text-center text-gray-700"
                    >
                      <div className="m-auto h-full flex items-center place-content-end">
                        <div
                          className={`flex items-center text-black mr-2 py-2 px-4 border rounded-md ${
                            onboard
                              ? "border-[#00FF6A] bg-[#00FF6A]"
                              : "border-black "
                          } `}
                          onClick={() => setOnboard(!onboard)}
                        >
                          {onboard ? (
                            <FaMinusCircle className="mr-2" />
                          ) : (
                            <FaCheck className="mr-2" />
                          )}
                          {onboard ? "Onboarded" : "Onboard"}
                        </div>
                        <div
                          className={`bg-[#00FF6A] px-6 py-2 rounded-md border border-[#00FF6A] text-black ${
                            onboard ? "hidden" : "block"
                          }`}
                        >
                          {/* INITIATE A CALL TO THE USER'S NUMBER */}
                          Call
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* )} */}
                </tbody>
              </table>
            </div>
          </Modal>
        )}
        {flip === DriverViews.TRIPINFO && modalVisible && (
          <Modal
            title={
              <div className="text-xs font-medium boder-b">Trip Details</div>
            }
            onOk={handleOk}
            onCancel={handleCancel}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
          >
            <div className="grid w-full grid-cols-2 gap-8 pb-12 mt-12">
              <div>
                <div className="mb-1 text-sm text-gray-400">Start</div>
                <div className="text-xs">Start City </div>
              </div>

              <div>
                <div className="mb-1 text-sm text-gray-400">Destination</div>
                <div className="text-xs">Destination City</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Start Bus Stop</div>
                <div className="text-xs">Start Bus Stop</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">
                  Destination Bus Stop
                </div>
                <div className="text-xs">Destination Bus Stop</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Departure Time</div>
                <div className="text-xs">Time</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Date</div>
                <div className="text-xs">Date</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Driver</div>
                <div className="text-xs">Driver</div>
              </div>
              <div>
                <div className="mb-1 text-sm text-gray-400">Vehicle</div>
                <div className="text-xs">Vehicle</div>
              </div>
            </div>
            {/* <Button
              title="Continue"
              type="submit"
              className="w-full px-4 py-4 text-sm rounded-md bg-primary-100"
              onClick={() => {
                // setFlip(TripOption.SUCCESS);
              }}
            />
            <Button
              title="Edit"
              type="submit"
              className="w-full px-4 py-4 mt-4 mb-6 text-sm text-gray-500 border border-gray-500 rounded-md"
              onClick={() => {
                // setFlip(TripOption.CREATE);
              }}
            /> */}
          </Modal>
        )}
      </div>
    </>
  );
};

export default DriverOverview;
