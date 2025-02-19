import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import React, { useRef } from 'react'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import * as Location from 'expo-location'
import { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const INTITIAL_REGION = {
  latitude: 46.788,
  longitude: -92.081,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const report = () => {

  //declare an array to hold coordinates of markers as they are created/tapped
  const [markers, setMarkers] = useState([]);


  const handleTap = (e) => {
    setMarker(e.nativeEvent.coordinate);
    //add the marker to the array of markers
    setMarkers([...markers, e.nativeEvent.coordinate]);
    //log array of markers to console
    console.log(markers);
  }

  const [marker, setMarker] = useState(null);

  return (

    
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={INTITIAL_REGION}
        onPress={handleTap}
        >
        <Marker
          coordinate={{ latitude: 46.788, longitude: -92.081 }}
          title="Test"
          description="Test"
        />
        {
          marker && (
            <Marker
              coordinate = {marker}
              title="M1"
              description="M1"
            />
          )
        }
      </MapView>
    </SafeAreaView>
  )
}

export default report

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})

