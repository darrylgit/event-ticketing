import React, {Component} from 'react';
import {View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ENDPOINTS from '../../constants/api';

import {InputForm} from '../../components/UITemplates/Form/Form';

import {
	flexstyles,
	textstyles,
	colorstyles,
} from '../../components/UITemplates/styles';

class EmailScreen extends Component {
	static options(passProps) {
		return {
			backgroundImage: require('../../assets/bg/bg-gradient.png'),
		};
	}
	constructor(props) {
		super(props);
		this.state = {
			signupEmailText: '',
		};
	}

	fetchValidateEmail = email => {
		params = {email: email};
		Object.keys(params).forEach(key =>
			ENDPOINTS.AUTH_CHECK.searchParams.append(key, params[key]),
		);
		return fetch(ENDPOINTS.AUTH_CHECK);
	};

	submitButtonSelectedHandler = () => {
		if (this.state.signupEmailText != '') {
			return this.fetchValidateEmail(this.state.signupEmailText)
				.then(response => {
					return (
						response.status !== 202 &&
						response.json().then(responseJson => Promise.reject(responseJson))
					);
				})
				.then(() =>
					Navigation.push(this.props.componentId, {
						component: {
							name: 'project.PasswordScreen',
							passProps: {
								signupEmailText: this.state.signupEmailText,
							},
						},
					}),
				)
				.catch(errorJson => alert(errorJson.email));
		}
	};
	render() {
		return (
			<View
				style={[
					flexstyles.flex5,
					flexstyles.flexGutter,
					flexstyles.flexAlignCenter,
					flexstyles.flexJustifyEnd,
				]}>
				<InputForm
					value={this.state.signupEmailText}
					onChangeText={text => this.setState({signupEmailText: text})}
					headerText="Email Address"
					footerText="We'll send you marketing promotions, special offers, and policy updates via email."
					buttonSelected={this.submitButtonSelectedHandler}
					buttonStyle={[colorstyles.BGWhite, {borderWidth: 0}]}
					buttonText="Next"
				/>
			</View>
		);
	}
}

export default EmailScreen;
