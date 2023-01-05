import React from "react";
import LeftSidebar from "../components/admin/SideBar";
import RightSidebar from "../components/admin/Notifications";
import Layout from "../components/layouts/SignInLayout";
import MiddleSection from "../components/admin/MiddleSection";

const AdminDashBoard = () => {
	return (
		<Layout title="Checkout - Fraser">
			<div className="grid grid-cols-6 bg-white">
				<LeftSidebar />
				<MiddleSection />
				<RightSidebar />
			</div>
		</Layout>
	);
};

export default AdminDashBoard;
