import React, {Component} from 'react';
import {View, StatusBar, Platform} from 'react-native';

export const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const RNStatusBar = ({backgroundColor, ...props}) => (
	<View
		style={[
			{
				height: STATUSBAR_HEIGHT,
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
			},
			{backgroundColor},
		]}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</View>
);

export default RNStatusBar;
