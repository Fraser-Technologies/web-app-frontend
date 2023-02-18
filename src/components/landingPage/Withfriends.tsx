import "./Withfriends.css";
import FRIENDS from "./../../../images/withfriends.png";
import Accordion from "../landingPageComponents/Accordion/Accordion";

const Withfriends = () => {
	return (
		<>
			<div className="withfriends-container">
				<div className="withfriends-content">
					<img src={FRIENDS} className="withfriends-image" alt="" />
					<h3 className="withfriends-title">
						Ride with friends and enjoy multiple benefits
					</h3>
					<div className="accordion-container">
						<Accordion />
					</div>
				</div>
			</div>
		</>
	);
};

export default Withfriends;
