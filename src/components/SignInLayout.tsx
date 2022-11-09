import React from "react";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="h-screen font-sans">
			<div className="h-screen bg-signin-hero-bg">
				<div className="bg-black py-6 px-16 flex justify-between items-center">
					<div>
						<img
							src="/assets/images/fraser-white-logo.svg"
							alt="Fraser Logo"
							width={80}
						/>
					</div>
					<div className="flex justify-between items-center space-x-12">
						<div className="text-white ">Home</div>
						<button className="bg-primary-100 px-3 py-2 rounded-md">
							Book a ride
						</button>
					</div>
				</div>
				<div
					className="flex justify-center items-center w-full h-5/6 m-auto"
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
