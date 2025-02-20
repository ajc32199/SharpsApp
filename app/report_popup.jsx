import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, Pressable } from 'react-native'
import { useNavigation, useRoute, Link } from 'expo-router'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

import React from 'react'

const report_popup = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const checkImageInfo = (result) => {
    console.log(result);
  }

  const pickImage = async () => {
    //no permission request is neccesary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if(!result.cancelled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  }

  //text input for report information
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log(description);
    //now lets log the coordinates from the map

    //send report information to the server
     // go back to the map
    navigation.navigate('report');
  }

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
      <Text style={styles.text}>Upload image from Camera Roll</Text>
      <Pressable>
        <Button
          title="Choose Image"
          onPress={pickImage} />
      </Pressable>
        <Button
        style={styles.button}
        title="Submit"
        onPress={handleSubmit} />
    </SafeAreaView>
  )
}

export default report_popup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
    button: {
      flex: 1,
        position: 'absolute',
        bottom: 20,

    }
})