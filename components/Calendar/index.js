import React from 'react';
import { StyleSheet, Text, View, Button, Icon, Image} from 'react-native';
import { Content } from 'native-base';

import CustomHeader from '../CustomHeader';


export default class Calendar extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Vorskalender',
    drawerIcon: (
      <Image source={ require('../../images/kalender.png') } style={{width: 24, height: 24}}/>
    ),

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader title={"Calendar"} icon={"ios-arrow-back"} navigation={this.props.navigation} />

        <View style={styles.content}>
          <Text>Kalendersiden</Text>
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
