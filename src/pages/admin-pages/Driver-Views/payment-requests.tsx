import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Button } from "../../../components/Button";

const DriverPaymentRequests = () => {
  enum flipType {
    OPEN = "open",
    SUCCESS = "success",
    DEACTIVATE = "deactivate",
  }

  // function to handle page clicks
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected); // update the current page
  };
  const [currentPage, setCurrentPage] = useState(0); // current page
  const itemsPerPage = 10; // number of items per page
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
  const totalItems = 10; // total number of items
  const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages

  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const items = data.slice(startIndex, endIndex); // items to display on the current page

  const [flip, setFlip] = useState("");
  const [modalData, setModalData] = useState();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="pt-12">
      {/* TRIPS OVERVIEW VIEW*/}

      {/* BUSSTOPS HEADER */}
      <h2 className="fixed w-full py-8 pl-4 mb-4 text-xl font-medium bg-white border-b top-24">
        Payment Requests
      </h2>

      {/* PAGINATION */}
      <div className="px-4 mt-20">
        <div className="px-6 mb-4 bg-gray-200 rounded-md">
          <ReactPaginate
            className="inline-flex items-center w-full py-3"
            pageCount={pageCount}
            pageRangeDisplayed={pageRangeDisplayed}
            marginPagesDisplayed={marginPagesDisplayed}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageLinkClassName={
              "page-link px-3 py-2 mx-2 leading-tight text-gray-800 rounded-md"
            }
            activeClassName={" bg-gray-300 rounded-md"}
            previousClassName={"previous  mr-6"}
            nextClassName={"next ml-6"}
            previousLabel={"<"}
            nextLabel={">"}
          />
        </div>

        {/* BUSSTOPS LIST - TABLE */}
      </div>

      <table className="w-full font-normal text-left text-white ">
        <thead className="bg-black ">
          <tr className="">
            <th scope="col" className="px-4 py-3 font-normal rounded-l-md">
              Name
            </th>
            <th scope="col" className="px-2 font-normal text-center ">
              Phone Number
            </th>
            <th scope="col" className="px-2 font-normal text-center">
              Amount
            </th>
            <th scope="col" className="px-2 font-normal text-center">
              Status
            </th>

            <th scope="col" className="font-normal text-center rounded-r-md">
              Action
            </th>
          </tr>
        </thead>

        {/* //TABLE ROWS */}

        {/* SORT BY IF PAID OR UNPAID */}
        <tbody className="">
          <tr
            className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50"
            // key={undefined?._id}
          >
            <td className="px-4 py-2 text-xs font-normal text-gray-700">
              Data
            </td>
            <td className="text-xs font-normal text-center text-gray-700 ">
              Data
            </td>
            <td className="px-4 py-2 text-xs font-normal text-center text-gray-700">
              Data
            </td>
            <td className="px-4 py-2 text-xs font-normal text-center text-gray-700">
              Data
            </td>

            <td className="px-4 py-3 text-xs font-normal text-center text-gray-700">
              {" "}
              <Button
                title="Paid"
                type="submit"
                className="px-8 py-2 text-black rounded-md bg-primary-100"
                onClick={() => {}}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DriverPaymentRequests;
