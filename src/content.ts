// This file is injected as a content script
console.log('Hello from content script!szzzzsss');
import elementReady from 'element-ready';

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

// TODO: flip this so background sends message to content script to allow tab changing
browser.runtime.sendMessage({ type: 'getRedditSetting' }).then((response) => {
    if (response !== null) {
        toggleReddit(response);
    }
});

// https://github.com/sindresorhus/element-ready
// click the button
// assert if on and do night mode logic
// there is a JWT in local storage USER that could also be read from
// if we want more progmattic logic checking rather than clicks
