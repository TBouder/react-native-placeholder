/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   Index.ios.js                                                             */
/*                                                                            */
/*   By:    Thomas Bouder <tbouder@gmail.com>                                 */
/*                                                                            */
/*   Created: 2017/03/02 14:40:55 by Thomas                                   */
/*   Updated: 2017/03/08 09:15:42 by Thomas Bouder                            */
/*                                                                            */
/* ************************************************************************** */

import React, { Component }				from 'react';
import {AppRegistry, StyleSheet, Text,
	View, Dimensions, Image}			from 'react-native';
import RNPlaceholder					from 'react-native-placeholder'

const SCREENWIDTH = Dimensions.get('window').width;
const SCREENHEIGHT = Dimensions.get('window').height;

export default class example extends Component
{
	state = {
		doneFirst: false,
		doneSecond: false,
	}

	render()
	{
		var placeholder = [
			[.5, .1, .05, .07],
			[.3, .1, .05, .07],
			[.4, .1, .05, .07],
		]
		var placeholder2 = [
			[.5, .05, .05, .04],
			[.3, .05, .05, .04],
			[.4, .05, .05, .04],
			[.1, .05, .05, .04],
			[.2, .05, .05, .04],
		]
		return (
			<View style={styles.container}>
				<View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
					<RNPlaceholder
						width={SCREENWIDTH * .9}
						height={SCREENHEIGHT * .133}
						placeholderDesign={placeholder}
						done={this.state.doneFirst}>

						<Image
							source={{uri: "https://images.unsplash.com/photo-1433888104365-77d8043c9615?dpr=2&auto=format&fit=crop&w=767&h=510&q=80&cs=tinysrgb&crop="}}
							style={{width: 300, height: 300}}
							onLoadEnd={() => this.setState({doneFirst: true})}/>

					</RNPlaceholder>
				</View>

				<View style={{flex: 1, paddingTop: 20, alignItems: 'center'}}>
					<RNPlaceholder
						width={SCREENWIDTH * .9}
						height={SCREENHEIGHT * .18}
						placeholderDesign={placeholder2}
						done={this.state.doneSecond}>

						<Image
						source={{uri: "https://images.unsplash.com/photo-1423034816855-245e5820ff8c?dpr=2&auto=format&fit=crop&w=767&h=1022&q=80&cs=tinysrgb&crop="}}
						style={{width: 300, height: 300}}
						onLoadEnd={() => this.setState({doneSecond: true})}/>

					</RNPlaceholder>
				</View>
			</View>
			);
		}
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

AppRegistry.registerComponent('example', () => example);
