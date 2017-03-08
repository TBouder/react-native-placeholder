
/* ************************************************************************** */
/*                                                                            */
/*                                                                            */
/*   RNPlaceholder.js                                                         */
/*                                                                            */
/*   By:    Thomas Bouder <tbouder@gmail.com>                                 */
/*                                                                            */
/*   Created: 2017/03/02 14:40:55 by Thomas                                   */
/*   Updated: 2017/03/08 09:15:42 by Thomas Bouder                            */
/*                                                                            */
/* ************************************************************************** */

/******************************************************************************/
import React, {Component}			from 'react'
import {View, Image, Animated, Dimensions}		from 'react-native';
import style						from './style'
/******************************************************************************/

/*
**	USAGE :
**	<RNPlaceholder
**		children=			{component that will be displayed} !REQUIRED!
**		width=				{width of the component (used to calculate the placeholder view)}
**		height=				{height of the component (used to calculate the placeholder view)}
**		placeholderDesign=	{the glabal desin of the placeholder. Takes an array of X elements with a 4 element's
**							 sub array : Width of the line, Height of the line, Left margin from the Cube and
**							 top/bottom margin between each line}
**		done=				{a state set to false that will become true when the loading is done} !REQUIRED!
**	/>
*/

class PlaceHolder extends Component
{

	state = {content: null}

	componentWillMount()
	{
		var render = [];

		this.props.content.map((data, index) =>
		{
			render.push(
				<View key={index} style={[style.placeHolderBase, {
					width: data[0],
					height: data[1],
					marginLeft: data[2],
					marginBottom: data[3],
					marginTop: data[3],
					}]}>

					<Animated.View style={[style.placeHolderAnim, {width: data[0], height: data[1],
						transform: this.props.anim[index + 1].getTranslateTransform()}]}/>
				</View>
			)
			this.setState({content: render})
		})
	}


	render()
	{
		return(
			<View>{this.state.content}</View>
		)
	}
}

export default class RNPlaceholder extends Component
{
	WIDTH = this.props.width || Dimensions.get('window').width * .9;
	HEIGHT = this.props.height || Dimensions.get('window').height * .133;
	CUBE = this.HEIGHT > this.WIDTH * .3 ? this.HEIGHT : this.WIDTH * .3;
	BASE = this.props.placeholderDesign || [
		[.5, .1, .05, .07],
		[.3, .1, .05, .07],
		[.4, .1, .05, .07],
	]

	state = ({
		preview: null,
		fetched: new Animated.Value(0),
		anim: [],
		model: [],
	})

	componentWillMount() {
		this.setAnim()
		this.setModel()
	}
	componentDidMount() {
		this.setPlaceholder()
		this.launchAnim()
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.done === true)
		{
			this.setState({preview: null})
			Animated.timing(this.state.fetched, {toValue: 1, duration: 500}).start()
		}
	}

	setAnim = () =>
	{
		var	anim = [];
		var	i = 0;

		if (this.BASE)
			var	len = this.BASE.length || 3

		anim.push(new Animated.ValueXY(0, 0)); //CUBE
		while (i < len)
		{
			anim.push(new Animated.ValueXY(0, 0)); //EACH LINE
			i++;
		}
		this.setState({anim: anim})
	}

	setModel = () =>
	{
		var	model = [];
		var	i = 0;

		this.BASE.map((data, index) =>
		{
			model.push([this.WIDTH * data[0], this.HEIGHT * data[1], this.WIDTH * data[2], this.HEIGHT * data[3]])
		})
		this.setState({model: model})
	}

	setPlaceholder = () =>
	{
		this.setState({preview:
			<View style={[style.placeHolderContainer, {width: this.WIDTH, height: this.HEIGHT}]}>
				<View style={[style.placeHolderBase, {width: this.CUBE * .7, height: this.CUBE * .7}]}>
					<Animated.View style={[style.placeHolderAnim, {width: this.CUBE * .1, height: this.CUBE * .7,
						transform: this.state.anim[0].getTranslateTransform()}]}/>
				</View>

				<View style={[style.placeHolderContainerColumn, {width: this.WIDTH * .5}]}>
					<PlaceHolder content={this.state.model || this.BASE} anim={this.state.anim}/>
				</View>
			</View>
		})
	}

	resetAnim = () =>
	{
		var	i = 0;
		var	len = this.BASE.length || 3

		while (i < len + 1)
		{
			this.state.anim[i].setValue({x: -130, y: 0});
			i++;
		}
	}

	launchAnim = () =>
	{
		this.resetAnim()

		var animations = []
		animations.push (
			Animated.spring(this.state.anim[0], {
					toValue: {x: this.CUBE * .7 + this.CUBE * .1, y: 0},
					tension: 1,
				})
		)
		this.BASE.map((data, index) =>
		{
			animations.push(
				Animated.spring(this.state.anim[index + 1], {
					toValue: {x: 135 + 30, y: 0},
					tension: 1,
				}),
			)
		})

		Animated.sequence([Animated.parallel(animations)]).start(() => this.launchAnim());
	}

	render()
	{
		return (
			<View style={[this.props.containerStyle]}>
				{this.state.preview}
				<Animated.View style={{opacity: this.state.fetched}}>
					{this.props.children}
				</Animated.View>
			</View>
		);
	};
};
