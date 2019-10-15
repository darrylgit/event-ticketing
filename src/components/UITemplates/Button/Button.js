import React from 'react';
import {Dimensions, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
	MCIcon,
	EIIcon,
	FAIcon,
} from 'project/src/components/UITemplates/Icon/Icon';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

const RoundedButton = props => {
	return (
		<View
			style={[
				{width: '100%', alignItems: 'center', justifyContent: 'center'},
				props.buttonContainerStyle,
			]}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => props.buttonSelected(props.id, props.action)}
				style={[
					{
						height: 40,
						width: 320,
						alignItems: 'center',
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: 'rgba(0,0,0,.7)',
						borderRadius: 50,
					},
					props.buttonStyle,
				]}>
				{props.gradient && (
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
				)}
				<Text
					style={[
						textstyles.textPrimarySemiBold,
						textstyles.textSize12,
						textstyles.textUpper,
						{color: 'red'},
						props.buttonTextStyle,
					]}>
					{props.buttonText}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export const SingleRoundButtonStack = props => {
	return (
		<View style={[props.buttonWrapperStyle]}>
			{props.header && (
				<View style={[{paddingVertical: 5}, props.headerContainerStyle]}>
					<Text
						style={[
							textstyles.textSecondaryMedium,
							textstyles.textSize12,
							textstyles.textUpper,
							colorstyles.Dark,
							props.headerTextStyle,
						]}>
						{props.header}
					</Text>
				</View>
			)}
			<View
				style={[
					{
						height: 40,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					},
					props.buttonContainerStyle,
				]}>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => props.buttonSelected(props.buttonId, props.action)}
					style={[
						{
							height: '100%',
							width: '100%',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						},

						props.buttonStyle,
					]}>
					{props.leftFAIcon && (
						<View
							style={[
								{flex: 0.333333},
								flexstyles.flexAlignCenter,
								props.leftIconContainerStyle,
							]}>
							<FAIcon
								name={props.leftIconName}
								size={props.leftIconSize}
								color="rgba(0,0,0,.5)"
							/>
						</View>
					)}
					<View
						style={[
							flexstyles.flex,
							flexstyles.flexAlignCenter,
							props.buttonTextContainerStyle,
						]}>
						{props.replaceTextWithIcon ? (
							props.FAIcon ? (
								<FAIcon
									name={props.FAIcon['name']}
									size={props.FAIcon['size']}
									color={props.FAIcon['color']}
								/>
							) : props.SLIcon ? (
								<SimpleLineIcons
									name={props.SLIcon['name']}
									size={props.SLIcon['size']}
									color={props.SLIcon['color']}
								/>
							) : (
								<MaterialIcons
									name={props.MIcon['name']}
									size={props.MIcon['size']}
									color={props.MIcon['color']}
								/>
							)
						) : (
							<Text
								style={[
									textstyles.textPrimary,
									textstyles.textSize12,
									textstyles.textUpper,
									colorstyles.Dark,
									props.buttonTextStyle,
								]}>
								{props.buttonText}
							</Text>
						)}
					</View>
					{props.rightFAIcon && (
						<View
							style={[
								{flex: 0.333333},
								flexstyles.flexAlignCenter,
								props.rightIconContainerStyle,
							]}>
							<FAIcon
								name={props.rightIconName}
								size={props.rightIconSize}
								color="rgba(0,0,0,.5)"
							/>
						</View>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const FullWidthSubmitButton = props => {
	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={props.buttonSelected}
			style={[
				flexstyles.flexRow,
				{height: 50},
				colorstyles.BGDjangoBlue,
				props.buttonContainerStyle,
			]}>
			<View
				style={[
					flexstyles.flex,
					flexstyles.flexJustifyCenter,
					flexstyles.flexAlignCenter,
					props.buttonStyle,
				]}>
				<Text
					style={[
						textstyles.textPrimary,
						textstyles.textUpper,
						textstyles.textSize16,
						props.buttonTextStyle
							? (props.buttonTextStyle['textTransform'] &&
									props.linkStyle['textTransform'] == 'capitalize') ||
							  (props.buttonTextStyle['textTransform'] &&
									props.linkStyle['textTransform'] == 'none')
								? (props.buttonTextStyle['fontSize'] =
										textstyles.textSize16.fontSize)
								: (props.buttonTextStyle['fontSize'] =
										textstyles.textSize14.fontSize)
							: '',
						props.dark ? colorstyles.White : '',
						props.buttonTextStyle,
					]}>
					{props.buttonText}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export const RoundedButtonStack = props => {
	return (
		<View style={{flex: 1, justifyContent: 'center'}}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={props.buttonSelected}
				style={{
					width: 130,
					height: 40,
					justifyContent: 'center',
					alignItems: 'center',
					borderWidth: 1,
					borderColor: 'rgba(255,255,255,.9)',
					borderTopLeftRadius: 50,
					borderTopRightRadius: 50,
					borderBottomLeftRadius: 50,
					borderBottomRightRadius: 50,
				}}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<View
						style={{
							paddingHorizontal: 5,
						}}>
						<FAIcon {...props.FAIcon} />
					</View>
					<View
						style={{
							paddingHorizontal: 5,
						}}>
						<Text
							style={{
								fontFamily: 'Montserrat',
								fontSize: 14,
								textTransform: 'uppercase',
								color: 'rgba(255,255,255,1)',
							}}>
							{props.value}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export const ScreenLinkEIButtonStack = props => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={event => props.buttonSelected(props.buttonId, event)}
			style={[{flexDirection: 'row'}, props.buttonContainerStyle]}>
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View
					style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
					<EIIcon {...props.leftEIcon} />
				</View>
				<View
					style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
					<Text
						style={[
							textstyles.textPrimary,
							textstyles.textUpper,
							textstyles.textSize16,
						]}>
						{props.linkText}
					</Text>
				</View>
				<View style={{flex: 0.1}}>
					<MCIcon name="chevron-right" size={28} color="rgba(0,0,0,.25)" />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export const ScreenLinkFAButtonStack = props => {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={event => props.buttonSelected(props.buttonId, event)}
			style={[{flexDirection: 'row'}, props.buttonContainerStyle]}>
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View
					style={{flex: 0.1, alignItems: 'center', justifyContent: 'center'}}>
					<FAIcon {...props.leftFAIcon} />
				</View>
				<View
					style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
					<Text
						style={[
							textstyles.textPrimary,
							textstyles.textUpper,
							textstyles.textSize16,
						]}>
						{props.linkText}
					</Text>
				</View>
				<View style={{flex: 0.1}}>
					<MCIcon name="chevron-right" size={28} color="rgba(0,0,0,.25)" />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export const ScreenLinkButton = props => {
	return (
		<TouchableOpacity
			activeOpacity={0.75}
			onPress={event => props.onItemSelected(event, props.action)}
			style={[flexstyles.flexRow, props.buttonContainerStyle]}>
			<View style={[flexstyles.flex, flexstyles.flexJustifyCenter]}>
				<Text
					style={[
						textstyles.textPrimary,
						textstyles.textUpper,
						textstyles.textSize14,
						props.linkStyle
							? (props.linkStyle['textTransform'] &&
									props.linkStyle['textTransform'] == 'capitalize') ||
							  (props.linkStyle['textTransform'] &&
									props.linkStyle['textTransform'] == 'none')
								? (props.linkStyle['fontSize'] = textstyles.textSize16.fontSize)
								: (props.linkStyle['fontSize'] = textstyles.textSize14.fontSize)
							: '',
						props.linkStyle,
					]}>
					{props.linkText}
				</Text>
			</View>
			<View style={{flex: 0.07}}>
				<EvilIcons name="chevron-right" size={28} color="rgba(0,0,0,.5)" />
			</View>
		</TouchableOpacity>
	);
};

export const HorizontalDoubleButton = props => {
	/* 
		borderBottomRadius is custom prop.
		layout doesn't work with
			-borderBottomEndRadius
	*/

	let borderBottomRadius =
		props.buttonContainerStyle &&
		props.buttonContainerStyle.find(style => {
			return style['borderBottomRadius'];
		});

	return (
		<View
			style={[
				flexstyles.flexRow,
				{height: 55},
				props.buttonContainerStyle &&
				props.buttonContainerStyle['borderBottomRadius']
					? {
							borderBottomLeftRadius:
								props.buttonContainerStyle['borderBottomRadius'],
							borderBottomRightRadius:
								props.buttonContainerStyle['borderBottomRadius'],
					  }
					: props.buttonContainerStyle && borderBottomRadius !== undefined
					? {
							borderBottomLeftRadius: borderBottomRadius['borderBottomRadius'],
							borderBottomRightRadius: borderBottomRadius['borderBottomRadius'],
					  }
					: '',
				props.buttonWrapperStyle,
			]}>
			{props.buttons.map((button, index) =>
				index === props.buttons.length - 1 ? (
					<View
						key={index}
						style={[flexstyles.flex, {paddingTop: 0.5, paddingLeft: 0.5}]}>
						<TouchableOpacity
							onPress={() => props.buttonSelected(button.type)}
							activeOpacity={0.9}
							style={[
								flexstyles.flex,
								colorstyles.BGPunchRed,
								props.buttonContainerStyle,
								props.buttonContainerStyle &&
								props.buttonContainerStyle['borderBottomRadius']
									? {
											borderBottomRightRadius:
												props.buttonContainerStyle['borderBottomRadius'],
									  }
									: props.buttonContainerStyle &&
									  borderBottomRadius !== undefined
									? {
											borderBottomRightRadius:
												borderBottomRadius['borderBottomRadius'],
									  }
									: '',
							]}>
							<View
								style={[
									flexstyles.flex,
									flexstyles.flexAlignCenter,
									flexstyles.flexJustifyCenter,
								]}>
								<Text
									style={[
										textstyles.textSecondary,
										textstyles.textSize16,
										colorstyles.White,
										props.buttonStyle,
									]}>
									{button.text}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				) : (
					<View
						key={index}
						style={[flexstyles.flex, {paddingTop: 0.5, paddingRight: 0.5}]}>
						<TouchableOpacity
							onPress={() => props.buttonSelected(button.type)}
							activeOpacity={0.9}
							style={[
								flexstyles.flex,
								colorstyles.BGPunchRed,
								props.buttonContainerStyle,
								props.buttonContainerStyle &&
								props.buttonContainerStyle['borderBottomRadius']
									? {
											borderBottomLeftRadius:
												props.buttonContainerStyle['borderBottomRadius'],
									  }
									: props.buttonContainerStyle &&
									  borderBottomRadius !== undefined
									? {
											borderBottomLeftRadius:
												borderBottomRadius['borderBottomRadius'],
									  }
									: '',
							]}>
							<View
								style={[
									flexstyles.flex,
									flexstyles.flexAlignCenter,
									flexstyles.flexJustifyCenter,
								]}>
								<Text
									style={[
										textstyles.textSecondary,
										textstyles.textSize16,
										colorstyles.White,
										props.buttonStyle,
									]}>
									{button.text}
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				),
			)}
		</View>
	);
};

export default RoundedButton;
