import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const reflexaoPageStyles = StyleSheet.create({
  backgroundImage: {    
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom: 20,
  },

  container2: {
    flex: 1,    
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom: 10,
  },

  container3: {    
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 70,
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,    
  },

  greeting: {
    fontSize: 30, 
    fontWeight: '700',    
    color: 'white', 
    marginLeft: 10,  
    marginBottom: 55,
    textAlign: 'center',      
  }, 
  
  greeting2: {
    fontSize: 25, 
    fontWeight: '700',    
    color: 'white', 
    marginLeft: 10,  
    marginBottom: 55,
    textAlign: 'center',      
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
    width: '70%',
  },

  searchContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9d9d980',
    borderRadius: 10,
    paddingHorizontal: 25,
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop:40,
    marginBottom: 0,
    width: '70%',
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
    width: 310,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
    marginLeft:25,
  },
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: "#e9f5f7",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 5,
    borderRadius: 3,
    backgroundColor: '#a5a4a4',
  },
  modalButtonDelete: {
    backgroundColor: 'rgb(224, 31, 31)',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default reflexaoPageStyles;