import React from 'react'
import SignIn from "./pages/signin"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookings from "./pages/bookings";

const App = () => {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignIn />} />
				<Route path="/Bookings" element={<Bookings />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App