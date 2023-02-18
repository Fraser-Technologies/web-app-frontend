import React from "react";
import Button from "../landingPageComponents/Button/Button";
import BG from "./../../../images/bg.png";
import "./Homepageheader.css";
// import FaArrowRight from "react-icons/fa";

const HomepageHeader = () => {
	return (
		<>
			<div className="homepageheader-container">
				<div className="image-container">
					<img src={BG} alt="" className="background-image" />
				</div>

				<div className="homepageheader-content">
					<div className="header-text">
						<div className="header-title"> Move freely between cities. </div>
						<div className="header-subtitle">
							{" "}
							Do you want to travel between cities comfortably, conveniently and
							affordably, use Fraser.
						</div>
						<div className="home-CTA-container">
							{/* <Button /> */}
							<Button
								buttonText="Book a ride"
								// buttonIcon={<FaArrowRight />}
								// icon="true"
								className="button"
								onClick={function (): void {}}
								buttonIcon={""}
							/>
							<Button
								buttonText="Partner with us"
								// icon="false"
								// buttonIcon={<FaArrowRight />}
								className="button"
								onClick={function (): void {}}
								buttonIcon={""}
							/>

							{/* <button className="button"> Partner with us </button> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomepageHeader;
