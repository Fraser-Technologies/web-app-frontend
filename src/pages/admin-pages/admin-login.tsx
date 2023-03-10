import { Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/SignInLayout";
import { userLoginAction } from "../../state/slices/user.action";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/redux-store";
import { _paths_ } from "../../utils/routes";
import LoadingWheel from "../../components/loading-svg";

const AdminLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { userInfo, loading, error } = useAppSelector(
		(state: RootState) => state.userLogin
	);
	const [phone, setPhone] = useState<string>("");
	const loginValid = phone !== "" && phone.length === 10;

	const logInAdmin = () => {
		dispatch(userLoginAction("+234" + phone));
	};

	useEffect(() => {
		if (userInfo?.is_admin) {
			return navigate(_paths_.ADMIN_DASHBOARD);
		}
	}, [navigate, userInfo]);

	return (
		<Layout title="Admin Login">
			<div className="flex items-center h-screen text-sm">
				<div className="z-20 w-4/12 m-auto">
					<div className="flex items-center m-auto mb-6">
						<img
							className="pr-[10px] ml-auto h-[18px] border-r border-black"
							src="/assets/images/fraser-black-logo.svg"
							alt=""
						/>
						<span className="ml-[10px] mr-auto">Admin Portal</span>
					</div>
					{error && <p className="text-red-500">{error}</p>}

					<div className="bg-white px-12 py-8 pb-8 rounded-md text-[14px]">
						<h3 className="text-base font-medium">Login to continue</h3>
						<p className="text-[10px] text-[#929292] mt-4">
							See what is going on with your users.
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
							onClick={() => loginValid && logInAdmin()}>
							<LoadingWheel param={loading}/>
							Continue
						</button>
					</div>
				</div>
				{/* <div className="fixed flex w-full overflow-hidden place-content-end">
        <img src="/assets/images/driver-login.png" alt="" className="w-1/2" />
      </div> */}
			</div>
		</Layout>
	);
};

export default AdminLogin;
