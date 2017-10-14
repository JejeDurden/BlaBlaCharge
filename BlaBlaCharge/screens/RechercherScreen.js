import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { MapView } from 'expo';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Rechercher',
  };

  render() {
      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    );
  }
}
