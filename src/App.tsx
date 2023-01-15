import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import loadable from "@loadable/component";
import { _paths_ } from "./utils/appHelpers";
import LandingPage from "./pages/landingPage";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { getAllBusStopAction } from "./state/action/busStop.action";
import BookRide from "./pages/book-a-ride";

const SignIn = loadable(() => import("./pages/signin"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

const SignUp = loadable(() => import("./pages/signup"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

// const BookRide = loadable(() => import("./pages/book-a-ride"), {
// 	fallback: (
// 		<div
// 			style={{
// 				display: "flex",
// 				minWidth: 0,
// 				alignItems: "center",
// 				alignContent: "center",
// 				height: "100%",
// 			}}>
// 			<CircularProgress sx={{ m: "-40px auto 0" }} />
// 		</div>
// 	),
// });

const Checkout = loadable(() => import("./pages/checkout"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

const Booking = loadable(() => import("./pages/bookings"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

const TermsOfService = loadable(() => import("./pages/terms-of-service"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

const NotFound = loadable(() => import("./pages/404"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

const AdminPage = loadable(() => import("./pages/admin"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

const App = () => {
	return (
		<>
			<Routes>
				<Route path={_paths_.LANDING_PAGE} element={<LandingPage />} />
				<Route path={_paths_.AVAILABLE_TRIP} element={<Booking />} />
				<Route path={_paths_.TERMS_OF_SERVICE} element={<TermsOfService />} />
				<Route path={_paths_.SIGNIN} element={<SignIn />} />
				<Route path={_paths_.SIGNUP} element={<SignUp />} />
				<Route path={_paths_.BOOKRIDE} element={<BookRide />} />
				<Route path={_paths_.CHECKOUT} element={<Checkout />} />
				<Route path={_paths_.ADMIN_DASHBOARD} element={<AdminPage />} />
				<Route path={_paths_.NOTFOUND} element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
