import { StyleSheet } from 'react-native';

const momentoStyles = StyleSheet.create({
  momento: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 60,
  },
  momentoButton: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%', 
  },
  momentoBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120, 
    height: 120, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  momentoLabel: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default momentoStyles;