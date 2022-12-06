import React from "react";
import { Button } from "../components/Button";
import Layout from "../components/layouts/SignInLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Helmet } from "react-helmet";
import OtpInput from "react18-input-otp";
import { Link } from "react-router-dom";

const SignIn = () => {
	const [phone, setPhone] = React.useState<any>("");
	const [isView, setIsView] = React.useState<boolean>(false);
	const [otp, setOtp] = React.useState<any>("");
	const [user, setUser] = React.useState<any>("");
	const [phoneError, setPhoneError] = React.useState<any>("");

	const handleSignIn = () => {
		if (phone) {
			setIsView(true);
			console.log(phone);
		} else {
			setPhoneError("Please enter your phone number");
		}
		// try {
		// 	fetch("http://localhost:3000/api/login", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({ phone }),
		// 	}).then((res) => {
		// 		if (res.status === 200) {
		// 			setIsView(true);
		// 		}
		// 	})
		// } catch (error) {}
	};

	const handleChange = (enteredOtp: any) => {
		setOtp(enteredOtp);
	};

	const handleVerify = () => {
		console.log(otp);
	};

	return (
		<Layout
			user={user}
			bg={
				"h-screen bg-[#F4F4F4] xs:bg-signup-hero-bg-mobile bg-signin-hero-bg bg-no-repeat"
			}
			childClass={"flex justify-center items-center w-full h-5/6 m-auto"}
		>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Sign In - Fraser</title>
			</Helmet>
			{isView === false ? (
				<div className="w-11/12 sm:w-3/5 lg:w-2/5">
					<div className="bg-white py-12 px-8 rounded-md w-full">
						<div className="text-sm lg:text-base font-normal leading-6 tracking-tighter">
							<h1>Enter your mobile number.</h1>
							<h1>You'll get an OTP to confirm your number</h1>
						</div>

						<div className="w-full">
							<PhoneInput
								placeholder="Enter phone number"
								value={phone}
								onChange={setPhone}
								className="w-full py-3 px-4 mt-6 border border-gray-300 rounded-md"
								style={{ border: "1px solid #000" }}
								defaultCountry="NG"
								smartCaret={true}
								autoComplete="tel"
								withCountryCallingCode={true}
								required
							/>
							{phoneError && (
								<div className="text-red-500 text-sm mt-2">{phoneError}</div>
							)}
						</div>
						<Button
							title="Proceed"
							type="submit"
							onClick={handleSignIn}
							className="bg-primary-100 px-3 py-2 rounded mt-8 w-full"
						/>
						<Link to={"/signup"}>
							<p className="text-center mt-4 text-xs md:text-sm cursor-pointer">
								Don't have an account?{" "}
								<span className="text-primary-100">Sign up</span>
							</p>
						</Link>
					</div>
				</div>
			) : (
				<div className="w-11/12 sm:w-3/5 lg:w-2/5">
					<div className="bg-white py-12 px-8 rounded-md w-full">
						<div className="text-sm lg:text-base font-normal leading-6 tracking-tighter">
							<h1>Enter the OTP sent to {phone}</h1>
							<h1
								className="text-primary-100 cursor-pointer"
								onClick={() => setIsView(false)}
							>
								Edit phone number
							</h1>
						</div>

						<div className="w-full flex justify-center items-center mt-3">
							<OtpInput
								value={otp}
								onChange={handleChange}
								numInputs={5}
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
						<Button
							title="Proceed"
							type="submit"
							onClick={handleVerify}
							className="bg-primary-100 px-3 py-2 rounded mt-8 w-full"
						/>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default SignIn;
