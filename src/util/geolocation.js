export const asyncGetCurrentPosition = () => {
	const options = {
		timeout: 5000
	};
	return new Promise(function(resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
};
