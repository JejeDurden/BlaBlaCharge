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
  Button,
} from 'react-native';

const styles = StyleSheet.create({
       statusBar: {
           backgroundColor: "#bfc7bb",
           height: Constants.statusBarHeight,
           opacity: 0.31,

       },

       // rest of the styles
   });


export default class PlanifierScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
      return (
        <View>
          <View style={styles.statusBar}/>
          <Image
            style={{width: '100%', height:'100%'}}
            source={require('../assets/images/planifier.png')}
          />
        </View>
      );
  }
}
