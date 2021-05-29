import React, { Component } from 'react';

import ToggleSwitch from './components/Toggle/';

import * as storage from './util/localStorage';
import * as settings from './constants/settings';

import './App.css';

// TODO: show sunrise/sunset hours

class App extends Component {
	state = {
		isTwitterEnabled: false,
	};

	setStateAsync(state) {
		return new Promise((resolve) => {
			// @ts-ignore
			this.setState(state, resolve);
		});
	}

	async componentDidMount() {
		const twitterSetting = await storage.get(settings.TWITTER_ON);

		console.log(twitterSetting);

		await this.setStateAsync({
			isTwitterEnabled: twitterSetting[settings.TWITTER_ON],
		});
	}

	handleTwitterChange = ({ target: { checked } }) => {
		storage.set(settings.TWITTER_ON, checked);

		this.setState(() => ({
			isTwitterEnabled: checked,
		}));
	};

	render() {
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
								isOn={this.state.isTwitterEnabled}
								onChange={this.handleTwitterChange}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
