import React, {Component} from 'react';
import {
	Platform,
	Animated,
	View,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';

import DefaultInput from 'project/src/components/UITemplates/DefaultInput/DefaultInput';
import {HorizontalDoubleButton} from 'project/src/components/UITemplates/Button/Button';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Modal = props => {
	return (
		<Animated.View
			style={[
				props.modalContainerStyle,
				{
					display: props.visible,
					opacity: props.opacity,
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0,0,0, .2)',
				},
			]}>
			{props.hasBackdrop && (
				<TouchableOpacity
					onPress={props.backdropSelected}
					style={[{flex: 1}]}
				/>
			)}
			<Animated.View
				style={[
					{width: '100%', height: '100%'},
					colorstyles.BGWhite,
					props.modalStyle,
				]}>
				{props.dismissTopButton !== undefined && (
					<TouchableOpacity
						onPress={() => props.buttonSelected(props.action)}
						style={{
							width: '100%',
							height: 40,
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<Image
							source={require('project/src/assets/icons/arrow-dark-icon.png')}
							style={[{width: 30, height: 20}]}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				)}
				{props.children}
			</Animated.View>
		</Animated.View>
	);
};

export const Alert = props => {
	return (
		<Animated.View
			style={[
				flexstyles.flexJustifyCenter,
				flexstyles.flexAlignCenter,
				{
					display: props.visible,
					opacity: props.opacity,
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: '100%',
					backgroundColor: 'rgba(0,0,0, .4)',
				},
			]}>
			<View
				style={[
					{width: 300, height: 175, borderRadius: 10},
					colorstyles.BGLight,
				]}>
				<View
					style={[
						flexstyles.flex,
						flexstyles.flexJustifyCenter,
						flexstyles.flexAlignCenter,
					]}>
					<Text
						style={[
							textstyles.textSecondary,
							textstyles.textSize20,
							colorstyles.Dark,
						]}>
						{props.title}
					</Text>
				</View>
				<View style={[flexstyles.flex, flexstyles.flexAlignCenter]}>
					{props.prompt && props.secureInput ? (
						<DefaultInput
							inputContainerStyle={[{paddingHorizontal: 10}]}
							inputStyle={[
								{
									borderWidth: 1,
									borderColor: 'rgba(0,0,0,.1)',
									paddingHorizontal: 10,
								},
								colorstyles.BGWhite,
								colorstyles.Dark,
							]}
							secureTextEntry={true}
							onChange={props.onChange}
							onChangeText={props.onChangeText}
							value={props.value}
						/>
					) : (
						<DefaultInput
							inputContainerStyle={[{paddingHorizontal: 10}]}
							inputStyle={[
								{
									borderWidth: 1,
									borderColor: 'rgba(0,0,0,.1)',
									paddingHorizontal: 10,
								},
								colorstyles.BGWhite,
								colorstyles.Dark,
							]}
							secureTextEntry={false}
							onChange={props.onChange}
							onChangeText={props.onChangeText}
							value={props.value}
						/>
					)}
				</View>
				<View style={[flexstyles.flex, flexstyles.flexJustifyEnd]}>
					<HorizontalDoubleButton
						buttonSelected={props.buttonSelected}
						buttons={props.buttons}
						buttonWrapperStyle={[{backgroundColor: 'rgba(0,0,0,.2)'}]}
						buttonContainerStyle={[
							colorstyles.BGLight,
							{borderBottomRadius: 10},
						]}
						buttonStyle={[colorstyles.DjangoBlue]}
					/>
				</View>
			</View>
		</Animated.View>
	);
};

export default Modal;
