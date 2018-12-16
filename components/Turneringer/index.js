import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';

import CustomHeader from '../SmallComponents/CustomHeader';

/*
TOURNAMENT COMPONENT: ----------------------------------------------------------
Not implemented. Tournament page for eg. pool, pingpoing, beerpong and so on ..

PROPERTIES:
- navigation.
*/

export default class Turneringer extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Turneringer',
    drawerIcon: (
      <Image source={ require('../../images/turneringer.png') } style={{width: 24, height: 24}}/>
    ),
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader title={"Turneringer"} icon={"ios-arrow-back"} navigation={this.props.navigation} />

        <View style={styles.content}>
          <Text>Turneringssiden</Text>
        </View>
      </View>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
