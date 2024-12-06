import { StyleSheet } from "react-native";

const PerfilStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#41ACBB',          
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 70,
      paddingTop: 60,
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
      width: '100%',
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
      alignItems: 'center',
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',      
      marginTop: 10,
    },
    chartSubtitle: {
      fontSize: 14,      
    },         
    
    scrollViewContent: {    
    alignItems: 'center'
  },
  });

  export default PerfilStyles