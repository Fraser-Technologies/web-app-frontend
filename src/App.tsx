import React from 'react'
import SignIn from "./pages/signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/bookings";
import Checkout from "./pages/checkout";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/Bookings" element={<Bookings />} />
				<Route path="/Checkout" element={<Checkout />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App