import sundown from 'sundown';

import { asyncGetCurrentPosition } from './geolocation';

function isNowAfter(hour, min) {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMin = now.getMinutes();

    console.info('after: ', [hour, min]);
    console.info('now: ', [nowHour, nowMin]);

    return nowHour > hour || (nowHour === hour && nowMin >= min);
}

export async function isNight() {
    try {
        // @ts-ignore
        const { coords } = await asyncGetCurrentPosition();
        const sunCalc = sundown(new Date(), coords.latitude, coords.longitude);

        return (
            !isNowAfter(sunCalc.sunrise.raw_time[0], sunCalc.sunrise.raw_time[1]) ||
            isNowAfter(sunCalc.sunset.raw_time[0], sunCalc.sunset.raw_time[1])
        );
    } catch (e) {
        console.error('Error getting night status, this most likely means location is disabled');

        throw new Error('Error in night.ts');
    }
}
