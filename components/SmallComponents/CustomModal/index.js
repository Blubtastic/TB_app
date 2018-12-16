import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import { H1, Button, Icon } from 'native-base';

import CloseButton from '../CloseButton'

/*
CUSTOMMODAL COMPONENT: --------------------------------------------------------
Displays a smaller screen on top of the current screen (a modal). Can be used for a variety of purposes.
Pass a child component as props to render it inside the modal.

PROPERTIES:
- modalVisible: toggle modal
- children: component to be rendered inside modal.
*/
export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
    }
  }
  //Because react sucks. Update state properly
  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.modalVisible });
  }

  render() {
    return (
      <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false })
          }}>
          <TouchableHighlight style={styles.modalBackground} onPress={ () => this.setState({ modalVisible: false }) }>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>

                //Render the component from the props.
                {this.props.children}

              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </Modal>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    paddingTop: 50,
    justifyContent: 'flex-start',
    flex: 1,
    zIndex: 1,
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 25,
    position: 'relative',
    zIndex: 2,
  },
});
