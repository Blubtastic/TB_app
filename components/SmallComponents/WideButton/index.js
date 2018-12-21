import React from 'react';
import { StyleSheet, View} from 'react-native';
import { H1, Button } from 'native-base';

/*
CLOSEBUTTON COMPONENT: --------------------------------------------------------
Close button that executes the function that is passed as props.

PROPERTIES:
- action: is executed when button is clicked.
- Title: text displayed on button
*/
export default class WideButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button full style={styles.button} onPress={this.props.action} >
        <H1 style={styles.text}>{this.props.title}</H1>
      </Button>
    );
  }
}

//STYLES
const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: '#F9A423',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    justifyContent: 'center'
  },
});
