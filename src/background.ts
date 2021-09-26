import browser from 'webextension-polyfill';
import * as storage from './util/localStorage';
import * as settings from './constants/settings';

import { handleTwitter } from './handlers/twitter';
import { handleReddit } from './handlers/reddit';

const URL_TWITTER = 'twitter.com';
const URL_REDDIT = 'reddit.com';

browser.tabs.onCreated.addListener(async (tab) => {
    if (tab.url) {
        if (tab.url.includes(URL_TWITTER)) {
            await handleTwitter(tab);
        }

        if (tab.url.includes(URL_REDDIT) && tab.id) {
            await handleReddit(tab);
        }
    }
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        if (changeInfo.url.includes(URL_TWITTER)) {
            await handleTwitter(tab);
        }

        if (changeInfo.url.includes(URL_REDDIT) && tabId) {
            await handleReddit(tab);
        }
    }
});

browser.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === 'install') {
        await storage.set(settings.TWITTER_ON, true);
        await storage.set(settings.REDDIT_ON, true);
    }
});
