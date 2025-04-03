import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import React from 'react'

const info = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>info</Text>
    </SafeAreaView>
  )
}

export default info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    text: {
        fontSize: 20,
        fontFamily: 'RobotoCondensed',
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})