import React from 'react'
import SignIn from "./pages/signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/bookings";
import Checkout from "./pages/checkout";
import Signup from "./pages/signup";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/bookings" element={<Bookings />} />
				<Route path="/checkout" element={<Checkout />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App