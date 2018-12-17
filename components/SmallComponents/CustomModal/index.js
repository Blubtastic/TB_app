import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import { H1, Button, Icon } from 'native-base';

import CloseButton from '../CloseButton'

/*
CUSTOMMODAL COMPONENT: --------------------------------------------------------
Displays a smaller screen on top of the current screen (a modal). Can be used for a variety of purposes.
Pass a child component as props to render it inside the modal.

PROPERTIES:
- children: component to be rendered inside modal.
- modalVisible: toggle modal
- toggleModal: function for setting the state of modalVisible in parent. 
*/
export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: props.modalVisible }
  }
  //Because react sucks. Update state properly
  componentWillReceiveProps(nextProps) {
    this.setState({ modalVisible: nextProps.modalVisible });
  }

  render() {
    return (
      <View style={{ alignSelf: 'stretch', alignItems: 'center', maxHeight: '80%' }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.props.toggleModal(false);
          }}>
          <TouchableHighlight style={styles.modalBackground} onPress={() => this.props.toggleModal(false) }>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>

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
    maxHeight: '80%',
    backgroundColor: '#fff',
    padding: 25,
    position: 'relative',
    zIndex: 2,
  },
});
