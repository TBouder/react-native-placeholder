# react-native-facebook-like-placeholder
You can not always remove the waiting time to get an information but you can make it feels shorter.

This react-native module allows you to set a placeholder to render something while fetching the main component/element (example: when a remote image loads, when you are performing a GET request to your Database, etc.).   
This placeholder design is based on the one on Facebook and is partly customisable.

![Illustration](http://img4.hostingpics.net/pics/454140Capturedecran20170308a222914.png)

###Fast Use :
```
import RNPlaceholder	from 'react-native-placeholder'

state = {done: false}

<RNPlaceholder
	done={this.state.done}>
	
	<Image
	source={{uri: "https://images.unsplash.com/photo-1433888104365-77d8043c9615?dpr=2&auto=format&fit=crop&w=767&h=510&q=80&cs=tinysrgb&crop="}}
	style={{width: 200, height: 200}}
	onLoadEnd={() => this.setState({done: true})}/>
</RNPlaceholder>
```

###The Component : Placeholder
>The Component takes a few props :   
- **Width** : The width of the view, used to calculate the size of the placeholder (default: ScreenWidth * .9)   
- **Height** : The height of the view, used to calculate the size of the placeholder (default: ScreenHeight * .133)   
- **placeholderDesign** : An array of array, which determines the width, the height and the margin of the Lines (default: [[.5, .1, .05, .07], [.3, .1, .05, .07], [.4, .1, .05, .07]])   
- **Done** : A state, set to false at first, which will change to true at the end of the loading   
   
> The placeholder has two main "parts", the **Cube** (non editable for now) and the **Lines** (editables). With no specifics data, a basic component is set.   
> The Done props has to be a state from the parents component that will switch to true at the end of the loading (for instance with the onLoadEnd method of the <Image> component).
