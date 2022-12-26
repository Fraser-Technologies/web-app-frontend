import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import Layout from "../components/layouts/SignInLayout";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Layout title="Not found">
			<div className="flex flex-col items-center justify-center w-full h-full">
				<img
					src={"/120611-404-not-found.gif"}
					className="mt-20 w-96 h-96"
					alt="404"
				/>
				<h1 className="text-xl">Sorry! Page not found</h1>

				<button
					className="px-4 py-2 mt-10 bg-green-500 outline-none hover:text-white hover:shadow-lg"
					onClick={() => navigate(-1)}>
					Go Back
				</button>
			</div>
		</Layout>
	);
};

export default NotFound;
