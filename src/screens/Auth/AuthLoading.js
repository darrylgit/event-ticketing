import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import startTabs from 'project/src/screens/MainTabs/MainTabs';
import {withAPI} from 'passioo/api/index';

class AuthLoadingScreen extends Component {
	constructor(props) {
		super(props);

		const {doSignupWithEmailAndPassword} = this.props.api;

		this.doSignupWithEmailAndPassword = doSignupWithEmailAndPassword;
	}

	componentDidMount = () => this.fetchHandler();

	fetchHandler = () =>
		this.doSignupWithEmailAndPassword
			.then(response => response.json())
			.then(async responseJson => {
				console.log(responseJson);
				const access_token = ['@access_token', responseJson.tokens.access];
				const refresh_token = ['@refresh_token', responseJson.tokens.refresh];
				try {
					await AsyncStorage.multiSet([access_token, refresh_token]);
				} catch (error) {
					// Error saving data
				}
			})
			.then(() => {
				this.timeoutHandler = setTimeout(() => {
					startTabs();
				}, 1500);
			})
			.catch(error => {
				console.error(error);
			});

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator />
				<Text style={{marginTop: 20}}>WELCOME</Text>
			</View>
		);
	}
}

AuthLoadingScreen = withAPI(AuthLoadingScreen);

export default AuthLoadingScreen;
