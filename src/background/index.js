import * as storage from '../util/localStorage';
import * as settings from '../constants/settings';

import runTwitter from './twitter';

const URL_TWITTER = 'twitter.com';

chrome.tabs.onCreated.addListener(function(tab) {
	if (tab.url) {
		if (tab.url.includes(URL_TWITTER)) {
			runTwitter(tab);
		}
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.url) {
		if (changeInfo.url.includes(URL_TWITTER)) {
			runTwitter(tab);
		}
	}
});

browser.runtime.onInstalled.addListener(async ({ reason }) => {
	if (reason === 'install') {
		await storage.set(settings.TWITTER_ON, true);
	}
});
