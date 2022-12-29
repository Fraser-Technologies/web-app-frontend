import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "../Header";

interface Props {
	children: React.ReactNode;
	user?: string;
	bg?: string;
	childClass?: string;
	title?: string;
}

const Layout = ({ children, bg, childClass, title }: Props) => {
	return (
		<div className="overflow-hidden h-full font-sans">
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title || "Fraser"}</title>
			</Helmet>
			<div className={`h-full ${bg}`}>
				<Header />
				<div className="h-[70px]"></div>
				<div className={`${childClass}`}>{children}</div>
			</div>
		</div>
	);
};

export default Layout;
