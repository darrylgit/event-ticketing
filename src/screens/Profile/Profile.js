import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {withAPI} from 'passioo/api/index';
import {withTheme} from 'passioo/theme/index';
import Theme from 'project/src/components/UITemplates/Theme/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AvatarStack from 'project/src/components/UITemplates/Avatar/Avatar';
import RoundedButton, {
	ScreenLinkEIButtonStack,
	RoundedButtonStack,
} from 'project/src/components/UITemplates/Button/Button';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

class ProfileScreen extends Component {
	showModal = () =>
		Navigation.showModal({
			stack: {
				children: [
					{
						component: {
							name: 'project.ShareScreen',
						},
					},
				],
			},
		});
	render() {
		const {username, email, avatar} = this.props.user;
		return (
			<Theme style={{flex: 1}}>
				<View
					style={{
						height: 180,
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}>
					<View style={{width: 80, height: 80}}>
						<ImageBackground
							source={require('project/src/assets/avatars/profile-avatar-placeholder.png')}
							resizeMode="cover"
							imageStyle={{borderRadius: 50}}
							style={{width: '100%', height: '100%'}}
						/>
					</View>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							paddingVertical: 15,
						}}>
						<Text
							style={[
								textstyles.textPrimaryMedium,
								textstyles.textSize16,
								textstyles.textNone,
								colorstyles.White,
							]}>
							username
						</Text>
						<Text
							style={[
								textstyles.textPrimary,
								textstyles.textSize16,
								textstyles.textNone,
								colorstyles.White,
							]}>
							username@email.com
						</Text>
					</View>
				</View>
				<View style={{flex: 1, backgroundColor: 'rgba(255,255,255,1)'}}>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							backgroundColor: 'rgba(255,255,255,.6)',
						}}>
						<View style={{paddingVertical: 10}}>
							<ScreenLinkEIButtonStack
								buttonContainerStyle={{
									paddingHorizontal: 15,
									paddingVertical: 10,
								}}
								leftEIcon={{name: 'clock', size: 26}}
								linkText="Activity"
								linkTextStyle={{paddingHorizontal: 10}}
							/>
							<ScreenLinkEIButtonStack
								buttonContainerStyle={{
									paddingHorizontal: 15,
									paddingVertical: 10,
								}}
								leftEIcon={{name: 'heart', size: 26}}
								linkText="Favorites"
								linkTextStyle={{paddingHorizontal: 10}}
							/>
							<ScreenLinkEIButtonStack
								buttonContainerStyle={{
									paddingHorizontal: 15,
									paddingVertical: 10,
								}}
								leftEIcon={{name: 'user', size: 26}}
								linkText="Friends"
								linkTextStyle={{paddingHorizontal: 10}}
							/>
						</View>
						<View style={{flex: 0.3, paddingHorizontal: 15}} />
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-start',
							backgroundColor: 'rgba(255,255,255,.3)',
						}}>
						<View style={{height: 150}}>
							<LinearGradient
								colors={['rgba(239, 47, 115, 1)', 'rgba(246, 124, 36, 1)']}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}
								style={{
									flex: 1,
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
								}}
							/>
							<View
								style={{
									flex: 1 / 3,
									justifyContent: 'flex-end',
									alignItems: 'center',
									paddingHorizontal: 16,
								}}>
								<Text
									style={{
										fontFamily: 'Montserrat-Medium',
										fontSize: 14,
										color: 'rgba(255,255,255,1)',
									}}>
									Share with friends & everyone gets discounts!
								</Text>
							</View>
							<View
								style={{
									flex: 2 / 3,
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<View style={{flex: 0.6, height: '100%'}}>
									<AvatarStack />
								</View>
								<View style={{flex: 0.4}}>
									<RoundedButtonStack
										FAIcon={{
											name: 'share-square-o',
											size: 15,
											color: 'rgba(255,255,255,1)',
										}}
										value="Share"
										buttonSelected={() => this.showModal()}
									/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</Theme>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user.user,
	};
};

export default connect(mapStateToProps)(ProfileScreen);
