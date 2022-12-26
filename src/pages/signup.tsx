import React from "react";
import { Button } from "../components/Button";
import Layout from "../components/layouts/SignInLayout";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	firstName: string;
	lastName: string;
	email: string;
	phone: number;
};

const SignUp = () => {
	const navigate = useNavigate();
	const [user, setUser] = React.useState<any>("");
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data, "formdata");
	};

	return (
		<Layout
			title="Sign In - Fraser"
			bg={
				"md:h-screen bg-[#F4F4F4] xs:bg-signup-hero-bg-mobile bg-signin-hero-bg bg-no-repeat"
			}
			childClass={"flex justify-center items-center w-full h-5/6 m-auto"}>
			<div className="w-11/12 sm:w-3/5 lg:w-2/5 mt-4 md:mt-8">
				<div className="bg-white py-12 px-8 rounded-md w-full">
					<h1 className="text-2xl lg:text-3xl font-semibold leading-6 tracking-tighter">
						Signup to continue
					</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="w-full mt-8 space-y-5">
						<div className="flex md:flex-row flex-col space-y-5 md:space-y-0 w-full">
							<div className="flex flex-col md:mr-2">
								<label
									htmlFor="firstName"
									className="text-[#949292] text-sm md:text-base font-normal">
									First Name
								</label>
								<input
									{...register("firstName", { required: true })}
									autoFocus
									className="px-3 py-3 border border-[#BDBDBD] rounded w-full"
									type={"text"}
									placeholder="John"
								/>
								{errors.firstName && (
									<span className="text-red-500 text-sm">
										*First name is required
									</span>
								)}
							</div>
							<div className="flex flex-col">
								<label
									htmlFor="lastName"
									className="text-[#949292] text-sm md:text-base  font-normal">
									Last Name
								</label>
								<input
									{...register("lastName", { required: true })}
									className="px-3 py-3 border border-[#BDBDBD] rounded w-full"
									type={"text"}
									placeholder="Doe"
								/>
								{errors.lastName && (
									<span className="text-red-500 text-sm">
										*Last name is required
									</span>
								)}
							</div>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="email"
								className="text-[#949292] text-sm md:text-base font-normal">
								Email Address
							</label>
							<input
								{...register("email", { required: true })}
								className="px-3 py-3 border border-[#BDBDBD] rounded"
								type={"email"}
								placeholder="your@email.com"
							/>
							{errors.email && (
								<span className="text-red-500 text-sm">*Email is required</span>
							)}
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="phoneNumber"
								className="text-[#949292] text-sm md:text-base font-normal">
								Phone Number
							</label>
							<input
								{...register("phone", { required: true })}
								className="px-3 py-3 border border-[#BDBDBD] rounded"
								type={"tel"}
								placeholder="+2348012345678"
							/>
							{errors.phone && (
								<span className="text-red-500 text-sm">
									*Phone number is required
								</span>
							)}
						</div>

						<Button
							title="Proceed"
							type="submit"
							className="bg-primary-100 px-3 py-2 rounded mt-16 w-full"
						/>
						<Link to={"/"}>
							<p className="text-center mt-4 text-xs md:text-sm cursor-pointer">
								Already have an account?{" "}
								<span className="text-primary-100">Sign in</span>
							</p>
						</Link>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default SignUp;
