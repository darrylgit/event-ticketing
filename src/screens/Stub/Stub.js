import React, {Component} from 'react';
import {
	Platform,
	ScrollView,
	FlatList,
	View,
	Text,
	Image,
	ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import RoundedButton from 'project/src/components/UITemplates/Button/Button';

import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

class StubScreen extends Component {
	render() {
		return (
			<View style={[{flex: 1, backgroundColor: 'rgba(0,0,0,1)'}]}>
				<View
					style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
					<ImageBackground
						source={{uri: this.props.selectedEvent.image}}
						style={{width: '100%', height: 350}}
					/>
					<LinearGradient
						colors={['transparent', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
						start={{y: 0.095}}
						end={{y: 1}}
						style={[
							{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
							},
						]}
					/>
				</View>
				<LinearGradient
					colors={['rgba(239, 47, 115, .7)', 'rgba(246, 124, 36, .7)']}
					start={{x: 0}}
					end={{x: 1}}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
					}}
				/>
				<View
					style={[
						{flex: 1, marginTop: (Platform.OS !== 'ios' ? 54 : 64) + 50},
					]}>
					<View style={[{flex: 0.25, paddingHorizontal: 20}]}>
						<View style={[flexstyles.flex, flexstyles.flexJustifyEnd]}>
							<Text
								style={[
									textstyles.textSecondaryMedium,
									textstyles.textSize18,
									textstyles.textUpper,
									colorstyles.White,
								]}
								numberOfLines={2}>
								{this.props.selectedEvent.title}
							</Text>
						</View>
						<View style={[flexstyles.flex, flexstyles.flexJustifyCenter]}>
							<Text
								style={[
									textstyles.textPrimaryMedium,
									textstyles.textSize12,
									textstyles.textUpper,
									colorstyles.White,
								]}>
								{this.props.selectedEvent.start_date_full}
							</Text>
							<Text
								style={[
									textstyles.textPrimaryMedium,
									textstyles.textSize12,
									textstyles.textUpper,
									colorstyles.White,
								]}>
								{this.props.selectedEvent.venue.venuename}
							</Text>
						</View>
					</View>
					<View style={[{flex: 1}]}>
						<View style={{width: '100%', paddingLeft: 20}}>
							<View style={{width: '100%'}}>
								<LinearGradient
									colors={['rgba(239, 47, 115, .5)', 'rgba(246, 124, 36, .5)']}
									start={{x: 0}}
									end={{x: 1}}
									style={[
										{
											position: 'absolute',
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											borderTopLeftRadius: 50,
											borderBottomLeftRadius: 50,
										},
									]}
								/>
								<View style={[{paddingHorizontal: 10, paddingVertical: 8}]}>
									<Text
										style={[
											textstyles.textSecondaryMedium,
											textstyles.textSize12,
											textstyles.textUpper,
											colorstyles.White,
										]}>
										Total tickets
									</Text>
								</View>
							</View>
						</View>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={[
								{flexGrow: 1, paddingHorizontal: 20, paddingVertical: 10},
							]}>
							{this.props.orders?.map(
								(order, index) =>
									order.event.id === this.props.selectedEvent.id && (
										<View
											key={index}
											style={[{borderRadius: 5, paddingHorizontal: 5}]}>
											<View
												style={[
													{width: 320, height: 340, borderRadius: 5},
													colorstyles.BGWhite,
												]}>
												<View
													style={[
														{
															width: '100%',
															height: 70,
															borderTopLeftRadius: 5,
															borderTopRightRadius: 5,
														},
														colorstyles.BGDark,
													]}
												/>
												<View
													style={[
														flexstyles.flex,
														flexstyles.flexAlignCenter,
														flexstyles.flexJustifyCenter,
													]}>
													<Image
														source={{uri: order.qrcode}}
														style={{width: 160, height: 160}}
														resizeMode="contain"
													/>
												</View>
											</View>
										</View>
									),
							)}
						</ScrollView>
					</View>
					<RoundedButton
						action="distributeTickets"
						buttonSelected={() => console.log('distribute tickets')}
						buttonText="Distribute tickets"
						buttonTextStyle={[colorstyles.White]}
						buttonStyle={[{width: 250, borderColor: colorstyles.White.color}]}
						buttonContainerStyle={[
							{alignItems: 'center', width: '100%', paddingBottom: 60},
						]}
					/>
				</View>
			</View>
		);
	}
}

export const StubScreenStaticOptions = {
	topBar: {
		drawBehind: true,
	},
	bottomTabs: {
		visible: false,
	},
};

StubScreen.options = StubScreenStaticOptions;

export default StubScreen;
