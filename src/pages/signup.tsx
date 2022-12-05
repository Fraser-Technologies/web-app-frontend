import React from "react";
import { Button } from "../components/Button";
import Layout from "../components/layouts/SignInLayout";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Helmet } from "react-helmet";
import OtpInput from "react18-input-otp";

const SignUp = () => {
	const [user, setUser] = React.useState<any>("");

	const handleSignUp = () => {
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

	return (
		<Layout
			user={user}
			bg={
				"md:h-screen bg-[#F4F4F4] xs:bg-signup-hero-bg-mobile bg-signin-hero-bg bg-no-repeat"
			}
			childClass={"flex justify-center items-center w-full h-5/6 m-auto"}
		>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Sign In - Fraser</title>
			</Helmet>
			<div className="w-11/12 sm:w-3/5 lg:w-2/5">
				<div className="bg-white py-12 px-8 rounded-md w-full">
					<h1 className="text-2xl lg:text-base font-semibold leading-6 tracking-tighter">
						Signup to continue
					</h1>

					<div className="w-full mt-8 space-y-5">
						<div className="flex md:flex-row flex-col space-y-5 md:space-y-0 w-full">
							<div className="flex flex-col md:mr-2">
								<label className="text-[#949292] text-base font-normal">
									First Name
								</label>
								<input
									autoFocus
									className="px-3 py-3 border border-[#BDBDBD] rounded w-full"
								/>
							</div>
							<div className="flex flex-col">
								<label className="text-[#949292] text-base font-normal">
									Last Name
								</label>
								<input className="px-3 py-3 border border-[#BDBDBD] rounded w-full" />
							</div>
						</div>
						<div className="flex flex-col w-full">
							<label className="text-[#949292] text-base font-normal">
								Email Address
							</label>
							<input className="px-3 py-3 border border-[#BDBDBD] rounded" />
						</div>
						<Button
							title="Proceed"
							type="submit"
							// onClick={handleSignIn}
							className="bg-primary-100 px-3 py-2 rounded mt-8 w-full"
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SignUp;
