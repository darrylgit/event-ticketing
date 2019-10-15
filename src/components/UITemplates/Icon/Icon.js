import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class EIIcon extends Component {
	static defaultProps = {
		name: 'question',
		color: 'rgba(0,0,0,.8)',
		size: 26,
	};
	render() {
		return (
			<EvilIcons
				name={this.props.name}
				color={this.props.color}
				size={this.props.size}
			/>
		);
	}
}

export class MCIcon extends Component {
	static defaultProps = {
		name: 'help-circle-outline',
		color: 'rgba(0,0,0,.8)',
		size: 26,
	};
	render() {
		return (
			<MaterialCommunityIcons
				name={this.props.name}
				color={this.props.color}
				size={this.props.size}
			/>
		);
	}
}

export class FAIcon extends Component {
	static defaultProps = {
		name: 'question-circle',
		color: 'rgba(0,0,0,.8)',
		size: 26,
	};
	render() {
		return (
			<FontAwesome
				name={this.props.name}
				color={this.props.color}
				size={this.props.size}
			/>
		);
	}
}
