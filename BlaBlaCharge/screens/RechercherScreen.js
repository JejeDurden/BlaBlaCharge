import React from 'react'
import { AppRegistry, StyleSheet, View, Dimensions, Alert, Modal, Text, TouchableHighlight, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let url = "https://ac60bbf5.ngrok.io/api/search?"


export default class RechercherScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      modalVisible: false
    };
  }

  componentDidMount() {
    if (!this.state.modalVisible){
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            try: 1,
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
    };
    if (!this.state.modalVisible){
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
        if (this.state.try) {
          this.fetchProviders();
        }
        this.state.try = 0;
      });
    }
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
  setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }
  render() {
    return (
      <View>
      <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          >
          <View>
          <View>
          <Image
            style={{
             width: '100%',
             height: '100%'}}
            source={require('../assets/images/PROFIL_RECHARGEe.png')}
          />

            <TouchableHighlight underlayColor='transparent' style={{zIndex:1000, position: 'absolute', marginTop: 20}} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>                       {"\n"}
                                           {"\n"}
                                           {"\n"}
                                           {"\n"}</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        showsUserLocation={ true }
        showsMyLocationButton={true}
        region={ this.state.region }
      >
        <MapView.Marker
          coordinate={ this.state.region }
          pinColor={'#abd9b5'}
        />
        {this.state.markers.map(marker => (
         <MapView.Marker
           key={marker.key}
           coordinate={marker}
           image={require('../assets/images/pdc-select.png')}
           onPress={() => {
             this.setModalVisible(true)
           }}
         />
       ))}
      </MapView>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});
