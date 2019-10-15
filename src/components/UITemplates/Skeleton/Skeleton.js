import React, {Component} from 'react';
import {Text, Animated, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Skeleton extends Component {
	constructor(props) {
		super(props);

		this._animation_state = {
			placeholder_opacities: this.initializePlaceholders(),
			target_opacity: 1,
			should_animate: true,
		};
	}

	initializePlaceholders() {
		let opacities = [];

		for (let i = 0; i < this.props.numberOfPlaceholders; i++) {
			let placeholder = new Animated.Value(this.props.minOpacity);
			opacities.push(placeholder);
		}

		return opacities;
	}

	componentDidMount() {
		this.animate_placeholders.bind(this)(0);
	}

	componentWillUnmount() {
		this._animation_state.should_animate = false;
	}

	animate_placeholders(which_placeholder) {
		if (!this._animation_state.should_animate) return;

		// swap fade direction when we hit end of list
		if (
			which_placeholder >= this._animation_state.placeholder_opacities.length
		) {
			which_placeholder = 0;
			let min = this.props.minOpacity;
			this._animation_state.target_opacity =
				this._animation_state.target_opacity == min ? 1 : min;
		}

		let next_placeholder = which_placeholder + 1;

		Animated.timing(
			this._animation_state.placeholder_opacities[which_placeholder],
			{
				toValue: this._animation_state.target_opacity,
				duration: this.props.animationDelay,
			},
		).start(this.animate_placeholders.bind(this, next_placeholder));
	}

	render() {
		return (
			<View>
				{this._animation_state.placeholder_opacities.map((o, i) => (
					<View
						key={i}
						style={[
							{
								paddingVertical: 10,
							},
						]}>
						<View
							style={[
								{
									width: '100%',
									height: 90,
									flexDirection: 'row',
									alignItems: 'center',
									paddingHorizontal: 14,
								},
							]}>
							<View style={[{flex: 1, paddingRight: 14}]}>
								<View
									style={{
										width: '100%',
										height: '25%',
										paddingRight: 30,
									}}>
									<Animated.View
										style={{
											width: '100%',
											height: '100%',

											opacity: o,
											borderRadius: 4,
											...this.props.style,
										}}
									/>
								</View>

								<View
									style={{
										width: '100%',
										height: '50%',
										paddingRight: 2,
										paddingVertical: 4,
									}}>
									<Animated.View
										style={{
											width: '100%',
											height: '100%',

											opacity: o,
											borderRadius: 4,
											...this.props.style,
										}}
									/>
								</View>

								<View
									style={{
										width: '100%',
										height: '25%',
										paddingRight: 14,
									}}>
									<Animated.View
										style={{
											width: '100%',
											height: '100%',

											opacity: o,
											borderRadius: 4,
											...this.props.style,
										}}
									/>
								</View>
							</View>
							<Animated.View
								style={{
									width: (90 * 16) / 9,
									height: '100%',
									opacity: o,
									borderRadius: 4,
									...this.props.style,
								}}
							/>
						</View>
					</View>
				))}
			</View>
		);
	}
}

Skeleton.propTypes = {
	numberOfPlaceholders: PropTypes.number,
	animationDelay: PropTypes.number,
	minOpacity: PropTypes.number,
};

Skeleton.defaultProps = {
	numberOfPlaceholders: 3,
	animationDelay: 400,
	minOpacity: 0.5,
	style: {
		backgroundColor: 'rgba(0,0,0,.025)',
	},
};
