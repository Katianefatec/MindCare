import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const meditarStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    paddingTop:30,
  },

  greeting: {
    fontSize: 20, 
    fontWeight: "bold",    
    color: 'white', 
    marginLeft: 10,  
    marginTop: 30,
    textAlign: 'center',      
  },  

  meditationOptions: {
    marginTop:20,
    flexDirection: 'column', 
    justifyContent: 'space-between',
    padding: 10,
    width: width * 0.9,
  },
  meditationOption: {
    width: '100%',     
    marginVertical: 20,
  },
  
  meditationTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginTop: 5,
  },

  scrollViewContent: {
    paddingVertical: 5,
    alignItems: 'center'
  },

  webView: {
    width: '100%',
    height: 200,
  },
});

export default meditarStyles;