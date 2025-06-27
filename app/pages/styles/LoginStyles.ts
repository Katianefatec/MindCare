import { StyleSheet } from "react-native";

const loginStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#41ACBB",
  },
  scrollView: {
    flex: 1,
    
  },
  container: {
    
    paddingTop: 132,
    paddingBottom: 75,
    alignItems: "center",    
  },
  mainImage: {
    height: 188,
    marginBottom: 44,
    alignItems: "center",
    // marginLeft:20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000C9",
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginBottom: 15,
    marginHorizontal: 55,
    borderRadius: 8,
  },
  icon: {
    width: 13,
    height: 13,
    marginRight: 15,
    marginBottom:5,
  },
  input: {
    color: "#82997E",
    fontSize: 13,
    flex: 1,
  },
  errorMessage: {
    color: '#FF4444',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 55,
    paddingVertical: 12,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4444',
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 3,
    elevation: 3,
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#19484F",
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 20,
    marginHorizontal: 70,
    borderRadius: 8,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  linkText: {
    fontSize: 12,
    marginBottom: 14,
    alignItems: "center",
    textAlign: "center",   
  },
});

export default loginStyles;