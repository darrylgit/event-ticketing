import { StyleSheet } from 'react-native';

const flexstyles = StyleSheet.create({
	flex:{
		flex:1,
		width:'100%',
	},
	flex2:{
		flex:2
	},
	flex3:{
		flex:.3333333,
		width:'100%',
	},
	flex4:{
		flex:.4,
		width:'100%',
	},
	flex5:{
		flex:.5,
		width:'100%',
	},
	flex7:{
		flex:.7,
		width:'100%',
	},
	flexRow:{
		flexDirection:'row',
		width:'100%'
	},
	flexGrow:{
		flexGrow:1
	},
	flexAlignCenter:{
		alignItems:'center'
	},
	flexAlignStart:{
		alignItems:'flex-start'
	},
	flexAlignEnd:{
		alignItems:'flex-end'
	},
	flexJustifyCenter:{
		justifyContent:'center'
	},
	flexJustifyEnd:{
		justifyContent:'flex-end'
	},
	flexGutter:{
		paddingHorizontal:20
	},
	flexGutterXS:{
		paddingHorizontal:5
	},
	flexGutterSM:{
		paddingHorizontal:10
	},
	flexGutterLG:{
		paddingHorizontal:30
	},
	flexHeight:{
		height:"100%"
	},
	flexWidth:{
		width:'100%'
	},
	flexWidthDeviceXS:{
		width:320
	},
	flexWidthDeviceSM:{
		width:414
	},
	paddingVerticalXS:{
		paddingVertical:5
	},
	paddingVerticalSM:{
		paddingVertical:10
	}
});

export default flexstyles;