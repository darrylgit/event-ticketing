import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import RNNavigationBar, {
	NavigationBarHeight,
} from 'project/src/components/Native/NavigationBar/NavigationBar';
import RNStatusBar, {
	getStatusBarHeight,
} from 'project/src/components/Native/StatusBar/StatusBar';
import LinearGradient from 'react-native-linear-gradient';

const Theme = ({children, theme}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={{flex: 1}}>{children}</View>
			<View
				style={[
					{
						position: 'absolute',
						width: '100%',
						height: getStatusBarHeight() + NavigationBarHeight,
					},
				]}>
				<RNNavigationBar
					style={{
						position: 'absolute',
						top: getStatusBarHeight(),
						left: 0,
						right: 0,
						height: NavigationBarHeight,
					}}
					backgroundColor={theme.secondarycolor}
				/>
				<RNStatusBar
					backgroundColor={theme.primarycolor}
					barStyle="light-content"
				/>
			</View>
		</SafeAreaView>
	);
};

Theme.defaultProps = {
	theme: {
		primarycolor: 'rgba(255,255,255,0)',
		secondarycolor: 'rgba(255,255,255,0)',
	},
};

export const GradientTheme = ({children, theme}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<LinearGradient
				colors={['rgba(239, 47, 115, 0)', 'rgba(246, 124, 36, 0)']}
				start={{x: 0.4}}
				end={{x: 1}}
				style={[
					{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						height: theme.gradientheight,
					},
				]}
			/>
			<View style={{flex: 1}}>{children}</View>
			<RNTopBar backgroundColor="transparent" />
			<RNStatusBar backgroundColor="transparent" barStyle="light-content" />
		</SafeAreaView>
	);
};
export default Theme;
