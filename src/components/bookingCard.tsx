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
    <>
      <div className="bg-black flex lg:px-8 px-3 py-5 mb-4 rounded-lg justify-between">
        <div className="flex justify-between md:space-x-8 space-x-4 relative">
          <div className="w-1/2 ">
            <h3 className="md:text-base  mr-8 text-xs text-primary-100 mb-2">{from}</h3>
            <div className="text-white md:text-sm text-xs">
			<p>{takeOffTime}</p>
              <p>{takeOffDate}</p>
            </div>
          </div>

          <BsArrowRight className=" w-1/6 text-primary-100  md:top-2 top-0 left-10 md:left-10" />
          <div className="w-1/2">
            <h3 className="md:text-base text-base text-primary-100 mb-2">{to}</h3>
            <div className="text-white md:text-sm text-xs">
			<p>{arrivalTime}</p>
              <p>{arrivalDate}</p>
            </div>
          </div>
        </div>

        <div className="w-1/6 border-r my-2 md:mr-0 mr-2"></div>
        <div className="flex flex-col  mb-2">
          <p className="text-primary-100 md:text-lg text-sm font-semibold mb-2">
		  NGN {price}
          </p>
          <Button
            title="Continue"
            className="bg-primary-100 text-black text-sm md:py-2 py-1 md:px-5 px-2"
          />
        </div>
      </div>

	  
    </>
  );
};

export default BookingCard;