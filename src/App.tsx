import React from 'react'
import SignIn from "./pages/signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./pages/checkout";
import Signup from "./pages/signup";
import BookRide from "./pages/book-a-ride";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/book-a-ride" element={<BookRide />} />
				<Route path="/checkout" element={<Checkout />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App