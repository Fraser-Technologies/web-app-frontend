import { BsArrowRight } from "react-icons/bs";
import { FraserButton } from "./Button";

interface BookingCardInterface {
  from: string;
  to: string;
  takeOffTime: string;
  takeOffDate: string;
  price: number;
  arrivalTime: string;
  arrivalDate: string;
  onClick: () => void;
  fromBusStop: string;
  toBusStop: string;
  typeOfTrip?: string;
}

const BookingCard = ({
  from,
  to,
  takeOffDate,
  takeOffTime,
  price,
  arrivalDate,
  arrivalTime,
  fromBusStop,
  toBusStop,
  typeOfTrip,
  onClick,
}: BookingCardInterface) => {
  const timeRegex = /^(\d{1,2}):(\d{2})(am|pm)$/;

  return (
    <>
      <div
        onClick={onClick}
        className="flex-row justify-between px-3 py-5 mb-4 bg-black rounded-lg lg:flex lg:px-8"
      >
        <div className=" lg:w-4/5">
          <div className=" bg-[#CAFFC1] text-[#327531] border border-[#A4FF8D] rounded-md px-2 py-1 text-sm mb-4 w-fit">{typeOfTrip}</div>
          <div className="flex">
            <div className="w-1/2 lg:w-1/3">
              <div className="">
                <h3 className=" mr-8 text-lg md:text-base h-14 lg:h-20 lg:mr-0 text-primary-100 ">
                  {from}
                </h3>
                <h3 className="mt-[-30px] mr-8 text-[10px] md:text-[12px] h-14 lg:h-20 lg:mr-0 text-primary-100 ">
                  {fromBusStop}
                </h3>
              </div>
              <div className="text-white ">
                <p className="text-sm text-gray-400 md:text-sm">
                  Departure Date
                </p>
                <p className="mt-1 text-xs md:text-xs">{takeOffDate}</p>
              </div>
            </div>

            <BsArrowRight className="top-0 mt-1 mr-8 lg:w-4  lg:mr-0 text-primary-100 md:top-2 left-10 md:left-10" />
            <div className="w-1/2 lg:w-1/3 ">
              <div className="">
                <h3 className="ml-4 mr-8 text-lg md:text-base h-14 lg:h-20 lg:mr-0 text-primary-100 ">
                  {to}
                </h3>
                <h3 className="ml-4 mt-[-30px] mr-8 text-[10px] md:text-[12px] h-14 lg:h-20 lg:mr-0 text-primary-100 ">
                  {toBusStop}
                </h3>
              </div>
              <div className="text-white ">
                <p className="ml-4 text-sm text-gray-400 md:text-sm">
                  Take Off Time
                </p>
                <p className="ml-4 mt-1 text-xs md:text-xs">
                  {takeOffTime.replace(timeRegex, "$1:$2 $3").toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-6 mb-2 lg:w-1/4 lg:mt-0">
          <p className="text-sm text-gray-400 md:text-sm">Price</p>
          <p className="justify-between mt-1 mb-2 text-xl font-semibold text-primary-100 md:text-lg">
            ₦ {price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,") + ".00"}
          </p>
          <div className="w-full my-2 mr-4 border-b border-gray-200 lg:w-1/2 lg:border-r md:mr-0 "></div>
          <FraserButton title={"Continue"} size={"regular"} />
        </div>
      </div>
    </>
  );
};

export default BookingCard;
