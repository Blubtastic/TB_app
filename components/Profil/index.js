import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Content } from 'native-base';

/*
PROFILE COMPONENT: ----------------------------------------------------------
The user's profile page. Details not yet decided, but settings and information
should be displayed.
PROPERTIES:

*/

export default class Profil extends React.Component {
  render() {
    return (
      <View style={styles.content}>

        <Text>Profilsiden. Diverse innstillinger vises her.</Text>

      </View>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
