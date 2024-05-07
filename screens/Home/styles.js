import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: scaleFontSize(24),
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D70AA',
    marginTop: verticalScale(20),
  },

  whiteText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: verticalScale(21.94),
    fontSize: scaleFontSize(25),
    paddingHorizontal: horizontalScale(15),
    fontFamily: 'RobotoSlab-Light',
    alignSelf: 'center',
    fontWeight: '300',
    width: '90%',
    marginTop: verticalScale(45),
  },
  learnMoreLink: {
    fontSize: scaleFontSize(20),
    fontWeight: '300',
    textAlign: 'center',
    color: 'white',
    marginTop: verticalScale(5),
  },
});

export default styles;
