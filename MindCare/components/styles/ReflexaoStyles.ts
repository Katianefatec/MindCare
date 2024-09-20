import { StyleSheet } from 'react-native';

const reflexaoStyles = StyleSheet.create({
  reflexao: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 60,
  },
  emojiButton: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%', 
  },
  emojiBox: {
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
  emojiLabel: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default reflexaoStyles;