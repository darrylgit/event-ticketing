import React from 'react';
import {
	Animated,
	View,
	ScrollView,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';

import Item, {ItemHorizontalStack} from '../Item/Item';
import {ScreenLinkButton} from '../UITemplates/Button/Button';
import {flexstyles, textstyles, colorstyles} from '../UITemplates/styles';

const List = props => {
	return (
		<ScrollView
			scrollEnabled={props.scrollable}
			contentContainerStyle={[{paddingVertical: 4}]}>
			{props.header && props.separator ? (
				<View
					style={[
						{
							paddingHorizontal: 10,
							paddingVertical: 8,
							borderTopWidth: 1,
							borderColor: 'rgba(0,0,0,.1)',
						},
						props.headerContainerStyle,
					]}>
					<Text
						style={[
							textstyles.textSecondaryMedium,
							textstyles.textSize12,
							textstyles.textUpper,
							colorstyles.White,
							props.headerStyle,
						]}>
						{props.header}
					</Text>
				</View>
			) : (
				<View style={[{paddingHorizontal: 10, paddingVertical: 8}]}>
					<Text
						style={[
							textstyles.textSecondaryMedium,
							textstyles.textSize12,
							textstyles.textUpper,
							colorstyles.White,
							props.headerStyle,
						]}>
						{props.header}
					</Text>
				</View>
			)}
			{props.dataSource.map((item, index) => (
				<Item
					key={index}
					itemKey={item.key}
					value={item.value}
					selector={props.selector === item.key ? true : false}
					itemSelected={() =>
						props.itemSelected(props.classId, props.listItemSignal, item.key)
					}
					itemTextStyle={props.itemTextStyle}
					itemStyle={props.itemStyle}
					itemContainerStyle={props.itemContainerStyle}
					buttonContainerStyle={props.buttonContainerStyle}
					icon={item.icon ? item.icon : props.icon}
				/>
			))}
		</ScrollView>
	);
};

export const EventCategoryHorizontalList = props => {
	return (
		<Animated.View style={{paddingVertical: 4}}>
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
						colorstyles.White,
					]}>
					{props.header}
				</Text>
			</View>
			<ScrollView
				horizontal={props.horizontal}
				scrollEnabled={props.scrollEnabled}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={[{paddingHorizontal: 5}]}>
				{props.dataSource.map((item, index) => (
					<View key={index} style={{paddingHorizontal: 2}}>
						<View
							style={[
								{
									width: 130,
									height: 130,
									borderRadius: 4,
									backgroundColor: 'white',
								},
							]}>
							<TouchableOpacity
								onPress={() => props.itemSelected(props.filterKey, item.key)}
								activeOpacity={0.9}
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<View
									style={{
										flex: 1,
										alignItems: 'center',
										justifyContent: 'flex-end',
									}}>
									<View
										style={{
											flex: 1,
											alignItems: 'center',
											justifyContent: 'flex-end',
										}}>
										<Image
											source={item.icon}
											resizeMode="contain"
											style={[{width: 50, height: 50}]}
										/>
									</View>
									<View
										style={{
											flex: 0.75,
											alignItems: 'center',
											justifyContent: 'center',
										}}>
										<Text
											style={[
												{textAlign: 'center'},
												textstyles.textPrimary,
												textstyles.textSize12,
												textstyles.textUpper,
												colorstyles.Dark,
											]}>
											{item.value}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				))}
			</ScrollView>
		</Animated.View>
	);
};

export const VerticalStackList = props => {
	renderSeparator = () => {
		return <View style={[{height: 5}]} />;
	};
	renderFooter = () => {
		return <View style={[{height: 10}]} />;
	};
	return (
		<View
			style={[flexstyles.flex, {paddingVertical: 4}, props.listWrapperStyle]}>
			{props.header && props.separator ? (
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
							colorstyles.White,
						]}>
						{props.header}
					</Text>
				</View>
			) : (
				<View style={[{paddingHorizontal: 10, paddingVertical: 8}]}>
					<Text
						style={[
							textstyles.textSecondaryMedium,
							textstyles.textSize12,
							textstyles.textUpper,
							colorstyles.White,
						]}>
						{props.header}
					</Text>
				</View>
			)}
			<View style={[{paddingHorizontal: 5}]}>
				<FlatList
					scrollEnabled={props.scrollEnabled}
					ItemSeparatorComponent={this.renderSeparator}
					ListFooterComponent={this.renderFooter}
					data={props.dataSource}
					keyExtractor={({id}, index) => id.toString()}
					renderItem={({item}) => (
						<ItemHorizontalStack
							header={
								props.dateAsHeader !== undefined
									? item.start_date_full
									: item.category
							}
							body={item.title}
							footer={
								props.geoAsFooter !== undefined
									? item.venue.venuename
									: item.start_date
							}
							image={item.image}
							itemSelected={() =>
								props.listItemActionSelected(props.listItemAction, item.id)
							}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export const CheckoutList = props => {
	const selectedTicket = id => {
		let ticket = props.ticketsSelected.find(item => {
			return item.id === id;
		});

		return ticket === undefined ? 0 : ticket.quantity;
	};
	return (
		<ScrollView contentContainerStyle={{paddingVertical: 20}}>
			{props.tickets.map((item, index) =>
				props.separator ? (
					<ListItem
						key={item.id.toString()}
						title={item.name}
						price={item.price}
						buttonSelected={() => props.buttonSelected(item.id)}
						choiceSelected={selectedTicket(item.id)}
						itemContainerStyle={[
							{
								paddingHorizontal: 15,
								paddingVertical: 10,
								borderBottomWidth: 1,
								borderColor: 'rgba(0,0,0,.1)',
							},
						]}
						buttonWrapperStyle={[flexstyles.flex, flexstyles.flexAlignEnd]}
						buttonStyle={[{paddingHorizontal: 10, paddingVertical: 10}]}
						buttonTextStyle={[colorstyles.Dark]}
						buttonContainerStyle={[
							{
								width: 70,
								height: '100%',
								borderWidth: 1,
								borderColor: 'rgba(0,0,0,.1)',
								borderRadius: 3,
							},
						]}
						iconContainerStyle={[flexstyles.flexAlignEnd]}
						iconColor="rgba(0,0,0,.2)"
					/>
				) : (
					<ListItem
						key={item.id.toString()}
						title={item.name}
						price={item.price}
						buttonSelected={() => props.buttonSelected(item.id)}
						choiceSelected={selectedTicket(item.id)}
						itemContainerStyle={[{paddingHorizontal: 10, paddingVertical: 10}]}
						buttonWrapperStyle={[flexstyles.flex, flexstyles.flexAlignEnd]}
						buttonStyle={[{paddingHorizontal: 10, paddingVertical: 10}]}
						buttonTextStyle={[textstyles.textSize18, colorstyles.Dark]}
						buttonContainerStyle={[
							{
								width: 70,
								height: '100%',
								borderWidth: 1,
								borderColor: 'rgba(0,0,0,.5)',
								borderRadius: 3,
							},
						]}
						iconContainerStyle={[flexstyles.flexAlignEnd]}
						iconColor="rgba(0,0,0,.2)"
					/>
				),
			)}
		</ScrollView>
	);
};

export const CartList = props => {
	return (
		<ScrollView contentContainerStyle={{flex: 1, paddingVertical: 20}}>
			{props.dataSource.length !== 0 ? (
				<View style={{flex: 1}}>
					<View>
						{props.dataSource.map(item => (
							<CartListItem
								key={item.id.toString()}
								verbose={item.verbose}
								price={item.price}
								totalSelected={item.pickerValue}
								onItemSelected={props.onItemSelected}
							/>
						))}
					</View>
					<View style={{flex: 0.4, paddingTop: 20}}>
						<ScreenLinkButton linkText="Promo Code" />
						<View style={{flex: 1, paddingHorizontal: 25}}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
									<Text style={textstyles.textSubHeadingSecondary}>
										Subtotal
									</Text>
								</View>
								<View style={{flex: 1, alignItems: 'flex-end'}}>
									<Text style={textstyles.textSubHeadingSecondary}>$$$</Text>
								</View>
							</View>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
									<Text style={textstyles.textSubHeadingSecondary}>Fees</Text>
								</View>
								<View style={{flex: 1, alignItems: 'flex-end'}}>
									<Text style={textstyles.textSubHeadingSecondary}>$$$</Text>
								</View>
							</View>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
									<Text style={textstyles.textSubHeadingSecondary}>Total</Text>
								</View>
								<View style={{flex: 1, alignItems: 'flex-end'}}>
									<Text style={textstyles.textSubHeadingSecondary}>$$$</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			) : (
				<View
					style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
				/>
			)}
		</ScrollView>
	);
};

export const LinkList = props => {
	return (
		<View style={[colorstyles.BGWhite]}>
			{props.links.map((link, index) =>
				index === props.links.length - 1 ? (
					<ScreenLinkButton
						onItemSelected={props.onItemSelected}
						action={link.action}
						key={index}
						linkText={link.title}
						linkStyle={{textTransform: 'capitalize'}}
						buttonContainerStyle={{paddingHorizontal: 15, paddingVertical: 15}}
					/>
				) : (
					<View
						key={index}
						style={[{borderBottomWidth: 1, borderColor: 'rgba(0,0,0,.1)'}]}>
						<ScreenLinkButton
							onItemSelected={props.onItemSelected}
							action={link.action}
							linkText={link.title}
							linkStyle={{textTransform: 'capitalize'}}
							buttonContainerStyle={{
								paddingHorizontal: 15,
								paddingVertical: 15,
							}}
							separator
						/>
					</View>
				),
			)}
		</View>
	);
};

export default List;
