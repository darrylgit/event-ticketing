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
	setFilterKeyValue,
	cacheDataFilter,
	clearUI,
} from 'project/src/store/actions/index';
import {withAPI} from 'passioo/api/index';
import EVENT from 'project/src/constants/event';
import {
	EventCategoryHorizontalList,
	VerticalStackList,
} from 'project/src/components/List/List';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

import {CheckoutScreenStaticOptions} from 'project/src/screens/Checkout/Checkout';
import {FilterScreenStaticOptions} from 'project/src/screens/Filter/Filter';
import {SearchScreenStaticOptions} from 'project/src/screens/Search/Search';

import SearchBar, {
	SearchBarHeight,
} from 'project/src/components/Native/SearchBar/SearchBar';
import RNStatusBar, {
	getStatusBarHeight,
} from 'project/src/components/Native/StatusBar/StatusBar';
import Skeleton from 'project/src/components/UITemplates/Skeleton/Skeleton';
const NAVIGATION_BAR_ANIMATION_HEIGHT =
	getStatusBarHeight() + SearchBarHeight + 44 + 5;
const START_BODY = SearchBarHeight + 44 + 5;
const EVENT_CATEGORY_KEY_VIA_BACKEND = 'category';

class ExploreScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationUpdateReceived: false,
			isLoading: true,
			scrollY: new Animated.Value(0),
			adjustSearchBarCancelDisplay: new Animated.Value(0),
			adjustSearchBarCancelOpacity: new Animated.Value(0),
			slideInOut: new Animated.Value(1),
		};
		const {doFilterWithParams, doFilterAccountsWithParams} = this.props.api;
		this.doFilterWithParams = doFilterWithParams;
		this.doFilterAccountsWithParams = doFilterAccountsWithParams;
	}

	componentDidMount = () => {
		this.fetchEventsDataHandler(this.props.filter);
	};

	fetchEventsDataHandler = filter =>
		this.doFilterWithParams(filter)
			.then(
				res =>
					new Promise((resolve, reject) =>
						res.status === 200 ? resolve(res.json()) : reject(res),
					),
			)
			.then(resJson => this.props.onSetFilteredList('events', resJson.results))
			.then(
				() =>
					(this.setTimeoutHandler = setTimeout(() => {
						this.setState({
							isLoading: false,
						});
					}, 3000)),
			)
			.catch(error => console.error(error));

	doFetchEventsWithFilter = filter =>
		(this.timeoutHandler = setTimeout(() => {
			this.fetchEventsDataHandler(filter);
		}, 600));

	doNavigateToCheckoutScreen = (action, key) => {
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

	doNavigateToFilterScreen = () =>
		Navigation.showModal({
			stack: {
				children: [
					{
						component: {
							name: 'project.FilterScreen',
							passProps: {
								submitButtonSelected: this.doFetchEventsWithFilter,
								doReRenderScreenToDiplayUpdatedLocation: this
									.doReRenderScreenToDiplayUpdatedLocation,
							},
							options: FilterScreenStaticOptions,
						},
					},
				],
			},
		});

	doNavigateToSearchScreen = () =>
		Navigation.showOverlay({
			component: {
				name: 'project.SearchScreen',
				options: SearchScreenStaticOptions,
			},
		});

	doExchangeKeyForBackendKey = k => {
		var BACKEND_KEY_EXCHANGE = {
			eventCategorySelectedByUser: EVENT_CATEGORY_KEY_VIA_BACKEND,
		};
		return BACKEND_KEY_EXCHANGE[k];
	};

	doRetrieveUpToDateFilter = () => {
		return this.props.filter;
	};

	doUpdateFilterWithEventCategorySelectedByUser = (k, v) => {
		var keyForBackendKey = this.doExchangeKeyForBackendKey(k);
		var upToDateFilter = this.doRetrieveUpToDateFilter();
		upToDateFilter[keyForBackendKey] = v;
		this.props.onSetFilter(upToDateFilter);
	};

	doUpdateEventCategorySelectedByUserDisplay = (k, v) =>
		this.props.onSetFilterKeyValue(k, v);

	doUpdateEventCategorySelectedByUser = (k, v) =>
		Promise.resolve(this.doUpdateFilterWithEventCategorySelectedByUser(k, v))
			.then(this.doUpdateEventCategorySelectedByUserDisplay(k, v))
			.then(() => this.doFetchEventsWithFilter(this.props.filter));

	//signals - listeners
	doReRenderScreenToDiplayUpdatedLocation = () =>
		this.setState({
			locationUpdateReceived: !this.state.locationUpdateReceived,
		});

	render() {
		const getCitynameOrPlaceholder = placeholder => {
			return this.props.filter?.cityname || placeholder;
		};

		const topBarBGColorOpacity = this.state.scrollY.interpolate({
			inputRange: [0, 50],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		});

		return (
			<View style={{flex: 1}}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					onScroll={Animated.event([
						{nativeEvent: {contentOffset: {y: this.state.scrollY}}},
					])}>
					<View
						style={{
							marginTop: START_BODY,
						}}>
						<EventCategoryHorizontalList
							horizontal
							dataSource={EVENT.FILTER}
							filterKey="eventCategorySelectedByUser"
							header="Event Categories"
							separator
							itemSelected={this.doUpdateEventCategorySelectedByUser}
						/>

						{!this.state.isLoading ? (
							<VerticalStackList
								dataSource={this.props.events}
								listItemAction="eventSelected"
								listItemActionSelected={this.doNavigateToCheckoutScreen}
								header="Events"
								separator
								scrollEnabled={false}
								listWrapperStyle={[{}]}
							/>
						) : (
							<View style={{flex: 1}}>
								<View
									style={{
										flex: 1,
									}}>
									<Skeleton
										style={{backgroundColor: 'rgba(255,255,255,.25)'}}
									/>
								</View>
							</View>
						)}
					</View>
				</ScrollView>
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						height: getStatusBarHeight() + SearchBarHeight + 44,
					}}>
					<Animated.View
						style={[
							{
								opacity: topBarBGColorOpacity,
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								height: NAVIGATION_BAR_ANIMATION_HEIGHT,
								backgroundColor: 'rgba(233, 42, 75, 1)',
							},
						]}
					/>
					<View
						style={{
							top: SearchBarHeight + getStatusBarHeight(),
							left: 0,
							right: 0,
							height: 44,
							flexDirection: 'row',
							alignItems: 'center',
							paddingHorizontal: 10,
						}}>
						<View style={{flex: 1, height: 44}}>
							<Text
								style={[
									textstyles.textSecondaryMedium,
									textstyles.textSize14,
									{color: 'rgba(255,255,255,.8)'},
								]}>
								Upcoming events in
							</Text>
							<View>
								<Text
									style={[
										textstyles.textPrimarySemiBold,
										textstyles.textSize22,
										{color: 'rgba(255,255,255,.9)'},
									]}>
									{getCitynameOrPlaceholder('Hampton')}
								</Text>
							</View>
						</View>
						<View style={{position: 'absolute', top: 10, right: 0}}>
							<TouchableOpacity
								onPress={() => this.doNavigateToFilterScreen()}
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

					<View
						style={[
							{
								position: 'absolute',
								top: 0,
								width: '100%',
								height: SearchBarHeight + getStatusBarHeight(),
							},
						]}>
						<TouchableOpacity
							onPress={() => this.doNavigateToSearchScreen()}
							activeOpacity={0.6}
							style={{
								top: getStatusBarHeight(),
							}}>
							<SearchBar
								ref={searchBar => (this.searchBar = searchBar)}
								placeholder="Search"
								editable={false}
								searchBarStyle="minimal"
								textFieldBackgroundColor="white"
							/>
						</TouchableOpacity>
						<RNStatusBar />
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		events: state.filter.events,
		filter: state.filter.filter,
		currentDataFilteredBy: state.filter.currentDataFilteredBy,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetFilteredList: (key, value) => dispatch(setFilteredList(key, value)),
		onSetFilter: filter => dispatch(setFilter(filter)),
		onSetFilterKeyValue: (k, v) => dispatch(setFilterKeyValue(k, v)),
		onCacheDataFilter: filter => dispatch(onCacheDataFilter(filter)),
		doClearUI: (key, value) => dispatch(clearUI(key, value)),
	};
};

ExploreScreen = withAPI(ExploreScreen);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ExploreScreen);
