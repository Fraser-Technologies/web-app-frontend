import { Input, Modal } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { FaEllipsisV, FaExclamationCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";
import { data } from "../adminData/trips-test-data";
import CreateTripFormComponent from "../components/create-trip-form";
import EditTripFormComponent from "../components/edit-trip-form";

const TripsOverview: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0); // current page
  const itemsPerPage = 10; // number of items per page
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page

  const totalItems = data.length; // total number of items
  const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages

  // function to handle page clicks
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected); // update the current page
  };

  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = data.slice(startIndex, endIndex); // items to display on the current page

  const [menuVisible, setMenuVisible] = useState(false);

  //TOGGLE
  const [menuToggle, setMenuToggle] = useState("");
  const handleSetMenuToggle = (value: string) => {
    if (menuToggle === value) {
      setMenuVisible(!menuVisible);
    } else {
      setMenuToggle(value);
    }
  };
  const [flip, setFlip] = useState("");

  const [modalData, setModalData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleOpenInfoModal = (data: any) => {
    setFlip("info");
    setModalVisible(true);
    setModalData(data);
    Cookies.set("tripID", data.tripID, { expires: 1 });
    Cookies.set("startCity", data.startCity, { expires: 1 });
    Cookies.set("startBusStop", data.startBusStop, { expires: 1 });
    Cookies.set("destinationCity", data.destinationCity, { expires: 1 });
    Cookies.set("destinationBusStop", data.destinationBusStop, { expires: 1 });
    Cookies.set("date", data.date, { expires: 1 });
    Cookies.set("time", data.time, { expires: 1 });
    Cookies.set("driver", data.driver, { expires: 1 });
    Cookies.set("vehicle", data.vehicle, { expires: 1 });
  };

  const tripID = Cookies.get("tripID");
  const startCity = Cookies.get("startCity");
  const startBusStop = Cookies.get("startBusStop");
  const destinationCity = Cookies.get("destinationCity");
  const destinationBusStop = Cookies.get("destinationBusStop");
  const date = Cookies.get("date");
  const time = Cookies.get("time");
  const driver = Cookies.get("driver");
  const vehicle = Cookies.get("vehicle");
  // React.useEffect(() => {}, []);

  const [deleteVisible, setDeleteModalVisible] = useState<boolean>(false);
  const handleOpenDeleteModal = (data: any) => {
    setFlip("delete");
    setDeleteModalVisible(true);
    setModalData(data);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    // setFlip("info");
    if (flip === "info") {
      setModalVisible(false);
      setFlip("");
    }
    if (flip === "delete") {
      setModalVisible(false);
      setFlip("info");
    }
    if (flip === "create") {
      setModalVisible(false);
      setFlip("");
    }
  };
  //TABLE ROW UI
  const rowRenderer = ({ index }: { index: number }) => {
    const item = data[index];

    return (
      <tr className="bg-white border-b border-slate-100 hover:bg-gray-50 cursor-pointer">
        <td
          scope="row"
          onClick={() => handleOpenInfoModal(item)}
          className="font-normal text-xs text-gray-700 py-4 px-4"
        >
          {item.startCity}
        </td>
        <td scope="row" className=" font-normal text-xs text-gray-700 ">
          {item.destinationCity}
        </td>
        <td
          scope="row"
          onClick={() => handleOpenInfoModal(item)}
          className="font-normal text-xs text-gray-700 py-4 px-4"
        >
          {item.date}
        </td>
        <td
          scope="row"
          onClick={() => handleOpenInfoModal(item)}
          className="font-normal text-xs text-gray-700 py-4 px-4"
        >
          {item.time}
        </td>
        <td
          scope="row"
          onClick={() => handleOpenInfoModal(item)}
          className="font-normal text-xs text-gray-700 py-4 px-4"
        >
          {item.driver}
        </td>
        <td
          scope="row"
          onClick={() => handleOpenInfoModal(item)}
          className="font-normal text-xs text-gray-700 py-4 px-4"
        >
          {item.vehicle}
        </td>
        <td
          scope="row"
          className="py-6 px-4 font-normal text-xs text-gray-700"
          onClick={() => handleSetMenuToggle(index.toString())}
        >
          <div>
            <FaEllipsisV />
          </div>
          {menuToggle === index.toString()
            ? menuVisible && (
                <ul className="bg-white border rounded-md shadow-md absolute z-10 mt-2 py-2">
                  <li
                    onClick={() => handleOpenInfoModal(item)}
                    className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View
                  </li>
                  <li
                    onClick={() => {}}
                    className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </li>
                  <li
                    onClick={() => {
                      setFlip("delete");
                      handleOpenDeleteModal(item);
                    }}
                    className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </li>
                </ul>
              )
            : ""}
        </td>
      </tr>
    );
  };

  // const [createVisible, setCreateModalVisible] = useState<boolean>(false);
  // const true = modalData.start !== "Select Start Bus Stop";

  // const handleDataFromChild = () => {};

  return (
    <>
      {/* TRIPS OVERVIEW VIEW*/}
      {/* PAGINATION */}
      <div className="mb-4 bg-gray-200 rounded-md px-6">
        <ReactPaginate
          className="w-full inline-flex py-2 items-center"
          pageCount={pageCount}
          pageRangeDisplayed={pageRangeDisplayed}
          marginPagesDisplayed={marginPagesDisplayed}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageLinkClassName={
            "page-link px-3 py-2 mx-2 leading-tight text-gray-800 rounded-md"
          }
          activeClassName={" bg-gray-300 rounded-md"}
          previousClassName={"previous mr-6"}
          nextClassName={"next ml-6"}
          previousLabel={"<"}
          nextLabel={">"}
        />
      </div>

      {/* BUSSTOPS LIST - TABLE */}
      <table className="table-auto w-full text-base font-normal text-left text-white">
        <thead className="uppercase bg-black">
          <tr>
            <th scope="col" className="py-4 px-4 rounded-l-md font-normal">
              Start
            </th>
            <th scope="col" className="py-4 px-2 font-normal ">
              Destination
            </th>
            <th scope="col" className="py-4 px-2 font-normal text-center">
              Date
            </th>
            <th scope="col" className="py-4 px-2 font-normal text-center">
              Departure
            </th>
            <th scope="col" className="py-4 px-2 font-normal text-center">
              Driver
            </th>
            <th scope="col" className="py-4 px-2 font-normal text-center">
              Vehicle
            </th>
            <th scope="col" className="py-4 px-2 rounded-r-md font-normal"></th>
          </tr>
        </thead>

        <tbody className="">
          {items.map((item, index) => rowRenderer({ index }))}
        </tbody>
      </table>

      {/* MODALS --> VIEW AND DELETE */}

      {flip === "info"
        ? modalVisible && (
            <Modal
              title={
                <div className="boder-b text-lg font-medium">Trip Details</div>
              }
              onOk={handleOk}
              onCancel={handleCancel}
              open={modalVisible}
              centered={true}
              footer={false}
              closable={true}
            >
              <div className="w-full grid grid-cols-2 gap-8 mt-12 pb-12">
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Start
                  </div>
                  <div className="text-lg">{startCity}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Destination
                  </div>
                  <div className="text-lg">{destinationCity}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Start
                  </div>
                  <div className="text-lg">{startBusStop}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Destination
                  </div>
                  <div className="text-lg">{destinationBusStop}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Departure Time
                  </div>
                  <div className="text-lg">{time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Date
                  </div>
                  <div className="text-lg">{date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Driver
                  </div>
                  <div className="text-lg">{driver}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-normal mb-1">
                    Vehicle
                  </div>
                  <div className="text-lg">{vehicle}</div>
                </div>
              </div>
              <Button
                title="Edit"
                type="submit"
                className="w-full px-4 py-3 text-xs rounded-md bg-primary-100"
                onClick={() => {
                  setFlip("edit");
                }}
              />
              <Button
                title="Delete"
                type="submit"
                className="w-full mt-4 mb-6 px-4 py-3 text-xs rounded-md border text-red-600 border-red-500"
                onClick={() => {
                  setFlip("delete");
                  setDeleteModalVisible(true);
                }}
              />
            </Modal>
          )
        : flip === "edit"
        ? true && (
            <Modal
              title={
                <div className="boder-b text-lg font-medium">Edit Trip</div>
              }
              onOk={handleOk}
              onCancel={handleCancel}
              open={true}
              centered={true}
              footer={false}
              closable={true}
            >
              {/* <EditTripFormComponent onSendData={handleDataFromChild} /> */}
              <button
                className={`w-full p-3 mt-8 mb-8 font-medium rounded-lg ${
                  true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
                } `}
                onClick={() => {
                  if (false) {
                    setFlip("review");
                  }
                }}
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
                Create Trip
              </button>
            </Modal>
          )
        : flip === "delete"
        ? deleteVisible && (
            <Modal
              onOk={handleOk}
              onCancel={handleCancel}
              open={deleteVisible}
              centered={true}
              footer={false}
              closable={true}
              width={240}
            >
              <div className="w-full place-items-center text-center">
                <FaExclamationCircle
                  size={32}
                  className="text-[#E71D36] w-full mt-8"
                />
                <div className="boder-b mt-4 text-base font-medium">
                  Delete {startCity} to {destinationCity} trip?
                </div>
              </div>

              <Button
                title="Delete"
                type="submit"
                className="w-full py-2 mt-8 text-xs rounded-md bg-[#E71D36] text-white"
                onClick={() => {

                  //NOT SURE THIS IS USEFUL DURING API CALLS
                  const index = data.indexOf(modalData);
                  if (index > -1) {
                    data.splice(index, 1);
                    console.log(data);
                    setModalVisible(false);
                    setDeleteModalVisible(false);
                  }
                }}
              />
              <Button
                title="Cancel"
                type="submit"
                className="w-full py-2 mt-4 mb-4 text-xs rounded-md border text-gray-600 border-gray-500"
                onClick={() => {
                  setFlip("info");
                }}
              />
            </Modal>
          )
        : null}
    </>
  );
};

export default TripsOverview;
