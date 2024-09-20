import { StyleSheet } from 'react-native';

const reflexaoPageStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20, 
    paddingVertical: 80,
  },
  greeting: {
    fontSize: 30, 
    fontWeight: "bold",    
    color: 'white', 
    marginLeft: 10,  
    textAlign: 'center',      
  },  
});

export default reflexaoPageStyles;