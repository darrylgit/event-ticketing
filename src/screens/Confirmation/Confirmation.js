import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
	setUILoading,
	setDataSource,
	setUserData,
} from 'project/src/store/actions/index';
import {Navigation} from 'react-native-navigation';
import {withAPI} from 'passioo/api/index';
import Modal from 'project/src/components/UITemplates/Modal/Modal';
import RoundedButton from 'project/src/components/UITemplates/Button/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

class ConfirmationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: 'none',
		};
		const {
			doCheckoutWithAccessToken,
			doRetrieveUserOrdersInfo,
			navigateToAuthScreen,
			doSetOrdersInfo,
		} = this.props.api;

		this.doCheckoutWithAccessToken = doCheckoutWithAccessToken;
		this.doRetrieveUserOrdersInfo = doRetrieveUserOrdersInfo;
		this.doSetOrdersInfo = doSetOrdersInfo;
		this.navigateToAuthScreen = navigateToAuthScreen;
	}

	componentDidMount = () => {
		this.timeoutHandler = setTimeout(() => {
			Promise.resolve(this.fetchDataHandler()).then(() =>
				this.props.onSetUILoading({isLoading: false}),
			);
		}, 2500);
	};

	fetchDataHandler = () => {
		this.doCheckoutWithAccessToken(this.props.ticketsSelected)
			.then(
				res =>
					new Promise((resolve, reject) =>
						res.status === 200 ? resolve(res.json()) : reject(res.json()),
					),
			)
			.then(orderJson =>
				this.doRetrieveUserOrdersInfo().then(orders => {
					ordersData =
						orders !== null
							? JSON.parse(orders).concat(orderJson)
							: [orderJson];
					this.doSetOrdersInfo(ordersData)
						.then(() => this.props.onSetUserData('orders', ordersData))
						.then(() =>
							this.props.onSetUserData('confirmationResults', orderJson),
						)
						.then(() => this.setState({modal: 'flex'}));
				}),
			)
			.catch(() => this.navigateToAuthScreen()); //edit - check token null before
	};

	buttonSelectedHandler = action => {
		if (action === 'navigateToExploreScreen') {
			Promise.resolve(Navigation.dismissModal(this.props.componentId)).then(
				() => this.props.onSetUILoading({isLoading: true}),
			);
		}
	};

	render() {
		if (this.props.isLoading) {
			return (
				<View
					style={[
						flexstyles.flex,
						flexstyles.flexAlignCenter,
						flexstyles.flexJustifyCenter,
						colorstyles.BGWhite,
					]}>
					<Text
						style={[
							textstyles.textPrimaryMedium,
							textstyles.textSize18,
							colorstyles.Dark,
						]}>
						Processing tickets ...
					</Text>
					<View style={[{paddingVertical: 20}]}>
						<ActivityIndicator />
					</View>
				</View>
			);
		}
		return (
			<View style={[flexstyles.flex, colorstyles.BGWhite]}>
				<Modal
					hasBackdrop
					visible={this.state.modal}
					opacity={1}
					dismissTopButton
					action="navigateToExploreScreen"
					buttonSelected={this.buttonSelectedHandler}
					modalStyle={[{borderTopLeftRadius: 20, borderTopRightRadius: 20}]}
					modalContainerStyle={[{paddingTop: 30}]}>
					<View
						style={[
							flexstyles.flex,
							flexstyles.flexAlignCenter,
							flexstyles.flexJustifyCenter,
						]}>
						<View
							style={[
								flexstyles.flex,
								flexstyles.flexAlignCenter,
								flexstyles.flexJustifyCenter,
							]}>
							<Ionicons
								size={50}
								name="ios-checkmark-circle-outline"
								color="rgba(0,0,0,.6)"
							/>
							<Text
								style={[
									textstyles.textPrimaryMedium,
									textstyles.textSize14,
									colorstyles.Dark,
								]}>
								Your tickets are confirmed
							</Text>
							<Text
								style={[
									textstyles.textPrimaryMedium,
									textstyles.textSize14,
									colorstyles.Dark,
								]}>
								Confirmation number
							</Text>
							<Text
								style={[
									textstyles.textPrimaryMedium,
									textstyles.textSize14,
									colorstyles.Dark,
								]}>
								{this.props.dataSource?.number !== undefined &&
									this.props.dataSource.number}
							</Text>
						</View>
						<RoundedButton
							action="navigateToMyTicketsScreen"
							buttonSelected={this.buttonSelectedHandler}
							buttonText="Share Tickets"
						/>
					</View>
					<TouchableOpacity
						onPress={() =>
							this.buttonSelectedHandler('navigateToExploreScreen')
						}
						style={[
							flexstyles.flexAlignCenter,
							flexstyles.flexJustifyCenter,
							{paddingVertical: 40},
						]}>
						<Text
							style={[
								textstyles.textPrimaryMedium,
								textstyles.textSize14,
								colorstyles.Dark,
							]}>
							Back to events
						</Text>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading,
		dataSource: state.user.confirmationResults,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetDataSource: (key, value) => dispatch(setDataSource(key, value)),
		onSetUILoading: ui => dispatch(setUILoading(ui)),
		onSetUserData: (key, value) => dispatch(setUserData(key, value)),
	};
};

ConfirmationScreen = withAPI(ConfirmationScreen);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConfirmationScreen);
