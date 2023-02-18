/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { FaCaretDown, FaChevronLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/redux-store";
import { _paths_ } from "../utils/appHelpers";
import {
	registerAsADriverAction,
	updateUserAction,
} from "../state/action/user.action";
import { api } from "../utils/api";
import { deleteFileAction } from "../state/action/image.action";
import { MdCancel } from "react-icons/md";
import { RequestError } from "../utils/requestError";
import { createBusAction, updateBusAction } from "../state/action/bus.action";
import { addAccountAction } from "../state/action/balance.action";

const DriverSignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { userInfo: newDriver } = useAppSelector(
		(state: RootState) => state.registerAsDriver
	);
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);
	const { bus, error: createBusError } = useAppSelector(
		(state: RootState) => state.createBus
	);

	const { loading, error, image } = useAppSelector(
		(state: RootState) => state.uploadFile
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [email, setEmail] = useState<string>("");
	const [fName, setFName] = useState<string>("");
	const [lName, setLName] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [accountName, setAccountName] = useState<string>("");
	const [profile, setProfile] = useState<string>("");
	const [licenseNumber, setLicenseNumber] = useState<string>("");
	const [registrationNumber, setRegistrationNumber] = useState<string>("");
	const [locationName, setlocationName] = useState("");
	const [location, setlocation] = useState(false);
	const [make, setMake] = useState("");
	const [modelList, setModelList] = useState<string[]>([]);
	const [makeOpen, setMakeOpen] = useState(false);
	const [modelOpen, setModelOpen] = useState(false);
	const [model, setModel] = useState("");
	const [bankOpen, setBankOpen] = useState(false);
	const [accountNo, setAccountNo] = useState("");
	const [bankFilter, setBankFilter] = useState("");
	const [vehicleCapacity, setVehicleCapacity] = useState(0);
	const [uploadProfilePicError, setUploadProfilePicError] =
		useState<string>("");

	const profilePicRef = useRef<HTMLInputElement>(null);
	const vehicleInsuranceRef = useRef<HTMLInputElement>(null);
	const roadWorthinessRef = useRef<HTMLInputElement>(null);
	const driverLicenseRef = useRef<HTMLInputElement>(null);

	const [driverLisense, setDriverLisense] = useState<string>("");
	const [proofOfInsurance, setProofOfInsurance] = useState<string>("");
	const [roadWorthiness, setRoadWorthiness] = useState<string>("");
	const [showError, setShowError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [uploadingProfile, setUploadingProfile] = useState<boolean>(false);
	const [driverLisenseImageLoading, setDriverLisenseImageLoading] =
		useState<boolean>(false);
	const [vehicleInsuranceImageLoading, setVehicleInsuranceImageLoading] =
		useState<boolean>(false);
	const [roadWorthinessLoading, setRoadWorthinessLoading] =
		useState<boolean>(false);

	const pages = [1, 2, 3, 4];

	

	const handleBack = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const availableCities = [
		{
			state: "Lagos",
			cities: ["Lagos", "Ikeja", "Victoria Island", "Ajah", "Epe"],
		},
		{
			state: "Oyo",
			cities: ["Ibadan", "Ogbomosho", "Iseyin", "Oyo", "Kisi"],
		},
		{
			state: "Ogun",
			cities: ["Abeokuta", "Sagamu", "Ijebu Ode", "Ilaro", "Ijebu Igbo"],
		},
		{
			state: "Osun",
			cities: ["Osogbo", "Ile Ife", "Iwo", "Olorunda", "Ila Orangun"],
		},
		{
			state: "Ekiti",
			cities: [
				"Ado Ekiti",
				"Ikere Ekiti",
				"Ise Ekiti",
				"Efon Alaye",
				"Ilawe Ekiti",
			],
		},
		{
			state: "Kwara",
			cities: ["Ilorin", "Offa", "Oke Ero", "Ekiti", "Asa"],
		},
	];

	const busTypes = [
		{
			make: "Toyota",
			models: [
				"Hiace",
				"Coaster",
				"Regius",
				"Quantum",
				"Touring Hiace",
				"Grand Hiace",
			],
		},
		{
			make: "Mercedes-Benz",
			models: [
				"Sprinter",
				"Tourismo",
				"Integro",
				"CapaCity",
				"Citaro",
				"Travego",
			],
		},
		{
			make: "Nissan",
			models: ["Civilian", "Evalia", "NV350", "Urvan", "NT400", "Atlas"],
		},
		{
			make: "Volkswagen",
			models: [
				"Amarok",
				"Crafter",
				"California",
				"Caddy",
				"Multivan",
				"Transporter",
			],
		},
		{
			make: "Iveco",
			models: [
				"Daily",
				"Eurocargo",
				"Stralis",
				"Trakker",
				"TurboDaily",
				"Stralis X-Way",
			],
		},
		{
			make: "MAN",
			models: [
				"Lion's Coach",
				"Lion's Coach L",
				"Lion's City",
				"Lion's Intercity",
				"Lion's Regio",
				"Lion's Urban",
			],
		},
	];

	const banks = [
		"Access Bank",
		"Guaranty Trust Bank",
		"Zenith Bank",
		"United Bank for Africa",
		"First Bank of Nigeria",
		"Union Bank",
		"Fidelity Bank",
		"Sterling Bank",
		"Keystone Bank",
		"Wema Bank",
		"Ecobank Nigeria",
		"FCMB Group",
		"Heritage Bank",
		"Stanbic IBTC Bank",
		"Polaris Bank",
		"Aliko Dangote Group (African Export-Import Bank)",
		"Unity Bank",
		"Providus Bank",
		"Jaiz Bank",
		"Rand Merchant Bank Nigeria",
		"Coronation Merchant Bank",
		"FBNQuest Merchant Bank",
		"Standard Chartered Bank Nigeria",
		"Citibank Nigeria Limited",
		"Diamond Bank",
		"Enterprise Bank (Now Heritage Bank)",
		"Skye Bank (Now Polaris Bank)",
		"Mainstreet Bank (Now Polaris Bank)",
		"Oceanic Bank (Now Ecobank Nigeria)",
		"Afribank (Now Unity Bank)",
	];

	const uploadProfilePics = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUploadProfilePicError("");
		const fileObj: any = e.target.files && e.target.files[0];
		if (!fileObj) {
			return;
		}

		let formData = new FormData();
		formData.append("image", fileObj);
		setUploadingProfile(true);
		await api
			.post("/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(({ data }: any) => {
				console.log("the res ", data);
				setProfile(data?.image);
				setUploadingProfile(false);
			})
			.catch((error) => {
				setUploadProfilePicError(RequestError(error));
				setProfile("");
				setUploadingProfile(false);
			});
	};

	const uploadDriverLicense = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const fileObj: any = e.target.files && e.target.files[0];
		if (!fileObj) {
			return;
		}

		let formData = new FormData();
		formData.append("image", fileObj);

		setDriverLisenseImageLoading(true);
		await api
			.post("/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(async ({ data }: any) => {
				setDriverLisense(data?.image);
				dispatch(
					updateUserAction(userInfo?._id, { driver_license: data?.image })
				);
			})
			.catch((error) => {});

		setDriverLisenseImageLoading(false);
	};

	const uploadRoadWorthiness = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const fileObj: any = e.target.files && e.target.files[0];
		if (!fileObj) {
			return;
		}
		let formData = new FormData();
		formData.append("image", fileObj);
		setRoadWorthinessLoading(true);
		await api
			.post("/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(async ({ data }: any) => {
				setRoadWorthiness(data?.image);
				dispatch(
					updateBusAction(bus?._id, {
						road_worthiness_cert: data?.image,
					})
				);
			})
			.catch((error) => {});

		setRoadWorthinessLoading(false);
	};

	const uploadVehicleInsurance = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const fileObj: any = e.target.files && e.target.files[0];
		if (!fileObj) {
			return;
		}

		let formData = new FormData();
		formData.append("image", fileObj);
		setVehicleInsuranceImageLoading(true);

		await api
			.post("/image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(async ({ data }: any) => {
				setProofOfInsurance(data?.image);
				dispatch(
					updateBusAction(bus?._id, {
						bus_insurance: data?.image,
					})
				);
			});

		setVehicleInsuranceImageLoading(false);
	};

	let DriverData = {
		first_name: fName,
		last_name: lName,
		email: email,
		driver_license_number: licenseNumber,
		location: locationName,
		image: profile,
		phone: "+234" + phone,
	};

	const goToNextPage = () => {
		if (currentPage < pages.length) {
			setCurrentPage(currentPage + 1);
		}
	};
	

	const handleNext = () => {
		setUploadProfilePicError("");

		if (currentPage === 1) {
			if (
				!fName ||
				!lName ||
				!email ||
				!licenseNumber ||
				!locationName ||
				!profile ||
				!phone
			) {
				setShowError(true);
				setErrorMessage("All field are required");
				return;
			}
			dispatch(registerAsADriverAction(DriverData));
			setShowError(false);
			goToNextPage();
		}

		if (currentPage === 2) {
			if (!make || !model || !vehicleCapacity || !registrationNumber) {
				setShowError(true);
				setErrorMessage("All field are required");
				return;
			}
			dispatch(
				createBusAction({
					make,
					model,
					driver: userInfo?._id,
					capacity: vehicleCapacity,
					registration_number: registrationNumber,
				})
			);

			setShowError(false);
			goToNextPage();
		}

		if (currentPage === 3) {
			if (!driverLisense || !roadWorthiness || !roadWorthiness) {
				setShowError(true);
				setErrorMessage("Upload all relevant document");
				return;
			}

			setShowError(false);
			goToNextPage();
		}
	};

	const handleSubmit = () => {
		if (!bankFilter || !accountName || !accountNo) {
			setShowError(true);
			setErrorMessage("Adding all payment information if required");
			return;
		}
		dispatch(
			addAccountAction(userInfo?.user_token, {
				bank_name: bankFilter,
				account_number: accountNo,
				account_name: accountName,
			})
		);

		setCurrentPage(5);
	};

	// useEffect(() => {}, []);

	return (
		<div className="flex flex-col items-center w-full h-screen">
			<div className="flex items-center w-full mt-6">
				<div className="flex m-auto mb-6">
					<div className="py-1 border-r border-[#000000]">
						<img
							className="pr-[10px] h-[18px]"
							src="/assets/images/fraser-black-logo.svg"
							alt=""
						/>
					</div>
					<span className="ml-[10px]">Driver Portal</span>
				</div>
			</div>

			<div className="bg-white overflow-y-scroll fixed bottom-8 h-[85vh] w-1/3 mx-auto rounded-md text-sm">
				<div
					className={`py-4 rounded-t-md fixed w-1/3 px-8 z-20 bg-white border-b border-[#EFF3EF] ${
						currentPage === 5 && "hidden"
					}`}>
					<div className="flex items-center justify-between w-2/6">
						{pages.map((e) => (
							<React.Fragment key={e}>
								<div
									className={`h-3 w-3 rounded-md ${
										currentPage >= e
											? "bg-[#000000] text-white"
											: "bg-[#EFF3EF]"
									}`}
								/>
								{e !== pages[pages.length - 1] && (
									<div
										className={`border-b h-0.5 w-6 ${
											currentPage >= e + 1
												? "bg-[#000000] text-white"
												: "bg-gray-100"
										}`}
									/>
								)}
							</React.Fragment>
						))}
					</div>

					<div>
						<h3 className="mt-6 text-base font-medium">
							{currentPage === 1 && "Personal Information"}
							{currentPage === 2 && "Vehicle Information"}
							{currentPage === 3 && "Document Upload"}
							{currentPage === 4 && "Payment Information"}
						</h3>
						<p className="text-[10px] text-[#929292] mt-1 w-11/12">
							{currentPage === 1 &&
								"Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
							{currentPage === 2 &&
								"Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
							{currentPage === 3 &&
								"Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
							{currentPage === 4 &&
								"Join the revolution of earning money on your own terms. Sign up now to start turning your vehicle into a money-making machine"}
						</p>
					</div>
				</div>

				{/* PAGES */}
				<div className="">
					{/*  */}
					{/* PAGE 1 */}
					{currentPage === 1 && (
						<div className="px-8 py-8 mt-32 mb-32">
							{showError && currentPage === 1 && (
								<p className="text-red-600">{errorMessage}</p>
							)}
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										First Name
									</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="First Name"
									value={fName}
									required={true}
									size="small"
									onChange={(e) => setFName(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Last Name
									</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Last Name"
									value={lName}
									required={true}
									size="small"
									onChange={(e) => setLName(e.target.value)}
								/>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">Phone</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Phone Number"
									value={phone}
									required={true}
									size="small"
									type="number"
									prefix={"+234"}
									onChange={(e) => {
										setPhone(
											e.target.value.startsWith("0")
												? e.target.value.slice(1)
												: e.target.value
										);
									}}
								/>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Driver’s License Number
									</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="License Number"
									value={licenseNumber}
									required={true}
									size="small"
									onChange={(e) => setLicenseNumber(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Email Address
									</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Email"
									value={email}
									required={true}
									size="small"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="relative w-full mb-6 text-left duration-300 ease-in-out">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Primary Location
									</label>
								</div>
								<button
									type="button"
									className="inline-flex h-9 items-center w-full px-2 py-2 mb-2 text-sm  leading-5 text-gray-700 bg-white border border-gray-300 rounded-[4px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
									onClick={() => {
										setlocation(!location);
									}}>
									{locationName}
									<FaCaretDown className="ml-auto" />
								</button>
								{location && (
									<div className="absolute z-10 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg scroll-auto">
										{availableCities.map((e) => {
											return (
												<a
													href="#"
													className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
													onClick={() => {
														setlocationName(e.state);
														setlocation(false);
													}}>
													{e.state}
												</a>
											);
										})}
									</div>
								)}
							</div>

							<div className="flex flex-col pb-4 mb-4 border-b ">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Profile Image
									</label>
								</div>

								<input
									type="file"
									accept="image/**"
									ref={profilePicRef}
									onChange={uploadProfilePics}
								/>
							</div>
							{uploadingProfile && (
								<p className="text-blue-500">Uploading Please wait...</p>
							)}
							{profile && (
								<div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px]">
									<img alt="" src={profile} className="w-[30px] h-[30px]" />
									<span
										className="p-2 bg-red-400 rounded-lg"
										onClick={() => {
											dispatch(deleteFileAction(profile));
											setProfile("");
										}}>
										<MdCancel size="20" />
									</span>
								</div>
							)}
							{error && (
								<p className="text-red-500"> {uploadProfilePicError}</p>
							)}
						</div>
					)}

					{/* PAGE 2 */}
					{currentPage === 2 && (
						<div className="px-8 py-8 mt-32 mb-12">
							{(showError || errorMessage) && currentPage === 2 && (
								<p className="text-red-600">{errorMessage || createBusError}</p>
							)}

							<div className="relative w-full mb-6 text-left duration-300 ease-in-out">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">Bus Make</label>
								</div>
								<button
									type="button"
									className="inline-flex h-9 items-center w-full px-2 py-2 mb-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-[6px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
									onClick={() => {
										setMakeOpen(!makeOpen);
									}}>
									{make}
									<FaCaretDown className="ml-auto" />
								</button>
								{makeOpen && (
									<div className="absolute z-20 w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
										{busTypes.map((e) => {
											return (
												<a
													href="#"
													className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
													onClick={() => {
														setMake(e.make);
														setModelList(e.models);
														setMakeOpen(false);
													}}>
													{e.make}
												</a>
											);
										})}
									</div>
								)}
							</div>

							<div
								className={`relative w-full text-left duration-300 ease-in-out z-10 mb-6 ${
									modelList.length === 0 && "hidden"
								}`}>
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Bus Model
									</label>
								</div>
								<button
									type="button"
									className="inline-flex h-9 items-center w-full px-2 py-2 mb-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-[6px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
									onClick={() => {
										setModelOpen(!modelOpen);
									}}>
									{model}
									<FaCaretDown className="ml-auto" />
								</button>
								{modelOpen && (
									<div className="absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg">
										{modelList.map((e) => {
											return (
												<a
													href="#"
													className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
													onClick={() => {
														setModel(e);
														setModelOpen(false);
													}}>
													{e}
												</a>
											);
										})}
									</div>
								)}
							</div>
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Vehicle Capacity
									</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Vehicle Capacity"
									type="number"
									value={vehicleCapacity}
									required={true}
									size="small"
									onChange={(e) => setVehicleCapacity(Number(e.target.value))}
								/>
							</div>

							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Vehicle Registration Number
									</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Vehicle Registration Number"
									value={registrationNumber}
									required={true}
									size="small"
									onChange={(e) => setRegistrationNumber(e.target.value)}
								/>
							</div>
						</div>
					)}

					{/* PAGE 3 */}
					{currentPage === 3 && (
						<div className="flex flex-col px-8 py-8 mt-32 mb-32 ">
							<div className="flex flex-col pb-4 mb-4 border-b ">
								{showError && currentPage === 3 && (
									<p className="text-red-600">{errorMessage}</p>
								)}
								<p className="mb-3 text-[#22B11E]">
									Driver’s License (as image)
								</p>

								<input
									type="file"
									accept="image/**"
									ref={driverLicenseRef}
									onChange={uploadDriverLicense}
								/>
								{driverLisenseImageLoading && (
									<p className="text-blue-500 mt-[3px]">
										uploading driver license ...
									</p>
								)}

								{driverLisense && (
									<div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px] mt-[3px]">
										<img
											alt=""
											src={driverLisense}
											className="w-[30px] h-[30px]"
										/>
										<span
											className="p-2 bg-red-400 rounded-lg"
											onClick={() => {
												dispatch(deleteFileAction(driverLisense));
												setDriverLisense("");
											}}>
											<MdCancel size="20" />
										</span>
									</div>
								)}
							</div>
							<div className="flex flex-col pb-4 mb-4 border-b ">
								<p className="mb-3 text-[#22B11E]">
									Proof of Vehicle Insurance (as image)
								</p>

								<input
									type="file"
									accept="image/**"
									ref={vehicleInsuranceRef}
									onChange={uploadVehicleInsurance}
								/>

								{vehicleInsuranceImageLoading && (
									<p className="text-blue-500 mt-[3px]">
										uploading vehicle insurance ...
									</p>
								)}

								{proofOfInsurance && (
									<div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px] mt-[3px]">
										<img
											alt=""
											src={proofOfInsurance}
											className="w-[30px] h-[30px]"
										/>
										<span
											className="p-2 bg-red-400 rounded-lg"
											onClick={() => {
												dispatch(deleteFileAction(proofOfInsurance));
												setProofOfInsurance("");
											}}>
											<MdCancel size="20" />
										</span>
									</div>
								)}
							</div>
							<div className="flex flex-col pb-4 mb-4 border-b ">
								<p className="mb-3 text-[#22B11E]">
									Road Worthiness Certificate
								</p>

								<input
									type="file"
									accept="image/**"
									ref={roadWorthinessRef}
									onChange={uploadRoadWorthiness}
								/>

								{roadWorthinessLoading && (
									<p className="text-blue-500 mt-[3px]">
										uploading road worthiness cert ...
									</p>
								)}

								{roadWorthiness && (
									<div className="flex justify-between w-full bg-green-200 align-center rounded-md p-[2px]">
										<img
											alt=""
											src={roadWorthiness}
											className="w-[30px] h-[30px]"
										/>
										<span
											className="p-2 bg-red-400 rounded-lg"
											onClick={() => {
												dispatch(deleteFileAction(roadWorthiness));
												setRoadWorthiness("");
											}}>
											<MdCancel size="20" />
										</span>
									</div>
								)}
							</div>
						</div>
					)}

					{currentPage === 4 && (
						// banks
						<div className="px-8 py-8 mt-32 mb-6">
							<div className="relative w-full mb-6 text-left duration-300 ease-in-out">
								{showError && currentPage === 4 && (
									<p className="text-red-600">{errorMessage}</p>
								)}
								<div className="mb-6">
									<div className="mb-1">
										<label className="text-[#929292] text-[10px]">
											Account Name
										</label>
									</div>
									<Input
										className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
										placeholder="account name"
										type="text"
										value={accountName}
										required={true}
										size="small"
										onChange={(e) => setAccountName(e.target.value)}
									/>
								</div>
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">Bank</label>
								</div>
								<input
									type="text"
									className="inline-flex h-9 items-center w-full px-2 py-2 mb-2 text-sm  leading-5 text-gray-700 bg-white border border-gray-300 rounded-[4px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
									placeholder="Search Banks"
									onClick={() => {
										setBankOpen(!bankOpen);
									}}
									onChange={(e) => {
										setBankFilter(e.target.value);
									}}
									value={bankFilter}
								/>
								{bankOpen && (
									<div className="absolute w-full z-10 mt-2 bg-white h-[240px] overflow-scroll rounded-md shadow-xs shadow-lg">
										{banks
											.filter((e) =>
												e.toLowerCase().includes(bankFilter.toLowerCase())
											)
											.map((e) => {
												return (
													<a
														href="#"
														className="inline-block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
														onClick={() => {
															setBankFilter(e);
															setBankOpen(false);
														}}>
														{e}
													</a>
												);
											})}
									</div>
								)}
							</div>
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Account Number
									</label>
								</div>
								<Input
									className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Account Number"
									value={accountNo}
									required={true}
									size="small"
									onChange={(e) => setAccountNo(e.target.value)}
								/>
							</div>
						</div>
					)}
					{currentPage === 5 && (
						<div className="h-[70vh] items-center flex flex-col px-8">
							<img
								src="/assets/images/success.gif"
								width="120px"
								alt=""
								className="mt-auto mb-6"
							/>
							<div className="w-2/3 mb-24 text-center ">
								We have received your submission, our team will review shortly
								and get back to you. <br /> <br /> This is usually within 24
								hours
							</div>

							<button
								className={`items-center justify-center w-full p-3 mb-4 font-medium rounded-md bg-[#000000] text-white hover:bg-[#353535]`}
								onClick={() => {}}>
								<svg
									className={`${
										false ? "animate-spin" : "hidden"
									} inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
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
								Invite a friend
							</button>
							<button
								className={`items-center justify-center w-full p-3 font-medium rounded-md border border-[#000000] hover:border-[#929292]`}
								onClick={() => {
									navigate(_paths_.DRIVER_PORTAL);
								}}>
								<svg
									className={`${
										false ? "animate-spin" : "hidden"
									} inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
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
								Continue to Dashboard
							</button>
						</div>
					)}
				</div>

				{/* BUTTONS */}

				<div
					className={`fixed bottom-8 bg-white border-t border-[#EFF3EF] rounded-b-md w-1/3 ${
						currentPage === 5 && "hidden"
					}`}>
					<div className="flex items-center m-auto mx-8 my-6">
						<button
							className={`items-center justify-center flex  p-3 px-6 font-medium rounded-md mr-3 ${
								// signUpValid
								currentPage === 1
									? "hidden"
									: "border-[#000000] text-[#000000] border hover:border-[#929292]"
							} `}
							onClick={() => true && handleBack()}>
							<svg
								className={`${
									false ? "animate-spin" : "hidden"
								} inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
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
							<FaChevronLeft className="mr-4" /> Previous
						</button>

						<button
							className={`items-center justify-center flex w-full p-3 font-medium rounded-md ${
								// signUpValid
								true
									? "bg-[#000000] text-white hover:bg-[#353535]"
									: "bg-[#f5f5f5]"
							} `}
							onClick={() => {
								currentPage === pages.length ? handleSubmit() : handleNext();
							}}>
							<svg
								className={`${
									false ? "animate-spin" : "hidden"
								} inline -ml-8 mr-4 w-4 h-4 text-gray-200 dark:text-gray-600 fill-blue-600`}
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
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
							{currentPage === pages.length ? "Submit" : "Next"}
						</button>
					</div>
					<div
						className="cursor-pointer  px-8 pb-6 border-t pt-4 text-[#22B11E]  hover:text-[#179713]"
						onClick={() => navigate("/driverlogin")}>
						I already have an account
					</div>
				</div>
			</div>
		</div>
	);
};

export default DriverSignUp;
