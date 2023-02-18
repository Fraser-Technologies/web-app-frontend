import Offeringcard from "../landingPageComponents/Homecard/offeringcard";
import CARDIMAGE from "./../../../images/card-image.png";
import "./Offering.css";

const Offering = () => {
	return (
		<>
			<div className="offering-container">
				<div className="offering-content">
					<h2 className="offering-header">
						We offer intercity bus trips that are
					</h2>
					<div className="offering-card-container">
						<Offeringcard
							title="Safe"
							subtitle="Lorem ipsum dolor sit amet consectetur. Erat egestas suspendisse
            sodales amet phasellus aliquet pulvinar morbi malesuada. Pretium
            elit at integer eget arcu diam id. Et risus diam fames nulla at
            faucibus."
							image_url={CARDIMAGE}
						/>
						<Offeringcard
							title="Comfy"
							subtitle="Our mission is to offer you an affordable and easy way of traveling, without compromising on quality. On board our buses you always have a guaranteed seat, assigned for free when you book your ticket. Additionally, you get to enjoy free Wi-Fi and our Entertainment portal."
							image_url={CARDIMAGE}
						/>
						<Offeringcard
							title="Affordable"
							subtitle="Traveling with Fraser is  affordable. We are ready to take you to your next destination. Get guaranteed seats for as low as NGN 1,000.

              At our core, we are deeply committed to finding new ways to make your trip  affordable, you never have to break the bank to get the comfort you deserve."
							image_url={CARDIMAGE}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Offering;
