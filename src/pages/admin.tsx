import React from "react";
import LeftSidebar from "../components/admin/SideBar";
import RightSidebar from "../components/admin/Notifications";
import Layout from "../components/layouts/SignInLayout";
import { Alert, message } from "antd";
import MiddleSection from "../components/admin/MiddleSection";

const AdminDashBoard = () => {
	const [messageApi, contextHolder] = message.useMessage();

	return (
		<Layout title="Checkout - Fraser">
			{contextHolder}
			<div className="grid grid-cols-6 bg-white">
				<LeftSidebar />
				<MiddleSection />
				<RightSidebar />
			</div>
		</Layout>
	);
};

export default AdminDashBoard;
