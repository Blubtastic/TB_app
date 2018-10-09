import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, ImageBackground } from 'react-native';
import { Content } from 'native-base';

import CustomHeader from '../CustomHeader';


export default class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      image1: require('../../images/calendar.jpg'),
    };
  }
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <CustomHeader title={"Hjem"} icon={"md-menu"} navigate={() => this.props.navigation.openDrawer()} />

        <View style={styles.content}>
          <View style={{alignItems: 'center', height: 50, marginBottom: 20, marginTop: 20}}>
            <Image source={ require('../../images/logo.png') } style={styles.logo} />
            <Text>Teknoappen</Text>
          </View>

          <ImageBackground  style={styles.largeImg} source={ require('../../images/calendar.jpg') }>
            <TouchableHighlight style={styles.largeLink} onPress={() => navigate('Calendar') }>
              <View style={styles.textBar}>
              <Text style={{color: '#fff'}}>Eventkalender</Text>
              </View>
            </TouchableHighlight>
          </ImageBackground>

          <View style={styles.row}>
            <ImageBackground  style={styles.img} source={ require('../../images/vaskelister.jpg') }>
              <TouchableHighlight style={styles.link} onPress={() => navigate('Vaskelister') }>
                <View style={styles.textBar}>
                  <Text style={{color: '#fff'}}>Vaskelister</Text>
                </View>
              </TouchableHighlight>
            </ImageBackground>
            <ImageBackground  style={styles.img} source={ require('../../images/vaskemaskiner.jpg') }>
              <TouchableHighlight style={styles.link} onPress={() => navigate('Klesvask') }>
                <View style={styles.textBar}>
                  <Text style={{color: '#fff'}}>Vaskemaskiner</Text>
                </View>
              </TouchableHighlight>
            </ImageBackground>
          </View>

          <View style={styles.row}>
            <ImageBackground  style={styles.img} source={ require('../../images/turneringer.jpg') }>
              <TouchableHighlight style={styles.link} onPress={() => navigate('Turneringer') }>
                <View style={styles.textBar}>
                  <Text style={{color: '#fff'}}>Turneringer</Text>
                </View>
              </TouchableHighlight>
            </ImageBackground>
            <ImageBackground  style={styles.img} source={ require('../../images/kortspill.jpg') }>
              <TouchableHighlight style={styles.link} onPress={() => navigate('Kortspill') }>
                <View style={styles.textBar}>
                  <Text style={{color: '#fff'}}>Kortspill</Text>
                </View>
              </TouchableHighlight>
            </ImageBackground>
          </View>

          <View style={styles.row}>
            <ImageBackground  style={styles.img} source={ require('../../images/døråpner.jpg') }>
              <TouchableHighlight style={styles.link} onPress={() => navigate('Døråpner') }>
                <View style={styles.textBar}>
                  <Text style={{color: '#fff'}}>Døråpner</Text>
                </View>
              </TouchableHighlight>
            </ImageBackground>
            <View style={styles.img} />
          </View>

        </View>

      </View>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },

  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  largeImg: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  link: {
    height: 125,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  largeLink: {
    height: 200,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
  }
});
