import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

class TimeoutScreen extends Component {
	render() {
		return (
			<View
				style={[
					flexstyles.flex,
					flexstyles.flexAlignCenter,
					flexstyles.flexJustifyCenter,
				]}>
				<Text
					style={[
						textstyles.textPrimary,
						textstyles.textSize24,
						colorstyles.DarkSlateGrey,
						{textAlign: 'center', paddingVertical: 8},
					]}>
					Time Limit Reached
				</Text>
				<Text
					style={[
						textstyles.textPrimary,
						textstyles.textSize16,
						colorstyles.Dark,
						{lineHeight: 28, textAlign: 'center', paddingVertical: 8},
					]}>
					Your tickets have been released. Please re-start your purchase.
				</Text>
				<TouchableOpacity
					style={{paddingVertical: 8}}
					activeOpacity={0.8}
					onPress={this.popScreen}>
					<Text
						style={[
							textstyles.textPrimary,
							textstyles.textSize18,
							colorstyles.DjangoBlue,
							{textAlign: 'center'},
						]}>
						Back to Tickets
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
