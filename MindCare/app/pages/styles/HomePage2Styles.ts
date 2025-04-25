import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const homePage2Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  
});

export default homePage2Styles;