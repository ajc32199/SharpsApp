import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native'
import { Link } from 'expo-router'

const App = () => (
  <ImageBackground
    source={require('../../assets/images/DI2.jpg')}
    style={styles.background}
    imageStyle={styles.backgroundImage}
    >
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Duluth Sharp Spot</Text>
    </View>

    <View style={styles.buttonContainer}>
      <Link href="/report" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Report A Sharp</Text>
        </Pressable>
      </Link>

      <Link href="/info" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sharps Information</Text>
        </Pressable>
      </Link>

      <Link href="/contact" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Contact</Text>
        </Pressable>
      </Link>
    </View>
  </SafeAreaView>
  </ImageBackground>
)

export default App

const styles = StyleSheet.create({
  background:{
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.3,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: 'grey',
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Roboto_Condensed-Bold',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-start', // Adjust buttons to start from the top
    marginTop: 200, // Add margin to create space from the top
  },
  button: {
    backgroundColor: 'grey',
    width: 240,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    marginVertical: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'RobotoCondensedReg',
    textAlign: 'center',
  },
})
