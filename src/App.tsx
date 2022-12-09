import React from "react";
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./providers/AuthContext";
import { CircularProgress } from "@mui/material";
import { store } from "./redux/store";
import loadable from "@loadable/component";
import { _paths_ } from "./utils/appHelpers";

const SignIn = loadable(() => import("./pages/signin"), {
	fallback: (
		<div
			style={{
				display: "flex",
				minWidth: 0,
				alignItems: "center",
				alignContent: "center",
				height: "100%",
			}}
		>
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
			}}
		>
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
			}}
		>
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
			}}
		>
			<CircularProgress sx={{ m: "-40px auto 0" }} />
		</div>
	),
});

const App = () => {
	// let persistor = persistStore(store);
	return (
		<Provider store={store}>
			{/* <PersistGate loading={null} persistor={persistor}> */}
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path={_paths_.SIGNIN} element={<SignIn />} />
						<Route path={_paths_.SIGNUP} element={<SignUp />} />
						<Route path={_paths_.BOOKRIDE} element={<BookRide />} />
						<Route path={_paths_.CHECKOUT} element={<Checkout />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
			{/* </PersistGate> */}
		</Provider>
	);
};

export default App;
