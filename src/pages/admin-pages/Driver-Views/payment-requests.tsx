import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Transaction_interface } from "../../../interfaces/transaction_interface";
import {
  getAllTransactionAction,
  verifyPaymentStatusAction,
} from "../../../state/action/transaction.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { RootState } from "../../../state/redux-store";
import { currency_formatter } from "../../../utils/currency-formatter";
import { FraserButton } from "../../../components/Button";

const DriverPaymentRequests = () => {
  const dispatch = useAppDispatch();

  const [flip, setFlip] = useState("");
  const [visible, setVisible] = useState(false);
  const handleOpenModal = (fliptype: any) => {
    setFlip(fliptype);
    setVisible(true);
  };
  const [loadingIndex, setLoadingIndex] = useState<number>(-1);

  const handleOk = () => {
    setFlip("");
  };
  const handleCancel = () => {
    setFlip("");
  };

  const { transactions } = useAppSelector(
    (state: RootState) => state?.allTransaction
  );
  const { transaction, loading, error } = useAppSelector(
    (state: RootState) => state?.verifyPaymentStatus
  );

  // function to handle page clicks
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected); // update the current page
  };
  const [currentPage, setCurrentPage] = useState(0); // current page
  const itemsPerPage = 10; // number of items per page
  const pageRangeDisplayed = 5; // number of pages to display
  const marginPagesDisplayed = 2; // number of pages to display on either side of the current page
  const totalItems = transactions.filter(
    (a: Transaction_interface) =>
      a.payment_status === false && a.transaction_type == "debit"
  ).length; // total number of items
  const pageCount = Math.ceil(totalItems / itemsPerPage); // total number of pages
  const [messageApi, contextHolder] = message.useMessage();
  // calculate the start and end index of the items to display on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = [...transactions]
    .sort((a, b) => {
      const statusA = Boolean(a.payment_status);
      const statusB = Boolean(b.payment_status);
      return statusA === statusB ? 0 : statusA ? -1 : 1;
    })
    .filter((a: Transaction_interface) => a.transaction_type == "debit")
    .reverse()
    .slice(startIndex, endIndex); // items to display on the current page

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, [dispatch, transaction]);

  useEffect(() => {
    if (error) {
      messageApi.open({
        type: "warning",
        content: error,
      });
    }
  }, [error, messageApi]);

  return (
    <div className="pt-12">
      {contextHolder}
      {/* TRIPS OVERVIEW VIEW*/}

      {/* BUSSTOPS HEADER */}
      <h2 className="fixed w-full py-8 pl-4 mb-4 text-xl font-medium bg-white border-b top-24">
        Payment Requests
      </h2>

      {/* PAGINATION */}
      <div className="px-4">
        <div className="mt-20">
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
            <div
              className="w-full items-center align-center cursor-pointer text-[#0969da] justify-end mr-8 flex text-[14px]"
              onClick={() => {
                handleOpenModal("transactionhistory");
              }}
            >
              view history
            </div>
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
              <th
                scope="col"
                className="px-2 font-normal text-center rounded-r-md"
              ></th>
            </tr>
          </thead>

          {/* //TABLE ROWS */}

          {/* SORT BY IF PAID OR UNPAID */}
          <tbody className="">
            {items
              ?.filter(
                (a: Transaction_interface) =>
                  a.payment_status === false && a.transaction_type == "debit"
              )
              ?.map((transaction: Transaction_interface, index: number) => {
                const isLoading = loadingIndex === index;
                return (
                  <tr
                    className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50"
                    key={transaction?._id}
                  >
                    <td className="px-4 py-2 text-xs font-normal text-gray-700 flex">
                      {`${transaction?.user?.first_name} ${transaction?.user?.last_name}`}
                      <div className="ml-2 bg-[#ffefc1] text-[#756031] border border-[#ffe28d] rounded-md px-2 py-1 text-sm">
                        Pending
                      </div>
                    </td>
                    <td className="text-xs font-normal text-center text-gray-700 ">
                      {transaction?.user?.phone}
                    </td>
                    <td className="px-4 py-2 text-xs font-normal text-center text-gray-700">
                      {currency_formatter(transaction?.amount)}
                    </td>
                    <td className="px-4 py-3 text-xs font-normal text-center text-gray-700 justify-end flex">
                      {" "}
                      <FraserButton
                        loader={isLoading && loading}
                        title={"Payment Made"}
                        // className={"w-full"}
                        size="regular"
                        onClick={() => {
                          setLoadingIndex(index);
                          dispatch(
                            verifyPaymentStatusAction(transaction?._id)
                          ).finally(() => {
                            setLoadingIndex(-1);
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {flip === "transactionhistory" && visible && (
        <Modal
          title={
            <div className="text-lg font-medium border-b pb-6 bg-white">
              Transaction History
            </div>
          }
          onOk={handleOk}
          onCancel={handleCancel}
          open={visible}
          centered={true}
          footer={false}
        >
          <div className="h-[70vh] overflow-y-scroll">
            {transactions
              ?.filter((a: Transaction_interface) => a.payment_status === true)
              .sort((a: Transaction_interface, b: Transaction_interface) => {
                const dateA = new Date(a.updatedAt);
                const dateB = new Date(b.updatedAt);
                return dateA.getTime() - dateB.getTime();
              })
              .reverse()
              ?.map((b: Transaction_interface) => {
                const timestamp = b?.updatedAt;
                const date = new Date(timestamp);
                const formattedDateString = date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });
                const timeString = new Date(date.getTime()).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }
                );
                const formattedString = `${formattedDateString} ${timeString}`;

                return (
                  <div className="w-full flex border-b pb-2 mb-3">
                    <div className="w-full">
                      <div className=" w-full flex items-center">
                        <div className="text-[16px] font-medium ">
                          {`${b?.user?.first_name} ${b?.user?.last_name}`}
                        </div>
                        <div className="ml-2 bg-[#CAFFC1] text-[#327531] border border-[#A4FF8D] rounded-md px-2 py-1 text-sm">
                          Paid
                        </div>
                      </div>
                      <div className="text-[#929292]">{formattedString}</div>
                    </div>
                    <div className="w-1/2 flex justify-end text-lg font-medium">
                      {currency_formatter(b.amount)}
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DriverPaymentRequests;
