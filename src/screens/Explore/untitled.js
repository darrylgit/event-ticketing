import React, {Component} from 'react';
import {
	SafeAreaView,
	Animated,
	Platform,
	ActivityIndicator,
	ScrollView,
	View,
	TouchableOpacity,
	ImageBackground,
	Text,
	Keyboard,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {
	setFilteredList,
	setFilter,
	cacheDataFilter,
	pushModalToStack,
	popModalFromStack,
	clearUI,
} from 'project/src/store/actions/index';
import {withAPI} from 'passioo/api/index';
import Search from 'project/src/components/Search/Search';
import FullScreenModal from 'project/src/components/UITemplates/Modal/Modal';
import EVENT from 'project/src/constants/event';
import {StackList, VerticalStackList} from 'project/src/components/List/List';
import {ChoiceSelectorButtonStack} from 'project/src/components/UITemplates/Button/Button';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MCIcon} from 'project/src/components/UITemplates/Icon/Icon';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

import {CheckoutScreenStaticOptions} from 'project/src/screens/Checkout/Checkout';

class ExploreScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			scrollY: new Animated.Value(0),
			adjustSearchBarWidth: new Animated.Value(1),
			adjustSearchBarCancelDisplay: new Animated.Value(0),
			adjustSearchBarCancelOpacity: new Animated.Value(0),
			slideInOut: new Animated.Value(1),
		};
		const {doFilterWithParams, doFilterAccountsWithParams} = this.props.api;
		this.doFilterWithParams = doFilterWithParams;
		this.doFilterAccountsWithParams = doFilterAccountsWithParams;
	}

	componentDidMount = () => this.fetchEventsDataHandler(this.props.filter);
	componentWillUnmount = () => this.props.doClearUI('stackedModals', []);

	fetchEventsDataHandler = filter =>
		this.doFilterWithParams(filter)
			.then(
				res =>
					new Promise((resolve, reject) =>
						res.status === 200 ? resolve(res.json()) : reject(res),
					),
			)
			.then(resJson => this.props.onSetFilteredList('events', resJson.results))
			.then(() => this.setState({isLoading: false}))
			.catch(error => console.error(error));

	fetchAccountsDataHandler = filter =>
		//fetch only when cityname is different from last
		this.doFilterAccountsWithParams(
			Object.assign(filter, {['cityname']: this.props.filter.cityname}),
		)
			.then(
				res =>
					new Promise((resolve, reject) =>
						res.status === 200 ? resolve(res.json()) : reject(res),
					),
			)
			.then(resJson =>
				this.props.onSetFilteredList(
					'groupsByLocationFetchedData',
					resJson.results,
				),
			)
			.then(() =>
				this.props.onCacheDataFilter(
					'currentDataFilteredBy',
					Object.assign(this.props.currentDataFilteredBy, {
						['merchantsData']: filter,
					}),
				),
			)
			.catch(error => console.log(error));

	submitFilterHandler = filter =>
		(this.timeoutHandler = setTimeout(() => {
			this.fetchEventsDataHandler(filter);
		}, 600));

	doNavigateToNextScreen = (action, key) => {
		var selectedEvent = this.props.events.find(event => {
			return event.id === key;
		});
		const {title} = selectedEvent;
		const OverrideCheckoutScreenStaticOptions = Object.assign(
			{},
			CheckoutScreenStaticOptions,
			{
				...CheckoutScreenStaticOptions,
				topBar: {
					...CheckoutScreenStaticOptions.topBar,
					title: {
						...CheckoutScreenStaticOptions.topBar.title,
						text: title,
					},
				},
			},
		);
		Navigation.push(this.props.componentId, {
			component: {
				name: 'project.CheckoutScreen',
				passProps: {
					selectedEvent: selectedEvent,
				},
				options: OverrideCheckoutScreenStaticOptions,
			},
		});
	};

	itemSelectedHandler = (action, key) => {
		if (action === 'filterSelected') {
			Navigation.showModal({
				stack: {
					children: [
						{
							component: {
								name: 'project.FilterScreen',
								options: {
									statusBar: {
										visible: true,
									},
									topBar: {
										visible: true,
										drawBehind: false,
										background: {
											color: 'white',
										},
										leftButtons: [
											{
												id: 'closeButtonTopBarId',
												systemItem: 'stop',
												color: 'black',
												//component: {
												//name: 'project.MCCloseIcon',
												//},
											},
										],
									},
								},
								passProps: {
									submitButtonSelected: this.submitFilterHandler,
									onChangeSearchHandler: this.onChangeSearchHandler,
								},
							},
						},
					],
				},
			});
		}
	};

	setFilterHandler = (k, v) =>
		Promise.resolve(
			this.props.onSetFilter(Object.assign(this.props.filter, {[k]: v})),
		);

	adjustSearchBarHandler = val =>
		Promise.resolve(
			Animated.parallel([
				Animated.timing(this.state.adjustSearchBarWidth, {
					toValue: val,
					duration: 200,
				}),
				Animated.timing(this.state.adjustSearchBarCancelOpacity, {
					toValue: val === 0 ? 1 : 0,
					duration: 200,
				}),
			]).start(),
		);

	slideInOut = val =>
		Animated.timing(this.state.slideInOut, {
			toValue: val,
			duration: 300,
		}).start();

	push = obj =>
		Promise.resolve(this.props.onPushModalToStack(obj)).then(
			() => obj.id === 2 && this.slideInOut(0),
		);

	pop = obj =>
		obj.id === 2
			? Promise.resolve(this.slideInOut(1)).then(() => {
					this.timoutHandler = setTimeout(() => {
						this.props.onPopModalFromStack(obj);
					}, 300);
			  })
			: this.props.onPopModalFromStack(obj);

	onChangeSearchHandler = (action, topic, event) => {
		const SEARCH_BY = {
			location: {
				using: EVENT.CITIES,
				target: 'value',
				storage: 'locationSearchResults',
			},
			groupByLocation: {
				using: this.props.groupsByLocationFetchedData,
				target: 'email',
				storage: 'groupsByLocationSearchResults',
			},
		};
		var results = [];
		SEARCH_BY[topic]['using'].forEach(entry => {
			if (
				event.nativeEvent.text !== '' &&
				entry[SEARCH_BY[topic]['target']].length >=
					event.nativeEvent.text.length
			) {
				if (
					entry[SEARCH_BY[topic]['target']].includes(event.nativeEvent.text)
				) {
					results = results.concat(entry);
				}
			}
		});

		Promise.resolve(
			this.props.onSetFilteredList(SEARCH_BY[topic]['storage'], results),
		);
	};

	merchantSelectedActionHandler = () => {
		//push to organization profile page
		return;
	};

	checkDataUpToDateWithFilter = (group, check) => {
		// merhcants are filtered by those who have events in
		// current city, but may have events in other cities
		// we can check if they are filtered by current city
		// by storing value for what location they were filtered
		// by in the previous api call.
		const DATA_TO_CHECK = {
			MERCHANTS: {
				byLocation:
					this.props.filter?.cityname ===
					this.props.currentDataFilteredBy['merchantsData']?.cityname,
			},
		};

		return DATA_TO_CHECK[group][check];
	};

	searchItemSelectedHandler = (klass, group, val) => {
		// handler for one click filtering
		const ACTION_FOR_GROUP = {
			CITIES: {
				action:
					val === this.props.filter?.cityname
						? this.pop({id: 2, next: null})
						: this.setFilterHandler('cityname', val)
								.then(() => this.pop({id: 2, next: null}))
								.then(() => this.fetchAccountsDataHandler({is_seller: true}))
								.then(() => this.fetchEventsDataHandler(this.props.filter)),
			},
			MERCHANTS: {
				action: this.merchantSelectedActionHandler(),
			},
		};

		Promise.resolve(ACTION_FOR_GROUP[group]['action']);
	};

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{flex: 1, justifyContent: 'center', padding: 20}}>
					<ActivityIndicator />
				</View>
			);
		}
		const {stackedModals} = this.props;

		const cityname =
			EVENT.CITIES.find(city => {
				return city.key === this.props.filter.cityname;
			})?.value || 'Current Location';

		const topBarBGColorOpacity = this.state.scrollY.interpolate({
			inputRange: [0, 50],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});

		const adjustSearchBarWidth = this.state.adjustSearchBarWidth.interpolate({
			inputRange: [0, 1],
			outputRange: ['87.5%', '100%'],
		});

		const slideInOut = this.state.slideInOut.interpolate({
			inputRange: [0, 1],
			outputRange: ['0%', '100%'],
		});

		const findModalInStack = obj => {
			return stackedModals?.find(modal => {
				return modal.id === obj.id;
			})
				? {
						visible: 'flex',
						opacity: 1,
				  }
				: {
						visible: 'none',
						opacity: 0,
				  };
		};
		return (
			<View style={{flex: 1}}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					onScroll={Animated.event([
						{nativeEvent: {contentOffset: {y: this.state.scrollY}}},
					])}>
					<View style={{marginTop: 100}}>
						<StackList
							horizontal
							dataSource={EVENT.FILTER}
							listItemAction="category"
							listItemActionSelected={() =>
								this.setFilterHandler().then(() =>
									this.fetchEventsDataHandler(this.props.filter),
								)
							}
							header="Event Categories"
							separator
						/>
					</View>
					<VerticalStackList
						dataSource={this.props.events}
						listItemAction="eventSelected"
						listItemActionSelected={this.doNavigateToNextScreen}
						header="Events"
						separator
						scrollEnabled={false}
						listWrapperStyle={[{}]}
					/>
				</ScrollView>
				<View
					style={[{position: 'absolute', top: 0, width: '100%', height: 115}]}>
					<Animated.View
						style={[
							{
								opacity: topBarBGColorOpacity,
								position: 'absolute',
								top: 0,
								width: '100%',
								height: 110,
								backgroundColor: 'rgba(233, 42, 75, 1)',
							},
						]}
					/>
					<View
						style={[
							flexstyles.flexRow,
							flexstyles.flexAlignEnd,
							{width: '100%', height: 45, top: 60, paddingHorizontal: 10},
						]}>
						<ChoiceSelectorButtonStack
							choiceSelected={cityname}
							header="Upcoming events in"
							chevron="none"
							buttonTextStyle={[textstyles.textPrimarySemiBold]}
							buttonWrapperStyle={[{}]}
						/>
						<View style={{top: 4, left: 10}}>
							<TouchableOpacity
								onPress={() => this.itemSelectedHandler('filterSelected')}
								style={[
									{
										width: 44,
										height: 44,
										alignItems: 'center',
										justifyContent: 'center',
									},
								]}>
								<FontAwesome name="filter" size={18} color="white" />
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<FullScreenModal
					visible={findModalInStack({id: 1, next: 2}).visible}
					opacity={findModalInStack({id: 1, next: 2}).opacity}
					enableSearch
					displaySearchResults
					locationSelected={cityname}
					searchItemSelected={() => this.push({id: 2, next: null})}>
					<View style={[{width: '100%', height: '100%', paddingTop: 20}]}>
						{this.props.groupsByLocationSearchResults?.map(
							(entry, index) =>
								// organizations with event in current city
								entry.events[0] &&
								entry.events[0].venue?.city?.cityname ===
									this.props.filter?.cityname && (
									<TouchableOpacity
										key={index}
										activeOpacity={0.7}
										onPress={() =>
											this.searchItemSelectedHandler(
												'classSearch',
												'MERCHANTS',
												index,
											)
										}
										style={[
											flexstyles.flexRow,
											{
												width: '100%',
												paddingVertical: 10,
												borderBottomWidth: 1,
												borderColor: 'rgba(0,0,0,.1)',
											},
										]}>
										<View
											style={[
												flexstyles.flexAlignCenter,
												flexstyles.flexJustifyStart,
												{width: '25%', height: '100%'},
											]}>
											<ImageBackground
												source={{uri: entry.events[0].image}}
												resizeMode="cover"
												imageStyle={{borderRadius: 35}}
												style={[{width: 70, height: 70}]}
											/>
										</View>
										<View
											style={[
												flexstyles.flex,
												{paddingLeft: 2, paddingRight: 4},
											]}>
											<Text
												numberOfLines={1}
												style={[
													textstyles.textPrimaryMedium,
													textstyles.textSize18,
													colorstyles.Dark,
												]}>
												Org name {index}
											</Text>
											<Text
												numberOfLines={2}
												style={[
													textstyles.textPrimaryMedium,
													textstyles.textSize16,
													colorstyles.Dark,
												]}>
												Event • {entry.events[0].start_date} at{' '}
												{entry.events[0].start_time} •{' '}
												{entry.events[0].venue?.venuename} •{' '}
												{entry.events[0].venue?.city?.cityname}
											</Text>
										</View>
									</TouchableOpacity>
								),
						)}
					</View>
				</FullScreenModal>
				<View
					style={[
						flexstyles.flexRow,
						{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 30,
							width: '100%',
							paddingHorizontal: 6,
						},
					]}>
					<Animated.View
						style={[
							{
								position: 'absolute',
								right: 8,
								display: 'flex',
								opacity: this.state.adjustSearchBarCancelOpacity,
							},
						]}>
						<TouchableOpacity
							onPress={() =>
								this.adjustSearchBarHandler(1)
									.then(() => Keyboard.dismiss())
									.then(() => this.pop({id: 1, next: 2}))
							}
							style={[
								{
									alignItems: 'center',
									justifyContent: 'center',
								},
							]}>
							<MCIcon name="window-close" />
						</TouchableOpacity>
					</Animated.View>
					<Search
						onFocus={() =>
							this.adjustSearchBarHandler(0)
								.then(() => this.push({id: 1, next: 1}))
								.then(
									() =>
										this.checkDataUpToDateWithFilter(
											'MERCHANTS',
											'byLocation',
										) === false &&
										this.fetchAccountsDataHandler({is_seller: true}),
								)
						}
						action="searchInputChanged"
						searchingFor="groupByLocation"
						searchBarPlaceholder="Search Organizations"
						searchWrapperStyle={{position: 'absolute', left: 4}}
						searchStyle={{backgroundColor: 'red'}}
						searchInput={this.state.searchInput}
						onChange={this.onChangeSearchHandler}
						searchBarWidth={adjustSearchBarWidth}
					/>
				</View>
				<FullScreenModal
					visible={findModalInStack({id: 2, next: null}).visible}
					opacity={findModalInStack({id: 2, next: null}).opacity}
					defaultNavBarWithSearch
					enableSearch
					searchBar
					onChange={this.onChangeSearchHandler}
					displayDefaultSearchResults={this.props.locationSearchResults}
					searchingFor="location"
					searchItemSelected={this.searchItemSelectedHandler}
					searchItemsGroupKey="CITIES"
					enableCurrentLocationSearch
					locationSelected={cityname}
					searchBarPlaceholder="City, state or zip code"
					rightButton={{type: 'text', value: 'Cancel'}}
					rightButtonId="cancelButton"
					rightButtonAction="closeCitySearch"
					rightButtonSelected={() => this.pop({id: 2, next: null})}
					navWrapperStyle={[colorstyles.BGWhite]}
					searchContainerStyle={[]}
					inputStyle={[textstyles.textSize18]}
					modalStyle={[{top: slideInOut, backgroundColor: 'rgba(0,0,0.02)'}]}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		events: state.filter.events,
		filter: state.filter.filter,
		currentDataFilteredBy: state.filter.currentDataFilteredBy,
		stackedModals: state.ui.stackedModals,
		locationSearchResults: state.filter.locationSearchResults,
		groupsByLocationFetchedData: state.filter.groupsByLocationFetchedData,
		groupsByLocationSearchResults: state.filter.groupsByLocationSearchResults,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetFilteredList: (key, value) => dispatch(setFilteredList(key, value)),
		onSetFilter: filter => dispatch(setFilter(filter)),
		onCacheDataFilter: filter => dispatch(onCacheDataFilter(filter)),
		onPushModalToStack: ui => dispatch(pushModalToStack(ui)),
		onPopModalFromStack: ui => dispatch(popModalFromStack(ui)),
		onSetFilteredList: (key, value) => dispatch(setFilteredList(key, value)),
		doClearUI: (key, value) => dispatch(clearUI(key, value)),
	};
};

ExploreScreen = withAPI(ExploreScreen);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ExploreScreen);
