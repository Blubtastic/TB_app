import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { H1, Button, Icon } from 'native-base';

/*
CLOSEBUTTON COMPONENT: --------------------------------------------------------
Close button that executes the function that is passed as props.

PROPERTIES:
- action: is executed when button is clicked.
*/
export default class CloseButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button style={styles.closeBtn} onPress={this.props.action } >
        <Icon style={{fontSize: 50, color: '#111'}}  name="ios-close" />
      </Button>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
