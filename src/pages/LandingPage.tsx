import AllAboard from "../components/landingPage/AllAboard";
import HomepageHeader from "../components/landingPage/HomepageHeader";
import Offering from "../components/landingPage/Offering";
import Steps from "../components/landingPage/Steps";
import Withfriends from "../components/landingPage/Withfriends";
import NavBar from "../components/landingPageComponents/Navbar/NavBar";
import "./App.css";

function App() {
	return (
		<>
			<NavBar />
			<HomepageHeader />
			<Offering />
			<Steps />
			<Withfriends />
			<AllAboard />
		</>
	);
}

export default App;
