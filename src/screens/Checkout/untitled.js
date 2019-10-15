import React, {Component} from 'react';
import {Platform, Dimensions, View, Text, Animated} from 'react-native';
import {connect} from 'react-redux';
import {
	setUILoading,
	setUITransitioning,
	setDataSource,
	setUserData,
} from 'project/src/store/actions/index';
import {Navigation} from 'react-native-navigation';
import {withAPI} from 'passioo/api/index';
import Picker from 'project/src/components/UITemplates/Picker/Picker';
import {CheckoutList} from 'project/src/components/List/List';
import DefaultActivityIndicator from 'project/src/components/UITemplates/ActivityIndicator/ActivityIndicator';
import ButtonComponent, {RectangleButton} from 'react-native-button-component';

import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';
import {PurchaseScreenStaticOptions} from 'project/src/screens/Purchase/Purchase';

class CheckoutScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			pickerContainerVisible: 'none',
			pickerContainerOpacity: 1,
			ticketsSelected: [],
		};

		const {
			doRetrieveNewTokensWithRefreshToken,
			doSetTokensFromRefresh,
			doNavigateToAuthScreen,
		} = this.props.api;

		this.doRetrieveNewTokensWithRefreshToken = doRetrieveNewTokensWithRefreshToken;
		this.doSetTokensFromRefresh = doSetTokensFromRefresh;
		this.doNavigateToAuthScreen = doNavigateToAuthScreen;
	}

	//navigation
	nextScreenStaticOptionsHandler = () => {};
	//helpers
	ticketInSelectedEvent = id =>
		this.props.selectedEvent.tickets.find(ticket => {
			return ticket.id === id;
		});

	ticketInTicketsSelected = id =>
		this.state.ticketsSelected.find(ticket => {
			return ticket.id === id;
		});

	submitButtonSelectedHandler = () => {
		// we don't want an unauthorized token error after user submits
		// a purchase. we handle setup for new tokens and set a time
		// limit for the checkout with respect to token expiry.
		// user should not be able to access purchase screen without
		// this done. A local timer should be set so that purchase
		// screen knows when to display 'time limit reached' screen,
		// prompting a return to this screen, starting the cycle over.

		Object.entries(this.state.ticketsSelected).length !== 0 &&
			Promise.resolve(this.setState({isLoading: true}))
				.then(() => this.doRetrieveNewTokensWithRefreshToken())
				.then(
					res =>
						new Promise((resolve, reject) =>
							res.status === 200 ? resolve(res.json()) : reject(res.json()),
						),
				)
				.then(resJson => this.doSetTokensFromRefresh(resJson))
				.then(
					() =>
						(this.timeoutHandler = setTimeout(() => {
							Navigation.push(this.props.componentId, {
								component: {
									name: 'project.PurchaseScreen',
									passProps: {
										selectedEvent: this.props.selectedEvent,
										ticketsSelected: this.state.ticketsSelected,
									},
									options: PurchaseScreenStaticOptions,
								},
							});
						}, 1000)),
				)
				.catch(
					(
						error, // refresh token expired so auth is required
					) =>
						(this.timeoutHandler = setTimeout(() => {
							this.doNavigateToAuthScreen();
						}, 1000)),
				)
				.finally(
					() =>
						(this.timeoutHandler = setTimeout(() => {
							this.setState({isLoading: false});
						}, 750)),
				);
	};

	pickerModalOpenHandler = key => {
		//set state to number chosen in picker
		var selectedTicket = this.props.selectedEvent.tickets.find(ticket => {
			return ticket.id === key;
		});

		this.setState(
			{
				numPickerItems: selectedTicket.quantity,
				selectedTicketId: selectedTicket.id,
				selectedTicketPrice: selectedTicket.price,
				selectedTicketName: selectedTicket.name,
			},
			() => {
				this.setState({
					pickerContainerVisible: 'flex',
				});
			},
		);
	};

	pickerModalCloseHandler = () => {
		this.setState({
			pickerContainerVisible: 'none',
		});
	};
	//set state respective to admission type chosen
	pickerItemSelectedHandler = value => {
		var ticket = this.state.ticketsSelected.find(ticket => {
			return ticket.id === this.state.selectedTicketId;
		});

		ticket === undefined
			? value !== 0
				? this.setState(
						{
							ticketsSelected: [
								...this.state.ticketsSelected,
								{
									id: this.state.selectedTicketId,
									quantity: value,
									name: this.state.selectedTicketName,
									price: this.state.selectedTicketPrice,
								},
							],
						},
						() => this.pickerModalCloseHandler(),
				  )
				: this.pickerModalCloseHandler()
			: value !== 0
			? this.setState(
					{
						ticketsSelected: this.state.ticketsSelected
							.filter(item => {
								return item.id !== this.state.selectedTicketId;
							})
							.concat({
								id: this.state.selectedTicketId,
								quantity: value,
								name: this.state.selectedTicketName,
								price: this.state.selectedTicketPrice,
							}),
					},
					() => this.pickerModalCloseHandler(),
			  )
			: this.setState(
					{
						ticketsSelected: this.state.ticketsSelected.filter(item => {
							return item.id !== this.state.selectedTicketId;
						}),
					},
					() => this.pickerModalCloseHandler(),
			  );
	};
	render() {
		const subtotal = () => {
			var count = 0;
			this.state.ticketsSelected.forEach(item => {
				count += item.price * item.quantity;
			});
			return count;
		};
		return (
			<View style={[flexstyles.flex]}>
				<View
					style={{
						flex: 1,
						marginTop: Platform.OS !== 'ios' ? 54 : 64,
						backgroundColor: 'rgba(255,255,255,.95)',
					}}>
					<View style={{flex: 1, backgroundColor: 'rgba(255,255,255,.6)'}}>
						<CheckoutList
							tickets={this.props.selectedEvent.tickets}
							ticketsSelected={this.state.ticketsSelected}
							buttonSelected={this.pickerModalOpenHandler}
							separator
						/>
					</View>
					<View
						style={{height: 175, justifyContent: 'center', paddingVertical: 5}}>
						<View style={{flex: 1, paddingHorizontal: 25, paddingVertical: 5}}>
							{[
								{key: 'Subtotal', value: subtotal()},
								{key: 'Fees', value: '0'},
								{key: 'Total', value: subtotal()},
							].map((item, index) => (
								<View
									key={index}
									style={[
										flexstyles.flex,
										flexstyles.flexRow,
										flexstyles.flexAlignCenter,
									]}>
									<View style={[flexstyles.flex]}>
										<Text
											style={[textstyles.textPrimary, textstyles.textSize14]}>
											{item.key}
										</Text>
									</View>
									<View style={[flexstyles.flex, flexstyles.flexAlignEnd]}>
										<Text
											style={[textstyles.textSecondary, textstyles.textSize16]}>
											$ {item.value}
										</Text>
									</View>
								</View>
							))}
						</View>
					</View>
					<View style={{paddingHorizontal: 20}}>
						<View
							style={{
								paddingVertical: 10,
								borderTopWidth: 1,
								borderTopColor: 'rgba(0,0,0,.05)',
							}}>
							<View style={{height: 50}}>
								<RectangleButton
									text="CHECKOUT"
									type="primary"
									onPress={this.submitButtonSelectedHandler}
									backgroundColors={['#ef2f73', '#f67c24']}
									gradientStart={{x: 0, y: 0.5}}
									gradientEnd={{x: 1, y: 1}}
									style={{
										borderTopLeftRadius: 5,
										borderTopRightRadius: 5,
										borderBottomLeftRadius: 5,
										borderBottomRightRadius: 5,
									}}
								/>
							</View>
						</View>
					</View>
				</View>
				<Picker
					dataSource={this.state.numPickerItems}
					pickerItemSelected={this.pickerItemSelectedHandler}
					pickerContainerVisible={this.state.pickerContainerVisible}
					pickerContainerOpacity={this.state.pickerContainerOpacity}
					doPickerDismiss={this.pickerModalCloseHandler}
				/>

				<DefaultActivityIndicator visible={this.state.isLoading} />
			</View>
		);
	}
}

export const CheckoutScreenStaticOptions = {
	//static methods not hoisted, push options
	topBar: {
		visible: true,
		title: {
			text: 'Checkout',
			color: 'black',
		},
		background: {
			color: 'white',
		},
		backButton: {
			color: 'black',
		},
	},
	bottomTabs: {
		visible: false,
	},
};

CheckoutScreen = withAPI(CheckoutScreen);
export default CheckoutScreen;
