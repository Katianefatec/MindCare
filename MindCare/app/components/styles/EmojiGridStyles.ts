import { StyleSheet } from 'react-native';

const emojiGridStyles = StyleSheet.create({
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  emojiButton: {
    alignItems: 'center',
    marginBottom: 10,
    width: '45%', 
  },
  emojiBox: {
    backgroundColor: 'white',
    // padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90, 
    height: 80, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  emojiLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default emojiGridStyles;