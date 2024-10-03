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
    paddingBottom: 74,
    alignContent: "center",    
  },
  mainImage: {
    height: 188,
    marginBottom: 44,
    marginHorizontal: 65,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#A0BB9B",
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 14,
    marginBottom: 21,
    marginHorizontal: 55,
  },
  icon: {
    width: 13,
    height: 13,
    marginRight: 15,
    marginBottom:5,
  },
  input: {
    color: "#000000",
    fontSize: 13,
    flex: 1,
  },
  errorMessage: {
    color: "red",
    marginHorizontal: 55,
  },
  loginButton: {
    alignItems: "center",
    backgroundColor: "#19484F",
    paddingVertical: 13,
    marginBottom: 10,
    marginHorizontal: 97,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  linkText: {
    fontSize: 12,
    marginBottom: 14,
    alignItems: "center",
    textAlign: "center",   
  },
});

export default loginStyles;