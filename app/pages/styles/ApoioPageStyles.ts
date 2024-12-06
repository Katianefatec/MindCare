import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ApoioPageStyles = StyleSheet.create({
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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9d9d980',
    borderRadius: 10,
    paddingHorizontal: 25,
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop:40,
    marginBottom: 60,
    width: '80%',
  },

  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 12,
  },
  professionalContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  professionalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  professionalSpecialty: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  professionalContact: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  whatsappButton: {
    backgroundColor: '#25D366', // cor do WhatsApp
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  chatButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ApoioPageStyles;