/* eslint-disable jsx-a11y/anchor-is-valid */
import { Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  BsArrowDownLeftCircleFill,
  BsArrowUpRightCircleFill,
} from "react-icons/bs";
import {
  FaCaretDown,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/redux-store";
import { currency_formatter } from "../../utils/currency-formatter";
import {
  getBalanceByUserAction,
  withdrawBalanceAction,
} from "../../state/action/balance.action";
import { Transaction_interface } from "../../interfaces/transaction_interface";
import LoadingWheel from "../../components/loading-svg";
import { FraserButton } from "../../components/Button";

const DriverRevenueOverview = () => {
  enum DriverRevenueView {
    WITHDRAWAL = "withdrawal",
    ADDBANK = "addbank",
  }

  //   const [selectedData, setIsSelected] = useState("day");
  //   const handleFilterToggle = (value: string) => {
  //     setIsSelected(value);
  //   };
  const { balance } = useAppSelector((state: RootState) => state.userBalance);
  const {
    balance: withdraw,
    loading: loadingWithdraw,
    error: withdrawError,
  } = useAppSelector((state: RootState) => state.withdrawBalance);

  const [flip, setFlip] = useState<"" | DriverRevenueView>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [bankIsOpen, setBankIsOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("Select receiving bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [visible, setVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  const handleBankChange = (bank: any) => {
    setSelectedBank(bank);
    setBankIsOpen(!bankIsOpen);
  };

  // const regex = /\B(?=(\d{3})+(?!\d))/g;

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    // const formattedValue = inputValue.replace(regex, ",");
    // setValue(formattedValue);
  };
  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFlip("");
  };

  const handlePayout = (data: any, flip: any) => {
    setFlip(flip);
    setModalVisible(true);
  };

  const [item, setItem] = useState(0);
  const nextItem = () => {
    if (item <= 2) {
      setItem(item + 1);
    }
    if (item >= 2) {
      setItem(0);
    }
  };
  const previousItem = () => {
    if (item >= 0) {
      setItem(item - 1);
    }
    if (item >= -1) {
      setItem(0);
    }
  };

  useEffect(() => {
    if (withdrawError !== "") {
      messageApi.open({
        type: "error",
        content: withdrawError,
      });
    }
  }, [messageApi, withdrawError]);

  useEffect(() => {
    dispatch(getBalanceByUserAction());
    setModalVisible(false);
    setValue("");
  }, [dispatch, withdraw]);

  return (
    <>
      {contextHolder}
      <div className="mx-[18px] lg:mx-[120px] text-sm mt-24 lg:mt-32">
        <div className="lg:grid h-screen pt-2 lg:pt-8 lg:grid-cols-12 lg:gap-4">
          <div className="lg:col-start-1 lg:fixed lg:w-1/2 text-black lg:col-end-8">
            <div className="lg:bg-black  text-white lg:px-12 lg:py-16 rounded-md">
              <div className="bg-black mt-6 px-6 lg:px-0 py-16 text-center lg:text-left lg:py-4 lg:mt-0  rounded-md text-sm font-normal text-[#646464]">
                <div className="flex items-center justify-between">
                  <FaChevronCircleLeft
                    className="lg:hidden text-white text-xl"
                    onClick={previousItem}
                  />
                  <div className="w-full items-center place-content-center lg:place-content-start">
                    <div
                      className={`${item === 0 ? "block" : "hidden lg:block"}`}
                    >
                      <div>Total Available Balance</div>
                      <h3 className="text-[24px] mt-3 text-white font-semibold">
                        {currency_formatter(balance?.available_balance)}
                      </h3>
                    </div>
                    {/* <div className="lg:flex lg:mt-8 justify-between">
                      <div
                        className={`${
                          item === 1 ? "block" : "hidden lg:block"
                        }`}
                      >
                        <div className="lg:text-sm lg:mb-3 lg:font-normal lg:text-[#646464]">
                          Total Earnings
                        </div>
                        <h3 className="text-[24px] mt-3 lg:mt-0 text-white lg:text-[#646464] font-semibold lg:text-[18px] lg:font-medium">
                          {currency_formatter(balance?.total_earnings)}
                        </h3>
                      </div>
                      <div
                        className={`ml-auto mr-auto ${
                          item === 2 ? "block" : "hidden lg:block"
                        }`}
                      >
                        <div className="lg:text-sm lg:mb-3 lg:font-normal lg:text-[#646464]">
                          Total Withdrawals
                        </div>
                        <h3 className="text-[24px] mt-3 lg:mt-0 text-white lg:text-[#646464] font-semibold lg:text-[18px] lg:font-medium">
                          {currency_formatter(balance?.total_withdraw)}
                        </h3>
                      </div>
                    </div> */}
                  </div>
                  <FaChevronCircleRight
                    className="lg:hidden text-white text-xl"
                    onClick={nextItem}
                  />
                </div>
              </div>

              {/* //FILTERS */}
              {/* <div className="hidden lg:block border-b border-[#353535] pb-4 w-1/2 text-white text-sm mb-8 flex lg:flex">
                <div
                  className={` px-3 py-2  items-center cursor-pointer ${
                    selectedData === "day"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("day")}
                >
                  D
                </div>
                <div
                  className={` px-3 py-2 cursor-pointer ${
                    selectedData === "week"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("week")}
                >
                  W
                </div>
                <div
                  className={` px-3 py-2 cursor-pointer ${
                    selectedData === "month"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("month")}
                >
                  M
                </div>
                <div
                  className={` px-3 py-2  cursor-pointer ${
                    selectedData === "6 months"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("6 months")}
                >
                  6M
                </div>
                <div
                  className={` px-3 py-2  cursor-pointer ${
                    selectedData === "year"
                      ? "bg-[#00ff6a] text-center text-black"
                      : "text-[#666666]"
                  }`}
                  onClick={() => handleFilterToggle("year")}
                >
                  Y
                </div>
              </div> */}

              <div className="w-full flex items-center lg:items-start">
                <FraserButton
                size="regular"
                  title="Request Payout"
                  // type="submit"
                  className="m-auto lg:m-0 w-full lg:w-fit px-4 py-8 lg:py-3 mt-4 lg:mt-8 text-base font-medium lg:font-normal lg:text-xs rounded-md bg-[#00FF6A] text-black"
                  onClick={() => {
                    handlePayout(undefined, "withdrawal");
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-start-8 col-end-13 lg:px-6 rounded-md text-black">
            <p className="mt-12 lg:mt-4 text-lg font-medium border-b mb-4 pb-4">
              Transaction History
            </p>
            <div className="">
              {!balance?.transaction_history?.length && (
                <p>You haven't made any transaction yet!</p>
              )}
              {balance?.transaction_history
                ?.slice()
                .sort(
                  (
                    a: { trasaction_time: string | number | Date },
                    b: { trasaction_time: string | number | Date }
                  ) => {
                    const dateA = new Date(a.trasaction_time).getTime();
                    const dateB = new Date(b.trasaction_time).getTime();
                    return dateA - dateB;
                  }
                ).reverse()
                ?.map((transaction: Transaction_interface) => {
                  return (
                    <div className="flex items-center border-b pb-4 mb-4">
                      <div className="flex mr-auto items-center">
                        {/* <div className="bg-[#E5FCF5] px-4 py-4 mr-4 flex">
                          {transaction?.transaction_type === "credit" ? (
                            <BsArrowDownLeftCircleFill
                              className="m-auto text-[#22B11E]"
                              size="24px"
                            />
                          ) : (
                            <BsArrowUpRightCircleFill
                              className="m-auto text-[#E71D36]"
                              size="24px"
                            />
                          )}
                        </div> */}
                        <div className="text-[16px] font-medium">
                          {transaction?.transaction_type === "credit"
                            ? "Trip Fulfilment"
                            : "Cash Withdrawal"}
                          <p className="text-[#929292] text-[14px] leading-loose mt-2 w-2/3 md:w-10/12 font-normal">
                            {transaction?.trasaction_time}
                            {/* Hello */}
                          </p>
                        </div>
                      </div>
                      <div className="text-base w-1/3 text-right font-semibold">
                        {currency_formatter(transaction?.amount)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {flip === DriverRevenueView.WITHDRAWAL && modalVisible && (
        <Modal
          title="Request Payout"
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          width={"360px"}
        >
          <div className="">
            <div className="w-full my-8  place-content-center">
              <p className="text-sm ">NGN</p>
              <input
                type="number"
                value={value}
                onChange={handleChange}
                placeholder="0"
                className=" w-full text-center rounded-md focus:outline-none focus:shadow-outline-blue placeholder-black text-[28px]"
              />

              {/* IF AMOUNT ENTERED IS MORE THAN AMOUNT IN ACCOUNT */}
              {/* IF AMOUNT ENTERED IS LESS THAN STANDARD WITHDRAWAL AMOUNT OF NGN100 */}
              {visible && Number(value) < 100 && (
                <div className=" p-auto flex">
                  <div className="text-center text-[#E71D36] text-sm mt-2 flex m-auto items-center">
                    {" "}
                    <FaExclamationCircle className="mr-1" /> Amount can't be
                    less than NGN 100
                  </div>
                </div>
              )}
            </div>

            {/* THIS SHOWS THE ACCOUNT INFORMATION THE USER HAS PREVIOUSLY PROVIDED IN THEIR PROFILE */}
            <div className="">
              <label className="text-gray-500 text-[10px] ml-1">
                Receiving Bank
              </label>
              <div className="flex items-center w-full mt-2">
                <div className="relative z-50 inline w-full text-left">
                  <button className="inline-flex text-[12px] w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                    {balance?.user_banks_details?.bank_name}
                  </button>
                </div>
              </div>

              <label className="text-gray-500 text-[10px] ml-1">
                Account Name
              </label>
              <div className="flex items-center w-full mt-2">
                <div className="relative z-50 inline w-full text-left">
                  <button className="inline-flex text-[12px] w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                    {balance?.user_banks_details?.account_name}
                  </button>
                </div>
              </div>

              <label className="text-gray-500 text-[10px] ml-1">
                Account Number
              </label>
              <div className="flex items-center w-full mt-2">
                <div className="relative z-50 inline w-full text-left">
                  <button className="inline-flex text-[12px] w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                    {balance?.user_banks_details?.account_number}
                  </button>
                </div>
              </div>
              {/* <div
								className="mt-10 text-center text-sm ml-2 text-semibold text-[#22B11E] cursor-pointer"
								onClick={() => {
									handlePayout(undefined, "addbank");
								}}>
								Add new Bank
							</div> */}
            </div>
          </div>
          <button
            className={`w-full p-3 mt-4 mb-2 text-sm rounded-lg ${
              true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
            } `}
            onClick={() => {
              dispatch(withdrawBalanceAction(Number(value)));
            }}
          >
            {loadingWithdraw && (
              <LoadingWheel param={loadingWithdraw}/>
            )}
            Request Payout
          </button>
        </Modal>
      )}
      {flip === DriverRevenueView.ADDBANK && modalVisible && (
        <Modal
          title="Request Payout"
          onOk={handleOk}
          onCancel={handleCancel}
          open={modalVisible}
          centered={true}
          footer={false}
          closable={true}
          width={"360px"}
        >
          <div className="">
            <div className="w-full my-8 m-auto place-content-center">
              <p className="text-sm ">NGN</p>
              <input
                type="number"
                value={value}
                onChange={handleChange}
                placeholder="0"
                className=" w-min text-center rounded-md focus:outline-none focus:shadow-outline-blue placeholder-black text-[28px]"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-500 text-[10px] ml-1">
                Account Number
              </label>

              <Input
                className="w-full h-10 mt-1 hover:border-green-500 active:border-green-600 text-[12px]"
                placeholder="Account Number"
                value={accountNumber}
                required={true}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div className="mt-3">
              <label className="text-gray-500 text-[10px] ml-1">
                Receiving Bank
              </label>
              <div className="flex items-center w-full mt-2">
                <div className="relative z-50 inline w-full text-left">
                  <button
                    className="inline-flex text-[12px] w-full px-4 py-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                    onClick={() => {
                      setBankIsOpen(!bankIsOpen);
                    }}
                  >
                    {selectedBank}
                    <FaCaretDown className="ml-auto" />
                  </button>
                  {bankIsOpen && (
                    <div className="absolute w-full mt-2  rounded-md">
                      <div className="w-full py-2 pb-4 h-[160px] overflow-y-scroll bg-white rounded-md shadow-md border">
                        <div className=" w-full bg-white relative  z-10 rounded-md ">
                          <a
                            // key={stops}
                            href="#"
                            className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => {
                              handleBankChange("Wema Bank");
                            }}
                          >
                            Wema Bank
                          </a>
                          <a
                            // key={stops}
                            href="#"
                            className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => {
                              handleBankChange("First Bank");
                            }}
                          >
                            First Bank
                          </a>
                          <a
                            // key={stops}
                            href="#"
                            className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                            onClick={() => {
                              handleBankChange("First Bank");
                            }}
                          >
                            First Bank
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            className={`w-full p-3 mt-8 mb-2 text-sm rounded-lg ${
              true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
            } `}
            onClick={() => {}}
          >
            Request Payout
          </button>
        </Modal>
      )}
    </>
  );
};

export default DriverRevenueOverview;
