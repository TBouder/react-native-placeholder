import {StyleSheet, Dimensions, Platform}		from 'react-native';

const SCREENWIDTH = Dimensions.get('window').width;
const SCREENHEIGHT = Dimensions.get('window').height;

var style = StyleSheet.create({
/*******************************************************************************
**	Placeholder
*******************************************************************************/
	placeHolderContainer:
	{
		flexDirection: 'row',
		width: SCREENWIDTH,
		height: SCREENHEIGHT,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center'
	},
	placeHolderContainerColumn:
	{
		flexDirection: 'column',
		width: SCREENWIDTH * .5,
		overflow: 'hidden'
	},
	placeHolderBase:
	{
		backgroundColor: '#EEEEEE',
		overflow: 'hidden',
	},
	placeHolderAnim:
	{
		backgroundColor: '#DDDDDD40',
	},
});

export default style