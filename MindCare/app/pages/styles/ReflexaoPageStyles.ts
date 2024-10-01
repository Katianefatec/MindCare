import { StyleSheet } from 'react-native';

const reflexaoPageStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20, 
    paddingVertical: 60,
  },
  greeting: {
    fontSize: 30, 
    fontWeight: '800',    
    color: 'white', 
    marginLeft: 10,  
    marginBottom:45,
    textAlign: 'center',      
  },  
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9d9d980',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  calendarioIcon: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164a51',
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
  },
  iconLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  iconRight: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  textInput: {
    marginTop: 50,
    color: '#4A4A4A',
    width: '100%',
    height: 200,
    textAlignVertical: 'top',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  scrollView: {
    width: '100%',
  },

  dateText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  reflexaoText: {
    marginTop: 10,
    fontSize: 18,
    color: '#4A4A4A',
  },

  cardView: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom:7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
  },

  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },

});



export default reflexaoPageStyles;