import { Input, Modal } from "antd";
import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { data } from "../adminData/dash-test-data";

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  //TABLE ROW UI
  const rowRenderer = ({ index }: { index: number }) => {
    const item = data[index];

    const handleOpenModal = () => {
      setModalVisible(!modalVisible);
      console.log(modalVisible);
      // code to open modal goes here
    };

    return (
      <tr
        onClick={handleOpenModal}
        className="bg-white border-b border-slate-100 hover:bg-gray-50"
      >
        <td scope="row" className=" px-4 font-normal text-xs text-gray-700">
          {item.start}
        </td>
        <td scope="row" className="px-2 font-normal text-xs text-gray-700 ">
          {item.destination}
        </td>
        <td
          scope="row"
          className=" px-2 font-normal text-xs text-gray-700 text-center"
        >
          {item.date}
        </td>
        <td
          scope="row"
          className=" px-2 font-normal text-xs text-gray-700 text-center"
        >
          {item.time}
        </td>
        <td
          scope="row"
          className=" px-2 font-normal text-xs text-gray-700 text-center"
        >
          {item.driver}
        </td>
        <td
          scope="row"
          className=" px-2 font-normal text-xs text-gray-700 text-center"
        >
          {item.vehicle}
        </td>
        <td scope="row" className="py-6 px-4 font-normal text-xs text-gray-700">
          <FaEllipsisV onClick={() => handleSetMenuToggle(index.toString())} />
          {menuToggle === index.toString()
            ? menuVisible && (
                <ul className="bg-white border rounded-md shadow-md absolute z-10 mt-2 py-2">
                  <li
                    onClick={() => {
                      navigate("");
                    }}
                    className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View
                  </li>
                  <li
                    onClick={() => {
                      navigate("");
                    }}
                    className="py-2 px-4 border-b font-medium text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </li>
                  <li
                    onClick={() => {
                      navigate("");
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
                className="py- px-4 rounded-r-md font-normal"
              ></th>
            </tr>
          </thead>

          <tbody className="">
            {items.map((item, index) => rowRenderer({ index }))}
          </tbody>
        </table>
        {modalVisible && (
          <Modal
            title={<div className="boder-b">Trip Details</div>}
            open={modalVisible}
            centered={true}
            footer={false}
            closable={true}
          >

            <div></div>
          </Modal>
        )}
        {/* <Modal></Modal> */}
      </div>
    </>
  );
};

export default TripsOverview;
