import React, {Component} from 'react';
import {
	Animated,
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {setUserData} from 'project/src/store/actions/index';
import {withAPI} from 'passioo/api/index';
import AuthForm from 'project/src/components/UITemplates/Form/Form';
import startTabs from 'project/src/screens/MainTabs/MainTabs';

import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

class AuthScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signinEmailText: '',
			signinPasswordText: '',
			formErrSpringValue: new Animated.Value(1),
		};

		const {
			doSigninWithEmailAndPassword,
			doSetUserAccountInfo,
			doRetrieveUserAccountInfo,
			doRetrieveUserOrdersInfo,
		} = this.props.api;

		this.doSigninWithEmailAndPassword = doSigninWithEmailAndPassword;
		this.doSetUserAccountInfo = doSetUserAccountInfo;
		this.doRetrieveUserAccountInfo = doRetrieveUserAccountInfo;
		this.doRetrieveUserOrdersInfo = doRetrieveUserOrdersInfo;
	}

	fetchHandler = (email, password) => {
		this.doSigninWithEmailAndPassword(email, password)
			.then(
				res =>
					new Promise((resolve, reject) =>
						res.status === 200 ? resolve(res.json()) : reject(),
					),
			)
			.then(resJson => this.doSetUserAccountInfo(resJson))
			.then(() =>
				this.doRetrieveUserAccountInfo().then(user =>
					this.props.onSetUserData('user', JSON.parse(user)),
				),
			)
			.then(() =>
				this.doRetrieveUserOrdersInfo().then(orders =>
					this.props.onSetUserData('orders', JSON.parse(orders)),
				),
			)
			.then(() => startTabs())
			.catch(() => {
				this.timeoutHandler = setTimeout(() => {
					this.state.formErrSpringValue.setValue(1);
					Animated.spring(this.state.formErrSpringValue, {
						toValue: 1.01,
						speed: 45,
						bounciness: 25,
					}).start();
				}, 500);
			});
	};

	//fetchHandler = (email, password) => startTabs();

	signinHandler = () => {
		if (this.state.loginEmailText != '' && this.state.loginPasswordText != '') {
			this.fetchHandler(
				this.state.signinEmailText,
				this.state.signinPasswordText,
			);
		}
	};

	signupHandler = () => {
		Navigation.push(this.props.componentId, {
			component: {
				name: 'project.EmailScreen',
			},
		});
	};
	changeTextHandler = (key, value) => {
		this.setState({[key]: value});
	};
	render() {
		return (
			<View style={[flexstyles.flex]}>
				<View
					style={[
						flexstyles.flex,
						flexstyles.flexAlignCenter,
						flexstyles.flexGutter,
					]}>
					<View
						style={[
							flexstyles.flex3,
							flexstyles.flexAlignCenter,
							flexstyles.flexJustifyEnd,
						]}>
						<Image
							source={require('project/src/assets/brand/brand-logo.png')}
							resizeMode="contain"
							style={{width: 250, height: 70}}
						/>
						<Text
							style={[
								flexstyles.paddingVerticalSM,
								textstyles.textPrimary,
								textstyles.textSize16,
								textstyles.textLightSteelBlue,
							]}>
							Bring the Passion !
						</Text>
					</View>
					<View
						style={[
							flexstyles.flexGrow,
							flexstyles.flexWidthDeviceXS,
							flexstyles.flexGutterLG,
						]}>
						<AuthForm
							formErrSpringValue={this.state.formErrSpringValue}
							signinEmailText={this.state.signinEmailText}
							signinPasswordText={this.state.signinPasswordText}
							signinHandler={this.signinHandler}
							signupHandler={this.signupHandler}
							onChangeText={this.changeTextHandler}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSetUserData: (key, value) => dispatch(setUserData(key, value)),
	};
};

AuthScreen = withAPI(AuthScreen);

export default connect(
	null,
	mapDispatchToProps,
)(AuthScreen);
