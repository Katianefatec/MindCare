import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const homePageStyles = StyleSheet.create({
  backgroundImage: {    
      width: width,
      height: height,
      resizeMode: 'cover',
      position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24, 
  },
  greeting: {
    fontSize: 30, 
    fontWeight: "bold",
    marginBottom: 8,
    color: 'white', 
    marginLeft: 10,        
  },
  question: {
    fontSize: 20, 
    marginBottom: 10,
    color: 'white', 
    marginLeft: 10,
  },
});

export default homePageStyles;