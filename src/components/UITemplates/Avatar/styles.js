import { StyleSheet } from 'react-native';

const avatarstyles = StyleSheet.create({
	avatarStackContainer:{
		flex:1,
		flexDirection:'row-reverse',
		justifyContent:'center',
		alignItems:'center',
	},
	avatarItemContainer:{
		height:45,
		width:45,
		marginRight:-10
	},
	avatarItem:{
		borderWidth:2,
		borderColor:'rgba(255,255,255,1)',
		borderRadius:23,
	}
});

export default avatarstyles;