import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { Content } from 'native-base';

import CustomHeader from '../SmallComponents/CustomHeader';

/*
KLESVASK COMPONENT: ----------------------------------------------------------
Here you can see how many washing machines that are available, the remaining time for each machine and other stuff.
PROPERTIES:
*/

export default class Klesvask extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Klesvask',
    drawerIcon: (
      <Image source={ require('../../images/klesvask.png') } style={{width: 24, height: 24}}/>
    ),
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader title={"Klesvask"} icon={"ios-arrow-back"} navigation={this.props.navigation} />

        <View style={styles.content}>
          <Text>Klesvasksiden</Text>
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
