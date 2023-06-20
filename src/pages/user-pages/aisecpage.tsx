import React, { useState } from "react";
import Layout from "../../components/layouts/SignInLayout";
import { FaCaretDown, FaChevronRight } from "react-icons/fa";
import { FraserButton } from "../../components/Button";
import allState from "../../utils/allState";
import BookingCard from "../../components/bookingCard";

const AiesecPage = () => {
  const [isOpen, setisOpen] = useState(false);
  const [pickUp, setpickUp] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  return (
    <Layout
      title="Book Intercity Bus Rides in Nigeria with Fraser | RideFraser.com"
      pageDescription="Find the best intercity bus transportation options in Nigeria with Fraser. Book your ride today on RideFraser.com and travel in comfort and style."
      pageKeywords="Fraser, intercity bus, Nigeria, ride booking, transportation, travel, comfort, style, RideFraser.com, intercity bus transportation, Nigeria, book bus rides, affordable bus tickets, comfortable bus rides, RideFraser"
    >
      <div className="bg-black h-screen w-full text-white px-[64px]">
        <div className="w-2/5 leading-[1.2] pt-40 text-[40px] tracking-tight">
          Get the best deals to get you to camp
        </div>

        <div className="w-full bg-white p-8 mt-12 rounded-md text-black">
          <div className="leading-snug text-[18px] font-medium mb-6">
            Where were you posted?
          </div>
          <div className={`${stateFilter !== "" && "mb-8"} flex`}>
            <div className="relative z-30 w-full text-left duration-300 ease-in-out lg:mb-0">
              <input
                type="text"
                className="inline-flex h-12 items-center w-full h-[48px] px-2 py-2 mb-2 leading-5 text-gray-700 bg-white border border-gray-300 rounded-[4px] shadow-sm justify-left focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                placeholder="State"
                onClick={() => setisOpen(!isOpen)}
                onChange={(e) => {
                  setStateFilter(e.target.value);
                }}
                value={stateFilter}
              />

              {isOpen && (
                <div className={`absolute w-full py-4 mt-2 bg-white rounded-md shadow-xs shadow-lg overflow-y-scroll ${stateFilter === "" && "h-80"}`}>
                  {allState
                    ?.filter((e) =>
                      e.toLowerCase().includes(stateFilter.toLowerCase())
                    )
                    .map((e: any) => {
                      return (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a
                          key={e}
                          href="#"
                          className="inline-block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          onClick={() => {
                            setStateFilter(e);
                            setisOpen(false);
                          }}
                        >
                          {e}
                        </a>
                      );
                    })}
                </div>
              )}
            </div>
            {/* <FraserButton
              title={"Proceed"}
              size={"regular"}
              icon={<FaChevronRight />}
              iconposition="right"
            /> */}
          </div>
          {stateFilter !== "" && (
            <BookingCard
              from={"Oyo"}
              to={stateFilter}
              takeOffTime={""}
              takeOffDate={""}
              price={0}
              arrivalTime={""}
              arrivalDate={""}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AiesecPage;
