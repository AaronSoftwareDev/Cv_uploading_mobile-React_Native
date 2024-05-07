import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D70AA',
    marginTop: 10,
    marginLeft: 10,
  },
  circularInitials: {
    width: 50,
    height: 50,
    borderRadius: 25, // half of the width/height to make it circular
    backgroundColor: '#D9D9D9', // Adjust the color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    padding: horizontalScale(35),
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalView_spenn: {
    backgroundColor: 'white',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    paddingLeft: horizontalScale(50),
    paddingRight: horizontalScale(50),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow on Android
  },
  modalText: {
    fontSize: scaleFontSize(32),
    color: '#3c4b64',
  },
  confirmButton: {
    backgroundColor: '#235A8A',
    width: 150,
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#5188B6',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
  },
  initials: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(20),
  },
  subscriptionText: {
    fontFamily: 'RobotoSlab-Light',
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: scaleFontSize(24),
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  outer_user: {
    marginTop: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C6991',
    paddingLeft: 10,
  },
  name: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(20),
    color: 'white',
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  fonts: {
    color: '#2D70AA',
  },
  learnMoreLink_bottom: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 5,
    height: 40,
    color: 'white',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
});

export default styles;
