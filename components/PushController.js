import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {

	componentDidMount(){
		PushNotification.configure({
			onNotification: function(notification) {
				console.log( 'NOTIFICATION:', notification );
		    },
		    
		    onRegister: function(token) {
		        console.log( 'TOKEN:', token );
		    },

		    senderID: "123863335378",
		});
	}

	render(){
		return null;
	}

}