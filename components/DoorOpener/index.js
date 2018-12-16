import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {Content} from 'native-base';
import Config from '../../config';
import {Client, Message} from 'react-native-paho-mqtt';

import CustomHeader from '../CustomHeader';

/*
DOOR OPENER COMPONENT: ----------------------------------------------------------
Door opener for teknobyen studentboliger. Contacts a server which contacts a raspberry PI, opening the front door to teknobyen.

PROPERTIES:
- navigation
*/

export default class DoorOpener extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Døråpner',
    drawerIcon: (
      <Image source={ require('../../images/døråpner.png') } style={{width: 24, height: 24}}/>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      mqttstuff: 'Heilå',
      noeAnnet: 'yoyoyo'
    };
  }

  componentDidMount() {
    //Set up an in-memory alternative to global localStorage
    const myStorage = {
      setItem: (key, item) => {
        myStorage[key] = item;
      },
      getItem: (key) => myStorage[key],
      removeItem: (key) => {
        delete myStorage[key];
      },
    };

    // Create a client instance
    const client = new Client({uri: `wss://${Config.doorOpener.mqttbrokerUrl}:${Config.doorOpener.mqttbrokerPort}/ws`, clientId: 'clientId', storage: myStorage});

    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });

    // connect the client
    const connectOptions = {
      userName: Config.doorOpener.userName,
      password: Config.doorOpener.password,
      useSSL: true
    };

    client.connect(connectOptions)
    .then(() => {
      const message = new Message('tb-appen');
      message.destinationName = 'teknobyen/doors/front/open';
      client.send(message);
    })
    .catch((responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost: ' + responseObject.errorMessage);
      }
    })
    ;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader title={'Døråpner'} icon={'ios-arrow-back'} navigate={() => this.props.navigation.goBack(null)}/>
        <View style={styles.content}>
          <Text>Nå bør døren åpne seg...</Text>
        </View>
      </View>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
