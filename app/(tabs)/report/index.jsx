import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import axios from 'axios'

import { useMap } from '@/utilities/mapContext';

export default function ReportPage() {
  const router = useRouter();
  const { lat, lng } = useLocalSearchParams();

  const { location, setLocation } = useMap();

  const [locationDescription, setLocationDescription] = useState('');
  const [photoUri, setPhotoUri] = useState(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: 46.788,
    longitude: -92.081,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  });

  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    if (location) {
      setUserMarker({
        latitude: location.latitude,
        longitude: location.longitude
      });
      setMapRegion((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  }, [location]);
  useEffect(() => {
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      setUserMarker({ latitude, longitude });
      setMapRegion((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
      setLocation({ latitude, longitude });
    }
  }, [lat, lng]);

  const cloudinaryUpload = async (photoUri, reportId) => {
    const formData = new FormData();
    formData.append('file', {
      uri: photoUri,
      type: 'image/jpeg', 
      name: `report_${reportId}.jpg`,
    });
  
    formData.append('upload_preset', 'SharpsAppPreset');
  
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dl2m2trsq/image/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  
    return response.data.secure_url; 
  };

  async function handleSubmitReport() {
    try {
      if (!location) {
        Alert.alert('Ack!', 'Please select a location, then try again.');
        return;
      }
      if (!locationDescription) {
        Alert.alert('Uh oh!', 'Please describe the location, then try again.');
        return;
      }

      const payload = {
        latitude: location.latitude,
        longitude: location.longitude,
        description: locationDescription || ''
      };

      console.log('Sending report payload:', payload);

      const response = await axios.post(
              'https://sharpsappbackend.onrender.com/reports',
              payload,
              {
                headers: {
                  'Content-Type': 'application/json',
                  
                },
              }
            );


      if (!response.status === 201) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      console.log('Server response:', response.data);
      const { id: reportId } = response.data;


      cloudinaryUpload(photoUri, reportId);

      Alert.alert('Success', 'Your report was submitted successfully!');

      router.push('/(tabs)')

    } catch (error) {
      if( error.response ) {
        console.error('Server responded with:', error.response.status, error.response.data);

      } else {
        console.error('Error submitting report:', error.response);
      }
      Alert.alert('Error', 'Could not submit your report.');
    }
  }

  async function handleUseCurrentLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }
      const current = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = current.coords;

      setUserMarker({ latitude, longitude });
      setMapRegion((prev) => ({
        ...prev,
        latitude,
        longitude,
      }));
      setLocation({ latitude, longitude });
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Could not get current location.');
    }
  }

  // "Pick on Map"
  function handleSelectOnMap() {
    router.push('/(tabs)/report/map');
  }

  async function handlePickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Need camera roll permission to select photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  // Photo from camera
  async function handleTakePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Need camera permission to take photos.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
              <Text style={styles.sectionLabel}>Location Selection</Text>
              <Text style={styles.sectionDescription}>
                Would you like to use your current GPS location or pick a spot on the map?
              </Text>

              {/* Mini map preview “window” */}
              <View style={styles.mapWindow}>
                <MapView
                  style={styles.mapPreview}
                  region={mapRegion}
                  onRegionChangeComplete={(newRegion) => setMapRegion(newRegion)}
                  pointerEvents="none"
                >
                  {/* Show the userMarker or the global location—whatever you prefer */}
                  {location && (
                    <Marker coordinate={location} title="Your Location" />
                  )}
                </MapView>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.choiceButton} onPress={handleUseCurrentLocation}>
                  <Text style={styles.choiceText}>Use My Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choiceButton} onPress={handleSelectOnMap}>
                  <Text style={styles.choiceText}>Pick on Map</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.sectionLabel}>Describe the location</Text>
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                placeholder="e.g. Parking lot behind building A..."
                placeholderTextColor="#999"
                value={locationDescription}
                onChangeText={setLocationDescription}
              />

              <Text style={styles.sectionLabel}>Photo (optional)</Text>
              <Text style={styles.sectionDescription}>
                {!photoUri ? (
                  "Take a quick photo or choose one from your library:" 
                ) : (
                  "Very nice!"
                )
                }
                
              </Text>
              {photoUri && <Image source={{ uri: photoUri }} style={styles.photoPreview} />}

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.choiceButton} onPress={handlePickPhoto}>
                  <Text style={styles.choiceText}>Select from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.choiceButton} onPress={handleTakePhoto}>
                  <Text style={styles.choiceText}>Take Photo</Text>
                </TouchableOpacity>
              </View>

              


              {/* Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitReport}
              >
                <Text style={styles.submitText}>Submit Report</Text>
              </TouchableOpacity>

            </View>

          </TouchableWithoutFeedback>
          
        </ScrollView>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10, backgroundColor: '#000' },
  sectionLabel: { fontSize: 16, fontWeight: '600', color: '#fff', marginTop: 16, fontFamily: 'Roboto_Condensed-Bold' },
  sectionDescription: { fontSize: 16, color: '#ccc', marginVertical: 6, fontFamily: 'RobotoCondensedReg' },
  textInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    fontFamily: 'RobotoCondensedReg',
  },
  mapWindow: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 10,
  },
  mapPreview: { width: '100%', height: '100%' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  choiceButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#0A84FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  choiceText: { color: '#fff', fontWeight: '600', fontFamily: 'Roboto_Condensed-Bold' },
  photoPreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: 'orange',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto_Condensed-Bold',
  },
});
