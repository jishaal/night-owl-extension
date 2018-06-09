import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getTwitterCookie } from './background/twitter';

import * as storage from './util/localStorage';
import * as settings from './constants/settings';

// TODO: show sunrise/sunset hours

class App extends Component {
	state = {
		isTwitterEnabled: false
	};

	setStateAsync(state) {
		return new Promise(resolve => {
			this.setState(state, resolve);
		});
	}

	async componentDidMount() {
		const twitterSetting = await storage.get(settings.TWITTER_ON);

		await this.setStateAsync({
			isTwitterEnabled: twitterSetting[settings.TWITTER_ON]
		});
	}

	handleTwitterChange = ({ target: { checked } }) => {
		storage.set(settings.TWITTER_ON, checked);

		this.setState(() => ({
			isTwitterEnabled: checked
		}));
	};

	render() {
		console.log(this.state.isTwitterEnabled);
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">Twitter: {this.state.isTwitterEnabled}</p>
				<input
					name="isTwitterEnabled"
					type="checkbox"
					checked={this.state.isTwitterEnabled}
					onChange={this.handleTwitterChange}
				/>
			</div>
		);
	}
}

export default App;
