import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D70AA',
    marginTop: 20,
  },
  scrollView: {
    marginHorizontal: 15,
    // Adjust the maxHeight as needed
    paddingBottom: 20,
    flex: 1, // Adjust the maxHeight as needed
  },
  input: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(15),
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 5,
    height: 40,
    color: 'white',
    marginVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    width: horizontalScale(275),
    alignSelf: 'center',
    backgroundColor: '#3C6991',
  },
  registerButton: {
    backgroundColor: '#235A8A',
    width: horizontalScale(260),

    marginHorizontal: 30,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#5188B6',
  },
});

export default styles;
