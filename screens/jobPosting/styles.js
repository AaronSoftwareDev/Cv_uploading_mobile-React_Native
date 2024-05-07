import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingHorizontal: horizontalScale(5),
    width: '100%',
    flex: 1,
    backgroundColor: '#2D70AA',
    paddingBottom: '15%',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D70AA',
    marginTop: 20,
  },
  content_accordian: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    color: '#2D70AA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  accordian: {
    marginTop: 10,
    height: 400,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sentMessages: {
    color: 'white',
    fontSize: 18,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 10,

    width: '100%',
    flex: 1,
  },
  header: {
    backgroundColor: '#235A8A',
    width: 240,
    padding: 5,
    borderRadius: 5,
    marginRight: 4,
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center', // Center vertically
  },

  headerText: {
    color: 'white',
    fontSize: 16,
    flexWrap: 'wrap',
    marginRight: 2,
    flex: 1,
  },
  headerText_icon: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'flex-end',
    marginLeft: 4,
  },
  statusIndicator: {
    // Half of the width or height for a circular shape
  },

  content: {
    backgroundColor: 'white',
    padding: 10,
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 16,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  learnMoreLink: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingBottom: 9,
    marginBottom: 10,
  },
});

export default styles;
