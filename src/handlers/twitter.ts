import browser from 'webextension-polyfill';
import * as settings from '../constants/settings';
import * as storage from '../util/localStorage';
import { isNight } from '../util/night';

const COOKIE_STRING = 'night_mode';
const URL = 'https://twitter.com/';
const DOMAIN = '.twitter.com';

async function getTwitterCookie() {
    return browser.cookies.get({
        url: URL,
        name: COOKIE_STRING,
    });
}

function reloadTab(tab) {
    chrome.tabs.reload(tab.id);
}

async function enableNightMode(tab) {
    const cookie = await getTwitterCookie();

    if (!cookie || (cookie && cookie.value === '0')) {
        browser.cookies.set({
            url: URL,
            domain: DOMAIN,
            name: COOKIE_STRING,
            value: '1',
        });

        reloadTab(tab);
        console.info('enabling night mode');
        return;
    }

    console.info(`cookie found with value of ${cookie.value}, night mode is already enabled`);
}

async function disableNightMode(tab) {
    const cookie = await getTwitterCookie();

    // TODO: value of `2` is the darkest night mode, currently we reset back to `1` in enableNightMode
    // We could backup the user's selected mode and restore instead
    if (!cookie || (cookie && (cookie.value === '1' || cookie.value === '2'))) {
        browser.cookies.set({
            url: URL,
            domain: DOMAIN,
            name: COOKIE_STRING,
            value: '0',
        });

        reloadTab(tab);
        console.info('disabling night mode');
        return;
    }

    console.info(`cookie found with value of ${cookie.value}, night mode is already disabled`);
}

export const handleTwitter = async (tab) => {
    const isUserEnabled = await storage.get(settings.TWITTER_ON);

    if (isUserEnabled[settings.TWITTER_ON]) {
        if (await isNight()) {
            console.info('it is night time, attempting to enable night mode');
            enableNightMode(tab);
        } else {
            console.info('it is day time, attempting to disable night mode');
            disableNightMode(tab);
        }
    }
};

// TODO: auto enable night-mode based on a set interval check
