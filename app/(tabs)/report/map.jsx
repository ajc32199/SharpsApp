import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import { useMap } from '@/utilities/mapContext';
import Modal from 'react-native-modal';

const INITIAL_REGION = {
  latitude: 46.788,
  longitude: -92.081,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {

  const router = useRouter();

  const { lat, lng } = useLocalSearchParams();

  const { location, setLocation } = useMap();

  const [showStreetView, setShowStreetView] = useState(false);

  const [markers, setMarkers] = useState([]);
  const [marker, setMarker] = useState(null);
  const [streetViewUrl, setStreetViewUrl] = useState('');

  const [mapType, setMapType] = useState('standard'); 

  const [mapRegion, setMapRegion] = useState({
    latitude: 46.788,
    longitude: -92.081,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  });

  const handleTap = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMapRegion((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
    setMarker({ latitude, longitude });
    //setMarkers([...markers, { latitude, longitude }]);


    setLocation({ latitude, longitude });

    // build a Google Street View link
    const newUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${latitude},${longitude}`;
    setStreetViewUrl(newUrl);
  };

  function locationConfirmed(latitude, longitude) {

    router.back();
  }

    useEffect(() => {
      if (lat && lng) {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        setMarker({ latitude, longitude });
        setMapRegion((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));
      }
    }, [lat, lng]);
    

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.mapTypeContainer, styles.overlay]}>
        {/* Standard icon */}
        <TouchableOpacity
          onPress={() => setMapType('standard')}
          style={[
            styles.mapTypeButton,
            mapType === 'standard' && styles.selectedButton,
            styles.leftButton,
          ]}
        >
          <Ionicons name="map" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Satellite icon */}
        <TouchableOpacity
          onPress={() => setMapType('satellite')}
          style={[
            styles.mapTypeButton,
            mapType === 'satellite' && styles.selectedButton,
            styles.rightButton,
          ]}
        >
          <Ionicons name="earth" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonBackground}>
        <View style={[styles.buttonContainer, styles.overlay]}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => setShowStreetView(!showStreetView)}
          >
            <Text style={styles.buttonText}>
              {'Street View'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cameraButton,
              !marker && styles.disabledButton ]}
            disabled={!marker}
            
            onPress={() => {
              if (marker) {
                locationConfirmed(marker.latitude, marker.longitude);
              }
            }}
          >
            <Text style={styles.buttonText}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {showStreetView ? (
        <Modal
          isVisible={showStreetView}
          style={styles.modalContainer}
          swipeDirection="down"
          onSwipeComplete={() => setShowStreetView(false)}
          onBackdropPress={() => setShowStreetView(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalContent}>
            {/* A top bar with an “X” to close the overlay */}
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => setShowStreetView(false)}>
                <Text style={styles.closeText}>X</Text>
              </TouchableOpacity>
            </View>
            {/* The WebView showing Street View */}
            <WebView
              source={{ uri: streetViewUrl }}
              style={{ flex: 1 }}
            />
          </View>
        </Modal>
      ) : (
        /* Otherwise, render the map and let the user tap to place a marker. */
        <MapView
          style={styles.map}
          initialRegion={INITIAL_REGION}
          mapType={mapType}
          showsUserLocation
          onPress={handleTap}
        >
          {marker && (
            <Marker
              coordinate={marker}
              title="My Marker"
              description={`${marker.latitude}, ${marker.longitude}`}
            />
          )}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    zIndex: 2, 
  },
  buttonBackground: {
    zIndex: 1,
    position: 'absolute',
    height: 150,
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: '#000000FF',
    borderRadius: 12,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },
  buttonContainer: {
    position: 'absolute',
    opacity: 1,
    bottom: 95,
    left: 0,
    right: 0,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#0C489DFF',
    borderRadius: 12,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },
  actionButton: {
    minWidth: 100,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  map: {
    flex: 1,
    marginBottom: 74,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  mapTypeContainer: {
    position: 'absolute',
    top: 18,
    right: 12,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden', 
    opacity: 0.7,
  },

  mapTypeButton: {
    backgroundColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007BFF',  
  },
  leftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  disabledButton: {
    opacity: 0.5, 
  },
});
