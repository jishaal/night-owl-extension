// This file is ran as a background script
console.log('Hello from background script! 2');

import * as storage from './util/localStorage';
import * as settings from './constants/settings';

import handleTwitter from './handlers/twitter';

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
