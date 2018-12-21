import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight, TouchableWithoutFeedback, Modal, TextInput } from 'react-native';
import { Content, Icon, H1, H2, H3, Item } from 'native-base';

import CustomHeader from '../../SmallComponents/CustomHeader';
import CloseButton from '../../SmallComponents/CloseButton';
import DeleteButton from '../../SmallComponents/DeleteButton';
import CustomModal from '../../SmallComponents/CustomModal';
import WideButton from '../../SmallComponents/WideButton';

/*
KORTSPILL COMPONENT: ----------------------------------------------------------
An instance of a card game.
Many card games can exist at the same time, and is controlled by the
cardgame menu component.

PROPERTIES:
- navigation: the react-router navigation. Used to navigate between app pages.
*/
export default class Kortspill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      selectedPlayer: {key: '', name: '', scores: [], sum: 0, nextScore: null},
      modalVisible: false,
      playerModalVisible: false,
      inputs: {},
      newName: null,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalPlayer = this.toggleModalPlayer.bind(this);
  }


  componentWillMount() {
    //copy playerinfo from parent, which got it from localstorage
    this.setState({ players: this.props.playerdata },
      () => this.rerenderPlayers())
  }

  //Restructures the list of players in state.
  //Run this whenever content of players changes ------------------------------
  rerenderPlayers() {
    //Copy state and calculate scores
    var players = this.state.players;
    for (i = 0; i < players.length; i++) {
      var totalScore = 0;
      for (score = 0; score < players[i].scores.length; score++) {
        totalScore += this.state.players[i].scores[score]
      }
      players[i].sum = totalScore;
    }
    players.sort(function (a, b) { //Sort players by score
      return b.sum - a.sum;
    });
    //Reassign indexes (because players are sorted and perhaps deleted)
    for (x = 0; x < players.length; x++) {
      players[x].key = x.toString()
    }
    this.setState({ players: players });
  }

  //Add new score to each player ---------------------------------------------
  addScores(players) {
    this.toggleModal(false);
    // Copy array & update with new values
    let newArray = this.state.players;
    for (x = 0; x < newArray.length; x++) {
      if (newArray[x].nextScore != null) {
        newArray[x].scores.push(newArray[x].nextScore)
        newArray[x].nextScore = null;
      }
    }
    this.setState({ players: newArray });
    this.rerenderPlayers();

    this.props.saveGames(this.props.gameTitle, this.state.players); //save changes
  }

  //Add a new player ---------------------------------------------------------
  addPlayer(name) {
    if (name != null){
      newPlayers = this.state.players;
      newPlayer = {};
      newPlayer.key = String(newPlayers.length + 1);
      newPlayer.name = name;
      newPlayer.scores = [];
      newPlayer.sum = 0;
      newPlayer.nextScore = null;

      newPlayers.push(newPlayer);
      this.setState({ players: newPlayers });
      this.setState({ players: newPlayers }, () => { this.rerenderPlayers() })
      this.rerenderPlayers(); //Player state changes, must rebuild.

      this.props.saveGames(this.props.gameTitle, this.state.players); //save changes
    }
  }

  //Jumps to next input field ------------------------------------------------
  focusNextField(id) {
    if (id < this.state.players.length) {
      this.state.inputs[id].focus();
    }
  }

  toggleModal(show){ //--------------------------------------------------------
    this.setState({ modalVisible: show });
  }
  toggleModalPlayer(show){ //---------------------------------------------------
    this.setState({ playerModalVisible: show });
  }
  selectPlayer(player){
    this.setState({selectedPlayer: player});
    this.toggleModalPlayer(true);
  }

  deleteScore(index){
    let playerIndex = this.state.players.indexOf(this.state.selectedPlayer);
    let tempArray = this.state.players;
    tempArray[playerIndex].scores.splice(index, 1);
    this.setState({players: tempArray});

    this.props.saveGames(this.props.gameTitle, this.state.players); //save changes
    this.rerenderPlayers();
  }

  deletePlayer(){ //Deletes "selectedPlayer" from the players list.
    let index = this.state.players.indexOf(this.state.selectedPlayer);
    let tempArray = this.state.players;
    tempArray.splice(index, 1);
    this.setState({players: tempArray});
    this.toggleModalPlayer(false);

    this.props.saveGames(this.props.gameTitle, this.state.players); //save changes
  }

  renderPointButton() { //Only render points button if there are players.
    if (this.state.players.length > 0){
      return <WideButton title={"Legg til poeng"} action={() => this.toggleModal(true)} />;
    }else{
      return null;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* HEADER/NAV ---------------------------------------------------- */}
        <View style={styles.header}>
          <H1>{this.props.gameTitle}</H1>
          <CloseButton action={() => this.props.showCardGame(false)} />
        </View>


        {/* CONTENT ------------------------------------------------------- */}
        <View style={styles.content}>

          {/* Ny spiller input field+btn  */}
          <TextInput
            style={{ height: 60, alignSelf: 'stretch',}}
            placeholder="Legg til ny spiller"
            ref={input => { this.textInput = input }}
            blurOnSubmit={true}
            keyboardType={'default'}
            onChangeText={ (text) => this.setState({ newName: text }) }
            onSubmitEditing={() => {
              this.addPlayer(this.state.newName);
              this.textInput.clear();
            }}
          />


          {/* Modal for adding scores */}
          <CustomModal modalVisible={this.state.modalVisible} toggleModal={this.toggleModal} title={"Legg til poeng"}>
            <FlatList
              data={this.state.players}
              extraData={this.state}
              keyExtractor={(item, index) => item.key}
              renderItem={({ item }) =>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ flex: 1 }}> {item.name} </Text>
                  {/* Ikke garantert at dette funker ettersom det setter state uten setState. */}
                  <TextInput
                    style={{ flex: 3, height: 60 }}
                    placeholder="Score"
                    ref={input => {
                      this.state.inputs[item.key] = input;
                    }}
                    blurOnSubmit={false}
                    keyboardType={'numeric'}
                    onChangeText={(text) => item.nextScore = parseInt(text)}
                    onSubmitEditing={() => {
                      this.focusNextField(parseInt(item.key) + 1);
                    }}
                  />
                </View>
              }
            />
            <WideButton title={"Legg til"} action={() => this.addScores()} />
          </CustomModal>

          {/* Modal for deleting players/scores */}
          <CustomModal modalVisible={this.state.playerModalVisible} toggleModal={this.toggleModalPlayer} title={this.state.selectedPlayer.name}>
            <FlatList
              data={this.state.selectedPlayer.scores}
              extraData={this.state}
              keyExtractor={(_score, index) => `${this.state.selectedPlayer.key}-score-${index}`}
              renderItem={({ item, index }) =>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ flex: 1 }}> {item} </Text>
                  <DeleteButton action={() => this.deleteScore(index)} />
                </View>
              }
            />
            <WideButton title={"Slett spiller"} action={() => this.deletePlayer()} />
          </CustomModal>


          {/* SHOW LIST OF PLAYERS w/scores ----------*/}
          <View style={{ alignSelf: 'stretch', flex: 1, justifyContent: 'space-between' }}>
            <View style={{ maxHeight: '100%' }}>
              {/* A list containing a list, showing each player and their scores. */}
              <FlatList
                data={this.state.players}
                extraData={this.state}
                keyExtractor={(item, index) => item.key}
                renderItem={({ item }) =>

                  <TouchableHighlight onPress={ () => this.selectPlayer(item) } >
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 10 }}>
                      <View style={{ marginRight: 10, width: 80 }}>
                        <H3>{item.name}</H3>
                        <Text style={{ color: '#F9A423' }}>{item.sum + ' poeng'}</Text>
                      </View>
                      <FlatList
                        data={item.scores}
                        extraData={this.state}
                        horizontal={true}
                        keyExtractor={(_score, index) => `${item.key}-score-${index}`}
                        renderItem={({ item }) =>
                          <Text style={{ paddingLeft: 6, paddingRight: 6 }}>{item}</Text>
                        }
                      />
                    </View>
                  </TouchableHighlight>

                }
              />
              {this.renderPointButton()}
            </View>
          </View>

        </View>
      </View>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  closeBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F9A423',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 14,
    right: 14,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    marginTop: 24,
    marginBottom: 30,
    padding: 10
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    paddingTop: 50,
    justifyContent: 'flex-start',
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 25,
    position: 'relative',
    zIndex: 2,
  },
});
