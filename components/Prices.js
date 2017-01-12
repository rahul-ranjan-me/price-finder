import React, {Component} from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
} from 'react-native';
import {Grid, Col, Row} from 'react-native-elements';
import clrs from '../utils/Clrs';
import _ from 'lodash';

export default class Prices extends Component{
	constructor(props){
		super(props);
		this.state = {
			prices : {}
		}		
		this.convertResponseToArray = this.convertResponseToArray.bind(this);
		window.setInterval( () => {
			this.getData().then((data) => {
				this.setState({prices : data});
			});	
		}, 500);
	};

	getData(){
		return fetch('https://www.poloniex.com/public?command=returnTicker', {
		  method: 'GET',
		})
		.then((response) => response.json())
		.then((responseJson) => {
			return this.convertResponseToArray(responseJson);
	    })
	    .catch((error) => {
	        console.error(error);
	    });
	};

	convertResponseToArray(res){
		let responseArray = {};

		for(var i in res){
			let market = i.substring(0,i.indexOf('_')),
				splitStart = this.props.showBase === 'USDT' ? 5 : 4;
			if(responseArray[market]){
				res[i].currency = i.substring(splitStart,i.length)
				responseArray[market].push(res[i]);
			}else{
				responseArray[market] = [];
				res[i].currency = i.substring(splitStart,i.length)
				responseArray[market].push(res[i]);
			}
		}

		return responseArray;
	};

	sortData(data){
		var sortedCurrency = _.orderBy(this.state.prices[this.props.showBase], [data]);
		this.state.prices[this.props.showBase] = sortedCurrency;
		this.setState({prices: this.state.prices});
	};

	addFavorite(data){
		this.props.addFavorite(data);
	}

	render(){
		createTableRows = (data, i) => {
			return <TableRows data={data} key={i} addFavorite={(data) => this.addFavorite(data)} />
		};

		return (
			<View style={styles.table}>

				<View style={styles.tableHeader}>
					<Grid>
						<Col size={20}>
							<Text style={styles.tableHead} onPress={() => {
								this.sortData('currency');
							}}>Coin</Text>
						</Col>
						<Col size={30}>
							<Text style={styles.tableHead} onPress={() => {
								this.sortData('last');
							}}>Price</Text>
						</Col>
						<Col size={30}>
							<Text style={styles.tableHead} onPress={() => {
								this.sortData('baseVolume');
							}}>Volume</Text>
						</Col>
						<Col size={20}>
							<Text style={styles.tableHead} onPress={() => {
								this.sortData('percentChange');
							}}>Change</Text>
						</Col>
					</Grid>
				</View>
				<ScrollView>
				{this.state.prices[this.props.showBase] ?
					this.state.prices[this.props.showBase].map(createTableRows)
				 : <Text>Loading</Text>}
				</ScrollView>			
				
			</View>
		)
	}
}

export class TableRows extends Component{
	constructor(props){
		super(props);
	}

	makeMeFavorite(){
		this.props.addFavorite(this.props.data);
	};

	render(){
		const data = this.props.data;
		const renderChangePercent = () =>{
			const percentChange = (parseFloat(data.percentChange)*100).toFixed(2);

			return percentChange < 0 ? 
				<Text style={{color:'#c02a1d', fontSize:15}}>{percentChange}</Text> :
				<Text style={{color:'#27892f', fontSize:15}}>+{percentChange}</Text>;
		}
		return(
			<View style={styles.tableRows}>
				<Grid onPress={() => this.makeMeFavorite()}>
					<Col size={20}><Text style={styles.tableRowsText}>{data.currency}</Text></Col>
					<Col size={30}><Text style={styles.tableRowsText}>{data.last}</Text></Col>
					<Col size={30}><Text style={styles.tableRowsText}>{parseFloat(data.baseVolume).toFixed(3)}</Text></Col>
					<Col size={20}>{renderChangePercent()}</Col>
				</Grid>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	table :{
		flex: 1,
		marginTop:-5
	},
	tableHeader : {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-around',
		backgroundColor: clrs.accentColor,
		padding:5,
	},
	tableHead : {
		color: clrs.textPrimaryColor,
		fontSize:17,
		paddingRight:5,
	},
	tableRows : {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-around',
		padding:5,
	},
	tableRowsText:{
		fontSize:15,
		paddingRight:5,
	}
})