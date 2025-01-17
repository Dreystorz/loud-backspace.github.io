import * as React from 'react';
import { View } from 'react-native';

/**

The content area is a column of content that 

*/
export default function ContentArea(props){
	
	return (
		<View style={
			Object.assign
			(
				{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					flexWrap: 'wrap',
					alignSelf: 'stretch',
					justifySelf: 'stretch',
					overflow: 'hidden'
				}, 
				props.style
			)
		}>
			{props.children}
		</View>
	);
}