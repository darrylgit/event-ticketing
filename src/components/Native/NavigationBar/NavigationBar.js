import React from 'react';
import PropTypes from 'prop-types';
import {
	NativeModules,
	requireNativeComponent,
	findNodeHandle,
} from 'react-native';

const NavigationBar = requireNativeComponent('RNNavigationBar', null);

class RNNavigationBar extends React.PureComponent {
	static propTypes = {
		barStyle: PropTypes.oneOf(['default', 'black']),
		barTintColor: PropTypes.string,
		tintColor: PropTypes.string,
		hideShadow: PropTypes.bool,
		showsBackButton: PropTypes.bool,
		onBackButtonPress: PropTypes.func,
	};

	static defaultProps = {
		barStyle: 'default',
		barTintColor: null,
		tintColor: null,
		hideShadow: true,
		showsBackButton: true,
		onBackButtonPress: () => null,
	};

	onBackButtonPress = () => {
		this.props.onBackButtonPress();
	};

	render() {
		return (
			<NavigationBar style={{height: NavigationBarHeight}} {...this.props} />
		);
	}
}

export const NavigationBarHeight =
	NativeModules.RNNavigationBarManager.ComponentHeight;
export default RNNavigationBar;
