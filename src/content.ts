// This file is injected as a content script
console.log('Hello from content script!');
import elementReady from 'element-ready';

function doClick(n) {
    let e = document.createEvent('MouseEvents');
    e.initEvent('mousedown', true, false);
    n.dispatchEvent(e, true);
    e = document.createEvent('MouseEvents');
    e.initEvent('mouseup', true, false);
    n.dispatchEvent(e, true);
}

async function openReddit() {
    const dropdown = await elementReady('#USER_DROPDOWN_ID');
    // const userDropDownNode = document.querySelector('#USER_DROPDOWN_ID');

    if (dropdown) {
        console.log(dropdown);
        console.log('clicking');
        doClick(dropdown);
    }

    // https://github.com/sindresorhus/element-ready
    // click the button
    // assert if on and do night mode logic
    // there is a JWT in local storage USER that could also be read from
    // if we want more progmattic logic checking rather than clicks

    // userDropDownNode.click();
}

openReddit();
