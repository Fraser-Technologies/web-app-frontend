import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Button } from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { _paths_ } from "../../utils/appHelpers";
import ReactPaginate from "react-paginate";
import { data } from "./adminData/dash-test-data";

const MiddleSection = () => {
  // PAGINATION
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
  const [active, setIsActive] = useState("overview");
  const handleClick = (value: string) => {
    setIsActive(value);
  };

  //TOGGLE
  const [menuToggle, setMenuToggle] = useState("");
  const handleSetMenuToggle = (value: string) => {
    if (menuToggle === value) {
      setMenuVisible(!menuVisible);
    } else {
      setMenuToggle(value);
    }
  };

  //TABLE ROW UI
  const rowRenderer = ({ index }: { index: number }) => {
    const item = data[index];
    return (
      <tr className="bg-white border-b border-slate-100 hover:bg-gray-50">
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
    <div className="bg-white h-full col-start-2 col-end-6 ">
      <div className="bg-white h-full px-6">
        {/* GROUP BUTTON - NAVIGATION */}
        <div className="border-b w-full mt-8 py-4 mb-2">
          <div className="inline-flex rounded-md" role="group">
            <button
              onClick={() => handleClick("overview")}
              type="button"
              className={`inline-flex items-center py-2 px-8 text-base font-medium  ${
                active === "overview"
                  ? "bg-primary-100 font-semibold text-black"
                  : "text-gray-400 font-normal bg-gray-50"
              }`}
            >
              Trip Overview
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
        <div className="border-b w-full pb-2 my-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Busstops</h2>
            {active === "overview" ? (
              <Button
                title="+ Create new trip"
                type="submit"
                className="px-4 py-2 text-xs rounded-md bg-primary-100"
                onClick={() => {
                  navigate("");
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>

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
            activeClassName={' bg-gray-300 rounded-md'}
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
        </div>
        
      </div>
    </div>
  );
};

export default MiddleSection;
