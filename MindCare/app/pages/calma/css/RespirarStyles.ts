import { StyleSheet } from 'react-native';

const respirarStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 20, 
    fontWeight: "bold",    
    color: 'white', 
    marginLeft: 10,  
    marginBottom: 40,
    textAlign: 'center',
  },

  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30, 
  },
  phaseText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10, 
    marginBottom:30,
  },

  textContainer: {
    position: 'absolute',
    width: 90, 
    height: 90,    
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default respirarStyles;