import React from "react";
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
  const timeRegex = /^(\d{1,2}):(\d{2})(am|pm)$/;
  // const formattedArrivalTime = arrivalTime.replace(timeRegex, '$1:$2 $3');
  return (
    <>
      <div
        onClick={onClick}
        className="bg-black flex-row lg:flex lg:px-8 px-3 py-5 mb-4 rounded-lg justify-between"
      >
        <div className="flex lg:w-4/5">
          <div className="w-1/2 lg:w-1/3">
            <h3 className="md:text-base h-14 lg:h-20 mr-8 lg:mr-0 text-lg text-primary-100 mb-2 ">
              {from}
            </h3>
            <div className="text-white ">
              <p className="text-gray-400 md:text-sm text-sm">Take Off Time</p>
              <p className="mt-1 md:text-xs text-xs">
                {takeOffTime.replace(timeRegex, "$1:$2 $3").toUpperCase()}
              </p>

              {/* <p>{takeOffDate}</p> */}
            </div>
          </div>

          <BsArrowRight className="lg:w-4 mt-1 lg:mr-14 mr-8 lg:mr-0 text-primary-100  md:top-2 top-0 left-10 md:left-10" />
          <div className="w-1/2 lg:w-1/3 ">
            <h3 className="md:text-base h-14 lg:h-20 text-lg text-primary-100 mb-2 ">
              {to}
            </h3>
            <div className="text-white ">
              <p className="text-gray-400  md:text-sm text-sm">
                Estimated Arrival Time
              </p>
              <p className="mt-1 md:text-xs text-xs">
                {arrivalTime.replace(timeRegex, "$1:$2 $3").toUpperCase()}
              </p>
              {/* <p>{arrivalDate}</p> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/5 mb-2 mt-6 lg:mt-0">
          <p className="text-gray-400 md:text-sm text-sm">Price</p>
          <p className="mt-1 text-primary-100 md:text-lg text-xl font-semibold mb-2 justify-between">
            NGN {price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")}
          </p>
          <div className="border-b border-gray-200 w-full lg:w-1/2 lg:border-r my-2 md:mr-0 mr-4 "></div>
          <Button
            title="Continue"
            className="w-full h-[48px] lg:h-[40px] p-3 mt-4 text-sm font-medium bg-[#00ff6a] hover:bg-[#58FF9E] hover:bg-[#58FF9E] rounded-lg "
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
};

export default BookingCard;
