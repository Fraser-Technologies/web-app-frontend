import React, { useEffect } from "react";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { AuthProvider } from "./providers/AuthContext";
import { CircularProgress } from "@mui/material";
import loadable from "@loadable/component";
import { _paths_ } from "./utils/appHelpers";
import LandingPage from "./pages/landingPage";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { getAllBusStop } from "./state/action/bus.action";

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
const BookRide = loadable(() => import("./pages/book-a-ride"), {
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

const App = () => {
	// let persistor = persistStore(store);
	const dispatch = useAppDispatch();
	const { busStops } = useAppSelector((state: any) => state.allBusStop);

	useEffect(() => {
		if (!busStops?.length) {
			dispatch(getAllBusStop());
		}
	}, [busStops?.length, dispatch]);

	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path={_paths_.LANDING_PAGE} element={<LandingPage />} />
					<Route path={_paths_.AVAILABLE_TRIP} element={<Booking />} />
					<Route path={_paths_.SIGNIN} element={<SignIn />} />
					<Route path={_paths_.SIGNUP} element={<SignUp />} />
					<Route path={_paths_.BOOKRIDE} element={<BookRide />} />
					<Route path={_paths_.CHECKOUT} element={<Checkout />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
