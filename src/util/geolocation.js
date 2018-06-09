export function getCurrentPosition(options) {
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}
