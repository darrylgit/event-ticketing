import React, { Component } from 'react';
import { Animated, Platform, View, TouchableOpacity } from 'react-native';
import { StackList } from "../List/List";
import { ChoiceSelectorButtonStack } from "../UITemplates/Button/Button";
import Search from '../Search/Search';
import EVENT from "../../constants/event";
import { flexstyles, textstyles, colorstyles } from "../UITemplates/styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const StackFilter = props => {
	return (
		<View style={[{paddingTop:(Platform.OS !== "ios" ? 54:64) / 2}, props.filterContainerStyle]}>
			<Animated.View style={{position:"absolute", top:120}}>
				<StackList horizontal dataSource={props.dataSource} listItemAction={props.listItemAction} 
				listItemActionSelected={props.listItemActionSelected} 
				header="Event Categories" separator />
			</Animated.View>
			<View style={[{position:"absolute", top:70}, flexstyles.flexRow, flexstyles.flexAlignCenter]}>
				<ChoiceSelectorButtonStack
				choiceSelected={props.locationSelected}
				header="Upcoming events in" chevron="none"
				buttonTextStyle={[textstyles.textPrimarySemiBold]} buttonWrapperStyle={[{paddingHorizontal:10}]}/>
				<TouchableOpacity 
				onPress={() => props.filterActionSelected(props.filterAction)} 
				style={[flexstyles.flex, flexstyles.flexAlignEnd, {top:5, paddingRight:10}]}>
					<FontAwesome name="filter" size={18} color="rgba(255,255,255,1)"></FontAwesome>
				</TouchableOpacity>
			</View>
			<Search action="searchInputChanged" searchBarPlaceholder={props.searchBarPlaceholder} 
			searchInput={props.searchInput} onChange={props.onChange} 
			inputStyle={props.inputStyle} inputContainerStyle={props.inputContainerStyle}
			searchContainerStyle={[props.searchContainerStyle]} 
			searchWrapperStyle={[props.searchWrapperStyle, {position:"absolute", top:30}]} 
			/>
		</View>
	);
}

export default StackFilter;
