import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, TextInput, TouchableHighlight, ImageBackground, FlatList} from 'react-native';
import { Content, Button, H1 } from 'native-base';

import CustomHeader from '../SmallComponents/CustomHeader';
import CustomModal from '../SmallComponents/CustomModal';
import DeleteButton from '../SmallComponents/DeleteButton';

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
      gameTitle: 'Ligretto',
      cardGames: [], //List with all list of players. This is saved in localstorage.
      players: [], //The currently selected list of players.
      modalVisible: false,
    }

    //Bind functions to this component so they can be called from child component.
    this.showCardGame = this.showCardGame.bind(this);
    this.saveGames = this.saveGames.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

  }
  static navigationOptions = {
    drawerLabel: 'Kortspill',
    drawerIcon: (
      <Image source={require('../../images/kortspill.png')} style={{ width: 24, height: 24 }} />
    ),
  };

  componentWillMount() {
    //Dummy content for testing
    this.setState({
      players:
        [
          { key: '0', name: 'Joakim', scores: [5, 10, 5, 20], sum: 40, nextScore: null },
          { key: '1', name: 'Martin', scores: [3, 8], sum: 11, nextScore: null },
          { key: '2', name: 'Sølve', scores: [0, 12], sum: 12, nextScore: null },
        ],
    }, () => this.retrieveData()); //get data from localstorage and update state which then generates list.
  }

  //TODO: check if title doesn't already exist.
  saveGames(title, data){
    //Loop through cardGames. If title is found, overwrite. If not, append. Then setState.
    tempCardGames = this.state.cardGames;
    let inList = false;
    for (i = 0; i < tempCardGames.length; i++) {
      if (title == tempCardGames[i].title){
        tempCardGames[i] = {title: title, data: data};
        inList = true;
      }
    }
    if (!inList) { //Append if not overwrite
      tempCardGames.unshift({title: title, data: data});
    }
    this.setState({ cardGames: tempCardGames  }, () =>  this.storeData());
    console.log(this.state.cardGames);
  }

  storeData = async () => {
    let data = JSON.stringify(this.state.cardGames);
    try {
      await AsyncStorage.setItem("allGames", data);
    }
    catch (error) {
      console.log("error saving data. Error: " + error);
    }
  }
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem("allGames");
      if(value !== null) {
        //We have data!
        retrievedGames = JSON.parse(value);
        console.log("value retrieved from localstorage: " + retrievedGames);
        this.setState({cardGames: retrievedGames});
      }else{
        console.log("Data was retrieved but empty");
      }
    }
    catch (error) {
      console.log("Error retrieving data. Error: " + error);
    }
  }

  showCardGame(show){
    this.setState({ showCardGame: show })
  }

  newGame(){
    this.setState({players: []});
    this.saveGames(this.state.gameTitle, this.state.players);
    this.showCardGame(true);
  }

  setPlayers(saveData){
    this.setState({ players: saveData.data }, () => this.showCardGame(true));
  }

  toggleModal(show){ //--------------------------------------------------------
    this.setState({ modalVisible: show });
  }

  deleteGame(index){
    let tempcardGames = this.state.cardGames;
    tempcardGames.splice(index, 1);
    this.setState({ cardGames: tempcardGames }, () => this.storeData());
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

            <CustomModal modalVisible={this.state.modalVisible} toggleModal={this.toggleModal} title={"Nytt spill"}>
              <TextInput
                style={{ height: 60, alignSelf: 'stretch',}}
                placeholder="Tittel"
                ref={input => { this.textInput = input }}
                blurOnSubmit={true}
                keyboardType={'default'}
                onChangeText={ (text) => this.setState({ gameTitle: text }) }
                onSubmitEditing={() => {
                  this.setState({ gameTitle: text });
                  this.toggleModal(false);
                  this.textInput.clear();
                }}
              />
              <Button full onPress={() => this.newGame()} style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#F9A423' }}>
                <H1 style={{ fontSize: 20, justifyContent: 'center' }}>Nytt kortspill</H1>
              </Button>
            </CustomModal>



            <FlatList
              data={this.state.cardGames}
              extraData={this.state}
              keyExtractor={(_score, index) => `${this.state.cardGames.key}-score-${index}`}
              renderItem={({ item, index }) =>
                <View style={{ alignItems: 'center', alignSelf: 'stretch' }}>
                  <TouchableHighlight style={styles.largeLink} onPress={ () => this.setPlayers(item) }>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{ color: '#000' }}>{item.title}</Text>
                      <DeleteButton action={() => this.deleteGame(index)} />
                    </View>
                  </TouchableHighlight>
                </View>
              }
            />

            <Button full onPress={() => this.toggleModal(true)} style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#F9A423' }}>
              <H1 style={{ fontSize: 20, justifyContent: 'center' }}>Nytt kortspill</H1>
            </Button>
          </View>
        </View>
      );
    }else{
      //Render the seelected card game instead of the cardgame view.
      return (
        <Kortspill playerdata={this.state.players} gameTitle={this.state.gameTitle} showCardGame={this.showCardGame} saveGames={this.saveGames} />
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
    alignSelf: 'stretch',
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
