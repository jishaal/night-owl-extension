import sundown from 'sundown';

const COOKIE_STRING = 'night_mode';
const URL = 'https://twitter.com/';
const DOMAIN = '.twitter.com';

export const getTwitterCookie = cb => {
	chrome.cookies.get(
		{
			url: URL,
			name: COOKIE_STRING
		},
		cb
	);
};

function reloadTab(tab) {
	chrome.tabs.reload(tab.id);
}

function enableNightMode(tab) {
	getTwitterCookie(cookie => {
		setNightMode(cookie, tab);
	});
}

function disableNightMode(tab) {
	getTwitterCookie(cookie => {
		removeNightMode(cookie, tab);
	});
}

function setNightMode(cookie, tab) {
	if (!cookie) {
		chrome.cookies.set({
			url: URL,
			domain: DOMAIN,
			name: COOKIE_STRING,
			value: '1'
		});

		reloadTab(tab);
		console.info('enabling night mode');
		return;
	}
	console.info('cookie found, night mode is already enabled');
}

function removeNightMode(cookie, tab) {
	if (cookie) {
		chrome.cookies.remove({
			url: URL,
			name: COOKIE_STRING
		});

		reloadTab(tab);
		console.info('disabling night mode');
		return;
	}
	console.info('cookie not found, night mode is already disabled');
}

export default function(tab) {
	navigator.geolocation.getCurrentPosition(
		pos => {
			const coords = pos.coords;
			const sunCalc = sundown(new Date(), coords.latitude, coords.longitude);

			if (
				isNowAfter(sunCalc.sunrise.raw_time[0], sunCalc.sunrise.raw_time[1]) &&
				!isNowAfter(sunCalc.sunset.raw_time[0], sunCalc.sunset.raw_time[1])
			) {
				console.info('it is day time, disabling night mode');
				disableNightMode(tab);
			} else {
				console.info('it is night time, enabling night mode');
				enableNightMode(tab);
			}
		},
		err => {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}
	);
}

function isNowAfter(hour, min) {
	const now = new Date();
	const nowHour = now.getHours();
	const nowMin = now.getMinutes();

	// console.info('after: ', [hour, min]);
	// console.info('now: ', [nowHour, nowMin]);

	return nowHour > hour || (nowHour === hour && nowMin >= min);
}

// TODO: extract sunrise calc to common utitly
// TODO: auto enable night-mode based on a set interval check
