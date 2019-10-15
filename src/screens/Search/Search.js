import React, {Component} from 'react';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	ImageBackground,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {withAPI} from 'passioo/api/index';
import RNNavigationBar, {
	NavigationBarHeight,
} from 'project/src/components/Native/NavigationBar/NavigationBar';
import SearchBar, {
	SearchBarHeight,
} from 'project/src/components/Native/SearchBar/SearchBar';
import RNStatusBar, {
	getStatusBarHeight,
} from 'project/src/components/Native/StatusBar/StatusBar';
import Skeleton from 'project/src/components/UITemplates/Skeleton/Skeleton';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

const START_BODY = getStatusBarHeight() + NavigationBarHeight + SearchBarHeight;
const LOCATION_KEY_VIA_BACKEND = 'cityname';

class SearchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			systemsDownTryAgainLaterMessage: false,
			events: [],
			numberOfToTalResults: 0,
			test: false,
		};
		const {doFilterWithParams} = this.props.api;
		this.doFilterWithParams = doFilterWithParams;
	}

	componentDidMount = () => {
		//fetch events from chosen city only when mounted
		/*
		Caution - fetch returns 200 even if value of cityname in filter is empty
		*/
		var filterWithCityOnly = this.doRetrieveFilterWithOnlyLocation();
		this.fetchEventsData(filterWithCityOnly)
			.then(
				res =>
					new Promise((resolve, reject) =>
						res.status === 200 ? resolve(res.json()) : reject(res),
					),
			)
			.then(
				resJson =>
					(this.setTimeoutHandler = setTimeout(() => {
						this.setState({
							events: resJson.results,
							numberOfToTalResults: resJson.count,
							isLoading: false,
						});
					}, 3000)),
			)
			.catch(error => {
				this.setState({
					systemsDownTryAgainLaterMessage: true,
					isLoading: false,
				});
			});
	};

	fetchEventsData = filter => this.doFilterWithParams(filter);

	doRetrieveUpToDateFilter = () => {
		return this.props.filter;
	};

	doRetrieveCityNameFromFilterKey = () => {
		return LOCATION_KEY_VIA_BACKEND;
	};

	doRetrieveCityNameFromFilter = key => {
		var upToDateFilter = this.doRetrieveUpToDateFilter();
		return upToDateFilter[key];
	};

	doRetrieveFilterWithOnlyLocation = () => {
		var filterCityOnly = {};
		var cityNameFromFilterKey = this.doRetrieveCityNameFromFilterKey();
		var cityNameFromFilter = this.doRetrieveCityNameFromFilter(
			cityNameFromFilterKey,
		);
		filterCityOnly[cityNameFromFilterKey] = cityNameFromFilter;

		return filterCityOnly;
	};

	doNavigateToPreviousScreen = () =>
		Navigation.dismissModal(this.props.componentId);

	render() {
		if (this.state.systemsDownTryAgainLaterMessage) {
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'white',
					}}>
					<Text style={[textstyles.textSecondaryMedium, textstyles.textSize12]}>
						There was a problem fetching the data. Try again later
					</Text>
					<TouchableOpacity
						onPress={() => this.doNavigateToPreviousScreen()}
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							padding: 10,
						}}>
						<Text
							style={[textstyles.textSecondaryMedium, textstyles.textSize12]}>
							There was a problem fetching the data. Try again later
						</Text>
					</TouchableOpacity>
				</View>
			);
		}
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				{!this.state.isLoading ? (
					<View style={{flex: 1, paddingTop: START_BODY}}>
						<View
							style={[
								{
									paddingHorizontal: 10,
									paddingVertical: 8,
									borderTopWidth: 1,
									borderColor: 'rgba(255,255,255,.6)',
								},
							]}>
							<Text
								style={[textstyles.textSecondaryMedium, textstyles.textSize12]}>
								{this.state.numberOfToTalResults} events
							</Text>
						</View>
						<EventList
							dataSource={this.state.events}
							itemSelected={() => this.setState({test: !this.state.test})}
						/>
					</View>
				) : (
					<View style={{flex: 1, paddingTop: 120}}>
						<View
							style={{
								flex: 1,
							}}>
							<Skeleton />
						</View>
					</View>
				)}
				<View
					style={[
						{
							position: 'absolute',
							width: '100%',
							height:
								getStatusBarHeight() + NavigationBarHeight + SearchBarHeight,
						},
					]}>
					<SearchBar
						ref={searchBar => (this.searchBar = searchBar)}
						placeholder="Search"
						searchBarStyle="minimal"
						style={{
							position: 'absolute',
							top: getStatusBarHeight() + NavigationBarHeight,
							left: 0,
							right: 0,
							height: SearchBarHeight,
						}}
					/>
					<RNNavigationBar
						style={{
							position: 'absolute',
							top: getStatusBarHeight(),
							left: 0,
							right: 0,
							height: NavigationBarHeight,
						}}
						onBackButtonPress={() => this.doNavigateToPreviousScreen()}
						barTintColor="white"
						navigationButtons={{leftButtons: [{systemItem: 'cancel'}]}}
					/>
					<RNStatusBar />
				</View>
			</View>
		);
	}
}

const EventList = props => {
	renderSeparator = () => {
		return <View style={[{height: 5}]} />;
	};
	renderFooter = () => {
		return <View style={[{height: 10}]} />;
	};
	renderHeader = () => {
		return (
			<View>
				{props.header && (
					<View
						style={[
							{
								paddingHorizontal: 10,
								paddingVertical: 8,
								borderTopWidth: 1,
								borderColor: 'rgba(255,255,255,.6)',
							},
						]}>
						<Text
							style={[
								textstyles.textSecondaryMedium,
								textstyles.textSize12,
								textstyles.textUpper,
							]}>
							{props.header}
						</Text>
					</View>
				)}
			</View>
		);
	};
	return (
		<FlatList
			style={{flex: 1, paddingHorizontal: 5, paddingVertical: 4}}
			ItemSeparatorComponent={renderSeparator}
			ListFooterComponent={renderFooter}
			ListHeaderComponent={renderHeader}
			data={props.dataSource}
			keyExtractor={({id}, index) => id.toString()}
			renderItem={({item}) => (
				<TouchableOpacity
					onPress={props.itemSelected}
					activeOpacity={0.9}
					style={[
						{
							width: '100%',
							height: 90,
							flexDirection: 'row',
							alignItems: 'center',
							backgroundColor: 'rgba(255,255,255,.9)',
						},
					]}>
					<View style={[{flex: 1, paddingHorizontal: 5}]}>
						<View
							style={{
								width: '100%',
								height: 90 / 4,
								justifyContent: 'flex-end',
							}}>
							<Text
								style={[
									textstyles.textSecondary,
									textstyles.textSize12,
									{color: '#e92a4b'},
								]}>
								{item.category}
							</Text>
						</View>
						<View
							style={{
								width: '100%',
								height: 90 / 2,
								justifyContent: 'center',
							}}>
							<Text
								numberOfLines={2}
								style={[
									textstyles.textSecondary,
									textstyles.textSize12,
									colorstyles.Dark,
								]}>
								{item.title}
							</Text>
						</View>
						<View
							style={{
								width: '100%',
								height: 90 / 4,
								justifyContent: 'flex-start',
							}}>
							<Text
								numberOfLines={1}
								style={[
									textstyles.textSecondary,
									textstyles.textSize12,
									colorstyles.Purple,
								]}>
								{item.venue.venuename}
							</Text>
						</View>
					</View>
					<ImageBackground
						source={{uri: item.image}}
						resizeMode="cover"
						imageStyle={{borderRadius: 1}}
						style={[{width: (90 * 16) / 9, height: 90}]}
					/>
				</TouchableOpacity>
			)}
		/>
	);
};

export const SearchScreenStaticOptions = {
	//static methods not hoisted, push options
	//backgroundImage: require('project/src/assets/bg/hero-image-bg-gradient.png'),
	//backgroundImage: require('project/src/assets/bg/hero-image-bg-purple.png'),
	topBar: {
		visible: false,
		drawBehind: true,
	},
	bottomTabs: {
		visible: false,
	},
};

SearchScreen.options = SearchScreenStaticOptions;

const mapStateToProps = state => {
	return {
		filter: state.filter.filter,
	};
};

SearchScreen = withAPI(SearchScreen);
export default connect(mapStateToProps)(SearchScreen);
