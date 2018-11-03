import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Root, Container, Header, Left, Body, Right, Title, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
import Expo from 'expo'

import Calendar from './components/Calendar';
import Vaskelister from './components/Vaskelister';
import Klesvask from './components/Klesvask';
import DoorOpener from './components/DoorOpener';

import Turneringer from './components/Sidemeny/Turneringer';
import Kortspill from './components/Sidemeny/Kortspill';


const MyApp = createDrawerNavigator({
  Home: {
    screen: Turneringer,
  },
  Notifications: {
    screen: Kortspill,
  },
});

class TB_app extends Component {
  constructor() {
    super()
    this.state = {
      activeTab: "Calendar"
    }
  }
  handleMenuClick(activeTab) {
    this.setState({activeTab})
  }


  render() {
    const {activeTab} = this.state
    return (
      <Container>

        <Header style={styles.container} >
          <Body style={styles.body} >
            <Icon name="md-menu"/>
            <View style={styles.bodyContainer}>
              <Title>Teknobyen</Title>
            </View>
            <Icon name="notifications"/>
          </Body>
        </Header>


        <Content contentContainerStyle={styles.content}>
            {{
              Calendar: <Calendar/>,
              Vaskelister: <Vaskelister/>,
              Klesvask: <Klesvask/>,
              DoorOpener: <DoorOpener/>,
            }[activeTab]}
        </Content>


        <Footer>
          <FooterTab style={styles.footer} >
            <Button active={activeTab === "Calendar"} vertical onPress={() => this.handleMenuClick("Calendar")}>
              <Icon name="md-calendar"/>
              <Text style={styles.navIconText} >Kalender</Text>
            </Button>

            <Button active={activeTab === "Vaskelister"} vertical onPress={() => this.handleMenuClick("Vaskelister")}>
              <Icon name="md-clipboard"/>
              <Text style={styles.navIconText} >Vaskelister</Text>
            </Button>

            <Button active={activeTab === "Klesvask"} vertical onPress={() => this.handleMenuClick("Klesvask")}>
              <Icon name="md-git-network"/>
              <Text style={styles.navIconText} >Klesvask</Text>
            </Button>

            <Button active={activeTab === "DoorOpener"} vertical onPress={() => this.handleMenuClick("DoorOpener")}>
              <Icon name="md-unlock"/>
              <Text style={styles.navIconText} >Døråpner</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    )
  }
}




export default class App extends Component {
  constructor() {
  super();
  this.state = {
    isReady: false
  };
}
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Root>
        <TB_app />
      </Root>
    )
  }
}

//STYLES
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9A423',
    justifyContent: 'center',
    marginTop: 24,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  bodyContainer: {
    flex: 1,
  },
  navContainer: {
    backgroundColor: '#F9A423',
    height: 85,
  },
  content: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  navIconText: {
    fontSize: 8,
  },
  containerText: {
    color: '#fff',
  },
});
