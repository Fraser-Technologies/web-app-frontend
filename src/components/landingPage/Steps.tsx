import "./Steps.css";
import { FaChevronRight } from "react-icons/fa";
import StepComp from "../landingPageComponents/Counter/StepComp";
import Button from "../landingPageComponents/Button/Button";

const Steps = () => {
	return (
		<>
			<div className="step-container">
				<div className="steps-content">
					<p className="step-overline">Traveling between cities?</p>
					<h3 className="step-title">Book a ride in three steps.</h3>

					<div className="step-body">
						<StepComp
							stepNumber="1"
							stepTitle="Sign up"
							stepSubtitle="This is easy – we only need a few details and then you can get started. It only takes a minute to fill in your details!"
						/>
						<StepComp
							stepNumber="2"
							stepTitle="Book a trip"
							stepSubtitle="Booking a bus ticket is easy. You can easily buy your tickets in advance and have them delivered straight to your smartphone - register via the mobile app or on the website!"
						/>
						<StepComp
							stepNumber="3"
							stepTitle="Ride"
							stepSubtitle="With fast connections you can travel in comfort. Buses are equipped with Wi-Fi so you can work, catch up on your favourite shows and have fun all on the move."
						/>
					</div>

					<Button
						buttonText="Get Started"
						className="button step-button"
						buttonIcon={<FaChevronRight />}
						onClick={function (): void {}}
					/>
				</div>
			</div>
		</>
	);
};

export default Steps;
