import { Modal } from "antd";
import React, { useState } from "react";
import {
  FaBus,
  FaCheckCircle,
  FaEllipsisV,
  FaExclamationCircle,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useAppSelector } from "../../../state/hooks";
import { Button } from "../../Button";

const UserOverview: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0); // current page
  const itemsPerPage = 10; // number of items per page
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
  const totalItems = 10; // total number of items
  const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages

  // function to handle page clicks
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected); // update the current page
  };

  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //   const items = trips.slice(startIndex, endIndex); // items to display on the current page

  // ROW ACTION MENU
  const [menuVisible, setMenuVisible] = useState(false);

  //TOGGLE
  const handleSetMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };
  const [flip, setFlip] = useState("");

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleOpenModal = (flipValue: any) => {
    setFlip(flipValue);
    setModalVisible(true);
  };

  const [visible, setStateModalVisible] = useState<boolean>(false);

  const handleOpenDeactivateModal = (data: any) => {
    setFlip("deactivate");
    setStateModalVisible(true);
    // setModalData(data);
  };

  // console.log("the model data ", modalData);

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  return (
    <>
      {/* TRIPS OVERVIEW VIEW*/}

      {/* BUSSTOPS HEADER */}
      <div className="w-full my-2 border-b h-14">
        <div className="flex justify-between">
          <h2 className="mt-2 text-lg font-medium">Users</h2>{" "}
        </div>
      </div>
      {/* PAGINATION */}
      <div className="px-6 mb-4 bg-gray-200 rounded-md">
        <ReactPaginate
          className="inline-flex items-center w-full py-2"
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
      <table className="w-full text-base font-normal text-left text-white">
        <thead className="uppercase bg-black">
          <tr className="w-full ">
            <th scope="col" className="px-4 py-4 font-normal rounded-l-md">
              First Name
            </th>
            <th scope="col" className="px-2 py-4  text-center font-normal ">
              Last Name
            </th>
            <th scope="col" className="px-2 py-4 font-normal text-center">
              Phone Number
            </th>
            <th scope="col" className="px-2 pl-16 py-4 font-normal">
              Email
            </th>
            <th scope="col" className="px-2 py-4 font-normal rounded-r-md"></th>
          </tr>
        </thead>

        {/* //TABLE ROWS */}
        <tbody className="">
          <tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
            <td
              onClick={() => {
                handleOpenModal("openUser");
              }}
              className="px-4 py-4 text-xs font-normal text-gray-700"
            >
              Amen
            </td>
            <td className="text-xs font-normal text-center text-gray-700 ">
              Olabode
            </td>
            <td
              onClick={() => {
                handleOpenModal("openUser");
              }}
              className="px-4 py-4 text-xs text-center font-normal text-gray-700"
            >
              +2349076736877
            </td>

            <td
              onClick={() => {
                handleOpenModal("openUser");
              }}
              className="px-4 py-4 pl-16 text-xs font-normal text-gray-700"
            >
              amen.olabode@gmail.com
            </td>
            <td
              scope="row"
              className="px-4 py-6 text-xs font-normal text-gray-700"
              onClick={() => {
                handleSetMenuToggle();
              }}
            >
              <div>
                <FaEllipsisV />
              </div>
              {menuVisible && (
                <ul className="absolute z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
                  <li
                    onClick={() => {
                      handleOpenModal("openUser");
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100"
                  >
                    View
                  </li>

                  <li
                    onClick={() => {
                      handleOpenModal("deactivate");
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 border-b hover:bg-gray-100"
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
      {flip === "openUser"
        ? modalVisible && (
            <Modal
              title={
                <div className="text-lg font-medium boder-b">User Profile</div>
              }
              onOk={handleOk}
              onCancel={handleCancel}
              open={modalVisible}
              centered={true}
              footer={false}
              closable={true}
            >
              <div className="h-5/6">
                <div className="text-center py-8">
                  <div className="text-lg font-medium mb-2">Amen Olabode</div>
                  <div className="text-[#949292]">amen.olabode@gmail.com</div>
                  <div className="text-[#949292]">+2349076736877</div>
                </div>

                <div>
                  <div className="text-lg font-medium">Trip History</div>

                  <div className="flex overflow-hidden justify-between border-b py-2 my-4 text-gray-800">
                    <div className="flex">
                      <div className="mt-2 mr-4">
                        <FaBus />
                      </div>
                      <div>
                        <div className="truncate text-base">
                          Lagos to Ibadan
                        </div>
                        <div className="text-[#949292] text-xs">3rd Sept.</div>
                      </div>
                    </div>
                    <div className="text-base font-medium">NGN 2000</div>
                  </div>
                </div>

                <div className="flex overflow-hidden justify-between border-b py-2 my-4 text-gray-800">
                  <div className="flex">
                    <div className="mt-2 mr-4">
                      <FaBus />
                    </div>
                    <div>
                      <div className="truncate text-base">Lagos to Ibadan</div>
                      <div className="text-[#949292] text-xs">3rd Sept.</div>
                    </div>
                  </div>
                  <div className="text-base font-medium">NGN 2000</div>
                </div>
              </div>
            </Modal>
          )
        : flip === "deactivate"
        ? modalVisible && (
            <Modal
              onOk={handleOk}
              onCancel={handleCancel}
              open={modalVisible}
              centered={true}
              footer={false}
              closable={true}
              width={240}
            >
              <div className="w-full text-center place-items-center">
                <FaExclamationCircle
                  size={32}
                  className="text-[#E71D36] w-full mt-8"
                />
                <div className="mt-4 text-base font-medium boder-b">
                  Deactivate Amen Olabode?
                </div>
              </div>

              <Button
                title="Deactivate"
                type="submit"
                className="w-full py-2 mt-8 text-xs rounded-md bg-[#E71D36] text-white"
                onClick={() => {setFlip("success")}}
              />
              <Button
                title="Cancel"
                type="submit"
                className="w-full py-2 mt-4 mb-4 text-xs text-gray-600 border border-gray-500 rounded-md"
                onClick={() => {
                  setFlip("info");
                }}
              />
            </Modal>
          )
        : //  SUCESS MODAL SHOWS AFTER API RETURNS SUCCESS FOR TRIP UPDATES
        flip === "success"
        ? modalVisible && (
            <Modal
              onOk={handleOk}
              onCancel={handleCancel}
              open={modalVisible}
              centered={true}
              footer={false}
              closable={true}
              width={240}
            >
              <div className="w-full text-center place-items-center">
                <FaCheckCircle
                  size={32}
                  className="text-[#00FF6A] w-full mt-8"
                />
                <div className="mt-4 text-base font-medium boder-b">
                  User deactivated succesfully
                </div>
              </div>

              <Button
                title="Close"
                type="submit"
                className="w-full py-2 mt-8 text-xs rounded-md bg-[#00FF6A] text-black"
                onClick={() => {
                  
                  setModalVisible(false);
                  setStateModalVisible(false);
                }}
              />
              
            </Modal>
          )
        : null}
    </>
  );
};

export default UserOverview;
