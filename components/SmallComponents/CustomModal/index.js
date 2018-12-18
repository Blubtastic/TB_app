import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, FlatList, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
import { H1, Button, Icon } from 'native-base';

import CloseButton from '../CloseButton'

/*
CUSTOMMODAL COMPONENT: --------------------------------------------------------
Displays a smaller screen on top of the current screen (a modal). Can be used for a variety of purposes.
Simply put the content between the opening and closing tag to render it inside the modal.

PROPERTIES:
- title: modal title
- modalVisible: toggle modal
- toggleModal: function for setting the state of modalVisible in parent.

- children: component to be rendered inside the modal. Put this content between the brackets.
*/
export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ alignSelf: 'stretch', alignItems: 'center', maxHeight: '80%' }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            this.props.toggleModal(false);
          }}>
          <TouchableHighlight style={styles.modalBackground} onPress={() => this.props.toggleModal(false) }>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  <H1>{this.props.title}</H1>
                  <View style={{ position: 'absolute', top: -20, right: -20 }}>
                    <CloseButton action={ () => this.props.toggleModal(false) } />
                  </View>
                </View>

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
