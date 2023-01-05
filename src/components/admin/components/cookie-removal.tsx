import Cookies from "js-cookie";
import React from "react";

const TripCookieRemoval = () => {
  Cookies.remove("tripID");
  Cookies.remove("startCity");
  Cookies.remove("startBusStop");
  Cookies.remove("destinationCity");
  Cookies.remove("destinationBusStop");
  Cookies.remove("date");
  Cookies.remove("time");
  Cookies.remove("driver");
  Cookies.remove("vehicle");
};

export default TripCookieRemoval;
