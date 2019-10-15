import React, {Component} from 'react';
import {Animated, View, Text, TextInput, TouchableOpacity} from 'react-native';

import DefaultInput, {
	DefaultTextInput,
	Input,
	InteractiveInput,
	CurrencyInput,
	IntegerInput,
} from 'project/src/components/UITemplates/DefaultInput/DefaultInput';
import RoundedButton, {
	FullWidthSubmitButton,
} from 'project/src/components/UITemplates/Button/Button';
import {SocialIcon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';
import inputstyles from '../DefaultInput/styles';

export const InputForm = props => {
	return (
		<View
			style={[
				flexstyles.flexWidthDeviceXS,
				inputstyles.formDimensionMD,
				flexstyles.flexAlignCenter,
			]}>
			<DefaultInput
				onChangeText={props.onChangeText}
				value={props.value}
				headerText={props.headerText}
				footerText={props.footerText}
				headerStyle={inputstyles.inputHeader}
				inputTextStyle={[
					textstyles.textSize18,
					colorstyles.White,
					{borderBottomWidth: 1, borderColor: 'rgba(255,255,255,.4)'},
				]}
			/>
			<RoundedButton
				buttonText={props.buttonText}
				buttonSelected={props.buttonSelected}
				buttonStyle={props.buttonStyle}
				buttonContainerStyle={[
					flexstyles.flex,
					flexstyles.flexJustifyEnd,
					flexstyles.flexAlignCenter,
				]}
			/>
		</View>
	);
};

export const MultilineForm = props => {
	return (
		<View style={[flexstyles.flex]}>
			<View style={[flexstyles.flex]}>
				<View
					style={[props.formStyle, {paddingHorizontal: 20, paddingTop: 10}]}>
					<DefaultTextInput
						multiline={true}
						onFocus={props.onFocus}
						placeholder={props.placeholder}
						value={props.value}
						onChangeText={props.onChangeText}
						onChange={event => props.onChange(event)}
						autoCapitalize={props.autoCapitalize}
						inputStyle={(props.inputStyle, {borderBottomWidth: 0})}
					/>
				</View>
			</View>
			{props.submitButton && (
				<FullWidthSubmitButton
					buttonSelected={() => props.buttonSelected(props.formId)}
					buttonText="Done"
					dark={props.dark}
					buttonTextStyle={props.buttonTextStyle}
				/>
			)}
		</View>
	);
};
export const TicketForm = props => {
	return (
		<View style={[flexstyles.flex]}>
			<View style={[flexstyles.flex]}>
				<View
					style={[props.formStyle, {paddingHorizontal: 20, paddingTop: 10}]}>
					<Input
						value={props.ticket}
						onChange={event => props.onChange('ticketName', event)}
						headerText="Name"
						headerStyle={props.headerStyle}
						inputStyle={props.inputStyle}
					/>
					<View style={[flexstyles.flexRow]}>
						<CurrencyInput
							value={props.quantity}
							onChange={event => props.onChange('ticketPrice', event)}
							headerText="Price"
							headerStyle={props.headerStyle}
							inputContainerStyle={{paddingRight: 10}}
						/>
						<IntegerInput
							value={props.quantity}
							onChange={event => props.onChange('ticketQuantity', event)}
							headerText="Quantity"
							headerStyle={props.headerStyle}
							inputContainerStyle={{paddingLeft: 10}}
						/>
					</View>
					<Input
						value={props.discount}
						onChange={event => props.onChange('ticketDiscount', event)}
						headerText="Discount Code"
						headerStyle={props.headerStyle}
						inputStyle={props.inputStyle}
					/>
				</View>
			</View>
			{props.submitButton && (
				<FullWidthSubmitButton
					buttonText="Add"
					dark={props.dark}
					buttonTextStyle={props.buttonTextStyle}
					buttonSelected={() => props.buttonSelected(props.formId)}
				/>
			)}
		</View>
	);
};

const AuthForm = props => {
	return (
		<View style={{flex: 1}}>
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Animated.View
					style={[
						{
							width: '100%',
							height: 200,
							transform: [{scale: props.formErrSpringValue}],
						},
					]}>
					<DefaultInput
						value={props.signinEmailText}
						onChangeText={text => props.onChangeText('signinEmailText', text)}
						headerText="Email"
						headerStyle={inputstyles.inputHeaderSM}
						inputTextStyle={[
							textstyles.textSize18,
							colorstyles.White,
							{borderBottomWidth: 1, borderColor: 'rgba(255,255,255,.4)'},
						]}
					/>
					<DefaultInput
						value={props.signinPasswordText}
						onChangeText={text =>
							props.onChangeText('signinPasswordText', text)
						}
						headerText="Password"
						headerStyle={inputstyles.inputHeaderSM}
						secureTextEntry={true}
						inputTextStyle={[
							textstyles.textSize18,
							colorstyles.White,
							{borderBottomWidth: 1, borderColor: 'rgba(255,255,255,.4)'},
						]}
					/>
				</Animated.View>
			</View>
			<View style={[flexstyles.flex, flexstyles.flexJustifyCenter]}>
				<View style={[flexstyles.flexWidth, flexstyles.flexAlignCenter]}>
					<TouchableOpacity
						onPress={props.signinHandler}
						style={{
							width: '100%',
							height: 40,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',

							borderRadius: 50,
							backgroundColor: 'rgba(255,255,255,1)',
							shadowColor: 'rgba(0,0,0,.6)', // IOS
							shadowOffset: {height: 1, width: 1}, // IOS
							shadowOpacity: 1, // IOS
							shadowRadius: 2, //IOS
							elevation: 4, // Android
						}}>
						<LinearGradient
							colors={['rgba(239, 47, 115, 1)', 'rgba(246, 124, 36, 1)']}
							start={{x: 0}}
							end={{x: 1}}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								borderRadius: 30,
							}}
						/>

						<Text
							style={{
								fontSize: 12,
								fontFamily: 'Open Sans',
								fontWeight: '700',
								color: 'rgba(255,255,255,.9)',
								textTransform: 'uppercase',
							}}>
							SIGN IN
						</Text>
					</TouchableOpacity>

					<SocialIcon
						title="CONTINUE WITH FACEBOOK"
						button
						type="facebook"
						fontStyle={{fontFamily: 'Open Sans', fontSize: 12, marginTop: -3}}
						iconStyle={{marginTop: -3}}
						iconSize={15}
						style={{height: 40, width: '100%'}}
					/>
					<TouchableOpacity onPress={props.signupHandler}>
						<Text style={{marginTop: 20, fontSize: 12, color: 'white'}}>
							Create an Account
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default AuthForm;
