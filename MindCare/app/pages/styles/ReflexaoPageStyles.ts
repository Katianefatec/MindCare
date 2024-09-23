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
    paddingVertical: 50,
  },
  greeting: {
    fontSize: 30, 
    fontWeight: "bold",    
    color: 'white', 
    marginLeft: 10,  
    marginBottom:45,
    textAlign: 'center',      
  },  
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9d9d980',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  calendarioIcon: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164a51',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default reflexaoPageStyles;