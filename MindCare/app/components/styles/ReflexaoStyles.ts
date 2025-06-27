import { StyleSheet } from 'react-native';

const reflexaoStyles = StyleSheet.create({
  
  reflexao: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  reflexaoButton: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%', 
  },
  reflexaoBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 37,
    alignItems: 'center',
    justifyContent: 'center',
    width: 172, 
    height: 47,     
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reflexaoLabel: {
    fontSize: 14,    
  },
  vida: {
    marginLeft: 25,
  },
  familia: {
    marginLeft: 25,
  },
  amor: {
    marginTop:60,
    marginRight:25,
  },
  trabalho: {
    marginTop:60,
    marginRight:25,    
  },
});

export default reflexaoStyles;