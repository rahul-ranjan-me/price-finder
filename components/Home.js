import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';
import clrs from '../utils/Clrs';
import { 
    Icon, 
    SocialIcon,
    ButtonGroup,
} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');
import {Grid, Col, Row} from 'react-native-elements';
import Prices from './Prices';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedBase : 'BTC',
            favorite:[]
        };
        this.updateIndex = this.updateIndex.bind(this);
        this.buttons = ['BTC', 'ETH', 'XMR', 'USDT'];
    }

    updateIndex (selectedIndex) {
        this.setState({selectedBase: this.buttons[selectedIndex]});
        this.setState({selectedIndex})
    };

    onPageNavigate(page){
        this.props.navigator.replace({ id: page });
    };

    addFavorite(data){
        this.state.favorite.unshift(data);
        this.setState({'favorite': this.state.favorite});
    };

    removeFavorite(key){
        this.state.favorite.splice(key, 1);
        this.setState({'favorite': this.state.favorite});  
    };

    render() {
        const { selectedIndex } = this.state;
        const renderChangePercent = (data) =>{
            const percentChange = (parseFloat(data.percentChange)*100).toFixed(2);

            return percentChange < 0 ? 
                <Text style={{color:'#c02a1d', fontSize:15}}>{percentChange}</Text> :
                <Text style={{color:'#27892f', fontSize:15}}>{percentChange}</Text>;
        }
        const createFavorite = (data, i) => {
            return (
                <View key={i} style={{backgroundColor:clrs.lightPrimaryColor, padding:5, marginBottom:5}}>
                    <Grid>
                        <Col size={15}><Text>{data.currency}</Text></Col>
                        <Col size={30}><Text>{data.last}</Text></Col>
                        <Col size={25}><Text>{parseFloat(data.baseVolume).toFixed(3)}</Text></Col>
                        <Col size={15}>{renderChangePercent(data)}</Col>
                        <Col size={5}><Text onPress={(i) => {this.removeFavorite(i)}}>X</Text></Col>
                    </Grid>
                </View>
            )
        }
        return (
            <View style={styles.page}>

                {this.state.favorite.length ? <View style={styles.favoriteCurrency}>
                    <ScrollView>
                        {this.state.favorite.map(createFavorite)}
                    </ScrollView>
                </View> : null}

                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={this.buttons}
                  containerStyle={{height:35, marginTop:10}} />
                <Prices showBase = {this.state.selectedBase} addFavorite={(data) => this.addFavorite(data)} />

            </View>
            
        );    
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: clrs.textPrimaryColor
    },
    pageContent: {
        flex: 1,
        alignItems: 'center',
        top: 200,
        color: clrs.primaryText
    },
    favoriteCurrency: {
        height:150,
        backgroundColor:clrs.primaryColor,
    }
});