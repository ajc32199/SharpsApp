import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import React from 'react'

const info = () => {
  return (
    <SafeAreaView style={styles.card}>
      <Text style={styles.text}>New Disposal Method!</Text>
      <Text style = {styles.description}>
</Text>
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
    card: {
        borderRadius: 8,
        padding: 16,
        marginalVertical: 8,
        elevation: 5
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