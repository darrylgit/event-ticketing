import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {STATUSBAR_HEIGHT} from 'project/src/components/UITemplates/StatusBar/StatusBar';
export const TOPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const RNTopBar = ({backgroundColor, ...props}) => (
	<View
		style={[
			{
				position: 'absolute',
				height: TOPBAR_HEIGHT,
				top: STATUSBAR_HEIGHT,
				left: 0,
				right: 0,
			},
			{backgroundColor},
		]}
	/>
);

export default RNTopBar;
