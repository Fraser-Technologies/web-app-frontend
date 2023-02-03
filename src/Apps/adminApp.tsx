import { message } from "antd";
import { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "../pages/404";
import AdminDashBoard from "../pages/admin";
import { useAppSelector } from "../state/hooks";
import { RootState } from "../state/redux-store";
import { _paths_ } from "../utils/appHelpers";

const AdminApp: FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const { userInfo } = useAppSelector((state: RootState) => state.userLogin);

	useEffect(() => {
		if (!userInfo?.is_admin) {
			navigate(_paths_.NOTFOUND);
			messageApi.info(
				"Sorry! you cannot access this route, because you are not an admin at fraser!"
			);
		}
	}, [messageApi, navigate, userInfo]);
	return (
		<div>
			{contextHolder}
			<Routes>
				<Route path={_paths_.ADMIN_DASHBOARD} element={<AdminDashBoard />} />
				<Route path={_paths_.NOTFOUND} element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default AdminApp;
