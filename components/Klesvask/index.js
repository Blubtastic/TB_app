import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { Content } from 'native-base';

import CustomHeader from '../CustomHeader';


export default class Klesvask extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Klesvask',
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
