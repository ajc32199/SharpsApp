import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const info = () => {
  const cardsData=[
    { id: 1, title: 'New Disposal Method!', description: 'This is the description of the first article on the info page.'},
    { id: 2, title: 'Treatement Options', description: 'This is the description of the second article on the info page.' },
    { id: 3, title: 'Recycling Guidelines', description:'This is the description of the third article on the info page.', },
    { id: 4, title: 'Environmental Impact', description:'This is the description of the fourth article on the info page.' },
  ];

  return (
    <>
      <View style = {styles.header}>
        <Text style={styles.headerTitle}>Duluth Sharp Spot</Text>
      </View>

    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cardsData.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
           <View style = {styles.card}>
            <Text style={styles.title}>{card.title}</Text>
            <Text style={styles.description}>{card.description}</Text>
          </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
   </>
  );
};

export default info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    header: {
      height: 100,
      paddingTop: 57,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      fontFamily: 'Roboto_Condensed-Bold',
    },
    headerTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'white',
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
    }
});