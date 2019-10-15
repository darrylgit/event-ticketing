import React, {Component} from 'react';
import {requireNativeComponent} from 'react-native';

class NativeInvoice extends Component {
	render() {
		return <Invoice {...this.props} />;
	}
}

const Invoice = requireNativeComponent('InvoiceView', NativeInvoice);
module.exports = NativeInvoice;
