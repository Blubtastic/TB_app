import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import { Content, Icon, H1, H2, H3, Item, Input, Form, Button } from 'native-base';

import CustomHeader from '../CustomHeader';


export default class Kortspill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
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
        {key: '0', name: 'Joakim', scores: [5, 10], sum: 0, nextScore: 0},
        {key: '1', name: 'Martin', scores: [3, 8], sum: 0, nextScore: 0},
        {key: '2', name: 'Sølve', scores: [0, 12], sum: 0, nextScore: 0},
      ]
    }, () => {

      var players = this.state.players;
      for (i = 0; i < players.length; i++) {
        var totalScore = 0;

        for (score = 0; score < players[i].scores.length; score++) {
          totalScore += this.state.players[i].scores[score]
        }

        players[i].sum = totalScore;
        this.setState({players: players});
      }

    })

  }

  addScores(players){
    //Copy array because React sucks
    newArray = this.state.players;
    //Update score list with new values
    for (x = 0; x < newArray.length; x++){
      newArray[x].scores.push(newArray[x].nextScore)
    }
    this.setState({players: newArray}, () => { console.log("new array: ", this.state.players) })
  }

  addPlayer(name){
    newPlayers = this.state.players;
    newPlayer = {};
    newPlayer.key = newPlayers.length + 1;
    newPlayer.name = name;
    newPlayer.scores = [];
    newPlayer.sum = 0;
    newPlayer.nextScore = 0;

    newPlayers.push(newPlayer);
    console.log(newplayers);
    this.setState({players: newPlayers});
  }

  //Renders the dropdown content
  renderList(){
    label = "Score";
    return(
      <FlatList
        data={this.state.players}
        extraData={this.state}
        keyExtractor={(item, index) => item.key}
        renderItem={({item}) =>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>{item.name}</Text>
          {/* Ikke garantert at dette funker ettersom det setter state uten setState.*/}
          <Input placeholder={label} keyboardType={'numeric'} onChangeText={ (text) => item.nextScore = parseInt(text) } />
        </View>}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>

        {/* HEADER/NAV */}
        <View style={styles.header}>
          <H1>Poengtavle</H1>
          <Button style={styles.closeBtn} onPress={() => this.props.navigation.goBack(null) } >
            <Icon style={{fontSize: 50, color: '#111'}}  name="ios-close" />
          </Button>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* ADD SCORES */}

          <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
            <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', height: 60, backgroundColor: '#efefef'}}>
              <H1 style={{fontSize: 20, justifyContent: 'center'}}>Legg til poeng - runde 1</H1>
            </View>
            <View style={styles.dropdownContent}>

            {this.renderList()}


              {/*
              <List>
                <FlatList data={this.state.players}
                  renderItem={({player}) => (
                  <ListItem style={{height: 60}} title={'player.name'}>
                    <Item>
                      <Input
                        keyboardType={'numeric'}
                        onChangeText={(text) => player.nextScore = parseInt(text)}
                        placeholder="Poeng"
                      />
                    </Item>
                  </ListItem>
                  )}
                />
              </List>
              */}


              <Button full style={{backgroundColor: '#F9A423', marginTop: 10, marginBottom: 10}} onPress={() => this.addScores()}>
                <Text >Legg til</Text>
              </Button>
            </View>
          </View>


          {/* SHOW SCORES / NEW PLAYER */}
          <View style={{alignSelf: 'stretch'}}>
          {/*
          <List>
            <FlatList style={styles.playersList}
              data={this.state.players}
              renderItem={({ player }) => (
                <ListItem style={{height: 70}} title={player.name} subtitle={player.sum + ' poeng'}>
                  <FlatList data={player.scores}
                    renderItem={({ score }) => (
                      <ListItem title={score + 'p'}/>
                    )}
                  />
                </ListItem>
              )}
            />
          </List>
          */}
          {/* A list containing a list, showing each player and their scores. */}
          <FlatList
            data={this.state.players}
            extraData={this.state}
            keyExtractor={(item, index) => item.key}
            renderItem={({item}) =>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 10}}>

              <View style={{marginRight: 10, width: 80}}>
                <H3 style={{}}>{item.name}</H3>
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

            <Button full style={{backgroundColor: '#F9A423', marginTop: 10, marginBottom: 10}}>
              <Text >Ny spiller</Text>
            </Button>
          </View>
          <View style={{flex: 1}}/>

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
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginTop: 24,
    padding: 10
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  playersList: {

  },
  playerScores: {
    flexDirection: 'row',
  },
  dropdownContent: {
    width: '60%',
  },
});
