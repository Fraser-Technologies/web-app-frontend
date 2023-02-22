import React from "react";
import { Helmet } from "react-helmet";
import DriverHeader from "../driver/DriverHeader";

interface Props {
	children: React.ReactNode;
	user?: string;
	bg?: string;
	childClass?: string;
	title?: string;
}

const DriverLayout = ({ children, title, childClass, bg }: Props) => {
	return (
		<div className="overflow-hidden h-full font-sans">
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title || "Fraser"}</title>
			</Helmet>
			<div className={`h-full ${bg}`}>
				<DriverHeader />
				<div className="h-[70px]"></div>
				<div className={`${childClass}`}>{children}</div>
			</div>
		</div>
	);
};

export default DriverLayout;
