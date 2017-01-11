import React, {Component} from 'react';
import {
	ScrollView,
	Text,
	View,
	StyleSheet,
	Dimensions,
} from 'react-native';
import { List, ListItem, Icon, SocialIcon } from 'react-native-elements';
import clrs from '../utils/Clrs';

const {height, width} = Dimensions.get('window');

const list = [
	{
		name: 'Home',
		icon: 'home',
		subtitle: 'Your sweet home',
		key: 'home',
	},
	{
		name: 'BTC',
		icon: 'av-timer',
		subtitle: 'Click to setup a new lunch',
		key: 'setup',
	},
	{
		name: 'USD',
		icon: 'find-in-page',
		subtitle: 'Search for a lunch partner',
		key: 'search',
	},
	{
		name: 'XMR',
		icon: 'history',
		subtitle: 'See lunches history',
		key: 'history',
	},
	{
		name: 'ETH',
		icon: 'card-giftcard',
		subtitle: 'Check/Redeem your reward points',
		key: 'rewards',
	},
]


export default class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScrollView scrollsToTop={false} style={styles.menu}>
				<View style={styles.appTitleView}>
					<Icon
					  name='handshake-o'
					  type='font-awesome'
					  color='#fff' />
					<Text style={styles.appTitle}>Price Finder</Text>
				</View>
				<List containerStyle={{ marginTop:36, backgroundColor:clrs.textPrimaryColor}}>
				  {
				    list.map((l, i) => (
				      <ListItem
				        leftIcon={{name: l.icon}}
				        onPress={() => this.props.onItemSelected(l.key)}
				        key={i}
				        title={l.name}
				        subtitle={l.subtitle}

				      />
				    ))
				  }
				</List>

			</ScrollView>
		);
	}

	static propTypes = {
		onItemSelected: React.PropTypes.func.isRequired,
	};
};

const styles = StyleSheet.create({
    menu: {
		flex: 1,
		width: window.width,
		height: window.height,
		backgroundColor: clrs.darkPrimaryColor,
		paddingTop:5
    },
    appTitleView:{
		position:'absolute',
		left:60,
		flex:1,
		flexDirection:'row'
	},
	appTitle:{
		fontSize:20,
		marginLeft:10,
		color:clrs.textPrimaryColor
	},
});