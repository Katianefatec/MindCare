import { StyleSheet } from 'react-native';

const homePage2Styles = StyleSheet.create({
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
    paddingVertical: 130,
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