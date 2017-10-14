import React from 'react';
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

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View>
            <Button
              onPress={() => { this.props.navigation.navigate('Rechercher')}}
              title="Rechercher"
            />
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
