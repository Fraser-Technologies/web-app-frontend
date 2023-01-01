import { Input, Modal } from "antd";
import React, { useState } from "react";
import { FaEllipsisV, FaExclamationCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";
import { data } from "../adminData/dash-test-data";
import ShowConfirmDelete from "../popups/confirm-delete";

const TripsOverview = () => {
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

  const navigate = useNavigate();
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleOpenInfoModal = (data: any) => {
    setFlip("info");
    setModalVisible(true);
    setModalData(data);
  };

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

  const [modalData, setModalData] = useState<any>(null);

  //TABLE ROW UI
  const rowRenderer = ({ index }: { index: number }) => {
    const item = data[index];

    return (
      <tr className="bg-white border-b border-slate-100 hover:bg-gray-50 cursor-pointer">
        <td scope="row" className="font-normal text-xs text-gray-700">
          <div className="py-4 px-4" onClick={() => handleOpenInfoModal(item)}>
            {item.start}
          </div>
        </td>
        <td scope="row" className=" font-normal text-xs text-gray-700 ">
          <div className="py-4 px-4" onClick={() => handleOpenInfoModal(item)}>
            {item.destination}
          </div>
        </td>
        <td
          scope="row"
          className="font-normal text-xs text-gray-700 text-center"
        >
          <div className="py-4 px-4" onClick={() => handleOpenInfoModal(item)}>
            {item.date}
          </div>
        </td>
        <td
          scope="row"
          className="font-normal text-xs text-gray-700 text-center"
        >
          <div className="py-4 px-4" onClick={() => handleOpenInfoModal(item)}>
            {item.time}
          </div>
        </td>
        <td
          scope="row"
          className="font-normal text-xs text-gray-700 text-center"
        >
          <div className="py-4 px-4" onClick={() => handleOpenInfoModal(item)}>
            {item.driver}
          </div>
        </td>
        <td
          scope="row"
          className="font-normal text-xs text-gray-700 text-center"
        >
          <div className="py-4 px-4" onClick={() => handleOpenInfoModal(item)}>
            {item.vehicle}
          </div>
        </td>
        <div
          className="py-6 px-4 font-normal text-xs text-gray-700"
          onClick={() => handleSetMenuToggle(index.toString())}
        >
          <td scope="row">
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
        </div>
      </tr>
    );
  };

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
      <div className="">
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
              <th
                scope="col"
                className="py-4 px-2 rounded-r-md font-normal"
              ></th>
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
                  <div className="boder-b text-lg font-medium">
                    Trip Details
                  </div>
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
                    <div className="text-lg">{modalData.start}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Destination
                    </div>
                    <div className="text-lg">{modalData.destination}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Departure Time
                    </div>
                    <div className="text-lg">{modalData.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Date
                    </div>
                    <div className="text-lg">{modalData.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Driver
                    </div>
                    <div className="text-lg">{modalData.driver}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-normal mb-1">
                      Vehicle
                    </div>
                    <div className="text-lg">{modalData.vehicle}</div>
                  </div>
                </div>
                <Button
                  title="Edit"
                  type="submit"
                  className="w-full px-4 py-3 text-xs rounded-md bg-primary-100"
                  onClick={() => {
                    navigate("");
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
                  <div className="boder-b mt-4 text-lg font-medium">
                    Delete {modalData.start} to {modalData.destination} trip?
                  </div>
                </div>

                <Button
                  title="Delete"
                  type="submit"
                  className="w-full py-2 mt-8 text-xs rounded-md bg-[#E71D36] text-white"
                  onClick={() => {
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
      </div>
    </>
  );
};

export default TripsOverview;
