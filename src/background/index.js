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