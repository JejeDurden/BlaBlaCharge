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
      <View>
          <View style={styles.statusBar} />
          <Button
              style={{backgroundColor: 'red'}} textStyle={{fontSize: 18}}
              onPress={() => { this.props.navigation.navigate('Rechercher')}}
          >
              Rechercher
          </Button>
          <Button
              onPress={() => { this.props.navigation.navigate('Planifier')}}
              title="Planifier"
          />
          <Button
              onPress={() => { this.props.navigation.navigate('Proposer')}}
              title="Proposer"
          />
      </View>
    );
  }
}
