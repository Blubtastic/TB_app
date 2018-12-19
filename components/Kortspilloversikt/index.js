import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Image, TouchableHighlight, ImageBackground} from 'react-native';
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
      cardGames: [], //List with all list of players. This is saved in localstorage.
      players: [], //The currently selected list of players.
    }

    this.showCardGame = this.showCardGame.bind(this);
  }
  static navigationOptions = {
    drawerLabel: 'Kortspill',
    drawerIcon: (
      <Image source={require('../../images/kortspill.png')} style={{ width: 24, height: 24 }} />
    ),
  };

  componentWillMount() {
    //Generate players to later pass them into kortspill. For test.
    this.setState({
      players:
        [
          { key: '0', name: 'Joakim', scores: [5, 10, 5, 20], sum: 40, nextScore: null },
          { key: '1', name: 'Martin', scores: [3, 8], sum: 11, nextScore: null },
          { key: '2', name: 'Sølve', scores: [0, 12], sum: 12, nextScore: null },
        ],
    });
    this.storeData();
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('key1', 'this string has been stored!');
    }
    catch (error) {
      console.log("error saving data. Error: " + error);
    }
  }
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('key1');
      if(value !== null) {
        //We have data!
        console.log("value retrieved from localstorage: " + value);
      }
    }
    catch (error) {
      console.log("Error retrieving data. Error: " + error);
    }
  }

  showCardGame(show){
    this.setState({ showCardGame: show })
  }

  //TODO: LOAD/SAVE playerdata from localstorage
  //TODO: Generate list from save files

  //TODO Function for new card game (create empty players list)
  //TODO: Delete cardgame file



  render() {
    //TODO: IF-ELSE statement. Render "kortspill" component if one is selected with the right parameters. If not, render selection screen.
    if(!this.state.showCardGame){
      return (
        <View style={{flex: 1}}>
        <CustomHeader title={"Kortspill"} icon={"ios-arrow-back"} navigation={this.props.navigation} />

          <View style={styles.content}>
            <TouchableHighlight style={styles.largeLink} onPress={ () => this.retrieveData() }>
              <View style={styles.textBar}>
                <Text style={{ color: '#000' }}>Kortspill 1</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      );
    }else{
      //Render the seelected card game instead of the cardgame view.
      return (
        <Kortspill showCardGame={this.showCardGame} playerdata={this.state.players} />
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
