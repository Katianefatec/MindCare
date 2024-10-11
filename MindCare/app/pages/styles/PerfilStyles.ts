import { StyleSheet } from "react-native";

const PerfilStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#41ACBB',    
      paddingHorizontal: 1,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 70,
      paddingTop: 40,
    },
    
    title: {
        fontSize: 20, 
        fontWeight: "bold",    
        color: 'white',         
        marginBottom: 40,
        marginTop: 40,
        textAlign: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      marginBottom: 20,
    },
    cardItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    cardText: {
      fontSize: 18,
      marginLeft: 10,
    },
    switch: {
      marginLeft: 'auto',
    },
    chartCard: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      alignItems: 'center',
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    chartSubtitle: {
      fontSize: 14,
      marginBottom: 10,
    },
    calendarIcon: {
      alignSelf: 'flex-end',
      marginBottom: 10,
    },
    chartImage: {
      width: '100%',
      height: 200,
      marginBottom: 10,
    },
    emojis: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    emojiItem: {
      alignItems: 'center',
    },
    emojiLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    emojiCount: {
      fontSize: 14,
    },
  });

  export default PerfilStyles