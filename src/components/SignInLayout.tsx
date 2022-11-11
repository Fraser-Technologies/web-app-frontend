import React from "react";
import { Header } from "./Header";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="h-screen font-sans">
			<div className="h-screen xs:bg-signup-hero-bg-mobile bg-signin-hero-bg bg-no-repeat">
				<Header />
				<div className="flex justify-center items-center w-full h-5/6 m-auto">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
