import { View, Text, StyleSheet, Pressable, TouchableOpacity, Button } from 'react-native'
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

export default report_popup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 20,
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        marginBottom: 50,
        borderRadius: 10,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        alighSelf: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textField: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        color: 'white',
        height: 100,
    },
    button: {
      flex: 1,
        position: 'absolute',
        bottom: 20,

    }
})