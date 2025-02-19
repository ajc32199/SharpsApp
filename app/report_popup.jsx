import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

const report_popup = () => {
  return (
    <SafeAreaView>
      <Text style={styles.titleText}>Report Information</Text>
      
    </SafeAreaView>
  )
}

export default report_popup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    titleText: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 20,
    },
    text: {

    }
})