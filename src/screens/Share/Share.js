import React, {Component} from 'react';
import {NativeModules, View, Text, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import RoundedButton from 'project/src/components/UITemplates/Button/Button';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

const ShareSheetManager = NativeModules.ShareSheetManager;

class ShareScreen extends Component {
	static options(passProps) {
		return {
			topBar: {
				visible: true,
				background: {
					color: 'white',
				},
				title: {
					text: 'Invite Friends',
					color: 'black',
				},
				leftButtons: [
					{
						id: 'dismissButtonTopBarShareScreenId',
						systemItem: 'stop',
						color: 'black',
					},
				],
			},
		};
	}
	constructor(props) {
		super(props);
		Navigation.events().bindComponent(this);
	}

	navigationButtonPressed({buttonId}) {
		if (buttonId === 'dismissButtonTopBarShareScreenId') {
			Navigation.dismissModal(this.props.componentId);
		}
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<View
					style={{
						width: 320,
						alignItems: 'center',
						justifyContent: 'center',
					}}>
					<View style={{top: -10, paddingVertical: 20}}>
						<View
							style={{
								width: 260,
								height: 120,
								alignItems: 'center',
								justifyContent: 'center',
								borderWidth: 1,
								borderColor: 'rgba(0,0,0,.2)',
							}}>
							<Text
								style={[
									{
										fontFamily: 'Oswald-Regular',
										fontSize: 18,
										color: '#393552',
									},
								]}>
								image
							</Text>
						</View>
					</View>
					<View style={{}}>
						<Text
							style={[
								{
									fontFamily: 'Oswald-Regular',
									fontSize: 22,
									color: '#393552',
								},
							]}>
							Refer Friends, Get $10
						</Text>
					</View>
					<View
						style={{
							paddingVertical: 8,
						}}>
						<Text
							style={[
								textstyles.textPrimary,
								textstyles.textSize12,
								{
									color: 'rgba(0,0,0,.4)',
									textAlign: 'center',
									lineHeight: 18,
								},
							]}>
							Share your personal link with friends, and they'll get $10 to use
							on their first ticket purchase when they sign up. After they make
							a purchase, you will get $10 to use for your next ticket purchase.
						</Text>
					</View>
					<View style={{paddingVertical: 8}}>
						<View style={{paddingVertical: 8}}>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={() => console.log('copied link!')}
								style={{width: 320, height: 40, flexDirection: 'row'}}>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										paddingHorizontal: 10,
										borderWidth: 1,
										borderTopLeftRadius: 4,
										borderBottomLeftRadius: 4,
										borderColor: 'rgba(0,0,0,.08)',
									}}>
									<Text
										style={[
											textstyles.textSecondary,
											textstyles.textSize12,
											{color: 'rgba(246, 124, 36, .85)'},
										]}>
										https://www.passioo.com
									</Text>
								</View>
								<View
									style={{
										width: 50,
										height: 40,
										alignItems: 'center',
										justifyContent: 'center',
										borderWidth: 1,
										borderLeftWidth: 0,
										borderTopRightRadius: 4,
										borderBottomRightRadius: 4,
										borderColor: 'rgba(0,0,0,.08)',
									}}>
									<Text
										style={[
											textstyles.textPrimarySemiBold,
											textstyles.textSize14,
											{color: 'rgba(246, 124, 36, .9)'},
										]}>
										Copy
									</Text>
								</View>
							</TouchableOpacity>
						</View>
						<RoundedButton
							buttonSelected={(id, action) => console.log('Share in messages')}
							buttonText="Share in Messages"
							buttonContainerStyle={{paddingVertical: 8}}
							buttonStyle={[
								{
									backgroundColor: 'rgba(246, 124, 36, .9)',
									borderWidth: 0,
									borderRadius: 4,
								},
							]}
							buttonTextStyle={[
								{
									color: 'rgba(255,255,255,1)',
									textTransform: 'capitalize',
									fontSize: 14,
								},
							]}
						/>
						<RoundedButton
							buttonSelected={(id, action) =>
								ShareSheetManager.open('https://www.passioo.com')
							}
							buttonText="Share"
							buttonContainerStyle={{paddingVertical: 8}}
							buttonStyle={[
								{
									backgroundColor: 'rgba(246, 124, 36, .9)',
									borderWidth: 0,
									borderRadius: 4,
								},
							]}
							buttonTextStyle={[
								{
									color: 'rgba(255,255,255,1)',
									textTransform: 'capitalize',
									fontSize: 14,
								},
							]}
						/>
					</View>
				</View>
			</View>
		);
	}
}

export default ShareScreen;
