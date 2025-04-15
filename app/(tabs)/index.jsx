import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import { useNavigationIndependentTree } from '@react-navigation/native'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titletext}>Duluth Sharps Reporter</Text>
      <Link href="/report" style={{marginHorizontal: 'auto'}} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Report</Text>
        </Pressable>
      </Link>
      <Link href="/info" style={{marginHorizontal: 'auto'}} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sharps Information</Text>
        </Pressable>
      </Link>
      <Link href="/contact" style={{marginHorizontal: 'auto'}} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Contact</Text>
        </Pressable>
      </Link>
      <Link href="/report_popup" style={{marginHorizontal: 'auto'}} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>report_popup</Text>
        </Pressable>
      </Link>

      
    </SafeAreaView>
  )
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  titletext: {
    color: 'white',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
    fontFamily: 'Roboto_Condensed-Bold',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  link: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed',
    textDecorationLine: 'underline',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'RobotoCondensedReg',
    textAlign: 'center',
    justifyContent: 'center',
  }
})