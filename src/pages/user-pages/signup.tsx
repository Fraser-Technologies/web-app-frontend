import React, { useEffect, useState } from "react";
import { FraserButton } from "../../components/Button";
import Layout from "../../components/layouts/SignInLayout";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { registerUserAction } from "../../state/action/user.action";
import { RootState } from "../../state/redux-store";
import { _paths_ } from "../../utils/routes";
import { Input, message, Modal } from "antd";
import OtpInput from "react18-input-otp";
import {
	getOtpEmailAction,
	resetGetOtpAction,
	resetVerifyOtpAction,
	VerifyEmailOtpAction,
	VerifyOtpAction,
} from "../../state/action/otp.action";

const SignUp = () => {
	const dispatch = useAppDispatch();
	const { loading, error, userInfo } = useAppSelector(
		(state: RootState) => state.userLogin
	);
	const {
		loading: getOtpLoading,
		error: getOtpError,
		message: otpMessage,
		data: getOtpData,
	} = useAppSelector((state: RootState) => state.getotp);
	const {
		loading: verifyOtpLoading,
		error: verifyOtpError,
		message: verifyOtpMessage,
		data: verifyOtpData,
	} = useAppSelector((state: RootState) => state.verifyOtp);

	const navigate = useNavigate();
	const [modal, openModal] = useState(false);
	const [otp, setOtp] = React.useState<any>("");
	const [messageApi, contextHolder] = message.useMessage();
	const [first_name, setFirst_name] = useState<string>("");
	const [last_name, setLast_name] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [showMessage, setShowMessage] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleOk = () => {
		openModal(false);
	};

	const showModal = () => {
		openModal(true);
	};

	const handleCancel = () => {
		openModal(false);
	};

	const handleChange = (enteredOtp: any) => {
		setOtp(enteredOtp);
	};

	const getOtp = () => {
		setOtp("");
		if (!phone || !first_name || !last_name || !email) {
			setShowMessage(true);
			setErrorMessage("all fields are required");
		}
		dispatch(getOtpEmailAction(email));
		showModal();
	};

	const handleVerify = () => {
		dispatch(VerifyEmailOtpAction({ otp: otp, email: email }));
	};

	useEffect(() => {
		if (getOtpData) {
			messageApi.info(otpMessage);
			dispatch(resetGetOtpAction());
		}
	}, [dispatch, messageApi, getOtpData, otpMessage]);

	useEffect(() => {
		if (verifyOtpData) {
			messageApi.info(verifyOtpMessage);
			dispatch(registerUserAction({ phone, first_name, last_name, email }));
			dispatch(resetVerifyOtpAction());
		}
	}, [dispatch, messageApi, verifyOtpData, verifyOtpMessage]);

	useEffect(() => {
		if (userInfo?._id) {
			navigate(_paths_.BOOKRIDE);
		}
	}, [error, navigate, userInfo]);

	useEffect(() => {
		dispatch(resetGetOtpAction());
		dispatch(resetVerifyOtpAction());
	}, [dispatch]);

	return (
		<Layout
			title="Sign In - Fraser"
			bg={
				"md:h-screen bg-[#F4F4F4] xs:bg-signup-hero-bg-mobile bg-signin-hero-bg bg-no-repeat"
			}
			childClass={"flex justify-center items-center w-full h-5/6 m-auto"}>
			{contextHolder}
			<div className="w-11/12 sm:w-3/5 lg:w-2/5 mt-4 md:mt-8">
				<div className="bg-white py-12 px-8 rounded-md w-full">
					<h1 className="text-2xl lg:text-3xl font-semibold leading-6 tracking-tighter">
						Signup to continue
					</h1>
					{error && <p className="text-red-600">{error}</p>}
					{showMessage && <p className="text-red-600">{errorMessage}</p>}
					{/* <form className="w-full mt-8 space-y-5"> */}
					<div className="w-full mt-8 space-y-5">
						<div className="flex md:flex-row flex-col space-y-5 md:space-y-0 w-full">
							<div className="flex flex-col md:mr-2">
								<label
									htmlFor="firstName"
									className="text-[#949292] text-sm md:text-base font-normal">
									First Name
								</label>
								<Input
									// {...register("first_name", { required: true })}
									autoFocus
									className="px-3 py-3 border border-[#BDBDBD] rounded w-full"
									type={"text"}
									placeholder="John"
									value={first_name}
									onChange={(e) => setFirst_name(e.target.value)}
								/>
							</div>
							<div className="flex flex-col">
								<label
									htmlFor="lastName"
									className="text-[#949292] text-sm md:text-base  font-normal">
									Last Name
								</label>
								<Input
									// {...register("last_name", { required: true })}
									className="px-3 py-3 border border-[#BDBDBD] rounded w-full"
									type={"text"}
									placeholder="Doe"
									value={last_name}
									onChange={(e) => setLast_name(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="email"
								className="text-[#949292] text-sm md:text-base font-normal">
								Email Address
							</label>
							<Input
								// {...register("email", { required: true })}
								className="px-3 py-3 border border-[#BDBDBD] rounded"
								type={"email"}
								placeholder="your@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="phoneNumber"
								className="text-[#949292] text-sm md:text-base font-normal">
								Phone Number
							</label>
							{/* <Input
								// {...register("phone", { required: true })}
								className="px-3 py-3 border border-[#BDBDBD] rounded"
								type={"tel"}
								placeholder="+2348012345678"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/> */}

							<Input
								className="px-3 py-3 border border-[#BDBDBD] rounded"
								placeholder="901 1234 123"
								type="number"
								value={phone}
								prefix={"+234"}
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

						<FraserButton
							title="Proceed"
							loader={loading}
							// type="submit"
							onClick={() => getOtp()}
							size="regular"
						/>
						{/* <Link to={_paths_.SIGNIN}> */}
						<p className="text-center mt-4 text-xs md:text-sm cursor-pointer">
							Already have an account?{" "}
							<span
								className="text-primary-100"
								onClick={() => navigate(_paths_.SIGNIN)}>
								Sign in
							</span>
						</p>
						{/* </Link> */}
						{/* </form> */}
					</div>
				</div>
			</div>
			<Modal
				title={
					<p className="text-[16px] text-[#929292] mt-4 w-11/12">
						Enter the otp sent to {email} to continue
					</p>
				}
				onOk={handleOk}
				open={modal}
				onCancel={handleCancel}
				centered={true}
				footer={false}
				closable={true}>
				<div className="w-11/12 sm:w-3/5 lg:w-2/5">
					<div className="w-full px-8 py-12 bg-white rounded-md">
						{verifyOtpError && <p className="text-red-600">{verifyOtpError}</p>}

						<div className="flex items-center justify-center w-full mt-3 mb-3">
							<OtpInput
								value={otp}
								onChange={handleChange}
								numInputs={4} // const create_otp = await OTP.create({
								//   phone,
								//   otp,
								// });
								isInputNum={true}
								shouldAutoFocus={true}
								onSubmit={handleVerify}
								inputStyle={{
									width: "3rem",
									height: "3rem",
									borderRadius: "6px",
									border: "1px solid rgba(0, 0, 0, 0.3)",
									outline: "#000",
									marginRight: "0.5rem",
								}}
								containerStyle={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
								}}
							/>
						</div>
						<FraserButton
							title="Verify"
							size="regular"
							loader={verifyOtpLoading}
							onClick={handleVerify}
						/>
					</div>
				</div>
			</Modal>
		</Layout>
	);
};

export default SignUp;
