import { View, Text, StyleSheet, Pressable, TouchableOpacity, Button, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import React, { useRef } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
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

  const navigation = useNavigation();
  const router = useRouter();
  const [locationName, setLocationName] = useState('');

  //declare an array to hold coordinates of markers as they are created/tapped
  const [markers, setMarkers] = useState([]);

  //declare an array to hold the last marker that was tapped
  const [lastMarker, setLastMarker] = useState(null);
  



  const handleTap = (e) => {

    //check to see if a marker was clicked on 

    //check if tapped location is already in the array of markers
    if (markers.includes(e.nativeEvent.coordinate)) {
      console.log("This location is already a favorite location!");
      return;
    }
    alert("Favorite location added!");
    const newMarker = e.nativeEvent.coordinate;
    //add the marker to the array of markers
    setMarkers([...markers, newMarker]);
    //log array of markers to console
    console.log("Markers: ", [...markers, newMarker]);
  }

  const handleReportPress = () => {
    router.push({
      pathname: '/(tabs)/report',
      params: {lat: 1, long: 2}
    });
  }

  const clearMarkers = () => {
    setMarkers([]);
    console.log(markers);
    alert("Markers Cleared!");
  }

  const [marker, setMarker] = useState(null);

  return (

    
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.cameraButton} onPress={handleReportPress}>
              <Text style={styles.buttonText}>Report</Text>
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearMarkers}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={INTITIAL_REGION}
        onPress={handleTap}
        >
        {
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              title={`Marker ${index + 1}`}
              description={`This is favorite location # ${index + 1}`}
            />
          ))
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
  button: {
    backgroundColor: 'blue',
  },
  clearButton: {
    position: 'absolute',
    bottom: 20,
    right: 310,
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

