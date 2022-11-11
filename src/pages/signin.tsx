import React from "react";
import { Button } from "../components/Button";
import Layout from "../components/layouts/SignInLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Helmet } from "react-helmet";
import OtpInput from "react18-input-otp";

const SignIn = () => {
	const [phone, setPhone] = React.useState<any>("");
	const [isView, setIsView] = React.useState<boolean>(false);
	const [otp, setOtp] = React.useState<any>("");
	const [user, setUser] = React.useState<any>("");

	const handleSignIn = () => {
		setIsView(true);
		console.log(phone);
	};

	const handleChange = (enteredOtp: any) => {
		setOtp(enteredOtp);
	};

	const handleVerify = () => {
		console.log(otp);
	};

	return (
		<Layout user={user}>
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
							/>
						</div>
						<Button
							title="Proceed"
							type="submit"
							onClick={handleSignIn}
							className="bg-primary-100 px-3 py-2 rounded mt-8 w-full"
						/>
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
