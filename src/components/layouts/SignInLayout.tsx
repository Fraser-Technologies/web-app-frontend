import React from "react";
import { Header } from "../Header";

interface Props {
	children: React.ReactNode;
	user?: string;
	bg?: string;
	childClass?: string;
}

const Layout = ({ children, user, bg, childClass }: Props) => {
	return (
		<div className="h-screen font-sans">
			<div className={`h-screen ${bg}`}>
				<Header user={user} />
				<div className={`${childClass}`}>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
