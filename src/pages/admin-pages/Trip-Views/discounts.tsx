import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
	FaCheckCircle,
	FaEllipsisV,
	FaExclamationCircle
} from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { FraserButton } from "../../../components/Button";
import {
	createEntityAction,
	getAllEntityAction,
	getEntityByIdAction,
	markAsPaidAction,
	resetEntityAction
} from "../../../state/action/entity.action";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { RootState } from "../../../state/redux-store";
import { Entity_interface } from "../../../interfaces/entity.interface";

const Discounts = () => {
	enum ModelOption {
		CREATE,
		OPEN
	}

	const dispatch = useAppDispatch();
	const { entity, loading, error } = useAppSelector(
		(state: RootState) => state.createEntity
	);
	const { entities: allEntity } = useAppSelector(
		(state: RootState) => state.getAllEntity
	);
	const {
		entity: entityById,
		loading: loadingById,
		error: errorById
	} = useAppSelector((state: RootState) => state.getEntityById);
	const {
		entity: markPaidEntity,
		loading: markPaidLoading,
		error: markPaidError
	} = useAppSelector((state: RootState) => state.markAsPaid);
	const [flip, setFlip] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [couponName, setCouponName] = useState("");
	const [couponCode, setCouponCode] = useState("");
	const [referralCode, setReferralCode] = useState("");
	const [couponPercent, setCouponPercent] = useState<number>(0);
	const [userAllocation, setUserAllocation] = useState("");
	const [modalData, setModalData] = useState<Entity_interface>();

	const [menuToggle, setMenuToggle] = useState("");
	const [randomString, setRandomString] = useState("");

	console.log("the mark paid entity are ", markPaidEntity);

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

	const handleOpenModal = (
		modalData: Entity_interface | null,
		flipValue: any
	) => {
		setFlip(flipValue);
		setModalVisible(true);
		setModalData(modalData as Entity_interface);
	};
	// calculate the start and end index of the items to display on the current page
	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const items = 1; // items to display on the current page

	const createEntity = () => {
		dispatch(
			createEntityAction({
				name: couponName,
				referral_code: { code: referralCode },
				discount_code: {
					code: couponCode,
					discount_percent: couponPercent / 100
				}
			})
		);

		setFlip("success");
	};

	const getEntityById = (id: string) => {
		dispatch(getEntityByIdAction(id));
	};

	useEffect(() => {
		dispatch(getAllEntityAction());
	}, [dispatch, entity]);

	// console.log("the modal data is ", modalData);

	useEffect(() => {
		setModalData(markPaidEntity as Entity_interface);
		dispatch(resetEntityAction());
		dispatch(getAllEntityAction());
	}, [dispatch, markPaidEntity]);

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
							handleOpenModal(null, "create");
						}}
						title={"Create new entity"}
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
							Discount Code
						</th>
						<th scope="col" className="py-4 font-normal ">
							Referral Code
						</th>
						<th scope="col" className="py-4 font-normal ">
							Discount %
						</th>
						<th scope="col" className="py-4 font-normal ">
							User %
						</th>
						{/* <th scope="col" className="py-4 font-normal ">
              Earning
            </th>
            <th scope="col" className="px-4 py-4 font-normal text-center">
              Discount
            </th>
            <th scope="col" className="px-4 py-4 font-normal text-center">
              Referral
            </th> */}
						<th scope="col" className="px-2 py-4 font-normal text-center">
							Status
						</th>
						<th scope="col" className="px-2 py-4 font-normal rounded-r-md"></th>
					</tr>
				</thead>

				{/* //TABLE ROWS */}
				<tbody className="">
					{allEntity?.map((entity: Entity_interface) => {
						return (
							<tr className="bg-white border-b cursor-pointer border-slate-100 hover:bg-gray-50">
								<td
									className="py-6 pl-4 text-gray-700"
									onClick={() => {
										// setModalData here
										handleOpenModal(entity, "couponInfo");
										setModalData(entity);
									}}>
									{" "}
									{entity?.name}
								</td>
								<td
									className="py-4 text-gray-700 "
									onClick={() => {
										// setModalData here
										handleOpenModal(entity, "couponInfo");
										setModalData(entity);
									}}>
									{entity?.discount_code?.code}
								</td>
								<td
									className="py-4 text-gray-700 "
									onClick={() => {
										// setModalData here
										handleOpenModal(entity, "couponInfo");
										setModalData(entity);
									}}>
									{entity?.referral_code?.code}
								</td>
								<td
									className="text-center text-gray-700 "
									onClick={() => {
										// setModalData here
										handleOpenModal(entity, "couponInfo");
										setModalData(entity);
									}}>
									{entity?.discount_code?.discount_percent * 100} %
								</td>
								<td
									className="px-4 py-4 text-center text-gray-700"
									onClick={() => {
										// setModalData here
										handleOpenModal(entity, "couponInfo");
										setModalData(entity);
									}}></td>
								{/* <td className="px-4 py-4 text-center text-gray-700">28,750</td>
            <td className="px-4 py-4 text-center text-gray-700">230</td>
            <td className="px-4 py-4 text-center text-gray-700">230</td> */}
								<td
									className=" px-4 py-4 text-center justify-center text-gray-700 flex m-auto item-center"
									onClick={() => {
										// setModalData here
										handleOpenModal(entity, "couponInfo");
										setModalData(entity);
									}}>
									<div className="ml-2 bg-[#CAFFC1] text-[#327531] border border-[#A4FF8D] rounded-md px-2 py-1 text-sm">
										{entity?.discount_code?.active ? "Active" : "Deactivated"}
									</div>
									{/* <div className="ml-2 bg-[#ffc1c1] text-[#753131] border border-[#ff8d8d] rounded-md px-2 py-1 text-sm">
                Inactive
              </div> */}
								</td>
								<td
									className="px-4 py-4 text-gray-700"
									onClick={() => {
										setMenuVisible(!menuVisible);
									}}>
									<div>
										<FaEllipsisV />
									</div>
									{/* {menuToggle === index.toString() */}
									{/* ?  */}
									{menuVisible && (
										<ul className="absolute  right-12 z-10 py-2 mt-2 bg-white border rounded-md shadow-md">
											<li className="px-4 py-2 font-medium text-gray-700 border-b hover:bg-gray-100">
												Edit
											</li>
											<li
												onClick={() => {
													setFlip("deactivate");
													setModalVisible(true);
												}}
												className="px-4 py-2 font-medium text-gray-700 border-b hover:bg-gray-100">
												Deactivate
											</li>
										</ul>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* MODALS */}

			{flip === "couponInfo" && modalVisible && (
				<Modal
					title={"View Coupon Details"}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width={"460px"}>
					<div>
						<div className="mt-8">Entity Name</div>
						<div className="flex">
							{" "}
							<div className="text-lg font-semibold ">{modalData?.name}</div>
							<div
								className={`ml-2 ${
									modalData?.discount_code?.active
										? "bg-[#CAFFC1]"
										: "bg-red-400"
								} text-[#327531] border border-[#A4FF8D] rounded-md px-2 py-1 text-sm`}>
								{modalData?.discount_code?.active ? "Active" : "Deactivated"}
							</div>
						</div>
						<div className="mt-8"> Coupon Code</div>
						<div className="text-lg font-semibold ">
							{modalData?.discount_code?.code}
						</div>
						<div className="mt-8"> Referral Code</div>
						<div className="text-lg font-semibold ">
							{modalData?.referral_code?.code}
						</div>

						{/* <div className="ml-2 bg-[#ffc1c1] text-[#753131] border border-[#ff8d8d] rounded-md px-2 py-1 text-sm">
                Inactive
              </div> */}
						<div className="mt-6 mb-3 border-b pb-2">Usage Statistics</div>
						<div className="flex">
							<div className="bg-black rounded-md p-4 w-1/2 mr-2">
								<div className="text-gray-300">Discount Code Usage</div>
								<div className="text-lg font-semibold text-white">
									{modalData?.discount_code?.usage}
								</div>
							</div>
							<div className="bg-black rounded-md p-4 w-1/2">
								<div className="text-gray-300">Referral Code Usage</div>
								<div className="text-lg font-semibold text-white">
									{modalData?.referrals?.length}
								</div>
							</div>
						</div>

						<div className="mt-6 mb-3 border-b pb-2">Earning Statistics</div>
						<div className="flex">
							<div className="bg-black rounded-md p-4 w-1/2 mr-2">
								<div className="text-gray-300">Amount Earned</div>
								<div className="text-lg font-semibold text-white">
									{Number(modalData?.discount_code?.amount_earned) +
										Number(modalData?.referral_code?.amount_earned)}
								</div>
							</div>
							<div className="bg-black rounded-md p-4 w-1/2">
								<div className="text-gray-300">Amount Paid Out</div>
								<div className="text-lg font-semibold text-white">
									{Number(modalData?.discount_code?.amount_paid) +
										Number(modalData?.referral_code?.amount_paid)}
								</div>
							</div>
						</div>
						<FraserButton
							title={"Mark Paid"}
							size={"regular"}
							// buttonType="secondary"
							// secondaryColor="black"
							loader={markPaidLoading}
							className="mt-8 mb-4 w-full"
							onClick={() => {
								dispatch(markAsPaidAction(modalData?._id || ""));
								//LEKAN
								//post amount_paid === amount_paid + amount_earned
								//use a finally function to post 0 to the amount_earned
								//reset Amount Earned to zero and increase amount paid out
							}}
						/>
					</div>
				</Modal>
			)}
			{flip === "create" && modalVisible && (
				<Modal
					title={"Create a Discount Coupon"}
					onOk={handleOk}
					onCancel={handleCancel}
					open={modalVisible}
					centered={true}
					footer={false}
					closable={true}
					width={"380px"}>
					<div className="mt-6">
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
								<label className="text-gray-500  ml-2">
									Discount Coupon Code
								</label>
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
								<label className="text-gray-500  ml-2">Referral Code</label>
							</div>
							<Input
								className="hover:border-green-500 focus:border-green-600 h-10 w-full"
								placeholder="Referral Code"
								value={referralCode}
								required={true}
								onChange={(e) => {
									setReferralCode(e.target.value);
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
									setCouponPercent(Number(e.target.value));
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
							onClick={createEntity}
							loader={loading}
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
					width={240}>
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
					width={240}>
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
