import React from 'react'
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let url = "http://a44d5c7f.ngrok.io/api/search?"


export default class RechercherScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: []
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          current: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      this.fetchProviders();
    });
  }

  fetchProviders() {
    url += `longitude=${this.state.region.longitude}&latitude=${this.state.region.latitude}`;
    let self = this;
    getProviders(url);
    async function getProviders(url) {
      let response = await fetch(url);
      let providers = await response.json();
      self.setState({
          markers: providers.response
      });
    }
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        showsUserLocation={ true }
        showsMyLocationButton={true}
        region={ this.state.region }
      >
        <MapView.Marker
          coordinate={ this.state.region }
          pinColor={'#EC6B51'}
        />
        {this.state.markers.map(marker => (
         <MapView.Marker
           key={marker.key}
           coordinate={marker}
           pinColor={'#A0D9B5'}
         />
       ))}
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});
