/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Navigation} from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import EmailScreen from './src/screens/Auth/Email';
import PasswordScreen from './src/screens/Auth/Password';
import AuthLoadingScreen from './src/screens/Auth/AuthLoading';
import ExploreScreen from './src/screens/Explore/Explore';
import TicketScreen from './src/screens/Ticket/Ticket';
import StubScreen from './src/screens/Stub/Stub';
import ProfileScreen from './src/screens/Profile/Profile';
import CheckoutScreen from './src/screens/Checkout/Checkout';
import PurchaseScreen from './src/screens/Purchase/Purchase';
import ConfirmationScreen from './src/screens/Confirmation/Confirmation';
import FilterScreen from './src/screens/Filter/Filter';
import SearchScreen from './src/screens/Search/Search';
import LocationScreen from './src/screens/Location/Location';
import ShareScreen from './src/screens/Share/Share';

import {MCCloseIcon} from './src/components/UITemplates/Icon/Icon';
import {Provider} from 'react-redux';
import ThemeContext, {themes} from 'passioo/theme/index';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens
Navigation.registerComponentWithRedux(
	'project.AuthScreen',
	() => AuthScreen,
	Provider,
	store,
);
Navigation.registerComponent('project.EmailScreen', () => EmailScreen);
Navigation.registerComponent('project.PasswordScreen', () => PasswordScreen);
Navigation.registerComponent(
	'project.AuthLoadingScreen',
	() => AuthLoadingScreen,
);
Navigation.registerComponentWithRedux(
	'project.ExploreScreen',
	() => ExploreScreen,
	Provider,
	store,
);
Navigation.registerComponentWithRedux(
	'project.TicketScreen',
	() => TicketScreen,
	Provider,
	store,
);
Navigation.registerComponentWithRedux(
	'project.StubScreen',
	() => StubScreen,
	Provider,
	store,
);
Navigation.registerComponentWithRedux(
	'project.ProfileScreen',
	() => ProfileScreen,
	Provider,
	store,
);

Navigation.registerComponentWithRedux(
	'project.SearchScreen',
	() => SearchScreen,
	Provider,
	store,
);

Navigation.registerComponent(
	'project.CheckoutScreen',
	() => props => (
		<Provider store={store}>
			<ThemeContext.Provider value={themes.gradient}>
				<CheckoutScreen {...props} />
			</ThemeContext.Provider>
		</Provider>
	),
	() => CheckoutScreen,
);

Navigation.registerComponentWithRedux(
	'project.PurchaseScreen',
	() => PurchaseScreen,
	Provider,
	store,
);

Navigation.registerComponentWithRedux(
	'project.ConfirmationScreen',
	() => ConfirmationScreen,
	Provider,
	store,
);

Navigation.registerComponentWithRedux(
	'project.FilterScreen',
	() => FilterScreen,
	Provider,
	store,
);
Navigation.registerComponentWithRedux(
	'project.LocationScreen',
	() => LocationScreen,
	Provider,
	store,
);
Navigation.registerComponent('project.ShareScreen', () => ShareScreen);

Navigation.registerComponent('project.MCCloseIcon', () => MCCloseIcon);

// Start an App

Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setDefaultOptions({
		statusBar: {
			style: 'light',
		},
		topBar: {
			drawBehind: true,
			background: {
				color: 'transparent',
			},
			backButton: {
				color: 'white',
			},
		},
	});
	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							name: 'project.AuthScreen',
							options: {
								backgroundImage: require('project/src/assets/bg/hero-image-bg-purple.png'),
							},
						},
					},
				],
			},
		},
	});
});
