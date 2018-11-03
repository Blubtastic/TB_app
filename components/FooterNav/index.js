import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';


export default class FooterNav extends React.Component {
  render() {
    return (
      <View>
        <Button
          title="Calendar"
          onPress={() => this.props.navigation.push('Home')}
        />
        <Button
          title="Vaskelister"
          onPress={() => this.props.navigation.push('Vask')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#aaa',
  },
});
