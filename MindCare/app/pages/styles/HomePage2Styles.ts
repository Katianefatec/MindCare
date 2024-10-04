import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const homePage2Styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
    
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  greeting: {
    fontSize: 30, 
    fontWeight: "bold",    
    color: 'white', 
    marginLeft: 10,  
    textAlign: 'center',      
  },  
});

export default homePage2Styles;