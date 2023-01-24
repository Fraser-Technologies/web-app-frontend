import { Modal, Alert, Switch, Space } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { FaStar, FaEllipsisV, FaClock, FaCalendar } from "react-icons/fa";
import { Button } from "../Button";
import moment from 'moment';


const DriverOverview = () => {
  enum DriverViews {
    VIEW = "view",
  }

  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  const [flip, setFlip] = useState<"" | DriverViews.VIEW>("");
  const [modalData, setModalData] = useState();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenModal = (data: any, flipValue: any) => {
    setFlip(flipValue);
    setModalData(data);
    setModalVisible(true);
  };
  const [menuVisible, setMenuVisible] = useState(false);

  const [menuToggle, setMenuToggle] = useState("");
  const handleSetMenuToggle = (value: string) => {
    if (menuToggle === value) {
      setMenuVisible(!menuVisible);
    } else {
      setMenuToggle(value);
    }
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  const [dates, setDates] = useState<string[]>([]);

  React.useEffect(() => {
    let dateArray = [];
    for (let i = 0; i <= 7; i++) {
      dateArray.push(moment().add(i, 'days').format('dddd Do MMMM YYYY'));
    }
    setDates(dateArray);
  }, []);

  return (
    <>
      <Space direction="vertical" className="items-center w-full mt-4">
        {/* {visible && ( */}
        {true && (
          <Alert
            className="text-sm"
            message="Your next trip is coming up by 9:00AM"
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
            <p className="text-base mt-2 font-medium pb-2">
              Upcoming Trip Schedule
            </p>
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
                  </div>

                  <div className="flex w-2/4">
                    <Button
                      title="View Details"
                      type="submit"
                      className="w-full h-[40px] mr-4 my-1 text-xs rounded-md border border-[#ffffff] text-white"
                      onClick={() => {
                        handleOpenModal(undefined, "view");
                      }}
                    />
                    <Button
                      title="Start Trip"
                      type="submit"
                      className="w-full h-[40px] my-1 mr-4 text-xs rounded-md bg-[#00FF6A] text-black"
                      onClick={() => {}}
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
                  </div>

                  <div className="flex w-2/4">
                    <Button
                      title="View Details"
                      type="submit"
                      className="w-full h-[40px] mr-4 my-1 text-xs rounded-md border border-[#ffffff] text-white"
                      onClick={() => {
                        handleOpenModal(undefined, "view");
                      }}
                    />
                    <Button
                      title="Start Trip"
                      type="submit"
                      className="w-full h-[40px] my-1 mr-4 text-xs rounded-md bg-[#00FF6A] text-black"
                      onClick={() => {}}
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

          {/* DETAILS ON RIGHT */}
          <div className="w-3/12 fixed right-40 text-black ">
            <div className="border-l px-8  w-full">
  
              <div className="mb-8">
                <h3 className="font-medium text-base mb-4">Your Availability</h3>
                {dates.map((date, index) => (
                  <div
                    className="flex justify-between bg-gray-100 items-center rounded-md px-2 py-2"
                    key={index}
                  >
                    <div className="">
                      <h3 className="font-medium">{date.split(" ")[0]}</h3>
                      <p className="">{date.split(" ").slice(1).join(" ")}</p>
                    </div>
                    <Switch
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                      defaultChecked
                    />
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <p className="text-sm mb-2 font-normal text-[#929292]">
                  Trips Completed
                </p>
                <h3 className="text-[18px] font-medium">128,000</h3>
              </div>
              <div className="mb-8">
                <p className="text-sm mb-2 font-normal text-[#929292]">
                  Rating
                </p>
                <h3 className="text-[18px] font-medium flex items-center">
                  {" "}
                  <FaStar className="text-[#FCAB64] h-[16px] mr-1" /> 4.5
                </h3>
              </div>
              <div>
                <p className="text-sm mb-2 font-normal text-[#929292]">
                  Vehicle
                </p>
                <h3 className="text-[18px] font-medium flex items-center">
                  Sienna Vienna
                </h3>
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
      </div>
    </>
  );
};

export default DriverOverview;
