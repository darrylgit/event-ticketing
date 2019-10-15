import React, {Component} from 'react';
import {
	Platform,
	ScrollView,
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {connect} from 'react-redux';
import FullScreenModal from 'project/src/components/UITemplates/Modal/Modal';
import LinearGradient from 'react-native-linear-gradient';
import {ScreenLinkButton} from 'project/src/components/UITemplates/Button/Button';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';
import NativeInvoice from 'project/src/components/Native/Invoice/Invoice';
class PurchaseScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			duration: 20 * 60,
			countDown: '00:00',
		};
	}

	componentDidMount = () => this.setTimer(this.state.duration);

	componentWillUnmount = () => clearTimeout(this.timerHandler);

	setTimer = duration => {
		var timer = duration,
			minutes,
			seconds;

		this.timerHandler = setInterval(() => {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			this.setState({
				countDown: minutes + ':' + seconds,
			});

			if (--timer < 0) {
				Promise.resolve(clearTimeout(this.timerHandler)).then(() =>
					this.props.onSetUIModal({timedOutModal: 'flex'}),
				);
			}
		}, 1000);
	};

	popScreen = () =>
		Navigation.pop(this.props.componentId).then(() =>
			this.props.onSetUIModal({}),
		);

	submitPaymentHandler = () => {
		// display 'time limit reached' screen, prompting user
		// to return to checkout if purchase time ends. Otherwise
		// purchase is okay to submit.

		Promise.all([AntDesign.getImageSource('close', 25, 'black')])
			.then(sources => {
				Navigation.showModal({
					stack: {
						children: [
							{
								component: {
									id: 'PurchaseConfirmationModalId',
									name: 'project.ConfirmationScreen',
									passProps: {
										selectedEvent: this.props.selectedEvent,
										ticketsSelected: this.props.ticketsSelected,
									},
									options: {
										topBar: {
											visible: false,
										},
									},
								},
							},
						],
					},
				});
			})
			.then(() => {
				this.timeoutHandler = setTimeout(() => {
					Navigation.popToRoot(this.props.componentId);
				}, 500);
			});
	};

	render() {
		const subtotal = () => {
			var count = 0;
			this.props.ticketsSelected.forEach(item => {
				count += item.price * item.quantity;
			});
			return count;
		};

		return (
			<View
				style={{
					flex: 1,
					backgroundColor: 'rgba(255,255,255,.95)',
					marginTop: -(Platform.OS !== 'ios' ? 54 : 64),
				}}>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
					}}>
					<View style={{width: '100%', height: 350}}>
						<ImageBackground
							source={{uri: this.props.selectedEvent.image}}
							style={{width: '100%', height: 350}}
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
							marginTop: -135,
							paddingHorizontal: 5,
						}}>
						<Text numberOfLines={2} style={[styles.headerText]}>
							{this.props.selectedEvent.title}
						</Text>
						<View
							style={{
								flex: 1,
								marginTop: 15,
							}}>
							<View style={styles.purchaseDetailContainerTop}>
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

							<View
								style={[
									{
										flex: 1,
										backgroundColor: 'white',
										borderBottomLeftRadius: 2,
										borderBottomRightRadius: 2,
									},
									{backgroundColor: 'rgba(0,0,0,.02)'},
								]}>
								<View
									style={{
										flex: 1,
										borderBottomWidth: 1,
										borderBottomColor: 'rgba(0,0,0,.1)',
									}}>
									<View
										style={[
											{
												borderBottomWidth: 1,
												borderBottomColor: 'rgba(0,0,0,.1)',
												paddingHorizontal: 14,
											},
										]}>
										<View
											style={{
												borderBottomWidth: 1,
												borderBottomColor: 'rgba(0,0,0,.2)',
											}}>
											<View style={{paddingVertical: 8}}>
												{this.props.ticketsSelected.map(item => (
													<View style={{paddingVertical: 6}} key={item.id}>
														<Text
															style={[
																{color: 'rgba(0,0,0,.7)'},
																textstyles.textPrimaryMedium,
																textstyles.textSize14,
															]}>
															{item.name}
														</Text>
														<View
															style={[
																{flexDirection: 'row', paddingVertical: 4},
															]}>
															<View
																style={{
																	flex: 1,
																	flexDirection: 'row',
																	alignItems: 'center',
																}}>
																<Text
																	style={[
																		{color: 'rgba(0,0,0,.7)'},
																		textstyles.textPrimaryMedium,
																		textstyles.textSize14,
																		{
																			borderWidth: 1,
																			borderColor: 'rgba(0,0,0,.075)',
																			paddingVertical: 4,
																			paddingHorizontal: 6,
																		},
																	]}>
																	{item.quantity} tickets
																</Text>
																<View
																	style={{
																		flexDirection: 'row',
																		paddingHorizontal: 4,
																	}}>
																	<Text
																		style={[
																			{color: 'rgba(0,0,0,.7)'},
																			textstyles.textPrimaryMedium,
																			textstyles.textSize12,
																			{paddingHorizontal: 2},
																		]}>
																		@
																	</Text>
																	<Text
																		style={[
																			{color: 'rgba(0,0,0,.7)'},
																			textstyles.textPrimaryMedium,
																			textstyles.textSize14,
																			{paddingHorizontal: 2},
																		]}>
																		${item.price} each
																	</Text>
																</View>
															</View>
															<View
																style={{
																	flex: 1,
																	alignItems: 'flex-end',
																	justifyContent: 'center',
																}}>
																<Text
																	style={[
																		textstyles.textPrimaryMedium,
																		textstyles.textSize16,
																	]}>
																	$ {item.price * item.quantity}
																</Text>
															</View>
														</View>
													</View>
												))}
											</View>

											<View
												style={[{flexDirection: 'row', paddingVertical: 8}]}>
												<View
													style={{
														flex: 1,
														flexDirection: 'row',
														alignItems: 'center',
													}}>
													<Text
														style={[
															{
																color: 'rgba(0,0,0,.4)',
															},
															textstyles.textPrimaryMedium,
															textstyles.textSize16,
														]}>
														Subtotal
													</Text>
												</View>
												<View
													style={{
														flex: 1,
														alignItems: 'flex-end',
														justifyContent: 'center',
													}}>
													<Text
														style={[
															{
																color: 'rgba(0,0,0,.4)',
															},
															textstyles.textPrimaryMedium,
															textstyles.textSize16,
														]}>
														$ {subtotal()}
													</Text>
												</View>
											</View>
										</View>
										<View style={[{flexDirection: 'row', paddingVertical: 20}]}>
											<View
												style={{
													flex: 1,
													flexDirection: 'row',
													alignItems: 'center',
												}}>
												<Text
													style={[
														textstyles.textPrimaryMedium,
														textstyles.textSize16,
													]}>
													Total price
												</Text>
											</View>
											<View
												style={{
													flex: 1,
													alignItems: 'flex-end',
													justifyContent: 'center',
												}}>
												<Text
													style={[
														{
															color: 'rgba(0,0,0,1)',
														},
														textstyles.textPrimaryMedium,
														textstyles.textSize16,
													]}>
													$ {subtotal()}
												</Text>
											</View>
										</View>
									</View>
								</View>
								<View
									style={{
										height: 80,
										flexDirection: 'row',
										paddingHorizontal: 14,
									}}>
									<View
										style={{
											flex: 1,
											justifyContent: 'center',
											alignItems: 'flex-start',
										}}>
										<View style={styles.buttonContainer}>
											<TouchableOpacity
												activeOpacity={0.7}
												style={{
													width: 150,
													height: 32,
													borderWidth: 2,
													borderColor: 'rgba(255, 0, 77, .5)',
													borderTopLeftRadius: 40,
													borderTopRightRadius: 40,
													borderBottomLeftRadius: 40,
													borderBottomRightRadius: 40,
													justifyContent: 'center',
													alignItems: 'center',

													shadowColor: 'rgba(0,0,0, .35)', // IOS
													shadowOffset: {height: 2, width: 1}, // IOS
													shadowOpacity: 1, // IOS
													shadowRadius: 3, //IOS
													backgroundColor: '#fff',
													elevation: 2, // Android
												}}>
												<Text
													style={{
														fontSize: 12,
														fontWeight: '400',
														color: '#24262a',
														textTransform: 'uppercase',
													}}>
													Negotiate Price
												</Text>
											</TouchableOpacity>
										</View>
										<Text style={styles.subItemBottomBottomFooterText}>
											Tickets not secured until purchase.
										</Text>
									</View>
									<View
										style={{
											flex: 1,
											justifyContent: 'center',
											alignItems: 'flex-end',
										}}>
										<TouchableOpacity
											onPress={() => this.submitPaymentHandler()}
											style={{
												width: 150,
												height: 32,
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center',

												borderRadius: 50,
												backgroundColor: 'rgba(255,255,255,1)',
												shadowColor: 'rgba(0,0,0,.6)', // IOS
												shadowOffset: {height: 1, width: 1}, // IOS
												shadowOpacity: 1, // IOS
												shadowRadius: 2, //IOS
												elevation: 4, // Android
											}}>
											<LinearGradient
												colors={[
													'rgba(239, 47, 115, 1)',
													'rgba(246, 124, 36, 1)',
												]}
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

											<Text
												style={{
													fontSize: 12,
													fontWeight: '500',
													color: 'rgba(255,255,255,.9)',
													textTransform: 'uppercase',
												}}>
												BUY NOW
											</Text>
										</TouchableOpacity>
										<Text style={styles.subItemBottomBottomFooterText}>
											Tickets are immediately secured.
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.footerView}>
						<Text style={styles.footerText}>
							There are currently 6 other people negotiating these tickets
						</Text>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		modal: state.ui.modal,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetUIModal: modal => dispatch(setUIModal(modal)),
	};
};

export const PurchaseScreenStaticOptions = {
	//static methods not hoisted, push options
	//backgroundImage: require('project/src/assets/bg/hero-image-bg-gradient.png'),
	//backgroundImage: require('project/src/assets/bg/hero-image-bg-purple.png'),
	topBar: {
		visible: true,
		drawBehind: true,
		title: {
			text: 'Purchase',
			color: 'white',
		},
		background: {
			color: 'white',
		},
		backButton: {
			color: 'white',
		},
	},
	bottomTabs: {
		visible: false,
	},
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(PurchaseScreen);

const styles = StyleSheet.create({
	headerText: {
		fontFamily: 'Open Sans',
		fontSize: 24,
		color: 'rgba(255,255,255,1)',
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
