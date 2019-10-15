import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ImageBackground,
	StyleSheet,
} from 'react-native';

import {ChoiceSelectorButtonStack} from '../UITemplates/Button/Button';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {listitemstyles, eventitemstyles} from './styles';

import {flexstyles, textstyles, colorstyles} from '../UITemplates/styles';

const Item = props => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => props.itemSelected(props.itemKey)}
			style={[
				flexstyles.flexRow,
				flexstyles.flexAlignCenter,
				{borderBottomWidth: 1, borderColor: 'rgba(0,0,0,.1)'},
				props.itemContainerStyle,
			]}>
			<View
				style={[
					flexstyles.flexRow,
					flexstyles.flexAlignCenter,
					props.itemStyle,
				]}>
				{props.selector ? (
					<EvilIcons
						name="chevron-right"
						size={28}
						color="#2f2536"
						style={[{position: 'absolute', left: -10}]}
					/>
				) : props.leftFAIcon !== undefined ? (
					props.leftFAIcon.name !== undefined &&
					props.leftFAIcon.name !== '' &&
					props.leftFAIcon.size !== undefined &&
					props.leftFAIcon.size !== '' &&
					props.leftFAIcon.color !== undefined &&
					props.leftFAIcon.color !== '' && (
						<FontAwesome
							name={props.leftFAIcon.name}
							size={props.leftFAIcon.size}
							color={props.leftFAIcon.color}
						/>
					)
				) : props.leftEIcon !== undefined ? (
					props.leftEIcon.name !== undefined &&
					props.leftEIcon.name !== '' &&
					props.leftEIcon.size !== undefined &&
					props.leftEIcon.size !== '' &&
					props.leftEIcon.color !== undefined &&
					props.leftEIcon.color !== '' && (
						<EvilIcons
							name={props.leftEIcon.name}
							size={props.leftEIcon.size}
							color={props.leftEIcon.color}
						/>
					)
				) : (
					props.leftMIcon !== undefined &&
					props.leftMIcon.name !== undefined &&
					props.leftMIcon.name !== '' &&
					props.leftMIcon.size !== undefined &&
					props.leftMIcon.size !== '' &&
					props.leftMIcon.color !== undefined &&
					props.leftMIcon.color !== '' && (
						<MaterialIcons
							name={props.leftMIcon.name}
							size={props.leftMIcon.size}
							color={props.leftMIcon.color}
						/>
					)
				)}

				<Text
					style={[
						textstyles.textPrimary,
						textstyles.textSize14,
						colorstyles.Dark,
						props.itemTextStyle,
					]}>
					{props.value}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export const ItemHorizontalStack = props => (
	<TouchableOpacity
		onPress={props.itemSelected}
		activeOpacity={0.9}
		style={[
			{width: '100%', height: 90},
			flexstyles.flexRow,
			flexstyles.flexAlignItemsCenter,
			colorstyles.BGLight,
			props.itemContainerStyle,
		]}>
		<View style={[flexstyles.flex2, {paddingHorizontal: 5}]}>
			<View
				style={[
					flexstyles.flex,
					flexstyles.flexHeight,
					flexstyles.flexJustifyEnd,
				]}>
				<Text
					style={[
						textstyles.textSecondary,
						textstyles.textSize12,
						{color: '#e92a4b'},
					]}>
					{props.header}
				</Text>
			</View>
			<View
				style={[
					flexstyles.flex2,
					flexstyles.flexHeight,
					flexstyles.flexJustifyCenter,
				]}>
				<Text
					numberOfLines={2}
					style={[
						textstyles.textSecondary,
						textstyles.textSize12,
						colorstyles.Dark,
					]}>
					{props.body}
				</Text>
			</View>
			<View
				style={[
					flexstyles.flex,
					flexstyles.flexHeight,
					flexstyles.flexJustifyTop,
				]}>
				<Text
					style={[
						textstyles.textSecondary,
						textstyles.textSize12,
						colorstyles.Purple,
					]}>
					{props.footer}
				</Text>
			</View>
		</View>
		<ImageBackground
			source={{uri: props.image}}
			resizeMode="cover"
			imageStyle={{borderRadius: 1}}
			style={[{width: (90 * 16) / 9, height: 90}]}
		/>
	</TouchableOpacity>
);

export default Item;
