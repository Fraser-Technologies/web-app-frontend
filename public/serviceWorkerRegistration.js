if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("./sw.js")
			.then(function (registration) {
				console.log("Service Worker Registered", registration.scope);
			})
			.catch(function (err) {
				console.log("Service Worker Failed to Register", err);
			});
	});
}
