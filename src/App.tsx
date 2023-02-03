import { getApp } from "./utils/route_helper";

const App = () => {
	const CurrentApp = getApp();

	return (
		<>
			<CurrentApp />
		</>
	);
};

export default App;
