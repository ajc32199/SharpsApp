import { View, Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import React from 'react'

const report_popup = () => {
  const navigation = useNavigation();

  //text input for report information
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView>
      <Text style={styles.titleText}>Report Information</Text>
      <Text style={styles.text}>Enter Description of Location:</Text>
      <TextInput style={styles.textField} 
        placeholder='enter desc here'
        onChangeText={setDescription}
        value={description}
        multiline
        ></TextInput>
        <Button
        title="Submit"
        onPress={() => {
          //send data to firebase/firestore
          //navigate back to report
          //wipe text input
        }} />
    </SafeAreaView>
  )
}

export default report_popup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 20,
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        marginBottom: 50,
        borderRadius: 10,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        alighSelf: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textField: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        color: 'white',
        height: 100,
    },
})