import React from "react";
// import SignIn from "./pages/signin";
// import Checkout from "./pages/checkout";
// import Signup from "./pages/signup";
// import BookRide from "./pages/book-a-ride";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./providers/AuthContext";
import { CircularProgress } from "@mui/material";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import loadable from "@loadable/component";

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
	let persistor = persistStore(store);
	return (
		<Provider store={store}>
			{/* <PersistGate loading={null} persistor={persistor}> */}
				<BrowserRouter>
					<AuthProvider>
						<Routes>
							<Route path="/" element={<SignIn />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/book-a-ride" element={<BookRide />} />
							<Route path="/checkout" element={<Checkout />} />
						</Routes>
					</AuthProvider>
				</BrowserRouter>
			{/* </PersistGate> */}
		</Provider>
	);
};

export default App;
