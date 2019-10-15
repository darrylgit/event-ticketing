import React, {Component} from 'react';
import {Animated, Platform, View, Text, TouchableOpacity} from 'react-native';

import {ExtendSingleInputModal} from '../Modal/Modal';
import Search from '../../Search/Search';
import flexstyles from '../Flex/styles';
import colorstyles from '../Color/styles';
import textstyles from '../Text/styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MCIcon} from 'project/src/components/UITemplates/Icon/Icon';

class Nav extends Component {
	render() {
		return (
			<View
				style={[
					{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
					},
				]}>
				<View //statusBar
					style={[
						{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							height: 20,
						},
					]}
				/>
				<View
					style={[
						colorstyles.BGWhite,
						this.props.navContainerStyle,
						{
							position: 'absolute',
							top: 20,
							left: 0,
							right: 0,
							height: Platform.OS !== 'ios' ? 54 : 64,
							flexDirection: 'row',
							alignItems: 'center',
							paddingHorizontal: 10,
						},
					]}>
					{this.props.leftButton !== undefined && (
						<View
							style={{
								minWidth: 44,
								alignItems: 'flex-start',
								left: -2,
							}}>
							<TouchableOpacity //simply a wrapper - add padding to icon to increase touchable area.
								activeOpacity={0.7}
								onPress={this.props.leftButtonSelected}>
								{this.props.leftButton.value !== undefined &&
								this.props.leftButton.value !== '' &&
								this.props.leftButton.type !== undefined &&
								this.props.leftButton.type === 'text' ? (
									<Text
										style={[
											textstyles.textPrimaryMedium,
											textstyles.textSize16,
											colorstyles.DjangoBlue,
											{padding: 4}, //same as icon for consistency
										]}>
										{this.props.leftButton.value}
									</Text>
								) : (
									this.props.leftButton.type === 'icon' && (
										<MCIcon name={this.props.leftButton.value} />
									)
								)}
							</TouchableOpacity>
						</View>
					)}
					<View style={{flexGrow: 1}}>
						{this.props.searchBar ? (
							<Search
								action="searchInputChanged"
								searchingFor={this.props.searchingFor}
								searchInput={this.props.searchInput}
								onChange={this.props.onChange}
								searchContainerStyle={[this.props.searchContainerStyle]}
								searchStyle={this.props.searchStyle}
								searchBarPlaceholder={this.props.searchBarPlaceholder}
								inputStyle={this.props.inputStyle}
							/>
						) : (
							<TouchableOpacity
								onPress={this.props.modalSelected}
								style={[
									flexstyles.flex,
									flexstyles.flexRow,
									flexstyles.flexJustifyCenter,
									flexstyles.flexAlignCenter,
								]}>
								<Text
									numberOfLines={1}
									style={[textstyles.textPrimary, textstyles.textSize18]}>
									{this.props.title}
								</Text>

								{this.props.chevronRotate && (
									<Animated.View
										style={{
											transform: [
												{
													rotate: this.props.chevronRotate.interpolate({
														inputRange: [0, 1],
														outputRange: ['0deg', '180deg'],
													}),
												},
											],
										}}>
										<EvilIcons
											name="chevron-down"
											size={38}
											color="rgba(0,0,0,.6)"
										/>
									</Animated.View>
								)}
							</TouchableOpacity>
						)}
					</View>
					{this.props.rightButton !== undefined && (
						<View
							style={{
								minWidth: 44,
								alignItems: 'flex-end',
								right: -2,
							}}>
							<TouchableOpacity //simply a wrapper - add padding to icon to increase touchable area.
								activeOpacity={0.7}
								onPress={this.props.rightButtonSelected}>
								{this.props.rightButton.value !== undefined &&
								this.props.rightButton.value !== '' &&
								this.props.rightButton.type !== undefined &&
								this.props.rightButton.type === 'text' ? (
									<Text
										style={[
											textstyles.textPrimaryMedium,
											textstyles.textSize16,
											colorstyles.DjangoBlue,
											{padding: 4}, //same as icon for consistency
										]}>
										Cancel
									</Text>
								) : (
									this.props.rightButton.type === 'icon' && (
										<MCIcon name={this.props.rightButton.value} />
									)
								)}
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		);
	}
}

export default Nav;
