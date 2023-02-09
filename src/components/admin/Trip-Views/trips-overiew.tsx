import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  FaCaretDown,
  FaCheck,
  FaCheckCircle,
  FaEllipsisV,
  FaExclamationCircle,
  FaMinusCircle,
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Trip_interface } from "../../../interfaces/trip_interface";
import {
  deleteTripByIdAction,
  getAllTripAction,
  resetDeleteTripAction,
  resetUpdateTripAction,
} from "../../../state/action/trip.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { Button } from "../../Button";
import CreateTripFormComponent from "../components/create-trip-form";
import EditTripFormComponent from "../components/edit-trip-form";

const TripsOverview: React.FC = () => {
  enum TripOption {
    NONE = "",
    SUCCESS = "success",
    INFO = "info",
    CREATE = "create",
    REVIEW = "review",
    EDIT = "edit",
    DELETE = "delete",
    MANIFEST = "manifest",
  }
  const dispatch = useAppDispatch();
  const { loading, trips } = useAppSelector((state: any) => state.allTrip);
  const { trip } = useAppSelector((state: any) => state.createTrip);
  const { trip: updatedTrip } = useAppSelector(
    (state: any) => state.updateTrip
  );
  const { trip: deletedTrip, loading: deleteLoading } = useAppSelector(
    (state: any) => state.deleteTrip
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [modalData, setModalData] = useState<Trip_interface>();
  const [flip, setFlip] = useState<
    | ""
    | TripOption.CREATE
    | TripOption.DELETE
    | TripOption.EDIT
    | TripOption.INFO
    | TripOption.REVIEW
    | TripOption.SUCCESS
    | TripOption.MANIFEST
  >("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const itemsPerPage = 10; // number of items per page
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
  const totalItems = trips?.length; // total number of items
  const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages
  const [menuVisible, setMenuVisible] = useState(false); // ROW ACTION MENU
  const [messageApi, contextHolder] = message.useMessage();

  // function to handle page clicks
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected); // update the current page
  };

  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = trips.slice(startIndex, endIndex); // items to display on the current page

  const handleOpenModal = (data: any, flipValue: any) => {
    setFlip(flipValue);
    setModalData(data);
    setModalVisible(true);
  };

  const [visible, setStateModalVisible] = useState<boolean>(false);
  const handleOpenDeleteModal = (data: any) => {
    setFlip(TripOption.DELETE);
    setStateModalVisible(true);
    setModalData(data);
  };

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
    if (flip !== "delete") {
      setModalVisible(false);
      setFlip("");
    }
    if (flip === "delete") {
      setModalVisible(false);
      setFlip(TripOption.INFO);
    }
  };

  useEffect(() => {
    if (trip?._id) {
      dispatch(getAllTripAction());
      setMenuVisible(!menuVisible);
      setFlip("");
    }
  }, [dispatch, menuVisible, trip]);

  useEffect(() => {
    if (updatedTrip?._id) {
      setFlip("");
      dispatch(resetUpdateTripAction());
      dispatch(getAllTripAction());
    }
  }, [dispatch, updatedTrip]);

  useEffect(() => {
    if (deletedTrip?._id) {
      messageApi.open({
        type: "info",
        content: "This trip have been deleted",
      });

      dispatch(resetDeleteTripAction());
      dispatch(getAllTripAction());
      setFlip(TripOption.NONE);
    }
  }, [TripOption, deletedTrip, dispatch, messageApi]);

  const [selectedData, setIsSelected] = useState("day");
  const handleFilterToggle = (value: string) => {
    setIsSelected(value);
  };
  const [onboard, setOnboard] = useState(false);

  return (
    <div className="pt-12 px-4">
      {/* TRIPS OVERVIEW VIEW*/}
      {/* BUSSTOPS HEADER */}
      <div>
        <h2 className="mb-4 pl-4 bg-white fixed border-b top-24 py-8 w-full text-xl font-medium">
          Trips{" "}
        </h2>
        <div className="flex place-content-end my-2  mt-24 w-full  bg-white">
          {/* <h2 className=" text-xs font-medium">Trips</h2> */}
          {/* {loading && <Spinner />} */}
          <Button
            title="+ Create new trip"
            type="submit"
            className="px-4 py-2 mb-2 rounded-md bg-primary-100"
            onClick={() => {
              setModalVisible(true);
              setFlip(TripOption.CREATE);
            }}
          />
        </div>

        {/* DATA */}
        <div className="bg-black rounded-md py-3 px-4 my-4 ">
          <div className="m-auto text-white  mb-4 justify-between flex w-1/3">
            <div
              className={` px-2 py-1 cursor-pointer ${
                selectedData === "day"
                  ? "bg-[#00ff6a] text-center text-black"
                  : "text-[#666666]"
              }`}
              onClick={() => handleFilterToggle("day")}
            >
              Day
            </div>
            <div
              className={` px-2 py-1 cursor-pointer ${
                selectedData === "week"
                  ? "bg-[#00ff6a] text-center text-black"
                  : "text-[#666666]"
              }`}
              onClick={() => handleFilterToggle("week")}
            >
              Week
            </div>
            <div
              className={` px-2 py-1 cursor-pointer ${
                selectedData === "month"
                  ? "bg-[#00ff6a] text-center text-black"
                  : "text-[#666666]"
              }`}
              onClick={() => handleFilterToggle("month")}
            >
              Month
            </div>
            <div
              className={` px-2 py-1 cursor-pointer ${
                selectedData === "6 months"
                  ? "bg-[#00ff6a] text-center text-black"
                  : "text-[#666666]"
              }`}
              onClick={() => handleFilterToggle("6 months")}
            >
              6 Months
            </div>
            <div
              className={` px-2 py-1 cursor-pointer ${
                selectedData === "year"
                  ? "bg-[#00ff6a] text-center text-black"
                  : "text-[#666666]"
              }`}
              onClick={() => handleFilterToggle("year")}
            >
              Year
            </div>
          </div>
          <div className="justify-evenly mb-4 border-t border-[#666666] pt-6 flex w-full">
            <div className="text-center">
              <p className=" text-gray-400">Total Trips Executed </p>
              <p className="text-white ">
                {
                  (trips?.filter(
                    (trip: Trip_interface) => trip?.completed_status === true
                  )).length
                }
              </p>
            </div>
            <div className="text-center">
              <p className=" text-gray-400">Total Available Trips</p>
              <p className="text-white ">
                {
                  trips?.filter(
                    (tripe: Trip_interface) => trip?.completed_status !== true
                  ).length
                }
              </p>
            </div>
            <div className="text-center">
              <p className=" text-gray-400"> Active Trips</p>
              <p className="text-white ">20,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="px-4 mb-2 bg-gray-200 rounded-md">
        <ReactPaginate
          className="inline-flex items-center w-full py-2"
          pageCount={pageCount}
          pageRangeDisplayed={pageRangeDisplayed}
          marginPagesDisplayed={marginPagesDisplayed}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageLinkClassName={
            "page-link px-2 mx-2  leading-tight text-gray-800 rounded-md"
          }
          activeClassName={" bg-gray-300 rounded-md"}
          previousClassName={"previous  mr-6"}
          nextClassName={"next  ml-6"}
          previousLabel={"<"}
          nextLabel={">"}
        />
      </div>
      {/* BUSSTOPS LIST - TABLE */}
      <table className="w-full text-base font-normal text-left text-white table-auto">
        <thead className=" bg-black">
          <tr>
            <th
              scope="col"
              className="pl-4 px-2 py-4 font-normal  rounded-l-md"
            >
              Date
            </th>
            <th scope="col" className="py-4 font-normal ">
              Departure
            </th>
            <th scope="col" className="px-4 py-4 font-normal  text-center">
              Start
            </th>
            <th scope="col" className="px-2 py-4 font-normal  text-center">
              Destination
            </th>
            <th scope="col" className="px-2 py-4 font-normal  text-center">
              Driver
            </th>
            <th scope="col" className="px-2 py-4 font-normal  text-center">
              Vehicle
            </th>
            <th
              scope="col"
              className="px-2 py-4 font-normal  rounded-r-md"
            ></th>
          </tr>
        </thead>

        {/* //TABLE ROWS */}
        <tbody className="">
          {items?.map((trip: Trip_interface, index: Number) => {
            return (
              <tr
                className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50"
                key={trip?._id}
              >
                <td
                  onClick={() => {
                    handleOpenModal(trip, "info");
                  }}
                  className="pl-4 py-6  text-gray-700"
                >
                  {trip?.take_off_date}
                </td>
                <td
                  onClick={() => {
                    handleOpenModal(trip, "info");
                  }}
                  className=" py-4   text-gray-700"
                >
                  {trip?.take_off_time}
                </td>
                <td
                  onClick={() => {
                    handleOpenModal(trip, "info");
                  }}
                  className="px-4 py-4  text-center text-gray-700"
                >
                  {trip?.travel_destination?.from?.city?.city}
                </td>
                <td
                  onClick={() => {
                    handleOpenModal(trip, "info");
                  }}
                  className=" text-center text-gray-700"
                >
                  {trip?.travel_destination?.to?.city?.city}
                </td>

                <td
                  onClick={() => {
                    handleOpenModal(trip, "info");
                  }}
                  className="px-4 py-4  text-center text-gray-700"
                >
                  {`${trip?.driver?.first_name} ${trip?.driver?.last_name} `}
                </td>
                <td
                  onClick={() => {
                    handleOpenModal(trip, "info");
                  }}
                  className="px-4 py-4  text-center text-gray-700"
                >
                  {trip?.bus?.make}
                </td>
                <td
                  className="px-4 py-4  text-gray-700"
                  onClick={() => {
                    // setMenuVisible(!menuVisible);
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
                              handleOpenModal(trip, "info");
                            }}
                            className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100"
                          >
                            View
                          </li>
                          <li
                            onClick={() => {
                              handleOpenModal(trip, "edit");
                            }}
                            className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100"
                          >
                            Edit
                          </li>
                          <li
                            onClick={() => {
                              setFlip(TripOption.DELETE);
                              handleOpenDeleteModal(trip);
                            }}
                            className="px-4 py-2  font-medium text-gray-700 border-b hover:bg-gray-100"
                          >
                            Delete
                          </li>
                        </ul>
                      )
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* MODALS */}
      {flip === TripOption.CREATE && modalVisible && (
        <Modal
          title={
            <div className="text-xs font-medium boder-b">Create a new trip</div>
          }
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
        >
          <CreateTripFormComponent />
        </Modal>
      )}
      {/* {flip === TripOption.REVIEW && modalVisible && (
				<Modal
					title={
						<div className="text-xs font-medium boder-b">Trip Details</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="grid w-full grid-cols-2 gap-8 pb-12 mt-12">
						<div>
							<div className="mb-1  text-gray-400">Start</div>
							<div className="text-xs">Start City </div>
						</div>

						<div>
							<div className="mb-1  text-gray-400">Destination</div>
							<div className="text-xs">Destination City</div>
						</div>
						<div>
							<div className="mb-1  text-gray-400">Start Bus Stop</div>
							<div className="text-xs">Start Bus Stop</div>
						</div>
						<div>
							<div className="mb-1  text-gray-400">
								Destination Bus Stop
							</div>
							<div className="text-xs">Destination Bus Stop</div>
						</div>
						<div>
							<div className="mb-1  text-gray-400">Departure Time</div>
							<div className="text-xs">Time</div>
						</div>
						<div>
							<div className="mb-1  text-gray-400">Date</div>
							<div className="text-xs">Date</div>
						</div>
						<div>
							<div className="mb-1  text-gray-400">Driver</div>
							<div className="text-xs">Driver</div>
						</div>
						<div>
							<div className="mb-1  text-gray-400">Vehicle</div>
							<div className="text-xs">Vehicle</div>
						</div>
					</div>
					<Button
						title="Continue"
						type="submit"
						className="w-full px-4 py-4  rounded-md bg-primary-100"
						onClick={() => {
							setFlip(TripOption.SUCCESS);
						}}
					/>
					<Button
						title="Edit"
						type="submit"
						className="w-full px-4 py-4 mt-4 mb-6  text-gray-500 border border-gray-500 rounded-md"
						onClick={() => {
							setFlip(TripOption.CREATE);
						}}
					/>
				</Modal>
			)} */}
      {flip === TripOption.SUCCESS && modalVisible && (
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
            <div className="mt-4 text-base font-medium boder-b">
              Trip succesfully created
            </div>
          </div>

          <Button
            title="Close"
            type="submit"
            className="w-full py-2 mt-8 mb-4  rounded-md bg-[#00FF6A] text-black"
            onClick={() => {
              setModalVisible(false);
            }}
          />
        </Modal>
      )}
      {flip === TripOption.INFO && modalVisible && (
        <Modal
          title={
            <div>
              <div className="text-lg font-medium boder-b mt-4">
                Trip Details
              </div>
              <div
                className=" font-normal text-[#22B11E] mt-2 cursor-pointer"
                onClick={() => handleOpenModal(trip, "manifest")}
              >
                {" "}
                View Passenger Manifest
              </div>
            </div>
          }
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
        >
          <div className="grid grid-cols-2 gap-2 pb-12 mt-8">
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Start</div>
              <div className="text-xs">
                {modalData?.travel_destination?.from?.city?.city}
              </div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Destination</div>
              <div className="text-xs">
                {modalData?.travel_destination?.to?.city?.city}
              </div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Start</div>
              <div className="text-xs">
                {modalData?.travel_destination?.from?.start_busstop}
              </div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Destination</div>
              <div className="text-xs">
                {modalData?.travel_destination?.to?.stop_busstop}
              </div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Departure Time</div>
              <div className="text-xs">{modalData?.take_off_time}</div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Date</div>
              <div className="text-xs">{modalData?.take_off_date}</div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Driver</div>
              <div className="text-xs">
                {`${modalData?.driver?.first_name} ${modalData?.driver?.last_name}`}
              </div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
              <div className="mb-1  text-gray-400">Vehicle</div>
              <div className="text-xs">{modalData?.bus?.make}</div>
            </div>
          </div>
          <Button
            title="Edit"
            type="submit"
            className="w-full px-4 py-4  rounded-md bg-primary-100"
            onClick={() => {
              setFlip(TripOption.EDIT);
            }}
          />
          <Button
            title="Delete"
            type="submit"
            className="w-full px-4 py-4 mt-4 mb-6  text-red-600 border border-red-500 rounded-md"
            onClick={() => {
              setFlip(TripOption.DELETE);
              setStateModalVisible(true);
            }}
          />
        </Modal>
      )}

      {/* LEKAN, NEW ADDITION */}
      {flip === TripOption.MANIFEST && modalVisible && (
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
            <div className="my-1  text-gray-400">
              15 Passengers, 2 Onboard, 13 Not Onboard
            </div>
            <table className="mt-2 w-full text-base font-normal text-left text-white table-auto">
              <thead className="bg-black">
                <tr>
                  <th
                    scope="col"
                    className="pl-4 px-2 py-2 font-normal  rounded-mdlg"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-2 font-normal  text-center rounded-mdlg"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              {/* //TABLE ROWS */}
              <tbody className="mt-4">
                <tr className="border-b cursor-pointer border-slate-100 hover:bg-gray-50">
                  <td onClick={() => {}} className="pl-4 py-4  text-gray-700">
                    Amen Olabode
                  </td>
                  <td onClick={() => {}} className=" text-center text-gray-700">
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

      {flip === TripOption.EDIT && modalVisible && (
        <Modal
          title={<div className="text-xs font-medium boder-b">Edit Trip</div>}
          onOk={handleOk}
          onCancel={handleCancel}
          open={true}
          centered={true}
          footer={false}
          closable={true}
        >
          <EditTripFormComponent trip={modalData} />
        </Modal>
      )}
      {flip === TripOption.DELETE && visible && (
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          open={visible}
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
              Delete {modalData?.travel_destination?.from?.start_busstop} to{" "}
              {modalData?.travel_destination?.to?.stop_busstop} trip?{" "}
              <span>
                {deleteLoading && (
                  <svg
                    className={`${
                      //API Call Loading?
                      true ? "animate-spin" : "hidden"
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
                )}
              </span>
            </div>
          </div>

          <Button
            title={`Delete`}
            type="submit"
            className="w-full py-2 mt-8 text-xs rounded-md bg-[#E71D36] text-white"
            onClick={() => {
              dispatch(deleteTripByIdAction(modalData?._id || ""));
            }}
          />
          <Button
            title="Cancel"
            type="submit"
            className="w-full py-2 mt-4 mb-4 text-xs text-gray-600 border border-gray-500 rounded-md"
            onClick={() => {
              setFlip(TripOption.INFO);
            }}
          />
        </Modal>
      )}
      {/* }   SUCESS MODAL SHOWS AFTER API RETURNS SUCCESS FOR TRIP UPDATES */}
      {flip === TripOption.SUCCESS && visible && (
        <Modal
          onOk={handleOk}
          onCancel={handleCancel}
          open={visible}
          centered={true}
          footer={false}
          closable={true}
          width={240}
        >
          <div className="w-full text-center place-items-center">
            <FaCheckCircle size={32} className="text-[#00FF6A] w-full mt-8" />
            <div className="mt-4 text-base font-medium boder-b">
              Trip updated succesfully
            </div>
          </div>

          <Button
            title="View"
            type="submit"
            className="w-full py-2 mt-8  rounded-md bg-[#00FF6A] text-black"
            onClick={() => {
              //NOT SURE THIS IS USEFUL DURING API CALLS
              setFlip(TripOption.INFO);
            }}
          />
          <Button
            title="Close"
            type="submit"
            className="w-full py-2 mt-4 mb-4  text-gray-600 border border-gray-500 rounded-md"
            onClick={() => {
              setModalVisible(false);
              setStateModalVisible(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default TripsOverview;
