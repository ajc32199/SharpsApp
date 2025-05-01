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
      url: 'https://www.pca.state.mn.us/sites/default/files/w-hhw4-67.pdf',
      descText: 'Official PDF from MN PCA on household hazardous waste disposal.',
    },
    {
      id: 2,
      title: 'Treatment Options',
      url: 'https://www.addictioncenter.com/rehabs/minnesota/',
      descText: 'List of addiction treatment centers in Minnesota.',
    },
    {
      id: 3,
      title: 'Duluth WLSSD Disposal',
      url: 'https://wlssd.com/services/what-is-hazardous-waste/for-residents/',
      descText: 'WLSSD’s guide for disposing hazardous waste in Duluth.',
    },
    {
      id: 4,
      title: 'Overdose Data',
      url: 'https://www.health.state.mn.us/communities/opioids/data/index.html',
      descText: '2022 opioid overdose statistics for Minnesota residents.',
    },
  ]

  const { colors } = useTheme()

  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url)
    if (supported) await Linking.openURL(url)
    else console.warn("Can't open URL:", url)
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
              onPress={() => openLink(card.url)}
            >
              <View style={styles.card}>
                <Text style={styles.title}>{card.title}</Text>
                <Text style={styles.description}>{card.descText}</Text>
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
    fontSize: 22,
    fontFamily: 'Roboto_Condensed-Bold',
    fontWeight: 'bold',
    borderBottomWidth: 1,
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
    marginVertical: 8,
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
    color: '#ccc',
    lineHeight: 22,
  },
})
