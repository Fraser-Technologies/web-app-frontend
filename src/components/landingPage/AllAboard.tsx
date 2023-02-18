import "./AllAboard.css";
import { FaChevronRight } from "react-icons/fa";
import Button from "../landingPageComponents/Button/Button";

const AllAboard = () => {
	return (
		<>
			<div className="allaboard-container">
				<div className="allaboard-content">
					<h3 className="allaboard-title">All aboard?</h3>
					<Button
						buttonText="Get Started"
						buttonIcon={<FaChevronRight />}
						className="button"
						onClick={function (): void {}}
					/>
				</div>
			</div>
		</>
	);
};

export default AllAboard;
