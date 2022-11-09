import React from "react";
import Layout from "../components/SignInLayout";

const SignIn = () => {
	return (
		<Layout>
			<div>
				<h1>Enter your mobile number</h1>
				<h1>You'll get an OTP to confirm your number</h1>

				<div>
					<input type="text" placeholder="Enter your mobile number" />
				</div>
				<button>Proceed</button>
			</div>
		</Layout>
	);
};

export default SignIn;
