import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const calmaStyles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
    
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  greeting: {
    fontSize: 20, 
    fontWeight: "bold",    
    color: 'white', 
    marginLeft: 10,  
    textAlign: 'center',      
  },  
});

export default calmaStyles;