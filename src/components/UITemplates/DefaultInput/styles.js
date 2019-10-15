import { StyleSheet } from 'react-native';

const inputstyles = StyleSheet.create({
	inputHeader: {
		fontFamily:'Montserrat',
		fontSize: 16,
		textTransform:'uppercase',
		color:'rgba(255,255,255,.95)',
		paddingTop:40,
		paddingBottom:5
	},
	inputHeaderSM: {
		fontFamily:'Montserrat',
		fontSize: 13,
		textTransform:'uppercase',
		color:'rgba(255,255,255,.95)',
		paddingTop:40,
		paddingBottom:5
	},
	inputText: {
		width: '100%',
		alignItems:'flex-start',
		borderBottomWidth:1,
		borderColor:'rgba(255,255,255,0.4)',
		fontFamily:'Open Sans',
		fontSize: 26,
		color:'rgba(255,255,255,0.85)',
	},
	inputTextSmall: {
		width: '100%',
		borderBottomWidth:1,
		borderColor:'rgba(255,255,255,0.5)',
		fontFamily:'Open Sans',
		fontSize: 18,
		color:'rgba(255,255,255,0.8)',
	},
	inputFooter: {
		fontFamily:'Montserrat',
		fontSize: 14,
		color:'rgba(255,255,255,0.9)',
		letterSpacing:1,
		paddingTop:12,
		paddingBottom:10
	},
	inputFieldDimensionSM:{
		height:35
	},
	formDimensionSM:{
		height:150,
	},
	formDimensionMD:{
		height:250
	}
});

export default inputstyles;