import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { 
	flexstyles, 
	textstyles, 
	colorstyles 
} from 'project/src/components/UITemplates/styles';


const DefaultActivityIndicator = props => (
	<View style={[{display:props.visible === true ? 'flex':'none', width:50, height:50, position:'absolute', top:'50%', left:'50%',
		transform:[{translateX: -25},{translateY: -25}]}, flexstyles.flexAlignCenter, flexstyles.flexJustifyCenter]}>
		<ActivityIndicator size='large' color='black'/>
	</View>
);

export default DefaultActivityIndicator;