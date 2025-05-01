import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Linking
} from 'react-native'
import { useTheme } from '@react-navigation/native'

const Info = () => {
  const cardsData = [
    {
      id: 1,
      title: 'New Disposal Method!',
      description:
        'https://www.pca.state.mn.us/sites/default/files/w-hhw4-67.pdf',
    },
    {
      id: 2,
      title: 'Treatment Options',
      description: 'https://www.addictioncenter.com/rehabs/minnesota/',
    },
    {
      id: 3,
      title: 'Duluth WLSSD Disposal',
      description:
        'https://wlssd.com/services/what-is-hazardous-waste/for-residents/',
    },
    {
      id: 4,
      title: 'Overdose Data',
      description:
        'https://www.health.state.mn.us/communities/opioids/data/index.html',
    },
  ]

  const { colors } = useTheme()

  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        console.warn("Don't know how to open URI: " + url)
      }
    } catch (err) {
      console.error('Error opening URL:', err)
    }
  }

  return (
    <>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Duluth Sharp Spot
        </Text>
      </View>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {cardsData.map((card) => (
            <Pressable
              key={card.id}
              style={styles.cardContainer}
              onPress={() => openLink(card.description)}
            >
              <View style={styles.card}>
                <Text style={styles.title}>{card.title}</Text>
                <Text style={styles.description}>{card.description}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default Info

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    height: 100,
    paddingTop: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    fontFamily: 'Roboto_Condensed-Bold',
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    fontFamily: 'Roboto_Condensed-Bold',
    fontWeight: 'bold',
  },
  scrollViewContent: {
    padding: 16,
  },
  cardContainer: {
    marginBottom: 16,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,   // fixed typo
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto_Condensed-Bold',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'RobotoCondensedReg',
    color: '#666',
    lineHeight: 24,
  },
})
