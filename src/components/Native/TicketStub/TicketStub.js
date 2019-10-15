import React, {Component} from 'react';
import {requireNativeComponent} from 'react-native';

class NativeTicketStub extends Component {
	render() {
		return <TicketStub {...this.props} />;
	}
}

const TicketStub = requireNativeComponent('MobileTicket', NativeTicketStub);
module.exports = NativeTicketStub;
