import sundown from 'sundown';

import * as geolocation from './geolocation';

function isNowAfter(hour, min) {
	const now = new Date();
	const nowHour = now.getHours();
	const nowMin = now.getMinutes();

	// console.info('after: ', [hour, min]);
	// console.info('now: ', [nowHour, nowMin]);

	return nowHour > hour || (nowHour === hour && nowMin >= min);
}

export async function isNight() {
	const { coords } = await geolocation.getCurrentPosition();

	const sunCalc = sundown(new Date(), coords.latitude, coords.longitude);

	return (
		isNowAfter(sunCalc.sunrise.raw_time[0], sunCalc.sunrise.raw_time[1]) &&
		isNowAfter(sunCalc.sunset.raw_time[0], sunCalc.sunset.raw_time[1])
	);
}
