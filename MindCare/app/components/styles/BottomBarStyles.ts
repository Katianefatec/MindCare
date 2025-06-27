import { StyleSheet } from 'react-native';

const bottomBarStyles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#9FD1D8',
    position: 'absolute',
    bottom: 0,
    height: 60,
    left: 0,
    right: 0,
    paddingTop: 9,
    zIndex: 1000,
  },
  
  
});

export default bottomBarStyles;