import * as settings from '../constants/settings';
import * as storage from '../util/localStorage';

import { isNight } from '../util/night';

export const handleReddit = async () => {
    // read jwt from local storage
    // if isNight and false, call to toggleNight
    if (await isNight()) {
        return true;
    } else {
        return false;
    }
};

// TODO: auto enable night-mode based on a set interval check
