import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const avaliacaoStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    paddingTop: 40,
  },
  container2: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 70,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 35,
    textAlign: 'center',
  },

  paragraphContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },

  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'justify',
    marginBottom: 10,
  },

  textQuestion: {
    color: 'white',
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 20,
  },

  optionText: {
    color: 'white',
    fontSize: 15,
  },

  avaliacaoOptions: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    width: width * 0.9,
  },
  avaliacaoOptionContainer: {
    width: '100%',
    marginVertical: 20,
  },
  
  scrollViewContent: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  webView: {
    width: '100%',
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  avaliacaoOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#ADD8E6',
  },
  avaliacaoButton: {
    alignItems: 'center',
    backgroundColor: '#19484F',
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 70,
    shadowColor: '#00000040',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  avaliacaoButtonText: {
    color: 'white',
    fontSize: 14,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
  },
  circle: {
    height: 15,
    width: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
    marginTop: 2,
  },
  selectedCircle: {
    backgroundColor: '#ADD8E6',
    borderColor: '#ADD8E6',
  },
  
});

export default avaliacaoStyles;