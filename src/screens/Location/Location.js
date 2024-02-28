import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { red } from '../../../font';
import { moderateScale } from 'react-native-size-matters';
import styles from './styling'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import AppContext from '../../Provider/AppContext';


const Location = ({ navigation, route }) => {
  const { from } = route.params;
  const myContext = useContext(AppContext);
  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    mapRef.current.animateToRegion({
      latitude: myContext.latitude,
      longitude: myContext.longitude,
      latitudeDelta: 0.0421,
      longitudeDelta: 0.0421,
    }, 1000);

  };

  Geocoder.init("AIzaSyCAJ-vi4G_teVyt2t23fQF3yJ87Bf6AhEk");


  const handleSave = () => {
    getAddressFromCoordinates(myContext.latitude, myContext.longitude);
    // console.log(myContext.address);
    navigation.navigate(from == "home" ? "ReqHome" : from == "MechPro" ? "MechProfile": "ViewMechanic", route?.params?.mech)
  };


  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const newAddress = response.results[0].formatted_address;
      myContext.setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: myContext.latitude,
          longitude: myContext.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        }}
        // showsUserLocation={true}
        // showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onRegionChange={(newRegion) => {
          // Update the latitude and longitude based on the new region
          myContext.setLatitude(newRegion.latitude);
          myContext.setLongitude(newRegion.longitude);
        }}
      >
      </MapView>
      <Marker
        style={styles.markerFixed}
        title='You are here'
        description='This is a description'
        coordinate={{
          latitude: myContext.latitude,
          longitude: myContext.longitude,
        }}
        onDragEnd={(e) => {
          console.log("Marker dragged to:", e.nativeEvent.coordinate);
          const { latitude: markerLatitude, longitude: markerLongitude } = e.nativeEvent.coordinate;
          myContext.setLatitude(markerLatitude);
          myContext.setLongitude(markerLongitude);
          getAddressFromCoordinates(markerLatitude, markerLongitude); // Fetch and update the address when the marker is dragged
        }}
      >
        <View>
          <MaterialCommunityIcons name="map-marker-outline" color={red} size={40} />
        </View>
      </Marker>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', margin: moderateScale(10), flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
              <AntDesign name="arrowleft" color={red} size={25} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <Text style={styles.heading}>Map</Text>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input, description: { color: '#000' } }}
            placeholder='Enter Location'
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            fetchDetails={true}
            query={{
              key: "AIzaSyCAJ-vi4G_teVyt2t23fQF3yJ87Bf6AhEk",
              language: "en",
            }}
            onPress={(data, details = null) => {
              console.log(details?.geometry?.location);
              myContext.setLatitude(details?.geometry?.location?.lat);
              myContext.setLongitude(details?.geometry?.location?.lng);
              mapRef.current.animateToRegion({
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
              }, 1000);
            }}
            onFail={(error) => console.error(error)} />
        </View>
        <View style={{ alignItems: 'flex-end', marginHorizontal: moderateScale(20), flex: 1 }}>
          <TouchableOpacity onPress={getCurrentLocation} style={styles.icon}>
            <FontAwesome6 name="location-crosshairs" color={red} size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1.5 }}>
          <TouchableOpacity onPress={handleSave} style={styles.btn}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

export default Location;



