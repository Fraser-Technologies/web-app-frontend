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
  FaChevronRight,
  FaPlayCircle,
  FaPlay,
  FaBook,
  FaUser,
} from "react-icons/fa";
import { Button } from "../Button";
import moment from "moment";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const DriverOverview = () => {
  enum DriverViews {
    VIEW = "view",
    MANIFEST = "manifest",
    ENDOUTBOUNDTRIP = "endoutboundtrip",
    ENDRETURNTRIP = "endreturntrip",
    STARTOUTBOUNDTRIP = "startOutBoundTrip",
    STARTRETURNTRIP = "startReturnTrip",
    TRIPINFO = "tripinformation",
  }
  const [visible, setVisible] = useState(false);
  const [flip, setFlip] = useState<"" | DriverViews>("");
  // const [modalData, setModalData] = useState();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [menuVisible, setMenuVisible] = useState(false);
  const [onboard, setOnboard] = useState(false);
  // const [menuToggle, setMenuToggle] = useState("");
  const [startOutBoundTrip, setstartOutBoundTrip] = useState(false);
  const [startReturnTrip, setstartReturnTrip] = useState(false);
  const [alertmessage, setAlertMessage] = useState("");
  const [selection, setSelection] = useState("Schedule");

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
      <div className="fixed lg:hidden mb-4 bottom-0 w-full flex items-center place-content-center">
        <div className="flex w-5/6 bg-black rounded-md text-white px-1">
          <div
            className={`text-center w-1/3 py-3 px-4 mx-1 my-2 rounded-md ${
              selection === "Schedule"
                ? "bg-[#00FF6A] text-black"
                : "text-[#929292]"
            }`}
            onClick={() => {
              setSelection("Schedule");
            }}
          >
            Schedule
          </div>
          <div
            className={`text-center w-1/3 py-3 px-4 mx-1 my-2 rounded-md ${
              selection === "History"
                ? "bg-[#00FF6A] text-black"
                : "text-[#929292]"
            }`}
            onClick={() => {
              setSelection("History");
            }}
          >
            {" "}
            History{" "}
          </div>
          <div
            className={`text-center w-1/3 py-3 px-4 mx-1 my-2 rounded-md ${
              selection === "Info"
                ? "bg-[#00FF6A] text-black"
                : "text-[#929292]"
            }`}
            onClick={() => {
              setSelection("Info");
            }}
          >
            {" "}
            Info{" "}
          </div>
        </div>
      </div>
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

      <div className=" lg:mx-[120px] h-screen pb-24 lg:pb-0 text-sm">
        <div className="lg:grid lg:grid-cols-8 lg:gap-8">
          <div className={`col-start-1 text-black col-end-6`}>
            <div
              className={`${
                selection === "Schedule" ? "block mx-[18px] lg:mx-0" : "hidden"
              } `}
            >
              <p className="text-lg mb:text-base font-medium pb-2">
                Upcoming Trip Schedule
              </p>

              {/* OUTGOING TRIP SCHEDULE */}
              <div className="mt-2 lg:mt-4 text-[#929292] lg:bg-black lg:px-4 pb-4 pt-2 rounded-md">
                <div className="bg-black p-4 lg:p-0 rounded-md ">
                  <p className="border-b text-[14px] lg:text-sm border-[#353535] py-2">
                    Outbound Schedule
                  </p>
                  <div className="lg:flex justify-between lg:mt-2 items-center">
                    <div className="py-3 lg:py-0 rounded-md">
                      <p className="text-xl lg:text-base text-white">
                        Ibadan to Lagos
                      </p>
                      <div className="flex lg:mt-0 mt-2">
                        <div className="flex items-center mt-1 mr-4">
                          <FaCalendar className="mr-2" />
                          Feb 3rd, 2023
                        </div>
                        <div className="flex items-center mt-1">
                          <FaClock className="mr-2" />
                          6:00 AM
                        </div>
                      </div>

                      {/* SEE MORE IS HIDDEN ON RESPONSIVE VIEW */}
                      <div
                        className="text-[10px] text-[#00FF6A] mt-3 cursor-pointer hidden lg:block"
                        onClick={() => {
                          handleOpenModal(undefined, "tripinformation");
                        }}
                      >
                        see more
                      </div>
                    </div>

                    <div className="flex w-full mt-6 mb-2 lg:mb-0 lg:mt-0 lg:w-2/4">
                      <Button
                        title="View Manifest"
                        type="submit"
                        className="lg:block hidden w-full h-[48px] lg:h-[40px] mr-2 my-1 lg:mb-0 text-xs rounded-md border border-[#ffffff] text-white"
                        onClick={() => {
                          handleOpenModal(undefined, "manifest");
                        }}
                      />
                      <Button
                        title={startOutBoundTrip ? "End Trip" : "Start Trip"}
                        type="submit"
                        className={`lg:block hidden w-full h-[48px] lg:h-[40px] my-1 mr-2 text-xs rounded-md ${
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

                      {/* RESPONSIVE MENU ICONS FOR TRIP SCHEDULE CARD */}
                      <div
                        className="w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] py-2 lg:py-0 my-1 lg:mr-4 text-xs rounded-md bg-[#161616] cursor-pointer block lg:hidden flex flex-col items-center"
                        onClick={() => {
                          handleOpenModal(undefined, "manifest");
                        }}
                      >
                        <div className="m-auto flex flex-col items-center">
                          <FaBook className="m-auto mt-1 text-white mb-2" />
                          Manifest
                        </div>
                      </div>
                      <div
                        className={`w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] my-1 lg:mr-4 text-xs rounded-md cursor-pointer block lg:hidden flex flex-col items-center  ${
                          startOutBoundTrip
                            ? "bg-[#E71D36] text-white"
                            : "bg-[#161616]"
                        }`}
                        onClick={() => {
                          if (!startOutBoundTrip) {
                            handleOpenModal(undefined, "startOutBoundTrip");
                          }
                          if (startOutBoundTrip) {
                            handleOpenModal(undefined, "endoutboundtrip");
                          }
                        }}
                      >
                        <div className={`m-auto flex flex-col items-center`}>
                          <FaPlay className="m-auto mt-1 text-white mb-2" />
                          {startOutBoundTrip ? "End Trip" : "Start Trip"}
                        </div>
                      </div>
                      <div
                        className="w-full h-[56px] lg:h-[40px] my-1 lg:mr-4  text-xs rounded-md bg-[#161616] lg:bg-[#00FF6A] cursor-pointer block lg:hidden flex items-center"
                        onClick={() => {
                          handleOpenModal(undefined, "tripinformation");
                        }}
                      >
                        <div className="m-auto flex flex-col items-center">
                          <FaChevronRight className="m-auto mt-1 text-white mb-2" />
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RETURN TRIP SCHEDULE */}
                <div className="mt-2 lg:mt-4 text-[#929292] lg:bg-black pb-4 pt-2 rounded-md">
                  <div className="bg-black p-4 lg:p-0 rounded-md ">
                    <p className="border-b text-[14px] lg:text-sm border-[#353535] py-2">
                      Return Schedule
                    </p>
                    <div className=" lg:flex justify-between lg:mt-3 items-center">
                      <div className="py-3 lg:py-0 rounded-md">
                        <p className="text-xl lg:text-base text-white">
                          Lagos to Ibadan
                        </p>
                        <div className="flex lg:mt-0 mt-2">
                          <div className="flex items-center mt-1 mr-4">
                            <FaCalendar className="mr-2" />
                            Feb 3rd, 2023
                          </div>
                          <div className="flex items-center mt-1">
                            <FaClock className="mr-2" />
                            6:00 AM
                          </div>
                        </div>

                        {/* SEE MORE IS HIDDEN ON RESPONSIVE VIEW */}
                        <div
                          className="text-[10px] text-[#00FF6A] mt-3 cursor-pointer hidden lg:block"
                          onClick={() => {
                            handleOpenModal(undefined, "tripinformation");
                          }}
                        >
                          see more
                        </div>
                      </div>

                      <div className="flex w-full mt-6 mb-2 lg:mb-0 lg:mt-0 lg:w-2/4">
                        <Button
                          title="View Manifest"
                          type="submit"
                          className="lg:block hidden w-full h-[48px] lg:h-[40px] mr-2 my-1 lg:mb-0 text-xs rounded-md border border-[#ffffff] text-white"
                          onClick={() => {
                            handleOpenModal(undefined, "manifest");
                          }}
                        />
                        <Button
                          title={startReturnTrip ? "End Trip" : "Start Trip"}
                          type="submit"
                          className={`lg:block hidden w-full h-[48px] lg:h-[40px] my-1 mr-2 text-xs rounded-md ${
                            startReturnTrip
                              ? "bg-[#E71D36] text-white"
                              : "bg-[#161616] text-white lg:bg-[#00FF6A] lg:text-black"
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

                        {/* RESPONSIVE MENU ICONS FOR TRIP SCHEDULE CARD */}
                        <div
                          className="w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] py-2 lg:py-0 my-1 lg:mr-4 text-xs rounded-md bg-[#161616] cursor-pointer block lg:hidden flex flex-col items-center"
                          onClick={() => {
                            handleOpenModal(undefined, "manifest");
                          }}
                        >
                          <div className="m-auto flex flex-col items-center">
                            <FaBook className="m-auto mt-1 text-white mb-2" />
                            Manifest
                          </div>
                        </div>
                        <div
                          className={`w-full block lg:hidden h-[56px] mr-2 lg:h-[40px] my-1 lg:mr-4 text-xs rounded-md cursor-pointer block lg:hidden flex flex-col items-center ${
                            startReturnTrip
                              ? "bg-[#E71D36] text-white"
                              : "bg-[#161616]"
                          }`}
                          onClick={() => {
                            if (!startReturnTrip) {
                              handleOpenModal(undefined, "startReturnTrip");
                            }
                            if (startReturnTrip) {
                              handleOpenModal(undefined, "endreturntrip");
                            }
                          }}
                        >
                          <div className={`m-auto flex flex-col items-center `}>
                            <FaPlay className="m-auto mt-1 text-white mb-2" />
                            {startReturnTrip ? "End Trip" : "Start Trip"}
                          </div>
                        </div>
                        <div
                          className="w-full h-[56px] lg:h-[40px] my-1 lg:mr-4  text-xs rounded-md bg-[#161616] lg:bg-[#00FF6A] cursor-pointer block lg:hidden flex items-center"
                          onClick={() => {
                            handleOpenModal(undefined, "tripinformation");
                          }}
                        >
                          <div className="m-auto flex flex-col items-center">
                            <FaChevronRight className="m-auto mt-1 text-white mb-2" />
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TRIP HISTORY  */}
            <div
              className={`${
                selection === "History"
                  ? "block lg:mt-8 mx-[18px] lg:mx-0"
                  : "hidden"
              } lg:block`}
            >
              <p className="text-lg lg:mt-8 mb:text-base font-medium pb-2">
                Trip History
              </p>
              <div className="hidden lg:block">
                <table className="mt-2 w-full text-base font-normal text-left text-white table-auto">
                  <thead className="w-full bg-black">
                    <tr className="w-full">
                      <th
                        scope="col"
                        className="pl-4 px-2 py-4 font-normal text-sm rounded-mdlg"
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
                        className="px-2 py-4 font-normal text-sm text-center rounded-mdlg"
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

              {/* RESPONSIVE VIEW FOR TRIP HISTORY */}
              <div className="lg:hidden px-4 py-4 rounded-md bg-black text-white justify-between w-full items-center mt-4">
                <div className="flex justify-between w-full">
                  <div className="text-base font-medium">Lagos to Ibadan</div>
                  <div className="text-base font-semibold">NGN 24,000</div>
                </div>
                <div className="flex text-[#929292] pt-4 rounded-b-md border-t mt-3 pt-4">
                  <div className=" mr-4">8th January, 2023</div>
                  <div className="flex mr-4">
                    <FaUser className="mr-2" />
                    25
                  </div>
                  <div className="flex ">
                    <FaStar className="mr-2 text-[#FCAB64]" /> 4.1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INFO ON RIGHT */}

          <div
            className={` col-start-6 col-end-9 text-black border rounded-md  ${
              selection === "Info"
                ? "block lg:mt-8 mx-[18px] lg:mx-0"
                : "hidden"
            } lg:block`}
          >
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
                  <FaStar className="text-[#FCAB64] h-[16px] mr-1" /> 4.5
                </h3>
              </div>
            </div>
            <div className=" rounded-mdlg px-4 pt-4 pb-4 w-full">
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
        {flip === DriverViews.STARTOUTBOUNDTRIP && modalVisible && (
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
        {flip === DriverViews.STARTRETURNTRIP && modalVisible && (
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
                  setstartReturnTrip(!startReturnTrip);
                  setVisible(true);
                  setAlertMessage("Trip Started, your ETA is 3:00PM");
                  setModalVisible(false);
                }}
              />
            </div>
          </Modal>
        )}

        {/* WHEN A TRIP ENDS, REMOVE THE TRIP FROM THE UPCOMING SCHEDULE */}
        {flip === DriverViews.ENDOUTBOUNDTRIP && modalVisible && (
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
        {flip === DriverViews.ENDRETURNTRIP && modalVisible && (
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
                      className="pl-4 px-2 py-2 font-normal text-sm rounded-mdlg"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-2 font-normal text-sm text-center rounded-mdlg"
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
