import { View, Text, StyleSheet, Pressable, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native'
import React from 'react'

const contact = () => {
  const handleCallPress = async () => {
    const phoneNumber = '218-730-4001'
    const url = 'tel:218-730-4001'

    const supported = await Linking.canOpenURL(url)

    if(supported) {
    await Linking.openURL(url)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sharps Hotline:</Text>
      <TouchableOpacity onPress = {handleCallPress}>
        <Text style={[styles.text, styles.phoneNumber]}>218-730-4001</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default contact


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black'
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'RobotoCondensed',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    phoneNumber: {
      color: '#007BFF',
      fontFamily: 'RobotoCondensed',
      textDecorationLine: 'underline',
    },
  })