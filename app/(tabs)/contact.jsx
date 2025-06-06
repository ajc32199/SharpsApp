import { ScrollView, View, Text, StyleSheet, Pressable, TouchableOpacity, Linking } from 'react-native'
import { SafeAreaView } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

const contact = () => {
  const cardsData=[
  { id: 1, title: ' Sharps Hotline', description: 'Sharps hotline', phoneNumber: '218-730-4001'},
  { id: 2, title: 'Minnesota Adult & Teen Challange', description: 'Our mission is to assist men, women and teens in gaining freedom from chemical addictions and other life-controlling problems by addressing their physical, emotional and spiritual needs.', website: 'https://www.mntc.org/duluth/' },
  { id: 3, title: 'Center for Alcohol & Drug Treatment', description: 'At the Center for Alcohol & Drug Treatment we provide care for those struggling with Mental Health & Substance Use Disorders. We offer holistic care through a variety of programs dedicated towards our community and supporting our Mission & Vision.', website: 'https://www.cadt.org/'}
  ];

  const handleCallPress = async (phoneNumber) => {
    const url = 'tel:${phoneNumber}';
    const supported = await Linking.canOpenURL(url)

    if(supported) {
    await Linking.openURL(url)
    }
  }

  const handleWebsitePress = async (website) => {
    const supported = await Linking.canOpenURL(website);

    if(supported) {
    await Linking.openURL(website);
    }
  }

  const { colors } = useTheme();

  return (
    <>
      <View style = {[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Duluth Sharp Spot</Text>
      </View>

    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cardsData.map((card) => (
            <View key={card.id} style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>{card.title} </Text>
                    <Text style={styles.description}>{card.description} </Text>

                    {card.phoneNumber && (
                      <TouchableOpacity onPress={() => handleCallPress(card.phoneNumber)}>
                         <Text style={styles.phoneNumber}> Call: {card.phoneNumber}</Text>
                      </TouchableOpacity>
                    )}

                    {card.website && (
                      <TouchableOpacity onPress={() => handleWebsitePress(card.website)}>
                         <Text style={styles.websiteLink}> Visit: {card.website.replace('https://', '')}</Text>
                      </TouchableOpacity>
                    )}
                </View>
            </View>
        ))}
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default contact


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black'
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
      marginalVertical: 8,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
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
    phoneNumber: {
      color: '#007BFF',
      fontFamily: 'RobotoCondensedReg',
      textDecorationLine: 'underline',
    },
    websiteLink: {
      color: '#007BFF',
      fontFamily: 'RobotoCondensedReg',
      textDecorationLine: 'underline',
    },
  })