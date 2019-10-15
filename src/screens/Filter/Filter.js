import React, {Component} from 'react';
import {Platform, Animated, ScrollView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
	setFilter,
	setFilterKeyValue,
	setUIIcon,
	setUIModal,
	setFilteredList,
} from 'project/src/store/actions/index';
import {Navigation} from 'react-native-navigation';
import RNStatusBar from 'project/src/components/Native/StatusBar/StatusBar';
import EVENT from 'project/src/constants/event';
import List from 'project/src/components/List/List';
import RoundedButton, {
	SingleRoundButtonStack,
} from 'project/src/components/UITemplates/Button/Button';
import {
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';
import {LocationScreenStaticOptions} from 'project/src/screens/Location/Location';

const EVENT_CATEGORY_KEY_VIA_BACKEND = 'category';

class FilterScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			locationUpdateReceived: false,
		};
		Navigation.events().bindComponent(this);
	}

	navigationButtonPressed({buttonId}) {
		if (buttonId === 'closeButtonTopBarId') {
			this.doDismissCurrentScreen();
		}
	}

	submitButtonSelectedHandler = () =>
		Promise.resolve(this.doDismissCurrentScreen()).then(() =>
			this.props.submitButtonSelected(this.props.filter),
		);

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

	doUpdateEventCategorySelectedByUser = (classId, signal, value) => {
		Promise.resolve(
			this.doUpdateFilterWithEventCategorySelectedByUser(signal, value),
		).then(this.doUpdateEventCategorySelectedByUserDisplay(signal, value));
	};

	iconSelectedHandler = (id, action) => {
		var icon = this.props.icons.find(icon => {
			return icon.id === id;
		});
		var selected = icon !== undefined && icon.selected !== 0 ? 0 : 1;
		Promise.resolve(this.props.onSetUIIcon({id: id, selected: selected}));
	};

	doDismissCurrentScreen = () =>
		Navigation.dismissModal(this.props.componentId);

	doNavigateToLocationSearchScreen = () =>
		Navigation.showModal({
			stack: {
				children: [
					{
						component: {
							name: 'project.LocationScreen',
							passProps: {
								doReRenderScreenToDiplayUpdatedLocation: this
									.doReRenderScreenToDiplayUpdatedLocation,
							},
						},
					},
				],
			},
		});

	//signals - listeners
	doSignalUpdatedLocationToPreviousScreen = () =>
		this.props.doReRenderScreenToDiplayUpdatedLocation();

	doReRenderScreenToDiplayUpdatedLocation = () =>
		Promise.resolve(
			this.setState({
				locationUpdateReceived: !this.state.locationUpdateReceived,
			}),
		).then(() => this.doSignalUpdatedLocationToPreviousScreen());

	render() {
		const iconUI = id => {
			var icon = this.props.icons.find(icon => {
				return icon.id === id;
			});

			return icon !== undefined && icon.selected !== 0
				? {color: 'white', backgroundColor: colorstyles.PunchRed.color}
				: {color: colorstyles.PunchRed.color, backgroundColor: 'white'};
		};

		const getCitynameOrPlaceholder = placeholder => {
			return this.props.filter?.cityname || placeholder;
		};

		return (
			<View style={{flex: 1}}>
				<View style={[{flex: 1}]}>
					<View
						style={[{flexGrow: 1, paddingHorizontal: 16, paddingVertical: 30}]}>
						<Text
							style={[
								textstyles.textPrimary,
								textstyles.textSize14,
								textstyles.textUpper,
								colorstyles.DarkPurple,
							]}>
							Events by location, date and category
						</Text>
						<View style={[{paddingVertical: 10}]}>
							<View
								style={[
									{
										flexDirection: 'row',
										alignItems: 'flex-end',
										paddingBottom: 15,
										borderBottomWidth: 1,
										borderColor: 'rgba(0,0,0,.1)',
									},
								]}>
								<View style={{flex: 0.6}}>
									<SingleRoundButtonStack
										buttonId="city-selector"
										action="selectCitySearch"
										buttonSelected={() =>
											this.doNavigateToLocationSearchScreen()
										}
										buttonText={getCitynameOrPlaceholder('Enter city name')}
										header="Events in"
										headerContainerStyle={[{paddingVertical: 8}]}
										buttonContainerStyle={[
											{
												borderWidth: 1,
												borderColor: 'rgba(0,0,0,.1)',
												borderRadius: 4,
												paddingHorizontal: 10,
											},
										]}
										buttonTextContainerStyle={{alignItems: 'flex-start'}}
										buttonTextStyle={[
											textstyles.textSize14,
											textstyles.textNone,
											{color: 'rgba(0,0,0,.5)'},
										]}
									/>
								</View>
								<View style={[{flex: 0.4, justifyContent: 'flex-end'}]}>
									<SingleRoundButtonStack
										buttonId="filter-location-marker"
										action="city"
										buttonSelected={this.iconSelectedHandler}
										header="Use my location"
										replaceTextWithIcon
										MIcon={{
											name: 'location-on',
											size: 22,
											color: iconUI('filter-location-marker').color,
										}}
										buttonWrapperStyle={[
											{
												flex: 1,
												flexDirection: 'row',
												alignItems: 'flex-end',
												justifyContent: 'flex-end',
												paddingLeft: 30,
											},
										]}
										headerContainerStyle={[{flex: 1, alignItems: 'flex-start'}]}
										buttonContainerStyle={[{flex: 0.7, alignItems: 'flex-end'}]}
										buttonStyle={[
											{
												backgroundColor: iconUI('filter-location-marker')
													.backgroundColor,
												width: 40,
												height: 40,
												borderWidth: 1,
												borderColor: 'rgba(0,0,0,.1)',
												borderRadius: 50,
											},
										]}
									/>
								</View>
							</View>
							<View
								style={[
									{
										flexDirection: 'row',
										alignItems: 'flex-end',
										paddingBottom: 15,
										borderBottomWidth: 1,
										borderColor: 'rgba(0,0,0,.1)',
									},
								]}>
								<View style={{flex: 0.6}}>
									<SingleRoundButtonStack
										buttonText="Choose Date"
										header="Events on"
										rightFAIcon
										rightIconName="calendar"
										rightIconSize={14}
										headerContainerStyle={[{paddingVertical: 8}]}
										buttonContainerStyle={[
											{
												paddingHorizontal: 20,
												borderWidth: 1,
												borderColor: 'rgba(0,0,0,.1)',
												borderRadius: 20,
											},
										]}
									/>
								</View>
								<View style={[{flex: 0.4, justifyContent: 'flex-end'}]}>
									<SingleRoundButtonStack
										buttonId="filter-clock-icon"
										action="date"
										buttonSelected={this.iconSelectedHandler}
										header="Today's Events"
										replaceTextWithIcon
										FAIcon={{
											name: 'clock-o',
											size: 18,
											color: iconUI('filter-clock-icon').color,
										}}
										buttonWrapperStyle={[
											{
												flex: 1,
												flexDirection: 'row',
												alignItems: 'flex-end',
												justifyContent: 'flex-end',
												paddingLeft: 30,
											},
										]}
										headerContainerStyle={[{flex: 1, alignItems: 'flex-start'}]}
										buttonContainerStyle={[{flex: 0.7, alignItems: 'flex-end'}]}
										buttonStyle={[
											{
												backgroundColor: iconUI('filter-clock-icon')
													.backgroundColor,
												width: 40,
												height: 40,
												borderWidth: 1,
												borderColor: 'rgba(0,0,0,.1)',
												borderRadius: 50,
											},
										]}
									/>
								</View>
							</View>
							<List
								scrollable={false}
								dataSource={EVENT.FILTER_FULL}
								header="Event Category"
								separator
								classId="classCategory"
								selector={this.props.eventCategorySelectedByUser}
								listItemSignal="eventCategorySelectedByUser"
								itemSelected={this.doUpdateEventCategorySelectedByUser}
								headerStyle={[colorstyles.Dark]}
								headerContainerStyle={[
									{
										paddingHorizontal: 0,
										borderTopWidth: 0,
										borderBottomWidth: 1,
									},
								]}
								itemTextStyle={[
									textstyles.textSize12,
									textstyles.textUpper,
									colorstyles.LightPurple,
								]}
								itemStyle={[{paddingHorizontal: 20, paddingVertical: 10}]}
							/>
						</View>
					</View>
					<RoundedButton
						buttonSelected={this.submitButtonSelectedHandler}
						buttonText="GO"
						buttonContainerStyle={[
							{
								position: 'absolute',
								left: 0,
								right: 0,
								bottom: 0,
								paddingVertical: 40,
							},
						]}
						buttonStyle={{borderWidth: 0}}
						buttonTextStyle={{color: 'rgba(255,255,255,1)'}}
						gradient
					/>
				</View>
				<RNStatusBar barStyle="dark-content" />
			</View>
		);
	}
}

export const FilterScreenStaticOptions = {
	statusBar: {
		visible: true,
		style: 'dark',
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
			},
		],
	},
};

FilterScreen.options = FilterScreenStaticOptions;

const mapStateToProps = state => {
	return {
		eventCategorySelectedByUser: state.filter.eventCategorySelectedByUser,
		filter: state.filter.filter,
		icons: state.ui.icons,
		modal: state.ui.modal,
		locationSearchResults: state.filter.locationSearchResults,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetFilter: filter => dispatch(setFilter(filter)),
		onSetFilterKeyValue: (k, v) => dispatch(setFilterKeyValue(k, v)),
		onSetUIIcon: ui => dispatch(setUIIcon(ui)),
		onSetUIModal: ui => dispatch(setUIModal(ui)),
		onSetFilteredList: (key, value) => dispatch(setFilteredList(key, value)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(FilterScreen);
