import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Content, Header, Body, Icon, Title, Container } from 'native-base';

/*
CUSTOM HEADER: ----------------------------------------------------------
The header that's displayed at almost al screens.
Contains title, back/logo button and "open drawer" button.
PROPERTIES:
- navigation
- title
- icon
*/

export default class CustomHeader extends React.Component {
  render() {
    //If header is on front page (show logo instead of back button)
    if (this.props.icon != null){
      return (
        <View style={styles.body} >
          <Icon style={styles.icon} name={this.props.icon} onPress={() => this.props.navigation.goBack(null) } />
          <View style={styles.bodyContainer}>
            <Title>{this.props.title}</Title>
          </View>
          <Icon style={styles.icon} name="md-menu" onPress={() => this.props.navigation.openDrawer() }/>
        </View>
      );
    } else {
      return (
        <View style={styles.body} >
          <Image source={ require('../../../images/logo.png') } style={styles.logo} onPress={() => this.props.navigate() } />
          <View style={styles.bodyContainer}>
            <Title>{this.props.title}</Title>
          </View>
          <Icon style={styles.icon} name="md-menu" onPress={() => this.props.navigation.openDrawer() }/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 24,
    backgroundColor: '#F9A423',
    alignSelf: "stretch",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bodyContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  icon: {
    padding: 13,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 30,
    width: 60,
  },
  logo: {
    resizeMode: 'contain',
    margin: 13,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    width: 30,
    height: 30,
  },
});
