import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const homePageStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  backgroundImage: {    
    width: width,
    height: height,
    resizeMode: 'cover',
    // position: 'absolute',
  },
  
  
  container: {
    flex: 1,    
    paddingVertical: 20,
    paddingHorizontal: 22,
    alignItems: 'center',    
    paddingTop:50,   
  },

  greeting: {
    marginTop: 20,
    fontSize: 20, 
    fontWeight: "bold",
    marginBottom: 8,
    color: 'white', 
    marginLeft: 10,
    alignItems:'center'        
  },
  question: {
    fontSize: 20, 
    marginBottom: 10,
    color: 'white', 
    marginLeft: 10,
    alignItems:'center' 
  },

  scrollView: {
    width: '100%',
  },

});

export default homePageStyles;