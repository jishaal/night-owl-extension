import React, { useState, useEffect } from 'react';

import ToggleSwitch from './components/Toggle/';

import * as storage from './util/localStorage';
import * as settings from './constants/settings';

import './App.css';

export default function App() {
    const [isTwitterEnabled, setIsTwitterEnabled] = useState(false);

    useEffect(() => {
        getTwitterSetting();
    }, []);

    const getTwitterSetting = async () => {
        const twitterSetting = await storage.get(settings.TWITTER_ON);
        setIsTwitterEnabled(twitterSetting[settings.TWITTER_ON]);
    };

    const handleTwitterChange = ({ target: { checked } }) => {
        storage.set(settings.TWITTER_ON, checked);
        setIsTwitterEnabled(checked);
    };

    return (
        <div className="owl">
            <header className="owl-header">
                <h1 className="owl-title">
                    <span role="img">🌙</span> Settings
                </h1>
            </header>
            <div className="owl-settings">
                <div className="settings-item">
                    <span className="settings-item-title">
                        <span role="img">🦉</span> Twitter
                    </span>
                    <div className="settings-toggle">
                        <ToggleSwitch
                            name="twitter"
                            isOn={isTwitterEnabled}
                            onChange={handleTwitterChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
