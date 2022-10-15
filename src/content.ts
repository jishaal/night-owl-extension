import elementReady from 'element-ready';
import browser from 'webextension-polyfill';
import { NightBrowserMessage } from './types';

console.log('content loaded');

async function toggleReddit(isNight: boolean) {
    const dropdown = await elementReady('#USER_DROPDOWN_ID');
    if (dropdown) {
        dropdown.click();
        const menu = await elementReady('[role="menu"]');
        const menuItems = menu?.children[0].children ? Array.from(menu?.children[0].children) : [];

        if (menuItems.length) {
            const viewOptionsHeader = menuItems.filter((e) => e.textContent === 'View Options')[0];
            if (viewOptionsHeader) {
                const darkModeContainer = viewOptionsHeader.nextElementSibling as HTMLElement;
                const darkModeSwitch = darkModeContainer.querySelector(
                    '[role="switch"]',
                ) as HTMLElement;

                // No switch if the user is not logged in
                if (!darkModeSwitch) {
                    dropdown.click();
                }

                const isRedditDarkModeEnabled =
                    darkModeSwitch?.getAttribute('aria-checked') === 'true';

                // TODO: This is a hacky way to toggle the switch, but it works for now
                if (
                    (isNight && !isRedditDarkModeEnabled) ||
                    (!isNight && isRedditDarkModeEnabled)
                ) {
                    darkModeSwitch.click();
                    dropdown.click();
                } else {
                    dropdown.click();
                }
            } else {
                // User isn't logged in, close the dropdown
                dropdown.click();
            }
        }
    }
}

browser.runtime.onMessage.addListener((request: NightBrowserMessage) => {
    if (request.type === 'redditIsNight' && request.isUserEnabled) {
        toggleReddit(request.value);
    }
});
