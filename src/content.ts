import elementReady from 'element-ready';
import browser from 'webextension-polyfill';

async function toggleReddit(isNight: boolean) {
    const dropdown = await elementReady('#USER_DROPDOWN_ID');
    if (dropdown) {
        dropdown.click();
        const menu = await elementReady('[role="menu"]');
        const menuItems = menu?.children ? Array.from(menu?.children) : [];
        if (menuItems.length) {
            const header = menuItems.filter((e) => e.textContent === 'View Options')[0];
            if (header) {
                const nightModeSwitch = header.nextElementSibling as HTMLElement;
                const actualSwitch = nightModeSwitch.querySelector('[role="switch"]');
                const isNightModeEnabled = actualSwitch?.getAttribute('aria-checked') === 'true';

                // TODO: This is a hacky way to toggle the switch, but it works for now
                if ((isNight && !isNightModeEnabled) || (!isNight && isNightModeEnabled)) {
                    nightModeSwitch.click();
                }

                if ((isNight && isNightModeEnabled) || (!isNight && !isNightModeEnabled)) {
                    dropdown.click();
                }
            }
        }
    }
}

browser.runtime.onMessage.addListener((request) => {
    if (request.type === 'redditIsNight' && request.isEnabled) {
        toggleReddit(request.value);
    }
});
