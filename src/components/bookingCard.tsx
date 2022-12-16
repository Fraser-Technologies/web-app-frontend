import { BsArrowRight } from "react-icons/bs";
import { Button } from "./Button";

interface BookingCardInterface {
	from: string;
	to: string;
	takeOffTime: string;
	takeOffDate: string;
	price: string;
	arrivalTime: string;
	arrivalDate: string;
	onClick: () => void;
}

const BookingCard = ({
	from,
	to,
	takeOffDate,
	takeOffTime,
	price,
	arrivalDate,
	arrivalTime,
	onClick,
}: BookingCardInterface) => {
	return (
		<div className="flex justify-between px-3 py-5 bg-black rounded-lg lg:px-8 mb-[10px]">
			<div className="relative flex justify-between space-x-4 md:space-x-8">
				<div>
					<h3 className="mb-2 text-xs md:text-lg text-primary-100">{from}</h3>
					<div className="text-xs text-white md:text-sm">
						<p>{takeOffTime}</p>
						<p>{takeOffDate}</p>
					</div>
				</div>
				<BsArrowRight className="absolute top-0 text-primary-100 md:top-2 left-10 md:left-20" />
				<div>
					<h3 className="mb-2 text-xs md:text-lg text-primary-100">{to}</h3>
					<div className="text-xs text-white md:text-sm">
						<p>{arrivalTime}</p>
						<p>{arrivalDate}</p>
					</div>
				</div>
			</div>
			<div className="my-2 mr-2 border-r md:mr-0"></div>
			<div className="flex flex-col mb-2">
				<p className="mb-2 text-sm font-semibold text-primary-100 md:text-lg">
					NGN {price}
				</p>
				<Button
					title="Continue"
					onClick={onClick}
					className="px-2 py-1 text-sm text-black bg-primary-100 md:py-2 md:px-5"
				/>
			</div>
		</div>
	);
};

export default BookingCard;
