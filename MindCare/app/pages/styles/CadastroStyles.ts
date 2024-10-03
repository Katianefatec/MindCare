import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const cadastroStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
  },
  scrollView: {
    flex: 1,
  },
  column: {
    paddingVertical: 135,
  },
  icon: {
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#DBECEF",
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    marginBottom: 15,
    marginHorizontal: 38,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000C9",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 13,
    marginBottom: 15,
    marginHorizontal: 38,
  },
  row3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000C9",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 13,
    marginBottom: 18,
    marginHorizontal: 38,
  },
  row4: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 19,
    marginHorizontal: 38,
  },
  datePickerItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  text2: {
    color: "white",
    fontSize: 17,
    fontWeight: '600',    
    marginBottom: 16,
    marginLeft: 40,
  },
  text4: {
    color: "white",
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 15,
    marginLeft: 39,
  },
  text5: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  view: {
    alignItems: "center",
    backgroundColor: "#19484F",
    paddingVertical: 15,
    marginHorizontal: 97,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    flex: 1,
    color: "#82997E",
    fontSize: 13,
  },

  pickerSelect: {
    flex: 1,
    color: '#82997E',
    fontSize: 14,
    paddingVertical: 22,
    paddingHorizontal: 100,
  },
  inputIOS: {
    color: '#82997E',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    color: '#82997E',
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },

  pickerContainer: {
    paddingHorizontal: 40,
    marginBottom: 30,
  },
});

export default cadastroStyles;