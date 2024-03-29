import browser from 'webextension-polyfill';
import * as settings from '../constants/settings';
import { NightBrowserMessage } from '../types';
import * as storage from '../util/localStorage';
import { isNight } from '../util/night';

export const handleReddit = async (tab: browser.Tabs.Tab) => {
    const isNightValue = await isNight();
    const redditSetting = await storage.get(settings.REDDIT_ON);

    // TODO: there is a JWT in local storage USER that could also be read from
    // Use this to determine if the toggling is needed instead of having this logic
    // in the content script

    try {
        if (tab.id) {
            const msg: NightBrowserMessage = {
                type: 'redditIsNight',
                value: isNightValue,
                isUserEnabled: redditSetting[settings.REDDIT_ON],
            };

            await browser.tabs.sendMessage(tab.id, msg);
        }
    } catch (e) {
        // TODO: Figure out how to ensure content script is loaded before the event
        // is sent to avoid error when called from browser.tabs.onCreated
        console.log(e);
    }
};
