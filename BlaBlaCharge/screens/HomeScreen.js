import React from 'react';
import { Constants } from 'expo';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from 'apsl-react-native-button'


 const styles = StyleSheet.create({
        statusBar: {
            backgroundColor: "#bfc7bb",
            height: Constants.statusBarHeight,
            opacity: 0.31,

        },

        // rest of the styles
    });

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };



  render() {
    return (
      <View style={{
        flex: 1,
         flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
          <View style={styles.statusBar} />
          <View>
          <Button
              style={{backgroundColor: '#abd9b5', borderColor: "white", width: '75%'}} textStyle={{fontSize: 18, color: 'white'}}
              onPress={() => { this.props.navigation.navigate('Rechercher')}}
          >
              Rechercher une borne
          </Button>
          <Button
              style={{backgroundColor: 'white', borderColor: "#abd9b5"}} textStyle={{fontSize: 18, color: '#abd9b5'}}
              onPress={() => { this.props.navigation.navigate('Proposer')}}
          >
              Proposer vos services
          </Button>
          <Button
              style={{backgroundColor: 'white', borderColor: "#abd9b5"}} textStyle={{fontSize: 18, color: '#abd9b5'}}
              onPress={() => { this.props.navigation.navigate('Planifier')}}
          >
              Planifier un trajet
          </Button>
          </View>
          <Image
            style={{width: '100%', height:'100%', position: 'absolute', zIndex: -1}}
            source={require('../assets/images/bg.png')}
          />
      </View>
    );
  }
}
