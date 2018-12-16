import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image} from 'react-native';
import { Content, Button } from 'native-base';
import CustomHeader from '../CustomHeader';

/*
VASKELISTER COMPONENT: ----------------------------------------------------------
Shows the washing lists for the next month. Room numbers + date for each row.
PROPERTIES:
- navigation
*/

export default class Vaskelister extends React.Component {
  constructor(props) {
    super();
    this.state = {
      washingLists: [],
      isLoading: true,
    }
  }
  static navigationOptions = {
    drawerLabel: 'Vaskelister',
    drawerIcon: (
      <Image source={ require('../../images/vaskelister.png') } style={{width: 24, height: 24}}/>
    ),
  };

  //Get the washing lists from the server.
  componentDidMount(){
    //Server link
    return fetch('http://tb-app-server-tb-app-server.a3c1.starter-us-west-1.openshiftapps.com/tb_app/vaskelister')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    //Render loading screen
    if(this.state.isLoading){
      return(
        <View style={{flex: 1}}>
          <CustomHeader title={"Vaskelister"} icon={"ios-arrow-back"} navigation={this.props.navigation} />
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }
    //Render content when loading is done
    return(
      <View style={{flex: 1}}>
        <CustomHeader title={"Vaskelister"} icon={"ios-arrow-back"} navigation={this.props.navigation} />

        <View style={styles.content}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) =>
            <View style={styles.listRow}>
              <Text style={styles.rom}>{item.rom}</Text>
              <Text>{item.dato}</Text>
            </View>
            }
            keyExtractor={({_id}, index) => _id}
          />
          </View>
      </View>
    );
  }
}

/*
  getWashingLists() {
    get("localhost:8000/tb_app", function (response) {
      let washingLists = response;
      this.setState(({washingLists: this.state.washingLists}));
    });
  }
}
*/




//STYLES
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  listRow: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  rom: {
    fontSize: 19,
  },
});
