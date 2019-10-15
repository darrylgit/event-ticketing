import React from 'react';
import { View, ImageBackground } from 'react-native';

import avatarstyles from './styles';

const AVATAR_STACK_ITEMS = [
	{'source':require('../../../assets/avatars/profile-avatar-1.png')},
	{'source':require('../../../assets/avatars/profile-avatar-2.png')},
	{'source':require('../../../assets/avatars/profile-avatar-3.png')},
	{'source':require('../../../assets/avatars/profile-avatar-4.png')},
	{'source':require('../../../assets/avatars/profile-avatar-5.png')}
];
	
const AvatarStack = () => {
	return(
		<View style={avatarstyles.avatarStackContainer}>
		{
			Object.keys(AVATAR_STACK_ITEMS).map((key, index) =>
				<View key={key} style={avatarstyles.avatarItemContainer}>
					<ImageBackground
						source = {AVATAR_STACK_ITEMS[key]['source']}
						resizeMode = 'cover'
						imageStyle = {avatarstyles.avatarItem}
						style = {{width:'100%', height:'100%'}}
					/>
				</View>
			)
		}
		</View>
	);
};

export default AvatarStack;