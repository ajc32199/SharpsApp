import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import React, { useRef } from 'react'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'

const INTITIAL_REGION = {
  latitude: 46.788,
  longitude: -92.081,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
}


const report = () => {
  const mapRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <SafeAreaView style={{ padding: 10 }}>
            <Text>Focus</Text>
          </SafeAreaView>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const focusMap = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map}
      initialRegion={INTITIAL_REGION}
      showsUserLocation
      showsMyLocationButton
      />
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

