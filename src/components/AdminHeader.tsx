import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/redux-store";
import { logOut } from "../state/slices/user.slice";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state: RootState) => state.userLogin);

	return (
		<div className="fixed top-0 z-50 flex flex-col w-full h-auto ">
			<div className="flex items-center justify-between w-full px-4 py-3 bg-black md:px-16">
				<div className="flex md:px-[40px] px-[10px] justify-between items-center w-full py-[20px]">
					<h2 className="text-white">Fraser</h2>

					<div className="text-white flex flex-row">
						<p> {userInfo?.first_name}</p>

						{userInfo?._id && (
							<p
								className="ml-[30px]"
								onClick={() => {
									navigate("/");
									dispatch(logOut());
								}}>
								Logout
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminHeader;
