import React from 'react';
import {View, Text, TextInput} from 'react-native';

import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';
import inputstyles from './styles';

export const DefaultTextInput = props => (
	<TextInput
		{...props}
		style={[
			textstyles.textSecondary,
			textstyles.textSize18,
			{
				width: '100%',
				color: 'rgba(0,0,0,1)',
				borderBottomWidth: 1,
				borderColor: 'rgba(0,0,0,.4)',
			},
			props.inputStyle,
		]}
	/>
);

export const SecureInput = props => (
	<DefaultTextInput secureTextEntry={props.secureTextEntry} />
);

export const InputStack = props => {
	return (
		<View style={[props.inputWrapperStyle]}>
			{props.header && (
				<View
					style={[
						flexstyles.flex,
						{paddingVertical: 5},
						props.headerContainerStyle,
					]}>
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
			<View style={[flexstyles.flex, props.inputContainerStyle]}>
				<View
					style={[
						flexstyles.flex,
						flexstyles.flexAlignCenter,
						flexstyles.flexJustifyCenter,
						props.inputStyle,
					]}>
					<TextInput
						onFocus={props.onFocus}
						placeholder={props.placeholder}
						onChangeText={props.onChangeText}
						onChange={props.onChange}
						value={props.value}
						autoCapitalize="none"
						secureTextEntry={props.secureTextEntry}
						style={[
							textstyles.textSecondary,
							textstyles.textSize14,
							{width: '100%', minHeight: 34},
							props.inputTextStyle,
						]}
					/>
				</View>
			</View>
		</View>
	);
};

const DefaultInput = props => (
	<View style={[props.inputContainerStyle, flexstyles.flex]}>
		{props.headerText && (
			<Text style={props.headerStyle}>{props.headerText}</Text>
		)}
		<View style={[props.inputStyle]}>
			<TextInput
				onFocus={props.onFocus}
				placeholder={props.placeholder}
				onChangeText={props.onChangeText}
				onChange={props.onChange}
				value={props.value}
				autoCapitalize="none"
				secureTextEntry={props.secureTextEntry}
				style={[
					textstyles.textSecondary,
					textstyles.textSize16,
					props.inputTextStyle,
				]}
			/>
		</View>
		{props.footerText && (
			<Text style={inputstyles.inputFooter}>{props.footerText}</Text>
		)}
	</View>
);

export const Input = props => (
	<View
		style={[
			flexstyles.flex,
			flexstyles.flexJustifyCenter,
			flexstyles.paddingVerticalSM,
			props.inputContainerStyle,
		]}>
		{props.headerText && (
			<Text
				style={[
					textstyles.textSecondary,
					textstyles.textSize14,
					colorstyles.Dark,
					props.headerStyle,
				]}>
				{props.headerText}
			</Text>
		)}
		<DefaultTextInput
			onFocus={props.onFocus}
			placeholder={props.placeholder}
			value={props.value}
			onChangeText={props.onChangeText}
			onChange={props.onChange}
			autoCapitalize={props.autoCapitalize}
			inputStyle={props.inputStyle}
		/>
		{props.footerText && (
			<Text style={inputstyles.inputFooter}>{props.footerText}</Text>
		)}
	</View>
);

export const CurrencyInput = props => (
	<View
		style={[
			flexstyles.flex,
			flexstyles.flexJustifyCenter,
			flexstyles.paddingVerticalSM,
			props.inputContainerStyle,
		]}>
		{props.headerText && (
			<Text
				style={[
					textstyles.textSecondary,
					textstyles.textSize14,
					colorstyles.Dark,
					props.headerStyle,
				]}>
				{props.headerText}
			</Text>
		)}
		<View
			style={[
				flexstyles.flex,
				flexstyles.flexRow,
				flexstyles.flexAlignCenter,
				{borderBottomWidth: 1, borderColor: 'rgba(0,0,0,.4)'},
			]}>
			<Text
				style={[
					textstyles.textSecondary,
					textstyles.textSize18,
					colorstyles.Black,
					props.inputTextStyle,
				]}>
				$
			</Text>
			<DefaultTextInput
				defaultValue="0.00"
				keyboardType="numeric"
				placeholder={props.placeholder}
				value={props.value}
				onChangeText={props.onChangeText}
				onChange={props.onChange}
				autoCapitalize={props.autoCapitalize}
				inputStyle={[props.inputStyle, {borderBottomWidth: 0}]}
			/>
		</View>
		{props.footerText && (
			<Text style={inputstyles.inputFooter}>{props.footerText}</Text>
		)}
	</View>
);

export const IntegerInput = props => (
	<View
		style={[
			flexstyles.flex,
			flexstyles.flexJustifyCenter,
			flexstyles.paddingVerticalSM,
			props.inputContainerStyle,
		]}>
		{props.headerText && (
			<Text
				style={[
					textstyles.textSecondary,
					textstyles.textSize14,
					colorstyles.Dark,
					props.headerStyle,
				]}>
				{props.headerText}
			</Text>
		)}
		<DefaultTextInput
			defaultValue="0"
			keyboardType="number-pad"
			placeholder={props.placeholder}
			value={props.value}
			onChangeText={props.onChangeText}
			onChange={props.onChange}
			autoCapitalize={props.autoCapitalize}
			inputStyle={props.inputStyle}
		/>
		{props.footerText && (
			<Text style={inputstyles.inputFooter}>{props.footerText}</Text>
		)}
	</View>
);

export const InteractiveInput = props => (
	<View
		style={[
			flexstyles.flex,
			flexstyles.flexJustifyCenter,
			flexstyles.paddingVerticalSM,
			props.inputContainerStyle,
		]}>
		{props.headerText && (
			<Text
				style={[
					textstyles.textSecondary,
					textstyles.textSize14,
					colorstyles.Dark,
					props.headerStyle,
				]}>
				{props.headerText}
			</Text>
		)}
		<DefaultTextInput
			onFocus={() => this.setState(alert('focused'))}
			placeholder={props.placeholder}
			value={props.value}
			onChangeText={props.onChangeText}
			onChange={props.onChange}
			autoCapitalize={props.autoCapitalize}
			inputStyle={props.inputStyle}
		/>
		{props.footerText && (
			<Text style={inputstyles.inputFooter}>{props.footerText}</Text>
		)}
	</View>
);

export default DefaultInput;
