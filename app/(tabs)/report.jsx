import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity,  } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import React, { useRef } from 'react'
import * as Location from 'expo-location'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
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

  //declare an array to hold the last marker that was tapped
  const [lastMarker, setLastMarker] = useState(null);
  



  const handleTap = (e) => {
    //create popup alert
    alert("Marker Created at: " + e.nativeEvent.coordinate.latitude + ", " + e.nativeEvent.coordinate.longitude);
    setMarker(e.nativeEvent.coordinate);
    //add the marker to the array of markers
    setMarkers([...markers, e.nativeEvent.coordinate]);
    //log array of markers to console
    console.log(markers);
  }

  const [marker, setMarker] = useState(null);

  return (

    
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.cameraButton} onPress={() => alert("Camera button pressed!") }>
          <Text style={styles.buttonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton} onPress={() => alert("street view button pressed!") }>
          <Text style={styles.buttonText}>Street View</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={INTITIAL_REGION}
        onPress={handleTap}
        >
        {
          marker && (
            <Marker
              coordinate = {marker}
              title={marker.latitude.toString()}
              description={marker.longitude.toString()}
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
    flex: 1,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    font: 'Arial',
  },
  overlay:
  {
    position: 'absolute',
    top: 120,
    right: -10,
    zIndex: 1,
    alignItems: 'flex-end',
    padding: 20,
  }
})

