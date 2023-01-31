import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/redux-store";
import { _paths_ } from "../utils/appHelpers";
import { registerAsADriverAction } from "../state/action/user.action";

const DriverSignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { userInfo } = useAppSelector(
		(state: RootState) => state.registerAsDriver
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [email, setEmail] = useState<string>("");
	const [fName, setFName] = useState<string>("");
	const [lName, setLName] = useState<string>("");
	const [licneseNumber, setLicenseNumber] = useState<string>("");
	const [primaryLocation, setPrimaryLocation] = useState<string>("");

	const handleSubmit = () => {
		// e.preventDefault();
		if (currentPage < 3) {
			setCurrentPage(currentPage + 1);
		}

		// dispatch(registerAsADriverAction());
	};

	const handleBack = () => {
		// e.preventDefault();
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const steps = [
		{
			title: "Personal Profile",
		},
		{
			title: "Contact Information",
		},
		{
			title: "Submit",
		},
	];

	useEffect(() => {
		if (userInfo?.user_type === "driver") {
			navigate(_paths_.DRIVER_PORTAL);
		}
	}, [navigate, userInfo]);

	return (
		<div className="w-full h-screen items-center flex flex-col">
			{/* <div className="items-center flex w-full">
        <div className="m-auto flex mb-6">
          <div className="py-1 border-r border-[#000000]">
            <img
              className="pr-[10px] h-[18px]"
              src="/assets/images/fraser-black-logo.svg"
              alt=""
            />
          </div>
          <span className="ml-[10px]">Driver Portal</span>
        </div>
      </div> */}

			<div className="bg-white overflow-y-scroll fixed bottom-8 h-[90vh] w-1/3 mx-auto rounded-md text-sm">
				<div className="py-4 rounded-t-md fixed w-1/3 px-8 z-20 bg-white border-b border-[#EFF3EF]">
					<div className="flex justify-between w-2/6 items-center">
						<div
							className={`h-3 w-3 rounded-lg ${
								currentPage === 1 ? "bg-[#00FF6a]" : "bg-[#EFF3EF]"
							}`}></div>
						<div className="border-b h-0.5 w-6 bg-gray-100"></div>
						<div
							className={`h-3 w-3 rounded-lg ${
								currentPage === 2 ? "bg-[#00FF6a]" : "bg-[#EFF3EF]"
							}`}></div>
						<div className="border-b h-0.5 w-6 bg-gray-100"></div>
						<div
							className={`h-3 w-3 rounded-lg ${
								currentPage === 3 ? "bg-[#00FF6a]" : "bg-[#EFF3EF]"
							}`}></div>
					</div>

					{currentPage === 1 && (
						<div>
							<h3 className="text-base font-medium mt-6">Personal Profile</h3>
							<p className="text-[10px] text-[#929292] mt-1 w-11/12">
								Join the revolution of earning money on your own terms. Sign up
								now to start turning your vehicle into a money-making machine
							</p>
						</div>
					)}
				</div>
				<div className="mt-32">
					{currentPage === 1 && (
						<div className="mb-6 px-6 py-8">
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										First Name
									</label>
								</div>
								<Input
									className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
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
									className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Last Name"
									value={lName}
									required={true}
									size="small"
									onChange={(e) => setLName(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Driver’s License Number
									</label>
								</div>
								<Input
									className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="License Number"
									value={licneseNumber}
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
									className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Email"
									value={email}
									required={true}
									size="small"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<div className="mb-1">
									<label className="text-[#929292] text-[10px]">
										Primary Location
									</label>
								</div>
								<Input
									className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
									placeholder="Primary Location"
									value={primaryLocation}
									required={true}
									size="small"
									onChange={(e) => setPrimaryLocation(e.target.value)}
								/>
							</div>
							{/* <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <div className="mb-1">
                  <label className="text-[#929292] text-[10px]">
                    Email Address
                  </label>
                </div>
                <Input
                  className="w-full h-9 text-sm hover:border-green-500 focus:border-green-500 active:border-green-600"
                  placeholder="Email"
                  value={email}
                  required={true}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div> */}
						</div>
					)}
					<div>
						{currentPage === 2 && <div></div>}
						{currentPage === 3 && <div></div>}
					</div>
				</div>

				<div className="fixed bottom-8 bg-white border-t border-[#EFF3EF] rounded-b-md w-1/3 ">
					<div className="flex w-1/2 items-center m-auto my-8">
						<button
							className={`items-center justify-center flex w-full p-3 font-medium rounded-lg mr-6 ${
								// signUpValid
								currentPage == 1
									? "bg-[#f5f5f5] hidden"
									: "bg-[#00ff6a] hover:bg-[#58FF9E]"
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
							Previous
						</button>

						<button
							className={`items-center justify-center flex w-full p-3 font-medium rounded-lg ${
								// signUpValid
								true ? "bg-[#00ff6a] hover:bg-[#58FF9E]" : "bg-[#f5f5f5]"
							} `}
							onClick={() => true && handleSubmit()}>
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
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DriverSignUp;
