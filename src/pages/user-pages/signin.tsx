import React, { useEffect, useState } from "react";
import { FraserButton } from "../../components/Button";
import Layout from "../../components/layouts/SignInLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Helmet } from "react-helmet";
import OtpInput from "react18-input-otp";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { RootState } from "../../state/redux-store";
import {
	resetGetOtpAction,
	resetVerifyOtpAction,
	getOtpEmailAction,
	VerifyEmailOtpAction,
} from "../../state/action/otp.action";
import { _paths_ } from "../../utils/routes";
import {
	userLoginAction,
	userLoginWithEmailAction,
} from "../../state/action/user.action";
import { useSelector } from "react-redux";
import { Input, message } from "antd";

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		loading: getOtpLoading,
		error: getOtpError,
		message: otpMessage,
		data: getOtpData,
	} = useAppSelector((state: RootState) => state.getotp);
	const { userInfo, error } = useSelector(
		(state: RootState) => state.userLogin
	);

	const {
		loading: verifyOtpLoading,
		error: verifyOtpError,
		message: verifyOtpMessage,
		data: verifyOtpData,
	} = useAppSelector((state: RootState) => state.verifyOtp);

	console.log("the verify data is ", verifyOtpData);

	const [phone, setPhone] = useState<any>("");
	const [email, setEmail] = useState<string>("");
	const [isView, setIsView] = useState<boolean>(false);
	const [otp, setOtp] = useState<any>("");
	const [phoneError, setPhoneError] = useState<any>("");
	const [messageApi, contextHolder] = message.useMessage();

	const handleSignIn = () => {
		// if (phone) {
		// 	setIsView(true);
		// } else {
		// 	setPhoneError("Please enter your phone number");
		// }

		if (!email) {
			setPhoneError("Please enter your email");
			return;
		}

		dispatch(getOtpEmailAction(email));
		setIsView(!isView);
	};

	const handleChange = (enteredOtp: any) => {
		setOtp(enteredOtp);
	};

	const handleVerify = () => {
		dispatch(VerifyEmailOtpAction({ otp: otp, email: email }));
	};

	useEffect(() => {
		if (verifyOtpData) {
			messageApi.open({
				type: "success",
				content: verifyOtpMessage,
			});

			dispatch(userLoginWithEmailAction(email));
			dispatch(resetVerifyOtpAction());
		}
	}, [dispatch, messageApi, verifyOtpData, verifyOtpMessage]);

	useEffect(() => {
		if (userInfo?._id) {
			navigate(_paths_.BOOKRIDE);
		}
	}, [dispatch, navigate, userInfo]);

	useEffect(() => {
		if (getOtpData) {
			messageApi.open({
				type: "success",
				content: otpMessage,
			});

			dispatch(resetGetOtpAction());
		}
	}, [dispatch, getOtpData, messageApi, otpMessage]);

	useEffect(() => {
		dispatch(resetGetOtpAction());
		dispatch(resetVerifyOtpAction());
	}, [dispatch]);

	return (
		<Layout
			bg={
				"h-screen bg-[#F4F4F4] xs:bg-signup-hero-bg-mobile bg-signin-hero-bg bg-no-repeat"
			}
			childClass={"flex justify-center items-center w-full h-5/6 m-auto pt-50"}>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Sign In - Fraser</title>
			</Helmet>
			{contextHolder}

			{isView === false ? (
				<div className="w-11/12 sm:w-3/5 lg:w-2/5">
					<div className="w-full px-8 py-12 bg-white rounded-md">
						<div className="text-sm font-normal leading-6 tracking-tighter lg:text-base">
							<h1>Enter your email address.</h1>
							<h1>You'll get an OTP to confirm your email</h1>
						</div>

						<div className="w-full">
							{/* <PhoneInput
								placeholder="Enter phone number"
								value={phone}
								onChange={setPhone}
								className="w-full px-4 py-3 mt-6 border border-gray-300 rounded-md"
								style={{ border: "1px solid #000" }}
								defaultCountry="NG"
								smartCaret={true}
								autoComplete="tel"
								withCountryCallingCode={true}
								required
							/>
							*/}

							{phoneError && (
								<div className="mt-2 text-sm text-red-500">{phoneError}</div>
							)}
							{getOtpError && (
								<div className="mt-2 text-sm text-red-500">{getOtpError}</div>
							)}

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
						<br />
						<FraserButton
							title="Proceed"
							type="submit"
							onClick={handleSignIn}
							size="regular"
							loader={getOtpLoading}
						/>
						{/* <Link to={"/signup"}> */}
						<p className="mt-4 text-xs text-center cursor-pointer md:text-sm">
							Don't have an account?{" "}
							<span
								className="text-primary-100"
								onClick={() => navigate(_paths_.SIGNUP)}>
								Sign up
							</span>
						</p>
						{/* </Link> */}
					</div>
				</div>
			) : (
				<div className="w-11/12 sm:w-3/5 lg:w-2/5">
					<div className="w-full px-8 py-12 bg-white rounded-md">
						<div className="text-sm font-normal leading-6 tracking-tighter lg:text-base">
							<h1>Enter the OTP sent to {phone}</h1>
							<h1
								className="cursor-pointer text-primary-100"
								onClick={() => setIsView(false)}>
								Edit phone number
							</h1>
						</div>

						{verifyOtpError && <p className="text-red-600">{verifyOtpError}</p>}
						{error && <p className="text-red-600">{error}</p>}
						<div className="flex items-center justify-center w-full mt-3">
							<OtpInput
								value={otp}
								onChange={handleChange}
								numInputs={4} // const create_otp = await OTP.create({
								//   phone,
								//   otp,
								// });
								isInputNum={true}
								shouldAutoFocus={true}
								onSubmit={() => handleVerify()}
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
						<br />
						<FraserButton
							title="Verify"
							size="regular"
							type="submit"
							loader={verifyOtpLoading}
							onClick={() => handleVerify()}
						/>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default SignIn;
