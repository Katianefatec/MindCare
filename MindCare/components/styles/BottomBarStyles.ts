import { StyleSheet } from 'react-native';

const bottomBarStyles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#307B86', 
    position: 'absolute',
    bottom: 0,
    left: 0, 
    right: 0, 
    
    // 
  },
  iconButton: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#dbecef',
  },
});

export default bottomBarStyles;