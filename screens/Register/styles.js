import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D70AA',
    marginTop: 20,
  },
  scrollView: {
    marginHorizontal: 20,
    maxHeight: 250, // Adjust the maxHeight as needed
  },
  input: {
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 5,
    height: 40,
    color: 'white',
    marginVertical: 5,
    paddingHorizontal: 10,
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#3C6991',
  },
  registerButton: {
    backgroundColor: '#235A8A',
    width: 250,
    height: 55,
    marginHorizontal: 30,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#5188B6',
  },
});

export default styles;
