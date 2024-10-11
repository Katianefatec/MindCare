import { StyleSheet } from 'react-native';

const respirarStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 40, // Ajuste para mover o título para cima
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, 
  },
  phaseText: {
    color: '#B2F5EA',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10, 
  },
});

export default respirarStyles;