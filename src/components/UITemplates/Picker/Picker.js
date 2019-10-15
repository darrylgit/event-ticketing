import React from 'react';
import {Animated, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Modal} from 'project/src/components/UITemplates/Modal/Modal';
import Item from 'project/src/components/Item/Item';
import {
	flexstyles,
	textstyles,
	colorstyles,
} from 'project/src/components/UITemplates/styles';

const Picker = props => {
	var pickerItems = [];
	for (var index = 0; index < props.dataSource; index++) {
		pickerItems.push(
			<Item
				key={index}
				itemKey={index}
				value={index}
				itemSelected={props.pickerItemSelected}
				itemStyle={[flexstyles.flexJustifyCenter]}
				itemTextStyle={[textstyles.textSize18, {paddingVertical: 5}]}
			/>,
		);
	}
	return (
		<Modal
			modalContainerVisible={props.pickerContainerVisible}
			modalContainerOpacity={props.pickerContainerOpacity}
			hasBackdrop={false}
			modalStyle={{
				height: 250,
				backgroundColor: '#d0d4dd',
				borderTopLeftRadius: 2,
				borderTopRightRadius: 2,
			}}>
			<View
				style={{
					height: 45,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					paddingHorizontal: 20,
					backgroundColor: '#f8f8f8',
					borderTopWidth: 1,
					borderBottomWidth: 1,
					borderTopColor: 'rgba(0,0,0,.05)',
					borderBottomColor: 'rgba(0,0,0,.05)',
				}}>
				<View
					style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
					<TouchableOpacity activeOpacity={0.7} onPress={props.doPickerDismiss}>
						<Text
							style={{
								fontFamily: 'Open Sans',
								fontSize: 16,
								textTransform: 'uppercase',
								marginTop: 10,
							}}>
							Done
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView>{pickerItems}</ScrollView>
		</Modal>
	);
};

export default Picker;
