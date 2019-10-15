import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { InputForm }  from '../../components/UITemplates/Form/Form';

import { flexstyles, textstyles, colorstyles } from '../../components/UITemplates/styles';

//local components
import AuthLoadingScreen from './AuthLoading';

class PasswordScreen extends Component {
	static options(passProps){
		return {
			backgroundImage:require('../../assets/bg/bg-gradient.png')
		}
	}
	constructor(props){
		super(props);
		this.state = {
			signupPasswordText:'',
		}
	};

	submitButtonSelectedHandler = () => {
		if (this.state.signupPasswordText != ''){
			Navigation.push(this.props.componentId,{
				component:{
					name:'project.AuthLoadingScreen',
					passProps:{
						signupEmailText:this.props.signupEmailText,
						signupPasswordText:this.state.signupPasswordText
					},
					options:{
						layout:{
							backgroundColor:'white'
						}
					}
				}
			})
		}
	};
	render(){
		return(
			<View style={[flexstyles.flex5, flexstyles.flexGutter, flexstyles.flexAlignCenter, flexstyles.flexJustifyEnd]}>
				<InputForm
					value = {this.state.signupPasswordText}
					onChangeText = {(text) => this.setState({signupPasswordText:text})}
					headerText = 'Password'
					footerText = "Your password must include a symbol or number and be 6 or more characters long."
					buttonSelected = {this.submitButtonSelectedHandler}
					buttonText = "Sign Up"
					buttonStyle={[colorstyles.BGWhite, {borderWidth:0}]}
				/>
			</View>
		);
	}
}

export default PasswordScreen;

