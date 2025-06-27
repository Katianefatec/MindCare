import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const aprenderStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    paddingTop: 40,
  },

  greeting: {
    fontSize: 20, 
    fontWeight: "bold",    
    color: 'white', 
    marginLeft: 10,  
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'center',       
  },  

  aprendendoOptions: {
    marginTop: 20,
    flexDirection: 'column', 
    justifyContent: 'space-between',
    padding: 10,
    width: width * 0.9,
  },
  aprendendoOption: {
    width: '100%',     
    marginVertical: 20,
  },
  
  aprendendoTitle: {
    color: '#000',
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

  previewImage: {
    width: '100%',
    height: 150, 
    resizeMode: 'cover', 
  }
});

export default aprenderStyles;