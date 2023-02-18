import React from "react";
import "./offeringcard.css";

const Offeringcard = ({
	title,
	subtitle,
	image_url,
}: {
	title: string;
	subtitle: string;
	image_url: string;
}) => {
	return (
		<>
			<div className="offeringcard-container">
				<div className="offeringcard-content">
					<img src={image_url} alt="" className="card-image" />
					<h3 className="offeringcard-title"> {title}</h3>
					<p className="offeringcard-subtitle">{subtitle}</p>
				</div>
			</div>
		</>
	);
};

export default Offeringcard;
