import React from "react";
import { Header } from "../Header";

interface Props {
	children: React.ReactNode;
	user: string;
}

const Layout = ({ children, user }: Props) => {
	return (
		<div className="h-screen font-sans">
			<div className="h-screen xs:bg-signup-hero-bg-mobile bg-signin-hero-bg bg-no-repeat">
				<Header user={user} />
				<div className="flex justify-center items-center w-full h-5/6 m-auto">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
