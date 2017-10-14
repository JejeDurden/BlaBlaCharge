import React from 'react';
import { ExpoConfigView } from '@expo/samples';


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
