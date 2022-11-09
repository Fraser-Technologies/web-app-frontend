import React from "react";
import { Button } from "../components/Button";
import Layout from "../components/SignInLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SignIn = () => {
	const [phone, setPhone] = React.useState<any>("");
	return (
		<Layout>
			<div className="w-2/5">
				<div className="bg-white py-12 px-8 rounded-md w-full">
					<div className="text-base font-normal leading-6 tracking-tighter">
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
						onClick={() => console.log(phone)}
						className="bg-primary-100 px-3 py-2 rounded mt-8 w-full"
					/>
				</div>
			</div>
		</Layout>
	);
};

export default SignIn;
