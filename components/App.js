import React, {Component} from 'react';
import {
	Navigator,
	View,
	Text,
} from 'react-native';
import clrs from '../utils/Clrs';

import PageMenu from './PageMenu';

import Home from './Home';
// import SetupLunch from './SetupLunch';
// import SearchPartner from './SearchPartner';
// import History from './History';
// import Rewards from './Rewards';
// import ExpressInvite from './ExpressInvite';

export default class PriceFinder extends Component {

	constructor(props) {
		super(props);
		this._setNavigatorRef = this._setNavigatorRef.bind(this);
	}

	renderScene(route, nav) {
		switch (route.id) {
			case 'home':
				return <PageMenu navigator={nav}><Home navigator={nav} /></PageMenu>;
			default:
				return <PageMenu navigator={nav}><Home navigator={nav} /></PageMenu>;
		}
	}

	componentWillUnmount() {
		this._listeners && this._listeners.forEach(listener => listener.remove());
	}

	_setNavigatorRef(navigator) {
		if (navigator !== this._navigator) {
			this._navigator = navigator;

			if (navigator) {
				var callback = (event) => {
					console.log(
						`NavigatorMenu: event ${event.type}`,
						{
							route: JSON.stringify(event.data.route),
							target: event.target,
							type: event.type,
						}
					);
				};
				// Observe focus change events from the owner.
				this._listeners = [
					navigator.navigationContext.addListener('willfocus', callback),
					navigator.navigationContext.addListener('didfocus', callback),
				];
			}
		}
	}
	
	render() {
		return (
			<Navigator
				ref={this._setNavigatorRef}
				initialRoute={{id: 'first'}}
				renderScene={this.renderScene}
				style={{backgroundColor: clrs.darkPrimaryColor}}
				configureScene={(route) => {
					if (route.sceneConfig) {
						return route.sceneConfig;
					}
					return Navigator.SceneConfigs.FloatFromBottom;
				}}
			/>
		);
	}
};