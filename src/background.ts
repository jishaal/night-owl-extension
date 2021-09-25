import * as storage from './util/localStorage';
import * as settings from './constants/settings';

import { handleTwitter } from './handlers/twitter';
import { handleReddit } from './handlers/reddit';

const URL_TWITTER = 'twitter.com';

chrome.tabs.onCreated.addListener(async (tab) => {
    if (tab.url) {
        if (tab.url.includes(URL_TWITTER)) {
            await handleTwitter(tab);
        }
    }
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        if (changeInfo.url.includes(URL_TWITTER)) {
            await handleTwitter(tab);
        }
    }
});

browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === 'install') {
        await storage.set(settings.TWITTER_ON, true);
    }
});

browser.runtime.onMessage.addListener((data, sender) => {
    if (data.type === 'handle_me') {
        return Promise.resolve('done');
    }
    return false;
});

browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.type === 'getRedditSetting') {
        const isNight = await handleReddit();
        return isNight;
    }
    return null;
});
