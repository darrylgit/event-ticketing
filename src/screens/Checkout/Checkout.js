import React, {Component} from 'react';
import {
	Platform,
	Dimensions,
	SafeAreaView,
	View,
	Text,
	Animated,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {
	setUILoading,
	setUITransitioning,
	setDataSource,
	setUserData,
} from 'project/src/store/actions/index';
import {Navigation} from 'react-native-navigation';
import {withAPI} from 'passioo/api/index';
import ThemeContext, {withTheme} from 'passioo/theme/index';
import Theme, {
	GradientTheme,
} from 'project/src/components/UITemplates/Theme/Theme';
import NativeTicketStub from 'project/src/components/Native/TicketStub/TicketStub';
import {CheckoutList} from 'project/src/components/List/List';
import DefaultActivityIndicator from 'project/src/components/UITemplates/ActivityIndicator/ActivityIndicator';
import EllipsesLoading from 'project/src/components/UITemplates/Loading/Loading';
import {ScreenLinkButton} from 'project/src/components/UITemplates/Button/Button';
import NavigationBar, {
	NavigationBarHeight,
} from 'project/src/components/Native/NavigationBar/NavigationBar';
import RNStatusBar, {
	getStatusBarHeight,
} from 'project/src/components/Native/StatusBar/StatusBar';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';
import {PurchaseScreenStaticOptions} from 'project/src/screens/Purchase/Purchase';
import {MCIcon} from 'project/src/components/UITemplates/Icon/Icon';

import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const START_BODY = getStatusBarHeight() + NavigationBarHeight;

class CheckoutScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			ellipsesLoading: false,
			ticketsSelected: [],
			progressBarStatus: new Animated.Value(0),
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

	componentDidMount = () => this.extendProgressBarStatus();

	extendProgressBarStatus = () =>
		Animated.timing(this.state.progressBarStatus, {
			toValue: 1,
			duration: 1000,
		}).start();

	//helpers
	ticketSelectedQuantityLimit = () => {
		return 10;
	};

	ticketSelectedQuantityIncrementSize = () => {
		return 1;
	};

	ticketInSelectedEvent = id => {
		return this.props.selectedEvent?.tickets.find(ticket => {
			return ticket.id === id;
		});
	};

	ticketInTicketsSelected = id => {
		return this.state.ticketsSelected?.find(ticket => {
			return ticket.id === id;
		});
	};

	ticketExistInTicketsSelected = id => {
		var ticketInTicketsSelected = this.ticketInTicketsSelected(id);
		return ticketInTicketsSelected !== undefined ? true : false;
	};

	ticketInSelectedEventAvailableQuantity = id => {
		var ticketInSelectedEvent = this.ticketInSelectedEvent(id);
		return ticketInSelectedEvent?.quantity || 0;
	};

	ticketInTicketsSelectedQuantity = id => {
		var ticketInTicketsSelected = this.ticketInTicketsSelected(id);
		return ticketInTicketsSelected?.quantity || 0;
	};

	ticketOrUndefinedInTicketsSelectedQuantity = id => {
		var ticketOrUndefined = this.ticketInTicketsSelected(id);
		return ticketOrUndefined?.quantity || 0;
	};

	ticketSelectedQuantityReachAvailableLimit = (id, quantity) => {
		//works if increment is one
		var ticketQuantityLimit = this.ticketSelectedQuantityLimit();
		var ticketQuantityIncrementSize = this.ticketSelectedQuantityIncrementSize();
		var ticketQuantityWithIncrement = quantity + ticketQuantityIncrementSize;

		return ticketQuantityWithIncrement <= ticketQuantityLimit ? false : true;
	};

	ticketSelectedQuantityReachZero = (id, quantity) => {
		//works if increment is one
		var ticketQuantityIncrementSize = this.ticketSelectedQuantityIncrementSize();
		var ticketQuantityWithIncrement = quantity - ticketQuantityIncrementSize;

		return ticketQuantityWithIncrement >= 0 ? false : true;
	};

	increaseIncrementIsSafe = (id, quantity) => {
		var incrementNotSafe = this.ticketSelectedQuantityReachAvailableLimit(
			id,
			quantity,
		);
		return incrementNotSafe ? false : true;
	};

	decreaseIncrementIsSafe = (id, quantity) => {
		var incrementNotSafe = this.ticketSelectedQuantityReachZero(id, quantity);
		return incrementNotSafe ? false : true;
	};

	ticketInTicketsSelectedUICounterBG = (id, theme) => {
		var ticketExistInTicketsSelected = this.ticketExistInTicketsSelected(id);
		if (ticketExistInTicketsSelected) {
			//return theme;
			return 'rgba(90, 73, 100, .4)';
		} else {
			return 'rgba(0,0,0,.06)';
		}
	};

	ticketInTicketsSelectedUICounterTextColor = id => {
		var ticketExistInTicketsSelected = this.ticketExistInTicketsSelected(id);
		if (ticketExistInTicketsSelected) {
			return 'rgba(0,0,0,1)';
		} else {
			return 'rgba(0,0,0,1)';
		}
	};

	ticketsSelectedSubtotal = () => {
		var count = 0;
		this.state.ticketsSelected?.forEach(item => {
			count += item.price * item.quantity;
		});
		return count;
	};

	cleanTicketInTicketsSelectedWithZeroQuantity = () => {
		var cleanedTicketsSelected = [];
		this.state.ticketsSelected.forEach(ticket => {
			if (ticket.quantity !== 0) {
				cleanedTicketsSelected.push(ticket);
			}
		});
		return cleanedTicketsSelected;
	};

	ticketsSelectedIsEmpty = () => {
		return Object.entries(this.state.ticketsSelected).length === 0;
	};

	doIncreaseSelectedTicketQuantity = ({id, name, price}) => {
		var ticketInTicketsSelectedQuantity = this.ticketInTicketsSelectedQuantity(
			id,
		);

		var isSafeToIncrement = this.increaseIncrementIsSafe(
			id,
			ticketInTicketsSelectedQuantity,
		);

		if (isSafeToIncrement) {
			Promise.resolve(
				this.setState({
					ticketsSelected: this.state.ticketsSelected
						.filter(ticket => {
							return ticket.id !== id;
						})
						.concat({
							id: id,
							name: name,
							quantity: (ticketInTicketsSelectedQuantity += 1),
							price: price,
						}),
				}),
			);
		}
	};

	doDecreaseSelectedTicketQuantity = ({id, name, price}) => {
		var ticketInTicketsSelectedQuantity = this.ticketInTicketsSelectedQuantity(
			id,
		);
		var isSafeToIncrement = this.decreaseIncrementIsSafe(
			id,
			ticketInTicketsSelectedQuantity,
		);

		var ticketExistInTicketsSelected = this.ticketExistInTicketsSelected(id);

		if (isSafeToIncrement) {
			Promise.resolve(
				this.setState({
					ticketsSelected: this.state.ticketsSelected
						.filter(ticket => {
							return ticket.id !== id;
						})
						.concat({
							id: id,
							name: name,
							quantity: (ticketInTicketsSelectedQuantity -= 1),
							price: price,
						}),
				}),
			);
		} else {
			if (!isSafeToIncrement && ticketExistInTicketsSelected) {
				Promise.resolve(
					this.setState({
						ticketsSelected: this.state.ticketsSelected.filter(ticket => {
							return ticket.id !== id;
						}),
					}),
				);
			}
		}
	};

	doNavigateToNextScreen = tickets =>
		Navigation.push(this.props.componentId, {
			component: {
				name: 'project.PurchaseScreen',
				passProps: {
					selectedEvent: this.props.selectedEvent,
					ticketsSelected: tickets,
				},
				options: PurchaseScreenStaticOptions,
			},
		});

	submitButtonSelectedHandler = () => {
		// we don't want an unauthorized token error after user submits
		// a purchase. we handle setup for new tokens and set a time
		// limit for the checkout with respect to token expiry.
		// user should not be able to access purchase screen without
		// this done. A local timer should be set so that purchase
		// screen knows when to display 'time limit reached' screen,
		// prompting a return to this screen, starting the cycle over.

		var ticketsSelectedIsEmpty = this.ticketsSelectedIsEmpty();

		if (!ticketsSelectedIsEmpty) {
			var validTicketsSelected = this.cleanTicketInTicketsSelectedWithZeroQuantity();

			Promise.resolve(this.setState({ellipsesLoading: true}))
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
							this.doNavigateToNextScreen(validTicketsSelected);
						}, 3000)),
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
							this.setState({ellipsesLoading: false});
						}, 750)),
				);
		}
	};
	render() {
		const progressBarStatus = this.state.progressBarStatus.interpolate({
			inputRange: [0, 1],
			outputRange: ['0%', '50%'],
		});
		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: 'rgba(255,255,255,.95)',
					marginTop: -START_BODY,
				}}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						flexGrow: 1,
						paddingBottom: 60,
					}}>
					<View style={{width: '100%', height: 320}}>
						<ImageBackground
							source={{uri: this.props.selectedEvent.image}}
							style={{width: '100%', height: 320}}
						/>
						<LinearGradient
							colors={['transparent', 'rgba(23, 19, 26, .75)', '#17131a']}
							start={{y: 0.45}}
							end={{y: 0.9}}
							style={styles.linearGradient17131a}
						/>
					</View>
					<View
						style={{
							flex: 1,
							marginTop: -140,
							paddingHorizontal: 12,
						}}>
						<Text numberOfLines={2} style={[styles.headerText]}>
							{this.props.selectedEvent.title}
						</Text>
						<View
							style={{
								flex: 1,
								marginTop: 15,
							}}>
							<View
								style={[
									styles.purchaseDetailContainerTop,
									{
										borderTopLeftRadius: 2,
										borderTopRightRadius: 2,
										borderBottomLeftRadius: 2,
										borderBottomRightRadius: 2,
										shadowColor: 'rgba(0,0,0,.6)', // IOS
										shadowOffset: {height: 1, width: 0}, // IOS
										shadowOpacity: 1, // IOS
										shadowRadius: 2, //IOS
										elevation: 4, // Android
									},
								]}>
								<View style={styles.purchaseDetailContainerTopHeader}>
									<AntDesign name="hearto" size={18} color="#ae8dc4" />
									<FontAwesome
										name="user-plus"
										size={20}
										color="#ae8dc4"
										style={{marginLeft: 20}}
									/>
								</View>
								<View style={styles.purchaseDetailContainerTopSubItem}>
									<View style={styles.purchaseDetailContainerTopSubItemLeft}>
										<View style={styles.subItemHeadingTextView}>
											<Text
												style={[
													styles.subItemHeadingText,
													{color: 'rgba(255,255,255,.8)'},
												]}>
												{this.props.selectedEvent.start_date_full} -
												{this.props.selectedEvent.start_time}
											</Text>
										</View>
										<View style={styles.subItemHeadingTextView}>
											<Text
												style={[
													styles.subItemHeadingText,
													{color: 'rgba(255,255,255,.8)'},
												]}>
												{this.props.selectedEvent.venue.venuename}
											</Text>
										</View>
									</View>
									<View style={styles.purchaseDetailContainerTopSubItemRight} />
								</View>
								<View style={styles.purchaseDetailContainerTopFooter}>
									<View style={flexstyles.flex}>
										<Text
											style={[
												textstyles.textPrimaryMedium,
												textstyles.textSize12,
												textstyles.textPink,
											]}>
											Sold by: {this.props.selectedEvent.posted_by.username}
										</Text>
									</View>
									<View style={flexstyles.flex5}>
										<Text
											style={[
												textstyles.textPrimaryMedium,
												textstyles.textSize12,
												textstyles.textPink,
											]}>
											Rating :{' '}
										</Text>
									</View>
								</View>
							</View>

							<View style={{flex: 1, paddingVertical: 8}}>
								{this.props.selectedEvent.tickets?.map((ticket, index) => (
									<View key={ticket.id} style={{paddingVertical: 6}}>
										<NativeTicketStub
											style={{
												paddingVertical: 20,
												paddingHorizontal: 14,
											}}>
											<View
												style={{
													width: '100%',
													height: 80,
													flexDirection: 'row',
													borderTopLeftRadius: 3,
													borderBottomLeftRadius: 3,
													borderTopRightRadius: 3,
													borderBottomRightRadius: 3,
													shadowColor: 'rgba(0,0,0,.1)', // IOS
													shadowOffset: {height: 0, width: 0}, // IOS
													shadowOpacity: 0.3, // IOS
													shadowRadius: 4, //IOS
													elevation: 2, // Android
												}}>
												<View
													style={{
														width: '30%',
														alignItems: 'center',
														justifyContent: 'center',
														backgroundColor: 'rgba(255,255,255,1)',
														borderTopLeftRadius: 3,
														borderBottomLeftRadius: 3,
														borderTopRightRadius: 3,
														borderBottomRightRadius: 3,
													}}>
													<View
														style={{
															width: 60,
															height: 60,
															position: 'absolute',
															top: 0,
															left: 0,
															transform: [{translateY: -15}, {translateX: 20}],

															borderRadius: 50,
															backgroundColor: 'white',
															shadowColor: 'rgba(0,0,0,.1)', // IOS
															shadowOffset: {height: 0, width: 0}, // IOS
															shadowOpacity: 0.5, // IOS
															shadowRadius: 4, //IOS
															elevation: 2, // Android
														}}
													/>
												</View>
												<View
													style={{
														flex: 1,
														alignItems: 'flex-start',
														justifyContent: 'center',
														paddingHorizontal: 10,
														backgroundColor: 'rgba(255,255,255,1)',
													}}>
													<View
														style={{
															flex: 1,
															justifyContent: 'center',
														}}>
														<View
															style={{
																flexDirection: 'row',
																alignItems: 'center',
															}}>
															<View
																style={{
																	width: 2,
																	height: 14,
																	backgroundColor: 'rgba(0,0,0,.7)',
																}}
															/>
															<Text
																numberOfLines={1}
																style={[
																	textstyles.textPrimaryMedium,
																	textstyles.textSize14,

																	{
																		color: 'rgba(0,0,0,.75)',
																		lineHeight: 0,
																		left: 4,
																	},
																]}>
																{ticket.category}
															</Text>
														</View>
														<View style={{}}>
															<Text
																numberOfLines={1}
																style={[
																	textstyles.textPrimaryMedium,
																	textstyles.textSize12,
																	colorstyles.Dark,
																]}>
																Description of ticket
															</Text>
														</View>
													</View>
													<View
														style={{
															flex: 1,
															flexDirection: 'row',
														}}>
														<View
															style={{
																flex: 1,
																flexDirection: 'row',
																alignItems: 'center',
																justifyContent: 'flex-start',
															}}>
															<Text
																style={[
																	textstyles.textSecondarySemiBold,
																	textstyles.textSize14,
																	colorstyles.Dark,
																]}>
																$
															</Text>

															<Text
																style={[
																	textstyles.textPrimarySemiBold,
																	textstyles.textSize18,

																	{color: 'rgba(0,0,0,.75)', left: 4},
																]}>
																{ticket.price}
															</Text>
														</View>
														<View
															style={{
																flex: 1,
																flexDirection: 'row',
																alignItems: 'center',
															}}>
															<TouchableOpacity
																activeOpacity={0.8}
																onPress={() =>
																	this.doDecreaseSelectedTicketQuantity(ticket)
																}
																style={{
																	width: 20,
																	height: 20,
																	borderWidth: 1,
																	borderColor: 'rgba(0,0,0,.6)',
																	borderRadius: 50,
																	alignItems: 'center',
																	justifyContent: 'center',

																	backgroundColor: 'rgba(255,255,255,1)',
																	shadowColor: 'rgba(0,0,0,.1)', // IOS
																	shadowOffset: {height: 1, width: 0}, // IOS
																	shadowOpacity: 1, // IOS
																	shadowRadius: 4, //IOS
																	elevation: 4, // Android
																}}>
																<MCIcon name="minus" size={18} />
															</TouchableOpacity>
															<View
																style={{
																	flex: 1,
																	flexDirection: 'row',
																	alignItems: 'center',
																	justifyContent: 'center',
																}}>
																<Text
																	style={[
																		textstyles.textSecondarySemiBold,
																		textstyles.textSize16,
																		colorstyles.Dark,
																	]}>
																	{this.ticketInTicketsSelectedQuantity(
																		ticket.id,
																	)}
																</Text>
															</View>
															<TouchableOpacity
																activeOpacity={0.8}
																onPress={() =>
																	this.doIncreaseSelectedTicketQuantity(ticket)
																}
																style={{
																	width: 20,
																	height: 20,
																	borderWidth: 1,
																	//borderColor: 'rgba(0,0,0,.6)',
																	borderRadius: 50,
																	alignItems: 'center',
																	justifyContent: 'center',

																	backgroundColor: colorstyles.Dark.color,
																	shadowColor: 'rgba(0,0,0,.2)', // IOS
																	shadowOffset: {height: 0, width: 0}, // IOS
																	shadowOpacity: 1, // IOS
																	shadowRadius: 3, //IOS
																	elevation: 4, // Android
																}}>
																<MCIcon name="plus" color="white" size={18} />
															</TouchableOpacity>
														</View>
													</View>
												</View>
												<View
													style={{
														width: 30,
														height: '100%',
														backgroundColor: 'rgba(255,255,255,1)',
														borderLeftColor: 'rgba(0,0,0,.08)',
														borderLeftWidth: 1,
														borderTopLeftRadius: 3,
														borderBottomLeftRadius: 3,
														borderTopRightRadius: 3,
														borderBottomRightRadius: 3,
													}}>
													<TouchableOpacity
														onPress={() => this.setState({testState: 'test'})}
														activeOpacity={0.8}
														style={{
															width: '100%',
															height: 44,
															alignItems: 'center',
															justifyContent: 'center',
															borderTopRightRadius: 2,
															borderBottomWidth: 1,
															borderBottomColor: 'rgba(0,0,0,.04)',
														}}>
														<MCIcon name="dots-vertical" />
													</TouchableOpacity>
												</View>
											</View>
										</NativeTicketStub>
									</View>
								))}
							</View>
						</View>
					</View>
				</ScrollView>

				<TouchableOpacity
					onPress={() => this.submitButtonSelectedHandler()}
					style={{
						width: 320,
						height: 44,
						flexDirection: 'row',
						alignItems: 'center',
						position: 'absolute',
						left: '50%',
						bottom: 10,
						transform: [{translateX: -(320 / 2)}],
						borderRadius: 50,
						backgroundColor: 'rgba(255,255,255,1)',
						shadowColor: 'rgba(0,0,0,.6)', // IOS
						shadowOffset: {height: 1, width: 1}, // IOS
						shadowOpacity: 1, // IOS
						shadowRadius: 2, //IOS
						elevation: 4, // Android
					}}>
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
					<View
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: [{translateY: -8}, {translateX: -35}],
							flexDirection: 'row',
							alignItems: 'flex-end',
						}}>
						<Text
							style={[
								{
									fontFamily: 'Montserrat-Medium',
									color: 'rgba(255,255,255,.9)',
								},
								textstyles.textSize14,
							]}>
							Checkout
						</Text>
						{this.state.ellipsesLoading && <EllipsesLoading />}
					</View>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	headerText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 20,
		color: 'rgba(255,255,255,0)',
		paddingHorizontal: 14,
		lineHeight: 26,
	},
	linearGradient17131a: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},

	/*
	 */
	purchaseDetailContainerTop: {
		//flex:1.15,
		height: 150,
		backgroundColor: '#2f2536',
		borderTopLeftRadius: 2,
		borderTopRightRadius: 2,
	},
	purchaseDetailContainerTopHeader: {
		flex: 0.3,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#5a4964',
		borderTopLeftRadius: 2,
		borderTopRightRadius: 2,
		paddingHorizontal: 15,
	},

	purchaseDetailContainerTopSubItem: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 5,
	},
	purchaseDetailContainerTopSubItemLeft: {
		flex: 1.5,
		paddingHorizontal: 15,
	},
	purchaseDetailContainerTopSubItemRight: {
		flex: 1,
	},

	subItemHeadingTextView: {
		flex: 1,
		justifyContent: 'center',
	},
	subItemHeadingText: {
		fontFamily: 'Montserrat-Medium',
		fontSize: 12,
		color: 'rgba(255,255,255,.9)',
		//textTransform: 'uppercase',
	},
	subItemSubHeadingTextView: {
		flex: 1,
		justifyContent: 'center',
	},
	subItemSubHeadingText: {
		fontFamily: 'Montserrat',
		fontSize: 12,
		color: 'white',
	},
	purchaseDetailContainerTopFooter: {
		flex: 0.3,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	/*
	 */

	purchaseDetailContainerBottomSubItemTopLeft: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	subItemBottomTopLeftLeftText: {
		fontFamily: 'Open Sans',
		fontSize: 12,
		textTransform: 'uppercase',
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,.4)',
		padding: 4,
	},
	subItemBottomTopLeftRightText: {
		fontFamily: 'Open Sans',
		fontSize: 12,
		textTransform: 'uppercase',
		marginLeft: 5,
	},
	subItemBottomTopRightLeftText: {
		fontFamily: 'Open Sans',
		fontSize: 12,
		textTransform: 'uppercase',
	},
	subItemBottomTopRightRightText: {
		fontFamily: 'Open Sans',
		fontSize: 22,
		textTransform: 'uppercase',
		marginLeft: 5,
	},

	purchaseDetailContainerBottomSubItemTopRight: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},

	subItemBottomBottomFooterText: {
		fontFamily: 'Open Sans',
		fontSize: 9,
		color: 'gray',
		marginTop: 5,
	},
	footerView: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	footerText: {
		fontFamily: 'Open Sans',
		fontSize: 10,
		color: '#5a4964',
		textAlign: 'center',
		textTransform: 'uppercase',
		width: 250,
	},
});
export const CheckoutScreenStaticOptions = {
	//static methods not hoisted, push options
	//backgroundImage: require('project/src/assets/bg/hero-image-bg-gradient.png'),
	backgroundImage: require('project/src/assets/bg/hero-image-bg-purple.png'),
	topBar: {
		visible: true,
		drawBehind: true,
		title: {
			text: 'Checkout',
			color: 'white',
		},
		background: {
			color: 'white',
		},
		backButton: {
			color: 'white',
		},
		background: {
			color: 'transparent',
		},
	},
	bottomTabs: {
		visible: false,
	},
};
const ThemeWithTheme = withTheme(GradientTheme);
CheckoutScreen = withAPI(CheckoutScreen);
export default CheckoutScreen;
