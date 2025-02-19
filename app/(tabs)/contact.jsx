import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native'
import React from 'react'

const contact = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Contact Page</Text>
      <Text style={styles.text}>Sharps Hotline:</Text>
      <Text style={styles.text}>218-730-4001</Text>
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
      textDecorationLine: 'underline',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center'
  
    }
  })