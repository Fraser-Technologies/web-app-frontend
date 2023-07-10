import React, { FC, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/404";
import BookRide from "../pages/user-pages/book-a-ride";
// import LandingPage from "../pages/landingPage";
import SignIn from "../pages/user-pages/signin";
import TermsOfService from "../pages/user-pages/terms-of-service";
// import Waitlist from "../pages/Waitlist";
import Bookings from "../pages/user-pages/bookings";
import Checkout from "../pages/user-pages/checkout";
import SignUp from "../pages/user-pages/signup";
import { _paths_ } from "../utils/routes";
import LandingPage from "../pages/landingPage";
import { checkForTest } from "../utils/route_helper";
import { changeAppStateAction } from "../state/action/app.action";
import { useAppDispatch } from "../state/hooks";
import AiesecPage from "../pages/user-pages/aisecpage";

const UserApp: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checkForTest() === "test") {
      dispatch(changeAppStateAction("development"));
    } else {
      dispatch(changeAppStateAction("production"));
    }
  }, [dispatch]);

  return (
    <Routes>
      {/* <Route path={_paths_.LANDING_PAGE} element={<LandingPage />} /> */}
      <Route path={_paths_.LANDING_PAGE} element={<BookRide />} />
      <Route path={_paths_.NYSC_PAGE} element={<AiesecPage />} />
      <Route path={_paths_.AVAILABLE_TRIP} element={<Bookings />} />
      <Route path={_paths_.TERMS_OF_SERVICE} element={<TermsOfService />} />
      <Route path={_paths_.SIGNIN} element={<SignIn />} />
      <Route path={_paths_.SIGNUP} element={<SignUp />} />
      <Route path={_paths_.BOOKRIDE} element={<BookRide />} />
      <Route path={_paths_.CHECKOUT} element={<Checkout />} />
      <Route path={_paths_.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
};

export default UserApp;
