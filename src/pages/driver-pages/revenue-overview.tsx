/* eslint-disable jsx-a11y/anchor-is-valid */
import { Alert, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import {
	FaCaretDown,
	FaChevronCircleLeft,
	FaChevronCircleRight,
	FaExclamationCircle,
	FaSearch,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/redux-store";
import { currency_formatter } from "../../utils/currency-formatter";
import {
	getBalanceByUserAction,
	withdrawBalanceAction,
} from "../../state/action/balance.action";
import { Transaction_interface } from "../../interfaces/transaction_interface";
import { FraserButton } from "../../components/Button";
import OtpInput from "react18-input-otp";
import {
	getOtpAction,
	resetGetOtpAction,
	resetVerifyOtpAction,
	VerifyOtpAction,
} from "../../state/action/otp.action";

const DriverRevenueOverview = () => {
	enum DriverRevenueView {
		WITHDRAWAL = "withdrawal",
		ADDBANK = "addbank",
		PIN = "pin",
		SEEMORE = "seemore",
	}

	const handleInput = (text: any) => {
		setPIN(text);
	};

	const handleVerify = () => {};

	const { balance } = useAppSelector((state: RootState) => state.userBalance);
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
	const {
		balance: withdraw,
		loading: loadingWithdraw,
		error: withdrawError,
	} = useAppSelector((state: RootState) => state.withdrawBalance);

	const { error, loading, message, data } = useAppSelector(
		(state: RootState) => state.getotp
	);
	const {
		loading: verifyingOtp,
		message: verifiedOtpMessage,
		data: verifyOtpData,
	} = useAppSelector((state: RootState) => state.verifyOtp);

	const [flip, setFlip] = useState<"" | DriverRevenueView>("");
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [value, setValue] = useState("");
	const [bankIsOpen, setBankIsOpen] = useState(false);
	const [selectedBank, setSelectedBank] = useState("Select receiving bank");
	const [accountNumber, setAccountNumber] = useState("");
	const [visible, setVisible] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();
	const [pin, setPIN] = useState<any>("");

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

	const handleModalOpen = (data: any, flip: any) => {
		setFlip(flip);
		setModalVisible(true);
		setVisible(true);
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

	// useEffect(() => {
	// 	if (withdrawError !== "") {
	// 		messageApi.open({
	// 			type: "error",
	// 			content: withdrawError,
	// 		});
	// 	}
	// }, [messageApi, withdrawError]);

	// useEffect(() => {
	// 	if (error) {
	// 		messageApi.open({
	// 			type: "error",
	// 			content: error,
	// 		});
	// 	}
	// }, [error, messageApi]);

	// useEffect(() => {
	// 	if (otp) {
	// 		messageApi.open({
	// 			type: "info",
	// 			content: otp,
	// 		});

	// 		dispatch(resetGetOtpAction());
	// 	}
	// }, [otp, messageApi, dispatch]);

	useEffect(() => {
		if (verifyOtpData) {
			dispatch(withdrawBalanceAction(Number(value)));
			setValue("");
			dispatch(resetVerifyOtpAction());
		}
	}, [dispatch, verifyOtpData]);

	useEffect(() => {
		if (withdraw?._id) {
			dispatch(getBalanceByUserAction());
			setModalVisible(false);
			setVisible(false);
			setPIN("");
		}
	}, [dispatch, withdraw]);

	return (
		<>
			{contextHolder}
			<div className="mx-[18px] lg:mx-[120px] mt-24 lg:mt-32">
				<div className="pt-2 lg:pt-8">
					<div className="lg:bg-black text-white lg:px-12 lg:py-16 rounded-md">
						<div className="bg-black mt-6 px-6 lg:px-0 py-16 text-center lg:text-left lg:py-4 lg:mt-0  rounded-md font-normal text-[#646464]">
							<div className="flex items-center justify-between">
								<FaChevronCircleLeft
									className="lg:hidden text-white text-xl"
									onClick={previousItem}
								/>
								<div className="w-full items-center place-content-center lg:place-content-start">
									<div
										className={`${item === 0 ? "block" : "hidden lg:block"}`}>
										<div>Total Available Balance</div>
										<h3 className="text-[24px] mt-3 text-white font-semibold">
											{currency_formatter(balance?.available_balance)}
										</h3>
									</div>
									<div className="lg:flex lg:mt-8 justify-between">
										<div
											className={`${item === 1 ? "block" : "hidden lg:block"}`}>
											<div className="lg:lg:mb-3 lg:font-normal lg:text-[#646464]">
												Total Earnings
											</div>
											<h3 className="text-[24px] mt-3 lg:mt-0 text-white lg:text-[#646464] font-semibold lg:text-[18px] lg:font-medium">
												{currency_formatter(balance?.total_earnings)}
											</h3>
										</div>
										<div
											className={`ml-auto mr-auto ${
												item === 2 ? "block" : "hidden lg:block"
											}`}>
											<div className="lg:lg:mb-3 lg:font-normal lg:text-[#646464]">
												Total Withdrawals
											</div>
											<h3 className="text-[24px] mt-3 lg:mt-0 text-white lg:text-[#646464] font-semibold lg:text-[18px] lg:font-medium">
												{currency_formatter(balance?.total_withdraw)}
											</h3>
										</div>
									</div>
								</div>
								<FaChevronCircleRight
									className="lg:hidden text-white text-xl"
									onClick={nextItem}
								/>
							</div>
						</div>

						<div className="w-full flex items-center lg:items-start">
							<FraserButton
								size="regular"
								title="Request Payout"
								// type="submit"
								className="m-auto lg:m-0 w-full lg:w-fit px-4 py-8 lg:py-3 mt-4 lg:mt-8 text-base font-medium lg:font-normal lg:text-xs rounded-md bg-[#00FF6A] text-black"
								onClick={() => {
									handleModalOpen(undefined, "withdrawal");
								}}
							/>
						</div>
					</div>
				</div>

				<div className="lg:px-6 rounded-md">
					<p className="mt-12 text-lg lg:text-xl font-medium border-b mb-4 pb-4">
						Transaction History
					</p>
					<div className="border border-[#e3e3e3] lg:px-10 pt-8 pb-16">
						{!balance?.transaction_history?.length && (
							<Alert
								type="info"
								message="You have not made any transactions yet!"
								onClick={() => {
									// console.log(trips.length);
								}}
								className="w-full"
							/>
						)}
						{balance?.transaction_history
							?.slice()
							.sort(
								(
									a: { transaction_time: string | number | Date },
									b: { transaction_time: string | number | Date }
								) => {
									const dateA = new Date(a.transaction_time).getTime();
									const dateB = new Date(b.transaction_time).getTime();
									return dateA - dateB;
								}
							)
							.reverse()
							?.slice(0, 10)
							?.map((transaction: Transaction_interface) => {
								const dateString = transaction?.transaction_time;
								const dateWithoutDayOfWeek = dateString.substring(
									dateString.indexOf(",") + 2
								); // remove day of week and comma
								const dateWithoutOrdinalIndicator =
									dateWithoutDayOfWeek.replace(/(\d+)(st|nd|rd|th)/, "$1"); // remove ordinal indicator
								const dateObj = new Date(dateWithoutOrdinalIndicator);
								const timeString = dateObj.toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "2-digit",
									second: "2-digit",
									hour12: true,
								});
								// console.log(timeString);
								return (
									<div className="flex items-center border-b px-4 py-3 mb-6 rounded-md">
										<div className="flex mr-auto items-center">
											<div className="font-medium">
												<div className="flex">
													{transaction?.transaction_type === "credit"
														? "Trip Fulfilment"
														: "Cash Withdrawal"}{" "}
													{/* TRANSACTION STATUS  */}
													{transaction?.transaction_type === "debit" &&
														!transaction?.payment_status && (
															<div className="ml-2 bg-[#ffefc1] text-[#756031] border border-[#ffe28d] rounded-md px-2 py-1 text-sm">
																Pending
															</div>
														)}
													{transaction?.transaction_type === "debit" &&
														transaction?.payment_status && (
															<div className="ml-2 bg-[#CAFFC1] text-[#327531] border border-[#A4FF8D] rounded-md px-2 py-1 text-sm">
																Paid
															</div>
														)}
												</div>
												<p className="text-[13px] text-[#929292] leading-snug font-normal">
													{timeString}
												</p>
											</div>
										</div>
										<div className="text-base w-1/3 text-right font-semibold">
											{currency_formatter(transaction?.amount)}
										</div>
									</div>
								);
							})}
						{balance?.transaction_history?.length >= 10 && (
							<div
								className="w-full items-center align-center flex justify-center cursor-pointer text-[#0969da] mr-8 my-8 text-[14px]"
								onClick={() => {
									handleModalOpen(undefined, "seemore");
								}}>
								See more
							</div>
							// <button className="text-blue-600 hover:text-blue-800" onClick={handleSeeMore}>
							//   See more
							// </button>
						)}
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
					width={"360px"}>
					<div className="">
						<div className="w-full my-8  place-content-center">
							<p className="">NGN</p>
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
									<div className="text-center text-[#E71D36] mt-2 flex m-auto items-center">
										{" "}
										<FaExclamationCircle className="mr-1" /> Amount can't be
										less than ₦ 100
									</div>
								</div>
							)}
						</div>

						{/* THIS SHOWS THE ACCOUNT INFORMATION THE USER HAS PREVIOUSLY PROVIDED IN THEIR PROFILE */}
						<div className="">
							<label className="text-gray-500">Receiving Bank</label>
							<div className="flex items-center w-full mt-1 mb-4">
								<div className="relative z-50 inline w-full text-left">
									<button className="inline-flex w-full h-12 items-center px-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
										{balance?.user_banks_details?.bank_name}
									</button>
								</div>
							</div>

							<label className="text-gray-500">Account Name</label>
							<div className="flex items-center w-full mt-1 mb-4">
								<div className="relative z-50 inline w-full text-left">
									<button className="inline-flex w-full h-12 items-center px-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
										{balance?.user_banks_details?.account_name}
									</button>
								</div>
							</div>

							<label className="text-gray-500">Account Number</label>
							<div className="flex items-center w-full mt-1 mb-8">
								<div className="relative z-50 inline w-full text-left">
									<button className="inline-flex w-full h-12 items-center px-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
										{balance?.user_banks_details?.account_number}
									</button>
								</div>
							</div>
							{/* <div
								className="mt-10 text-center ml-2 text-semibold text-[#22B11E] cursor-pointer"
								onClick={() => {
									handleModalOpen(undefined, "addbank");
								}}>
								Add new Bank
							</div> */}
						</div>
					</div>

					<FraserButton
						title={"Proceed"}
						size={"regular"}
						className={"w-full mb-6"}
						active={Number(value) >= 100}
						onClick={() => {
							if (value !== "") {
								handleModalOpen(undefined, "pin");
							}

							dispatch(getOtpAction(userInfo?.phone));
						}}
					/>
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
					width={"360px"}>
					<div className="">
						<div className="w-full my-8 m-auto place-content-center">
							<p className="">NGN</p>
							<input
								type="number"
								value={value}
								onChange={handleChange}
								placeholder="0"
								className=" w-min text-center rounded-md focus:outline-none focus:shadow-outline-blue placeholder-black text-[28px]"
							/>
						</div>

						<div className="mb-4">
							<label className="text-gray-500">Account Number</label>

							<Input
								className="w-full h-10 mt-1 hover:border-green-500 active:border-green-600"
								placeholder="Account Number"
								value={accountNumber}
								required={true}
								onChange={(e) => setAccountNumber(e.target.value)}
							/>
						</div>

						<div className="mt-3">
							<label className="text-gray-500">Receiving Bank</label>
							<div className="flex items-center w-full mt-2">
								<div className="relative z-50 inline w-full text-left">
									<button
										className="inline-flex w-full h-12 items-center px-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
										onClick={() => {
											setBankIsOpen(!bankIsOpen);
										}}>
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
														className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
														onClick={() => {
															handleBankChange("Wema Bank");
														}}>
														Wema Bank
													</a>
													<a
														// key={stops}
														href="#"
														className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
														onClick={() => {
															handleBankChange("First Bank");
														}}>
														First Bank
													</a>
													<a
														// key={stops}
														href="#"
														className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
														onClick={() => {
															handleBankChange("First Bank");
														}}>
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
						className={`w-full p-3 mt-8 mb-2 rounded-lg ${
							true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
						} `}
						onClick={() => {
							handleModalOpen(undefined, "pin");
						}}>
						Proceed
					</button>
				</Modal>
			)}
			{flip === DriverRevenueView.PIN && modalVisible && (
				<Modal
					title=""
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width={"320px"}>
					<div className="text-lg text-center font-medium">
						<div className="pt-8 mb-3">You are about to withdraw</div>
						<div className="text-[24px] mb-8">₦ {Number(value)}</div>
					</div>
					<div className="mt-2 mb-1 text-center w-full justify-center flex">
						Input your PIN to continue
					</div>
					<OtpInput
						value={pin}
						onChange={handleInput}
						numInputs={4}
						isInputNum={true}
						shouldAutoFocus={true}
						onSubmit={handleVerify}
						className={"w-full"}
						inputStyle={{
							width: "3rem",
							height: "3rem",
							borderRadius: "6px",
							border: "1px solid rgba(0, 0, 0, 0.3)",
							outline: "#000",
							justify: "space-between",
						}}
						containerStyle={{
							width: "100%",
							display: "flex",
							// justifyContent: "space-between",
						}}
					/>
					<FraserButton
						title={"Request Payout"}
						loader={verifyingOtp || loadingWithdraw}
						size={"regular"}
						className={"w-full mt-8"}
						onClick={() => {
							dispatch(VerifyOtpAction({ otp: pin, phone: userInfo?.phone }));
						}}
					/>
				</Modal>
			)}
			{flip === DriverRevenueView.SEEMORE && modalVisible && (
				<Modal
					title={
						<div>
							Transactions History
							<div className="w-full">
								{" "}
								<div className="w-full mt-4 flex justify-center">
									<div className="input-group relative flex items-stretch w-full mb-4">
										<input
											type="search"
											className="mr-2 form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
											placeholder="Search"
										/>
										<FraserButton
											title={""}
											size={"regular"}
											icon={<FaSearch />}
										/>
									</div>
								</div>
							</div>
						</div>
					}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}>
					<div className="h-[80vh] overflow-y-scroll">
						{!balance?.transaction_history?.length && (
							<Alert
								type="info"
								message="You have not made any transactions yet!"
								onClick={() => {
									// console.log(trips.length);
								}}
								className="w-full"
							/>
						)}
						{balance?.transaction_history
							?.slice()
							.sort(
								(
									a: { transaction_time: string | number | Date },
									b: { transaction_time: string | number | Date }
								) => {
									const dateA = new Date(a.transaction_time).getTime();
									const dateB = new Date(b.transaction_time).getTime();
									return dateA - dateB;
								}
							)
							.reverse()
							?.map((transaction: Transaction_interface) => {
								const dateString = transaction?.transaction_time;
								const dateWithoutDayOfWeek = dateString.substring(
									dateString.indexOf(",") + 2
								); // remove day of week and comma
								const dateWithoutOrdinalIndicator =
									dateWithoutDayOfWeek.replace(/(\d+)(st|nd|rd|th)/, "$1"); // remove ordinal indicator
								const dateObj = new Date(dateWithoutOrdinalIndicator);
								const timeString = dateObj.toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "2-digit",
									second: "2-digit",
									hour12: true,
								});
								// console.log(timeString);

								return (
									<div className="flex items-center border-b px-4 py-3 mb-6 rounded-md">
										<div className="flex mr-auto items-center">
											<div className="font-medium">
												<div className="flex">
													{transaction?.transaction_type === "credit"
														? "Trip Fulfilment"
														: "Cash Withdrawal"}{" "}
													{/* TRANSACTION STATUS  */}
													{transaction?.transaction_type === "debit" &&
														!transaction?.payment_status && (
															<div className="ml-2 bg-[#ffefc1] text-[#756031] border border-[#ffe28d] rounded-md px-2 py-1 text-sm">
																Pending
															</div>
														)}
													{transaction?.transaction_type === "debit" &&
														transaction?.payment_status && (
															<div className="ml-2 bg-[#CAFFC1] text-[#327531] border border-[#A4FF8D] rounded-md px-2 py-1 text-sm">
																Paid
															</div>
														)}
												</div>
												<p className="text-[13px] text-[#929292] leading-snug font-normal">
													{timeString}
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
				</Modal>
			)}
		</>
	);
};

export default DriverRevenueOverview;
