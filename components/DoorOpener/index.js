import React from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import Config from '../../config';
import { Client, Message } from 'react-native-paho-mqtt';

import CustomHeader from '../SmallComponents/CustomHeader';

/*
DOOR OPENER COMPONENT: ----------------------------------------------------------
Door opener for teknobyen studentboliger. Contacts a server which contacts a raspberry PI, opening the front door to teknobyen.

PROPERTIES:
- navigation
*/

export default class DoorOpener extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connecting: true,
      error: null,
      opened: false,
    };
  }

  componentWillUnmount() {
    console.log('Disconnecting from mqtt...');
    this.client.disconnect();
    this.client = undefined;
  }

  static navigationOptions = {
    drawerLabel: 'Døråpner',
    drawerIcon: (
      <Image source={require('../../images/døråpner.png')} style={{ width: 24, height: 24 }} />
    ),
  };

  async componentDidMount() {
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
    this.client = new Client({ uri: `wss://${Config.doorOpener.mqttbrokerUrl}:${Config.doorOpener.mqttbrokerPort}/ws`, clientId: 'clientId', storage: myStorage });

    // Set event handlers
    this.client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.warn(responseObject.errorCode, responseObject.errorMessage);
        this.setState({ connecting: false, error: 'Huffameg, noe gikk alvorlig galt.' });
      }
    });

    try {
      await this.client.connect({
        userName: Config.doorOpener.userName,
        password: Config.doorOpener.password,
        useSSL: true,
      });

      this.setState({ connecting: false, });
    } catch (err) {
      this.setState({ connecting: false, error: 'Huffameg, noe gikk galt. Prøv igjen senere.', });

      if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost: ' + responseObject.errorMessage);
      }
    }
  }

  abraLaPutaPuerta() {
    const message = new Message('tb-appen');
    message.destinationName = 'teknobyen/doors/front/open';
    this.client.send(message);

    this.setState((prevState) => ({ ...prevState, opened: true }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title={'Døråpner'} icon={'ios-arrow-back'} navigation={this.props.navigation} />
        <View style={styles.content}>
          {this.state.connecting ?
            <View>
              <ActivityIndicator size="large" color="#000000" />
              <Text>Etablerer tilkobling til dørguden...</Text>
            </View> :
            this.state.opened ?
              <Text>Døra er (eller burde hvertfall være) åpen.</Text> :
              <Button title="Åpne døra" onPress={() => this.abraLaPutaPuerta()} />}
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
