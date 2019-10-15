import React, {Component} from 'react';
import {
	View,
	ScrollView,
	Text,
	TouchableOpacity,
	NativeModules,
} from 'react-native';
import {connect} from 'react-redux';
import {setFilter, setFilterKeyValue} from 'project/src/store/actions/index';
import {Navigation} from 'react-native-navigation';

import SearchBar, {
	SearchBarHeight,
} from 'project/src/components/Native/SearchBar/SearchBar';
import RNStatusBar, {
	getStatusBarHeight,
} from 'project/src/components/Native/StatusBar/StatusBar';

import EVENT from 'project/src/constants/event';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
	colorstyles,
	textstyles,
} from 'project/src/components/UITemplates/styles';

const CitiesAvailableToSearch = EVENT.CITIES;
const LOCATION_ICON_WIDTH = 30;
const LOCATION_KEY_VIA_BACKEND = 'cityname';

class LocationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			citiesAvailableToSearchResults: null,
		};
	}
	componentDidMount = () => this.searchBar.focus();

	doDismissCurrentScreen = () =>
		Navigation.dismissModal(this.props.componentId);

	doRetrieveCityNameFromCityObject = city => {
		return city?.cityname;
	};

	doRetrieveUpToDateFilter = () => {
		return this.props.filter;
	};

	doUpdateFilterWithLocationSelectedByUser = city => {
		var upToDateFilter = this.doRetrieveUpToDateFilter();
		var cityNameFromCityObject = this.doRetrieveCityNameFromCityObject(city);
		upToDateFilter[LOCATION_KEY_VIA_BACKEND] = cityNameFromCityObject;
		Promise.resolve(this.props.doSetFilter(upToDateFilter));
	};

	doUpdateLocationSelectedByUserDisplay = city =>
		this.props.doSetFilterKeyValue('locationSelectedByUser', city);

	doUpdateLocationSelectedByUser = city => {
		Promise.resolve(this.doUpdateFilterWithLocationSelectedByUser(city))
			.then(() => this.doUpdateLocationSelectedByUserDisplay(city))
			.then(() => this.doSignalUpdatedLocationToPreviousScreen())
			.then(() => this.doDismissCurrentScreen());
	};

	doRetrieveLocationSelectedByUserDisplay = () => {
		return this.props.locationSelectedByUser;
	};

	doCheckLocationSelectedByUserExists = () => {
		var locationSelectedByUser = this.doRetrieveLocationSelectedByUserDisplay();
		var isEmpty = Object.entries(locationSelectedByUser)?.length === 0;
		return isEmpty ? false : true;
	};

	doDisplaySearchResultsWithUserInput = text => {
		var stateOfSearch = text === '' ? null : text;
		this.setState({citiesAvailableToSearchResults: stateOfSearch});
	};

	//signals - listeners
	doSignalUpdatedLocationToPreviousScreen = () =>
		this.props.doReRenderScreenToDiplayUpdatedLocation();

	render() {
		const {
			cityname,
			statename,
			country,
		} = this.doRetrieveLocationSelectedByUserDisplay();

		const previousSelectedLocationExists = this.doCheckLocationSelectedByUserExists();

		return (
			<View style={{flex: 1}}>
				<ScrollView
					style={{backgroundColor: 'white'}}
					contentContainerStyle={{
						paddingTop: SearchBarHeight + getStatusBarHeight(),
					}}>
					<View style={{width: '100%', paddingHorizontal: 10}}>
						<TouchableOpacity
							style={{
								width: '100%',
								flexDirection: 'row',
								alignItems: 'center',
							}}>
							<View
								style={{
									width: LOCATION_ICON_WIDTH,
									height: 30,
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<MaterialCommunityIcons name="near-me" size={24} />
							</View>
							<View
								style={{
									width: '100%',
									paddingHorizontal: 10,
								}}>
								<View
									style={{
										width: '100%',
										borderBottomWidth: 1,
										borderBottomColor: 'rgba(0,0,0,.09)',
										paddingVertical: 10,
									}}>
									<Text
										style={[
											textstyles.textPrimarySemiBold,
											textstyles.textSize18,
											colorstyles.Dark,
										]}>
										Current Location
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					</View>
					{previousSelectedLocationExists && (
						<View style={{width: '100%', paddingHorizontal: 10}}>
							<TouchableOpacity
								style={{
									width: '100%',
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<View
									style={{
										width: LOCATION_ICON_WIDTH,
										height: 30,
										alignItems: 'center',
										justifyContent: 'center',
									}}>
									<MaterialCommunityIcons
										name="map-marker"
										size={24}
										color={colorstyles.DjangoBlue.color}
									/>
								</View>
								<View
									style={{
										width: '100%',
										paddingHorizontal: 10,
									}}>
									<View
										style={{
											width: '100%',
											borderBottomWidth: 1,
											borderBottomColor: 'rgba(0,0,0,.09)',
											paddingVertical: 10,
										}}>
										<Text
											style={[
												textstyles.textPrimarySemiBold,
												textstyles.textSize18,
												colorstyles.DjangoBlue,
											]}>
											{cityname}
										</Text>
										<Text
											numberOfLines={1}
											style={[
												textstyles.textPrimarySemiBold,
												textstyles.textSize14,
												{color: 'rgba(0,0,0,.75)'},
											]}>
											{statename}, {country}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					)}
					{CitiesAvailableToSearch.map(
						(city, index) =>
							city.cityname?.includes(
								this.state.citiesAvailableToSearchResults,
							) && (
								<View
									key={index}
									style={{width: '100%', paddingHorizontal: 10}}>
									<TouchableOpacity
										onPress={() => this.doUpdateLocationSelectedByUser(city)}
										style={{
											width: '100%',
											flexDirection: 'row',
											alignItems: 'center',
										}}>
										<View
											style={{
												width: '100%',
												paddingHorizontal: 10,
												left: LOCATION_ICON_WIDTH,
											}}>
											<View
												style={{
													width: '100%',
													borderBottomWidth: 1,
													borderBottomColor: 'rgba(0,0,0,.09)',
													paddingVertical: 10,
												}}>
												<Text
													style={[
														textstyles.textPrimarySemiBold,
														textstyles.textSize18,
														colorstyles.Dark,
													]}>
													{city.cityname}
												</Text>
												<Text
													numberOfLines={1}
													style={[
														textstyles.textPrimarySemiBold,
														textstyles.textSize14,
														{color: 'rgba(0,0,0,.75)'},
													]}>
													{city.statename}, {city.country}
												</Text>
											</View>
										</View>
									</TouchableOpacity>
								</View>
							),
					)}
				</ScrollView>
				<View
					style={[
						{
							position: 'absolute',
							top: 0,
							width: '100%',
							height: SearchBarHeight + getStatusBarHeight(),
							backgroundColor: 'white',
						},
					]}>
					<View
						style={{
							top: getStatusBarHeight(),
							borderBottomWidth: 1,
							borderBottomColor: 'rgba(0,0,0,.085)',
						}}>
						<SearchBar
							ref={searchBar => (this.searchBar = searchBar)}
							placeholder="Search"
							onChangeText={text =>
								this.doDisplaySearchResultsWithUserInput(text)
							}
							onSearchButtonPress={console.log('onChangeText')}
							onCancelButtonPress={() => this.doDismissCurrentScreen()}
							searchBarStyle="minimal"
						/>
					</View>
					<RNStatusBar />
				</View>
			</View>
		);
	}
}

export const LocationScreenStaticOptions = {
	statusBar: {
		visible: true,
	},
	topBar: {
		visible: false,
	},
};

LocationScreen.options = LocationScreenStaticOptions;

const mapStateToProps = state => {
	return {
		filter: state.filter.filter,
		locationSelectedByUser: state.filter.locationSelectedByUser,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		doSetFilter: filter => dispatch(setFilter(filter)),
		doSetFilterKeyValue: (k, v) => dispatch(setFilterKeyValue(k, v)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LocationScreen);
