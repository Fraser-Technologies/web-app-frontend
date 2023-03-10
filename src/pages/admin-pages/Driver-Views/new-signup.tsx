import { CircularProgress } from "@mui/material";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { User_interface } from "../../../interfaces/user.interface";
// import { getTripByDriverAction } from "../../../state/action/trip.action";
import {
  AdminUpdateUserAction,
  getAllDriverAction,
  ResetAdminUpdateUserAction,
} from "../../../state/action/user.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { RootState } from "../../../state/redux-store";
import { FraserButton } from "../../../components/Button";

const NewSignUps: React.FC = () => {
  enum flipType {
    OPEN = "open",
    SUCCESS = "success",
    DEACTIVATE = "deactivate",
  }
  const dispatch = useAppDispatch();

  const [modalData, setModalData] = useState<User_interface>();
  const { drivers } = useAppSelector((state: RootState) => state?.allDriver);
  const { userInfo, loading, error } = useAppSelector(
    (state: RootState) => state.adminUpdateUser
  );

	// function to handle page clicks
	const handlePageClick = (data: any) => {
		setCurrentPage(data.selected); // update the current page
	};
	
	const [currentPage, setCurrentPage] = useState(0); // current page
	const itemsPerPage = 10; // number of items per page
	const pageRangeDisplayed = 5; // number of pages to display
	const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
	const totalItems = drivers?.filter(
		(d: User_interface) => d?.driver_verification_status === false
	).length; // total number of items
	const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages

  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = [...drivers]
    .sort((a, b) => a.first_name.localeCompare(b.first_name))
    ?.filter((d: User_interface) => d?.driver_verification_status === false)
    .slice(startIndex, endIndex); // items to display on the current page

  // ROW ACTION MENU
  // const [menuVisible, setMenuVisible] = useState(false);

  //TOGGLE
  // const handleSetMenuToggle = () => {
  //   setMenuVisible(!menuVisible);
  // };
  const [flip, setFlip] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenModal = (driver: User_interface) => {
    setModalData(driver);
    setFlip(flipType.OPEN);
    setModalVisible(true);
    // dispatch(getTripByDriverAction());
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(getAllDriverAction());
      dispatch(ResetAdminUpdateUserAction());
      setModalVisible(false);
    }
  }, [dispatch, userInfo]);

  return (
    <div className="pt-12">
      {/* TRIPS OVERVIEW VIEW*/}

      {/* BUSSTOPS HEADER */}
      <h2 className="fixed w-full py-8 pl-4 mb-4 text-xl font-medium bg-white border-b top-24">
        New Signups{" "}
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
        <table className="w-full font-normal text-left text-white ">
          <thead className="bg-black ">
            <tr className="">
              <th scope="col" className="px-4 py-3 font-normal rounded-l-md">
                First Name
              </th>
              <th scope="col" className="px-2 font-normal text-center ">
                Last Name
              </th>
              <th scope="col" className="px-2 font-normal text-center">
                Phone
              </th>
              <th scope="col" className="px-2 font-normal text-center">
                Email
              </th>

              <th scope="col" className="px-2 font-normal text-center">
                Vehicle
              </th>

              <th scope="col" className="font-normal text-center rounded-r-md">
                Availability
              </th>
            </tr>
          </thead>

          {/* //TABLE ROWS */}
          <tbody className="">
            {items.map((driver: User_interface) => {
              return (
                <tr
                  className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50"
                  key={driver?._id}
                >
                  <td
                    onClick={() => {
                      handleOpenModal(driver);
                    }}
                    className="px-4 py-2 text-xs font-normal text-gray-700"
                  >
                    {driver?.first_name}
                  </td>
                  <td className="text-xs font-normal text-center text-gray-700 ">
                    {driver?.last_name}
                  </td>
                  <td
                    onClick={() => {
                      handleOpenModal(driver);
                    }}
                    className="px-4 py-2 text-xs font-normal text-center text-gray-700"
                  >
                    {driver?.phone}
                  </td>
                  <td
                    onClick={() => {
                      handleOpenModal(driver);
                    }}
                    className="px-4 py-2 text-xs font-normal text-center text-gray-700"
                  >
                    {driver?.email}
                  </td>

                  <td
                    onClick={() => {
                      handleOpenModal(driver);
                    }}
                    className="px-4 py-2 text-xs font-normal text-center text-gray-700"
                  >
                    {driver?.bus?.make}
                  </td>

                  <td className="px-4 py-3 text-xs font-normal text-center text-gray-700">
                    {" "}
                    <FraserButton
                      title="Approve"
                      type="submit"
                      size="regular"
                      onClick={() => {
                        dispatch(
                          AdminUpdateUserAction(driver?._id, {
                            driver_verification_status: true,
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {flip === flipType.OPEN && modalVisible && (
        <Modal
          title={
            <div className="text-lg font-medium boder-b">Driver Details</div>
          }
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
        >
          <div>
            <div className="flex mt-8">
              <img
                src={modalData?.image}
                alt=""
                className=" w-[72px] h-[72px]"
              />

              <div className="ml-4">
                <div className="text-base font-medium">
                  {`${modalData?.first_name} ${modalData?.last_name}`}
                </div>
                <div className="text-xs">{modalData?.email}</div>
                {/* //LICENSE NUMBER */}
                <div className="text-xs">{modalData?.driver_license}</div>
              </div>
            </div>

            <FraserButton
              title="Approve"
              type="submit"
              size="regular"
              onClick={() => {
                dispatch(
                  AdminUpdateUserAction(modalData?._id || "", {
                    driver_verification_status: true,
                  })
                );
              }}
            />
            <div className="grid grid-cols-2 gap-2 pb-8 mt-2">
              <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
                <div className="mb-1 text-gray-400">Mobile Number</div>
                <div className="text-xs">{modalData?.phone}</div>
              </div>
              <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
                <div className="mb-1 text-gray-400">Primary Location</div>
                <div className="text-xs">{modalData?.location}</div>
              </div>
              <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
                <div className="mb-1 text-gray-400">Bus Make and Model</div>
                <div className="text-xs">
                  {` ${modalData?.bus?.make} ${modalData?.bus?.model}								`}
                </div>
              </div>
              <div className="bg-[#fcfcfc] rounded-md py-2 px-4">
                <div className="mb-1 text-gray-400">Vehicle Registration</div>
                <div className="text-xs">
                  {modalData?.bus?.registration_number}
                </div>
              </div>
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4 pb-8">
              <div className="mb-1 text-gray-400">Banking Information</div>
              <div className="text-xs">
                {modalData?.balance?.user_banks_details?.bank_name}
              </div>
              <div className="text-xs">
                {modalData?.balance?.user_banks_details?.account_number}
              </div>
            </div>

            <div className="bg-[#fcfcfc] rounded-md py-2 px-4 mt-4">
              <div className="mb-1 text-gray-400">Drivers License</div>
              <img
                src={modalData?.driver_license}
                alt=""
                className="ml-4 w-[48px] h-[48px]"
              />
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4 mt-4">
              <div className="mb-1 text-gray-400">Proof of Insurance</div>
              <img
                src={modalData?.bus?.bus_insurance}
                alt=""
                className="ml-4 w-[48px] h-[48px]"
              />
            </div>
            <div className="bg-[#fcfcfc] rounded-md py-2 px-4 mt-4">
              <div className="mb-1 text-gray-400">
                Road Worthiness Certificate
              </div>
              <img
                src={modalData?.bus?.road_worthiness_cert}
                alt=""
                className="ml-4 w-[48px] h-[48px]"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewSignUps;
