import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native'
import React from 'react'

const report = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Report Page</Text>
    </SafeAreaView>
  )
}

export default report

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
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})