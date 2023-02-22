import { CircularProgress } from "@mui/material";
import { Alert, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  FaBus,
  FaCheckCircle,
  FaEllipsisV,
  FaExclamationCircle,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Booking_interface } from "../../../interfaces/Booking_interface";
import { User_interface } from "../../../interfaces/user.interface";
import {
  blockUserAction,
  clearBlockUserAction,
  clearUnblockUserAction,
  getAllUserAction,
} from "../../../state/action/user.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Button } from "../../../components/Button";

const UserOverview: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(
    (state: any) => state.allUser
  );
  const { user: blockUser } = useAppSelector((state: any) => state.blockUser);
  const { user: unblockUser } = useAppSelector((state: any) => state.blockUser);
  const { bookings } = useAppSelector((state: any) => state.allBooking);
  const [flip, setFlip] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // const [visible, setStateModalVisible] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(0); // current page
  const itemsPerPage = 10; // number of items per page
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
  const totalItems = users.length; // total number of items
  const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages
  const [selectedUser, setSelectedUser] = useState<User_interface>();
  // function to handle page clicks
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected); // update the current page
  };

  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const items = users.slice(startIndex, endIndex); // items to display on the current page
  const items = [...users]
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    .slice(startIndex, endIndex); // items to display on the current page

  // ROW ACTION MENU
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

  const handleOpenModal = (flipValue: any) => {
    setFlip(flipValue);
    setModalVisible(true);
  };

  const handleOpenDeactivateModal = (data: any) => {
    setFlip("deactivate");
    // setStateModalVisible(true);
    // setModalData(data);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  useEffect(() => {
    if (blockUser?._id || unblockUser?._id) {
      dispatch(getAllUserAction());
      dispatch(clearBlockUserAction());
      dispatch(clearUnblockUserAction());
    }
  }, [blockUser, dispatch, unblockUser]);

  return (
    <div>
      <h2 className="mb-4 pl-4 bg-white fixed border-b top-24 py-8 w-full text-xl font-medium">
        Users{" "}
      </h2>
      <div className="px-4">
        {/* DATA */}
        <div className="bg-black rounded-md mt-24 py-3 px-4 my-4 ">
          <div className="justify-evenly mb-4 pt-6 flex w-full">
            <div className="text-center">
              <p className=" text-gray-400">Total Number of Users </p>
              <p className="text-white ">{users.length}</p>
            </div>
            {/* <div className="text-center">
              <p className=" text-gray-400">Total Active Users</p>
              <p className="text-white ">20,000</p>
            </div> */}
            <div className="text-center">
              <p className=" text-gray-400"> Total Tickets Booked</p>
              <p className="text-white ">{bookings.length}</p>
            </div>
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
              "page-link px-3 py-2 mx-2  leading-tight text-gray-800 rounded-md"
            }
            activeClassName={" bg-gray-300 rounded-md"}
            previousClassName={"previous   mr-6"}
            nextClassName={"next  ml-6"}
            previousLabel={"<"}
            nextLabel={">"}
          />
        </div>
        {/* BUSSTOPS LIST - TABLE */}
        <table className="w-full text-left text-white">
          <thead className="bg-black">
            <tr className="w-full">
              <th scope="col" className="px-4 py-4 font-normal  rounded-l-md">
                First Name
              </th>
              <th scope="col" className="px-2 py-4 font-normal  text-center ">
                Last Name
              </th>
              <th scope="col" className="px-2 py-4 font-normal  text-center">
                Phone Number
              </th>
              <th scope="col" className="px-2 py-4 font-normal  pl-16">
                Email
              </th>
              <th scope="col" className="px-2 py-4 font-normal  pl-16">
                Is Blocked
              </th>
              <th
                scope="col"
                className="px-2 py-4 font-normal  rounded-r-md"
              ></th>
            </tr>
          </thead>

          {/* //TABLE ROWS */}
          <tbody className="">
            {items?.map((user: User_interface, index: Number) => {
              return (
                <tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
                  <td
                    onClick={() => {
                      setSelectedUser(user);
                      handleOpenModal("openUser");
                    }}
                    className="px-4 py-6  text-gray-700"
                  >
                    {user?.first_name}
                  </td>
                  <td
                    onClick={() => {
                      setSelectedUser(user);
                      handleOpenModal("openUser");
                    }}
                    className=" text-center text-gray-700 "
                  >
                    {user?.last_name}
                  </td>
                  <td
                    onClick={() => {
                      setSelectedUser(user);
                      handleOpenModal("openUser");
                    }}
                    className="px-4  text-center text-gray-700"
                  >
                    {user?.phone}
                  </td>

                  <td
                    onClick={() => {
                      setSelectedUser(user);
                      handleOpenModal("openUser");
                    }}
                    className="px-4 pl-16  text-gray-700"
                  >
                    {user?.email}
                  </td>

                  <td
                    onClick={() => {
                      setSelectedUser(user);
                      handleOpenModal("openUser");
                    }}
                    className="px-4 pl-16  text-gray-700"
                  >
                    {`${user?.is_blocked}`}
                  </td>
                  <td
                    className=" font-normal  text-gray-700"
                    onClick={() => {
                      handleSetMenuToggle(index.toString());
                    }}
                  >
                    <div>
                      <FaEllipsisV />
                    </div>
                    {menuToggle === index.toString()
                      ? menuVisible && (
                          <ul className="absolute z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
                            <li
                              onClick={() => {
                                setSelectedUser(user);
                                handleOpenModal("openUser");
                              }}
                              className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100"
                            >
                              View
                            </li>

                            {user?.is_blocked ? (
                              <li
                                onClick={() => {
                                  setSelectedUser(user);
                                  handleOpenModal("activate");
                                }}
                                className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100"
                              >
                                Activate
                              </li>
                            ) : (
                              <li
                                onClick={() => {
                                  setSelectedUser(user);
                                  handleOpenModal("deactivate");
                                }}
                                className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100"
                              >
                                Deactivate
                              </li>
                            )}
                          </ul>
                        )
                      : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* MODALS */}
      {flip === "openUser" && modalVisible && (
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
            <div className="text-center mt-4 mb-6">
              <div className="text-lg font-medium mb-1">
                {`${selectedUser?.first_name} ${selectedUser?.last_name}`}
              </div>
              <div className="text-[#949292]">{selectedUser?.email}</div>
              <div className="text-[#949292]">{selectedUser?.phone}</div>
            </div>

            <div>
              <div className="text-xs font-medium mb-2">Trip History</div>
              {!selectedUser?.bookings?.length && (
                <Alert type="info" message={"No history available"} />
              )}

              {selectedUser?.bookings?.map((book: Booking_interface) => {
                return (
                  <div className="flex overflow-hidden justify-between border-b py-2 my-4 text-gray-800">
                    <div className="flex">
                      <div className="mt-2 mr-4">
                        <FaBus />
                      </div>
                      <div>
                        <div className="truncate text-base">
                          {book?.trip?.travel_destination?.from?.city?.city}
                          to
                          {book?.trip?.travel_destination?.to?.city?.city}
                        </div>
                        <div className="text-[#949292] ">
                          {book?.trip?.take_off_date}
                        </div>
                      </div>
                    </div>
                    <div className="text-base font-medium">
                      NGN {book?.trip?.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      )}
      {/* DEACTIVATE A USER MODAL */}
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
          <div className="w-full text-center place-items-center">
            <FaExclamationCircle
              size={32}
              className="text-[#E71D36] w-full mt-8"
            />
            <div className="mt-4 text-base font-medium boder-b">
              Deactivate{" "}
              {`${selectedUser?.first_name} ${selectedUser?.last_name}`}?
            </div>
          </div>

          <Button
            title="Deactivate"
            type="submit"
            className="w-full py-2 mt-8  rounded-md bg-[#E71D36] text-white"
            onClick={() => {
              dispatch(blockUserAction(selectedUser?._id || ""));
              setFlip("success");
            }}
          />
          <Button
            title="Cancel"
            type="submit"
            className="w-full py-2 mt-4 mb-4  text-gray-600 border border-gray-500 rounded-md"
            onClick={() => {
              setFlip("info");
            }}
          />
        </Modal>
      )}
      {flip === "activate" && modalVisible && (
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
              className="text-[#00FF6A] w-full mt-8"
            />
            <div className="mt-4 text-base font-medium boder-b">
              Activate{" "}
              {`${selectedUser?.first_name} ${selectedUser?.last_name}`}?
            </div>
          </div>

          <Button
            title="Activate"
            type="submit"
            className="w-full py-2 mt-8  rounded-md bg-[#00FF6A]"
            onClick={() => {
              //LEKAN
              dispatch(blockUserAction(selectedUser?._id || ""));
              setFlip("success");
            }}
          />
          <Button
            title="Cancel"
            type="submit"
            className="w-full py-2 mt-4 mb-4  text-gray-600 border border-gray-500 rounded-md"
            onClick={() => {
              setFlip("info");
            }}
          />
        </Modal>
      )}
      {/* // SUCESS MODAL SHOWS AFTER API RETURNS SUCCESS FOR TRIP UPDATES */}
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
          <div className="w-full text-center place-items-center">
            <FaCheckCircle size={32} className="text-[#00FF6A] w-full mt-8" />
            <div className="mt-4 text-base font-medium boder-b">Success</div>
          </div>

          <Button
            title="Close"
            type="submit"
            className="w-full py-2 mt-8  rounded-md bg-[#00FF6A] text-black"
            onClick={() => {
              setModalVisible(false);
              // setStateModalVisible(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserOverview;
