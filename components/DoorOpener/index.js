import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import Config from '../../config';
import { Client, Message } from 'react-native-paho-mqtt';

import CustomHeader from '../CustomHeader';

export default class DoorOpener extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Døråpner',
    drawerIcon: (
      <Image source={require('../../images/døråpner.png')} style={{ width: 24, height: 24 }}/>
    ),
  };

  componentDidMount() {
    // Set up an in-memory alternative to global localStorage
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
    const client = new Client({ uri: `wss://${Config.doorOpener.mqttbrokerUrl}:${Config.doorOpener.mqttbrokerPort}/ws`, clientId: 'clientId', storage: myStorage });

    // Set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.error(responseObject.errorMessage);
      }
    });

    // Connect the client
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
      <View style={{ flex: 1 }}>
        <CustomHeader title={'Døråpner'} icon={'ios-arrow-back'} navigation={this.props.navigation} />
        <View style={styles.content}>
          <Text>Nå bør døren åpne seg...</Text>
        </View>
      </View>
    );
  }
}

// STYLES
const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
