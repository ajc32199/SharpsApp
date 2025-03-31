import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  useRef,
} from "react-native";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { useEffect } from "react";
import { Camera, CameraType } from "expo-camera";

import React from "react";

const camera = () => {
 return (
  <SafeAreaView>
    <Text>Test</Text>
  </SafeAreaView>
 );
};

export default camera;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });
