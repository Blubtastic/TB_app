import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, TextInput, TouchableHighlight, FlatList} from 'react-native';
import { H1, H2, H3, Button } from 'native-base';

import CustomHeader from '../SmallComponents/CustomHeader';
import CustomModal from '../SmallComponents/CustomModal';
import DeleteButton from '../SmallComponents/DeleteButton';
import WideButton from '../SmallComponents/WideButton';

import Kortspill from './Kortspill';


/*
KLESVASK COMPONENT: ----------------------------------------------------------
Menu page for the cardgame component. Create, delete and edit existing card games.
PROPERTIES:
- Navigation.
*/

export default class Kortspilloversikt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCardGame: false,
      gameTitle: '',
      cardGames: [], //List with all list of players. This is saved in localstorage.
      players: [], //The currently selected list of players.
      modalVisible: false,
      deleteModalVisible: false,
      deleteIndex: null,
      cardGameColors: ['#FFCB05', '#F5E51B', '#E87E04', '#F89406', '#FDE3A7'],
    }

    //Bind functions that will be passed to children without parameters.
    this.showCardGame = this.showCardGame.bind(this);
    this.saveGames = this.saveGames.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDeletemodal = this.toggleDeletemodal.bind(this);

  }
  static navigationOptions = {
    drawerLabel: 'Kortspill',
    drawerIcon: (
      <Image source={require('../../images/kortspill.png')} style={{ width: 24, height: 24 }} />
    ),
  };
  componentWillMount() {
    //Dummy content for testing
    this.retrieveData(); //get data from localstorage and update state which then generates list.
  }

  //Store data in localstorage
  saveGames(title, data){
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

  newGame(){
    if(this.state.gameTitle != '') {
      this.setState({players: []});
      this.saveGames(this.state.gameTitle, this.state.players);
      this.showCardGame(true);
    }
  }
  deleteGame(){
    let tempcardGames = this.state.cardGames;
    tempcardGames.splice(this.state.deleteIndex, 1);
    this.setState({ cardGames: tempcardGames }, () => this.storeData());
    this.toggleDeletemodal(false);
  }
  randomColor(){
    return this.state.cardGameColors[Math.floor(Math.random() * 5)];
  }

//State manipulation functions
  setPlayers(saveData){
    this.setState({ players: saveData.data, gameTitle: saveData.title }, () => this.showCardGame(true));
  }
  showCardGame(show){
    this.setState({ showCardGame: show, modalVisible: false })
  }
  toggleModal(show){
    this.setState({ modalVisible: show });
    if(show){
      this.setState({ gameTitle: '' });
    }
  }
  toggleDeletemodal(show){
    this.setState({ deleteModalVisible: show });
  }

  render() {
    if(!this.state.showCardGame){
      return (
        <View style={{flex: 1}}>
          <CustomHeader title={"Kortspill"} icon={"ios-arrow-back"} navigation={this.props.navigation} />
          <View style={styles.content}>

          {/* Create new cardgame modal */}
            <CustomModal modalVisible={this.state.modalVisible} toggleModal={this.toggleModal} title={"Nytt spill"}>
              <TextInput
                style={{ height: 60, alignSelf: 'stretch',}}
                autoFocus={true}
                placeholder="Tittel"
                ref={input => { this.textInput = input }}
                blurOnSubmit={true}
                keyboardType={'default'}
                onChangeText={ (text) => this.setState({ gameTitle: text }) }
                onSubmitEditing={() => {
                  this.newGame();
                  this.toggleModal(false);
                  this.textInput.clear();
                }}
              />
              <WideButton title={"Nytt kortspill"} action={() => this.newGame()} />
            </CustomModal>

            {/* Delete cardgame modal */}
            <CustomModal modalVisible={this.state.deleteModalVisible} toggleModal={this.toggleDeletemodal} title={'Slett "' + this.state.gameTitle + '" ?'}>
              <View style={{flexDirection: 'row'}}>
                <Button style={styles.grayButton} onPress={() => this.toggleDeletemodal(false)} >
                  <H1 style={styles.text}>Tilbake</H1>
                </Button>
                <Button style={styles.button} onPress={() => this.deleteGame()} >
                  <H1 style={styles.text}>Slett</H1>
                </Button>
              </View>
            </CustomModal>

            {/* List of all card games */}
            <View style={{alignSelf: 'stretch', maxHeight: '90%'}}>
              <FlatList
                data={this.state.cardGames}
                extraData={this.state}
                keyExtractor={(_score, index) => `${this.state.cardGames.key}-score-${index}`}
                renderItem={({ item, index }) =>
                  <TouchableHighlight style={styles.largeLink} onPress={ () => this.setPlayers(item) }>
                    <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
                      <H3 style={{ color: '#000' }}>{item.title}</H3>
                      <DeleteButton action={() => {this.toggleDeletemodal(true), this.setState({deleteIndex: index, gameTitle: this.state.cardGames[index].title }) } } />
                    </View>
                  </TouchableHighlight>
                }
              />
            </View>
            <WideButton title={"Nytt kortspill"} action={() => this.toggleModal(true)} />

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'stretch',
  },
  largeLink: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  button: {
    height: 60,
    width: '48%',
    backgroundColor: '#F9A423',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grayButton: {
    height: 60,
    width: '48%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    justifyContent: 'center'
  },
});
