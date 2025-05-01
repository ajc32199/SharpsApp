import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'expo-router'
import React from 'react'

const contact = () => {//the contact pages function
  return (
    <View style={styles.container}>
      <Text style={styles.text}>contact</Text>
    </View>
  )
}

export default contact


const styles = StyleSheet.create({// the contact pages design tools
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center'
  
    }
  })