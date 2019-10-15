import React, {Component} from 'react';
import {Platform, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {withAPI} from 'passioo/api/index';
import {setUserData} from 'project/src/store/actions/index';
import {Navigation} from 'react-native-navigation';
import {VerticalStackList} from 'project/src/components/List/List';
import {ScreenLinkFAButtonStack} from 'project/src/components/UITemplates/Button/Button';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

class TicketScreen extends Component {
	constructor(props) {
		super(props);

		const {doRetrieveUserOrdersInfo} = this.props.api;
		this.doRetrieveUserOrdersInfo = doRetrieveUserOrdersInfo;
	}

	componentDidMount = () =>
		this.doRetrieveUserOrdersInfo().then(orders =>
			this.props.onSetUserData('orders', JSON.parse(orders)),
		);

	doGroupOrdersWithSameEvent = () => {
		var events = [];

		this.props.orders?.map(order => {
			var event = events.find(event => {
				return event.id === order.event.id;
			});

			if (event === undefined) {
				events.push(order.event);
			}
		});

		return events;
	};

	doNavigateToOrders = (action, key) => {
		var selectedEvent = this.props.orders.find(order => {
			return order.event.id === key;
		}).event;

		Navigation.push(this.props.componentId, {
			component: {
				name: 'project.StubScreen',
				passProps: {
					selectedEvent: selectedEvent,
					orders: this.props.orders,
				},
			},
		});
	};

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 0.6, marginTop: Platform.OS !== 'ios' ? 54 : 64}}>
					<VerticalStackList
						dataSource={this.doGroupOrdersWithSameEvent()}
						dateAsHeader
						geoAsFooter
						listItemAction="eventSelected"
						listItemActionSelected={this.doNavigateToOrders}
						header="My upcoming events"
					/>
				</View>
				<View
					style={{
						flex: 0.4,
						paddingVertical: 10,
						backgroundColor: 'rgba(255,255,255,1)',
					}}>
					<ScreenLinkFAButtonStack
						buttonContainerStyle={{paddingHorizontal: 15, paddingVertical: 10}}
						leftFAIcon={{
							name: 'newspaper-o',
							size: 18,
							color: 'rgba(0,0,0,.8)',
						}}
						linkText="All Current Events"
						linkTextStyle={{paddingHorizontal: 15}}
					/>
					<ScreenLinkFAButtonStack
						buttonContainerStyle={{paddingHorizontal: 15, paddingVertical: 10}}
						leftFAIcon={{
							name: 'credit-card',
							size: 18,
							color: 'rgba(0,0,0,.8)',
						}}
						linkText="Past Events"
						linkTextStyle={{paddingHorizontal: 15}}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.user.orders,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSetUserData: (key, value) => dispatch(setUserData(key, value)),
	};
};

TicketScreen = withAPI(TicketScreen);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TicketScreen);
