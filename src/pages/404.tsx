import { useNavigate } from "react-router-dom";
import { FraserButton } from "../components/Button";
import AdminLayout from "../components/layouts/AdminLayout";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<AdminLayout title="Not found">
			<div className="flex flex-col items-center justify-center w-full h-full">
				<img
					src={"/120611-404-not-found.gif"}
					className="mt-20 w-96 h-96"
					alt="404"
				/>
				<h1 className="text-xl">Sorry! Page not found</h1>

				<FraserButton
					title={"Go Back"}
					size={"regular"}
					onClick={() => navigate(-1)}
				/>
			</div>
		</AdminLayout>
	);
};

export default NotFound;
