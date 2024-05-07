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
    flexDirection: 'row',
    color: 'white',
    lineHeight: 27.94,
    fontSize: scaleFontSize(30),
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 700,
    paddingHorizontal: 20,
    fontFamily: 'Inter',
    alignSelf: 'center',
    fontWeight: '300',
    width: horizontalScale(270),
    marginTop: verticalScale(30),
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
