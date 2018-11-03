import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Content } from 'native-base';

export default class Klesvask extends React.Component {
  render() {
    return (
      <View style={styles.content}>

        <Text>Router vises her</Text>

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


/*
<Content contentContainerStyle={styles.content}>
    {{
      Calendar: <Calendar/>,
      Vaskelister: <Vaskelister/>,
      Klesvask: <Klesvask/>,
      DoorOpener: <DoorOpener/>,
    }[activeTab]}
</Content>


//Front page. Must be in app.js because of navigation ...
class Home extends Component {
  render() {
    return(
      <View style={styles.content}>
        <Button active={activeTab === "Home"} vertical onPress={() => this.handleMenuClick("Home")}>
          <Icon name="md-calendar"/>
          <Text style={styles.navIconText} >Kalender</Text>
        </Button>

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
      </View>
    )
  }
}
*/
