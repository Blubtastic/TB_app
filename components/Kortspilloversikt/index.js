import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, ImageBackground} from 'react-native';
import { Content } from 'native-base';

import CustomHeader from '../SmallComponents/CustomHeader';
import Kortspill from './Kortspill';


/*
KLESVASK COMPONENT: ----------------------------------------------------------
Here you can see how many washing machines that are available, the remaining time for each machine and other stuff.
PROPERTIES:
*/

export default class Kortspilloversikt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCardGame: false,
    }

    this.showCardGame = this.showCardGame.bind(this);
  }
  static navigationOptions = {
    drawerLabel: 'Kortspill',
    drawerIcon: (
      <Image source={require('../../images/kortspill.png')} style={{ width: 24, height: 24 }} />
    ),
  };

  showCardGame(show){
    this.setState({ showCardGame: show })
  }


  render() {
    //TODO: IF-ELSE statement. Render "kortspill" component if one is selected with the right parameters. If not, render selection screen.
    if(!this.state.showCardGame){
      return (
        <View style={{flex: 1}}>
        <CustomHeader title={"Kortspill"} icon={"ios-arrow-back"} navigation={this.props.navigation} />

          <View style={styles.content}>
            <Text>Kortspilloversikt</Text>
            <ImageBackground style={styles.img} source={require('../../images/kortspill.jpg')}>
              <TouchableHighlight style={styles.largeLink} onPress={ () => this.showCardGame(true) }>
                <View style={styles.textBar}>
                  <Text style={{ color: '#fff' }}>Kortspill</Text>
                </View>
              </TouchableHighlight>
            </ImageBackground>
          </View>
        </View>
      );
    }else{
      //Render the seelected card game instead of the cardgame view. 
      return (
        <Kortspill showCardGame={this.showCardGame} />
      );
    }
  }
}

//STYLES
const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    margin: 4,
  },
  largeLink: {
    height: 200,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
