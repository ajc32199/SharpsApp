import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, SafeAreaView } from 'react-native-web';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Let's start this test.
      </Text>
      <Button title='Report a Sharp'/>
      <Button title='Sharps information'/>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 24,
    alignItems: 'center'
  },
})

