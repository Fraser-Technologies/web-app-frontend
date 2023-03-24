import React, { useEffect } from "react";
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
	getOtpAction,
	VerifyOtpAction,
	resetGetOtpAction,
	resetVerifyOtpAction,
} from "../../state/action/otp.action";
import { _paths_ } from "../../utils/routes";
import { userLoginAction } from "../../state/action/user.action";
import { useSelector } from "react-redux";
import { message } from "antd";

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		loading: getOtpLoading,
		error: getOtpError,
		otp: otpMessage,
	} = useAppSelector((state: RootState) => state.getotp);
	const { userInfo } = useSelector((state: RootState) => state.userLogin);

	const {
		loading: verifyOtpLoading,
		error: verifyOtpError,
		otp: verifyOtp,
	} = useAppSelector((state: RootState) => state.verifyOtp);

	const [phone, setPhone] = React.useState<any>("");
	const [isView, setIsView] = React.useState<boolean>(false);
	const [otp, setOtp] = React.useState<any>("");
	const [phoneError, setPhoneError] = React.useState<any>("");
	const [messageApi, contextHolder] = message.useMessage();

	const handleSignIn = () => {
		if (phone) {
			setIsView(true);
		} else {
			setPhoneError("Please enter your phone number");
		}

		dispatch(getOtpAction(phone));
	};

	const handleChange = (enteredOtp: any) => {
		setOtp(enteredOtp);
	};

	const handleVerify = () => {
		dispatch(VerifyOtpAction({ otp: otp, phone: phone }));
	};

	useEffect(() => {
		if (verifyOtp) {
			dispatch(userLoginAction(phone));
			// dispatch( resetOtp)
		}
	}, [dispatch, phone, verifyOtp]);

	useEffect(() => {
		if (userInfo?._id) {
			navigate(_paths_.LANDING_PAGE);
			dispatch(resetGetOtpAction());
			dispatch(resetVerifyOtpAction());
		}
	}, [dispatch, navigate, userInfo]);

	useEffect(() => {
		if (otpMessage) {
			messageApi.open({
				type: "success",
				content: otpMessage,
			});

			dispatch(resetGetOtpAction());
		}
	}, [dispatch, messageApi, otpMessage]);

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
							<h1>Enter your mobile number.</h1>
							<h1>You'll get an OTP to confirm your number</h1>
						</div>

						<div className="w-full">
							<PhoneInput
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
							{phoneError && (
								<div className="mt-2 text-sm text-red-500">{phoneError}</div>
							)}
							{getOtpError && (
								<div className="mt-2 text-sm text-red-500">{getOtpError}</div>
							)}
						</div>
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
							type="submit"
							loader={verifyOtpLoading}
							onClick={handleVerify}
						/>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default SignIn;
