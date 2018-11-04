import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableHighlight, TouchableWithoutFeedback, Modal} from 'react-native';
import { Content, Icon, H1, H2, H3, Item, Input, Form, Button } from 'native-base';


import CustomHeader from '../CustomHeader';
import CloseButton from '../SmallComponents/CloseButton'


export default class Kortspill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      modalVisible: false,
    }
  }
  static navigationOptions = {
    drawerLabel: 'Kortspill',
    drawerIcon: (
      <Image source={ require('../../images/kortspill.png') } style={{width: 24, height: 24}}/>
    ),
  };

  componentWillMount(){
    //For testint. Later will set state from local storage.
    this.setState({players:
      [
        {key: '0', name: 'Joakim', scores: [5, 10], sum: 0, nextScore: null},
        {key: '1', name: 'Martin', scores: [3, 8], sum: 0, nextScore: null},
        {key: '2', name: 'Sølve', scores: [0, 12], sum: 0, nextScore: null},
      ],
    }, () => this.calculateSum())

  }
  //Calculates the sum for each player in state.
  calculateSum(){
    var players = this.state.players;
    for (i = 0; i < players.length; i++) {
      var totalScore = 0;
      for (score = 0; score < players[i].scores.length; score++) {
        totalScore += this.state.players[i].scores[score]
      }
      players[i].sum = totalScore;
      this.setState({players: players});
    }
  }

  //Add new score to each player
  addScores(players){
    //Hide modal
    this.setState({ modalVisible: false })
    //1: Copy array because React sucks
    let newArray = this.state.players;
    //2: Update with new values
    for (x = 0; x < newArray.length; x++){
      if(newArray[x].nextScore != null) {
        newArray[x].scores.push(newArray[x].nextScore)
        newArray[x].nextScore = null;
      }
    }
    //3: Update state
    this.setState({players: newArray}, () => { console.log("new array: ", this.state.players) })
    //Update sum field for each player
    this.calculateSum();
  }

  //Add a new player
  addPlayer(name){
    newPlayers = this.state.players;
    newPlayer = {};
    newPlayer.key = String(newPlayers.length + 1);
    newPlayer.name = name;
    newPlayer.scores = [];
    newPlayer.sum = 0;
    newPlayer.nextScore = null;

    newPlayers.push(newPlayer);
    console.log(newPlayers);
    this.setState({players: newPlayers});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/* HEADER/NAV ---------------------------------------------------- */}
        <View style={styles.header}>
          <H1>Poengtavle</H1>
          <CloseButton action={() => this.props.navigation.goBack(null)} />
        </View>

        {/* CONTENT ------------------------------------------------------- */}
        <View style={styles.content}>
          {/* INPUT FIELDS FOR SCORES ---------- */}
          <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setState({ modalVisible: false })
              }}>
              <TouchableHighlight style={styles.modalBackground} onPress={ () => this.setState({ modalVisible: false }) }>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <H1>Legg til poeng</H1>
                      <View style={{position: 'absolute', top: -20, right: -20}}>
                        <CloseButton action={() => this.setState({ modalVisible: false }) } />
                      </View>
                    </View>

                    <FlatList
                      data={this.state.players}
                      extraData={this.state}
                      keyExtractor={(item, index) => item.key}
                      renderItem={({item}) =>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{flex: 1}}>{item.name}</Text>
                        {/* Ikke garantert at dette funker ettersom det setter state uten setState.*/}
                        <Input style={{flex: 3}} placeholder={"Score"} keyboardType={'numeric'} onChangeText={ (text) => item.nextScore = parseInt(text) } />
                      </View>}
                    />
                    <Button full style={{backgroundColor: '#F9A423', height: 60}} onPress={() => this.addScores()}>
                      <Text >Legg til</Text>
                    </Button>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableHighlight>
            </Modal>
          </View>

          {/* SHOW ALL PLAYERS (+ scores) ----------*/}
          <View style={{alignSelf: 'stretch', flex: 1, justifyContent: 'space-between'}}>
            <View style={{maxHeight: '90%'}}>
              {/* A list containing a list, showing each player and their scores. */}
              <FlatList
                data={this.state.players}
                extraData={this.state}
                keyExtractor={(item, index) => item.key}
                renderItem={({item}) =>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 10}}>
                  <View style={{marginRight: 10, width: 80}}>
                    <H3>{item.name}</H3>
                    <Text style={{color: '#F9A423'}}>{item.sum + ' poeng'}</Text>
                  </View>
                  <FlatList
                    data={item.scores}
                    extraData={this.state}
                    horizontal={true}
                    keyExtractor={(item, index) => item.key}
                    renderItem={({item}) =>
                      <Text style={{paddingLeft: 6, paddingRight: 6}}>{item}</Text>
                    }
                  />
                </View>}
              />
              {/* Nye poeng  */}
              <Button full onPress={() => this.setState({ modalVisible: true })}style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#F9A423'}}>
                <H1 style={{fontSize: 20, justifyContent: 'center'}}>Legg til poeng</H1>
              </Button>

            </View>
            {/* Ny spiller  */}
            <Button full onPress={() => this.addPlayer("joakim")} style={{backgroundColor: '#F9A423', height: 60}}>
              <H3 >Ny spiller</H3>
            </Button>
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
