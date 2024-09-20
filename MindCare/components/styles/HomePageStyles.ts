import { StyleSheet } from 'react-native';

const homePageStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
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