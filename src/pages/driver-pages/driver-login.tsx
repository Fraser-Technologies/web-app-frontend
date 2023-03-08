import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLoginAction } from "../../state/slices/user.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/redux-store";
import { _paths_ } from "../../utils/routes";

const DriverLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { userInfo, loading, error } = useAppSelector(
		(state: RootState) => state.userLogin
	);
	const [phone, setPhone] = useState<string>("");

	const logInDriver = () => {
		dispatch(userLoginAction("+234" + phone));
	};

	useEffect(() => {
		if (userInfo?.user_type === "driver") {
			return navigate(_paths_.DRIVER_PORTAL);
		}
	}, [navigate, userInfo]);

	return (
		<div className="flex items-center h-screen text-sm">
			<div className="z-20 w-4/12 m-auto">
				<div className="flex items-center m-auto mb-6">
					<img
						className="pr-[10px] ml-auto h-[18px] border-r border-black"
						src="/assets/images/fraser-black-logo.svg"
						alt=""
					/>
					<span className="ml-[10px] mr-auto">Driver Portal</span>
				</div>
				{error && <p className="text-red-500">{error}</p>}

				<div className="bg-white px-12 py-8 pb-8 rounded-md text-[14px]">
					<h3 className="text-base font-medium">Login to continue</h3>
					<p className="text-[10px] text-[#929292] mt-4">
						Have a bus? Unlock the earning potential of your vehicle and enjoy
						financial freedom with a steady stream of income!
					</p>

					<div className="mt-8">
						<div className="mb-1">
							<label className="text-[#929292] text-[10px]">
								Mobile Number
							</label>
						</div>
						<Input
							className="w-full text-sm h-9 hover:border-green-500 focus:border-green-500 active:border-green-600"
							placeholder="903 123 1234"
							value={phone}
							prefix={"+234"}
							type="number"
							required={true}
							onChange={(e) => {
								setPhone(
									e.target.value.startsWith("0")
										? e.target.value.slice(1)
										: e.target.value
								);
							}}
						/>
					</div>
					<button
						className={`text-sm w-full p-3 mt-6 font-medium rounded-md ${
							true
								? "bg-[#000000] text-white hover:bg-[#353535]"
								: "bg-[#f5f5f5]"
							// loginValid ? "bg-[#000000] text-white hover:bg-[#353535]" : "bg-[#f5f5f5]"
						} `}
						onClick={() =>
							// loginValid &&
							logInDriver()
						}>
						<svg
							className={`${
								loading ? "animate-spin" : "hidden"
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
						Continue
					</button>

					<button
						className="text-sm flex items-center justify-center w-full cursor-pointer mt-6 text-[#22B11E]  hover:text-[#179713]"
						onClick={() => {
							navigate("/driversignup");
						}}>
						I don't have an account
					</button>
				</div>
			</div>
		</div>
	);
};

export default DriverLogin;
