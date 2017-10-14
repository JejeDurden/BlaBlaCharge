import React from 'react';
import { ExpoConfigView } from '@expo/samples';
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


export default class ProposerScreen extends React.Component {
  static navigationOptions = {
    title: 'Proposer',
  };

    render() {
        return (
          <View>
            <Image
              source={require('../assets/images/teschoque.jpg')}
            />
          </View>
        );
    }
}
