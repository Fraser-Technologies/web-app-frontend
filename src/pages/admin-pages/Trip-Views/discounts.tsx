import { Input, Modal } from "antd";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaExclamationCircle,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { FraserButton } from "../../../components/Button";

const Discounts = () => {
  const [flip, setFlip] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [couponName, setCouponName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponPercent, setCouponPercent] = useState("");
  const [userAllocation, setUserAllocation] = useState("");

  const [menuToggle, setMenuToggle] = useState("");

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    if (flip !== "delete") {
      setModalVisible(false);
      setFlip("");
    }
    if (flip === "delete") {
      setModalVisible(false);
      //   setFlip(TripOption.INFO);
    }
  };

  const itemsPerPage = 10; // number of items per page
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
  const totalItems = 10; // total number of items
  const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages
  const [menuVisible, setMenuVisible] = useState(false); // ROW ACTION MENU
  // function to handle page clicks
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected); // update the current page
  };

  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = 1; // items to display on the current page

  return (
    <div className="px-4 pt-12">
      <div>
        <h2 className="fixed w-full py-8 pl-4 mb-4 text-xl font-medium bg-white border-b top-24"></h2>
        <div className="flex w-full my-2 mt-24 bg-white place-content-end">
          {/* {loading && <Spinner />} */}
          <FraserButton
            type="submit"
            size="regular"
            onClick={() => {
              setFlip("create");
              setModalVisible(true);
            }}
            title={"Create Discount Code"}
          />
        </div>

        {/* DATA */}
      </div>

      {/* PAGINATION */}
      <div className="px-6 mb-4 bg-[#F6F8FA] border border-[#d0d7de] rounded-md items-center align-center flex">
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
      <table className="w-full text-base font-normal text-left text-white table-auto">
        <thead className="bg-black ">
          <tr>
            <th scope="col" className="px-2 py-4 pl-4 font-normal rounded-l-md">
              Name
            </th>
            <th scope="col" className="py-4 font-normal ">
              Code
            </th>
            <th scope="col" className="py-4 font-normal ">
              Discount %
            </th>
            <th scope="col" className="py-4 font-normal ">
              User %
            </th>
            <th scope="col" className="py-4 font-normal ">
              Amount Earned
            </th>
            <th scope="col" className="px-4 py-4 font-normal text-center">
              Usage (Number)
            </th>
            <th scope="col" className="px-2 py-4 font-normal text-center">
              Status
            </th>
            <th scope="col" className="px-2 py-4 font-normal rounded-r-md"></th>
          </tr>
        </thead>

        {/* //TABLE ROWS */}
        <tbody className="">
          <tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
            <td onClick={() => {}} className="py-6 pl-4 text-gray-700">
              {" "}
              Mellanby Hall
            </td>
            <td onClick={() => {}} className="py-4 text-gray-700 ">
              MELLANBY68
            </td>
            <td onClick={() => {}} className="text-center text-gray-700 ">
              15%
            </td>

            <td
              onClick={() => {}}
              className="px-4 py-4 text-center text-gray-700"
            >
              5%
            </td>
            <td
              onClick={() => {}}
              className="px-4 py-4 text-center text-gray-700"
            >
              28,750
            </td>
            <td
              onClick={() => {}}
              className="px-4 py-4 text-center text-gray-700"
            >
              230
            </td>
            <td
              onClick={() => {}}
              className="px-4 py-4 text-center text-gray-700 flex"
            >
              <div className="ml-2 bg-[#CAFFC1] text-[#327531] border border-[#A4FF8D] rounded-md px-2 py-1 text-sm">
                Active
              </div>
              <div className="ml-2 bg-[#ffc1c1] text-[#753131] border border-[#ff8d8d] rounded-md px-2 py-1 text-sm">
                Inactive
              </div>
            </td>
            <td
              className="px-4 py-4 text-gray-700"
              onClick={() => {
                setMenuVisible(!menuVisible);
              }}
            >
              <div>
                <FaEllipsisV />
              </div>
              {/* {menuToggle === index.toString() */}
              {/* ?  */}
              {menuVisible && (
                <ul className="absolute right-12 right-12 z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
                  <li
                    onClick={() => {}}
                    className="px-4 py-2 font-medium text-gray-700 border-b hover:bg-gray-100"
                  >
                    Edit
                  </li>
                  <li
                    onClick={() => {
                      setFlip("deactivate");
                      setModalVisible(true);
                    }}
                    className="px-4 py-2 font-medium text-gray-700 border-b hover:bg-gray-100"
                  >
                    Deactivate
                  </li>
                </ul>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {/* MODALS */}

      {flip === "create" && modalVisible && (
        <Modal
          title={"Create a Discount Coupon"}
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          width={"380px"}
        >
          <div className="mt-12">
            <div className="mt-4">
              <div className="mb-2">
                <label className="text-gray-500  ml-2">
                  Coupon Holder Name
                </label>
              </div>
              <Input
                className="hover:border-green-500 focus:border-green-600 h-10 w-full"
                placeholder="Coupon Holder Name"
                value={couponName}
                required={true}
                onChange={(e) => {
                  setCouponName(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <label className="text-gray-500  ml-2">Coupon Code</label>
              </div>
              <Input
                className="hover:border-green-500 focus:border-green-600 h-10 w-full"
                placeholder="Coupon Code"
                value={couponCode}
                required={true}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <label className="text-gray-500  ml-2">Coupon Percentage</label>
              </div>
              <Input
                className="hover:border-green-500 focus:border-green-600 h-10 w-full"
                placeholder="Coupon Percentage"
                value={couponPercent}
                required={true}
                onChange={(e) => {
                  setCouponPercent(e.target.value);
                }}
              />
            </div>
            <div className="mt-4">
              <div className="mb-2">
                <label className="text-gray-500  ml-2">
                  User Allocation (% of ticket)
                </label>
              </div>
              <Input
                className="hover:border-green-500 focus:border-green-600 h-10 w-full"
                placeholder="User Allocation"
                value={userAllocation}
                required={true}
                onChange={(e) => {
                  setUserAllocation(e.target.value);
                }}
              />
            </div>

            <FraserButton
              type="submit"
              size="regular"
              onClick={() => {
                setFlip("success");
              }}
              title={"Create Discount Code"}
              className={"w-full mt-8 mb-6"}
            />
          </div>
        </Modal>
      )}
      {flip === "success" && modalVisible && (
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          width={240}
        >
          <div className="w-full place-items-center text-center">
            <FaCheckCircle size={32} className="text-[#00FF6A] w-full mt-8" />
            <div className="boder-b mt-4 text-base font-medium">
              Coupon Code created successfully
            </div>
          </div>

          <FraserButton
            title="Close"
            type="submit"
            size="regular"
            onClick={() => {
              setModalVisible(false);
            }}
            className={"w-full mt-4 mb-6"}
          />
        </Modal>
      )}
      {flip === "deactivate" && modalVisible && (
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
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
              Deactivate Coupon Code
            </div>
          </div>

          <FraserButton
            title="Deactivate"
            type="submit"
            size="regular"
            onClick={() => {
              setModalVisible(false);
            }}
            className={"w-full mt-8 mb-4"}
          />

          <FraserButton
            title="Cancel"
            type="submit"
            size="regular"
            buttonType="secondary"
            secondaryColor="black"
            onClick={() => {
              setModalVisible(false);
            }}
            className={"w-full mb-2"}
          />
        </Modal>
      )}
    </div>
  );
};

export default Discounts;
