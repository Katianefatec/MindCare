import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const avaliacaoStyles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 70,
        paddingTop:30,
    },

    greeting: {
        fontSize: 20, 
        fontWeight: "bold",    
        color: 'white', 
        marginLeft: 10,  
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',      
    },  

    avaliacaoOptions: {
        marginTop:20,
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: 10,
        width: width * 0.9,
    },

    avaliacaoOptionContainer: {
        width: '100%',     
        marginVertical: 20,
    },

    avaliacaoTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center', 
        marginTop: 5,
    },

    scrollViewContent: {
        paddingVertical: 5,
        alignItems: 'center'
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
        backgroundColor: '#ADD8E6'
    },

    avaliacaoButton: {
        alignItems: "center",
        backgroundColor: "#19484F",
        paddingVertical: 10,
        paddingHorizontal: 60,
        marginBottom: 10,
        marginHorizontal: 70,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
        elevation: 4,
    },

    avaliacaoButtonText: {
        color: "white",
        fontSize: 14,
    },

});

export default avaliacaoStyles;