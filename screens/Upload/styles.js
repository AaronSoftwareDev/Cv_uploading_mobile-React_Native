import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: scaleFontSize(17),
    fontWeight: '600',
    textAlign: 'center',
    color: '#2D70AA',
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(10),
  },
  initials: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(22),
  },
  circularInitials: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: 25, // half of the width/height to make it circular
    backgroundColor: '#D9D9D9', // Adjust the color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: scaleFontSize(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    padding: 20,
  },
  subscriptionText_upload: {
    fontFamily: 'RobotoSlab-Light',
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: scaleFontSize(32),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    padding: horizontalScale(10),
  },
  outer_user: {
    marginTop: verticalScale(20),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are vertically aligned
    justifyContent: 'space-between', // Distribute items along the row
    paddingHorizontal: 10, // Add some padding to the row
    padding: 10,
    backgroundColor: '#5188B6',
    alignContent: 'center', // Adjust the top margin if needed
  },
  searchBarContainer: {
    // Allow the TextInput to expand within the row
    marginLeft: horizontalScale(10),

    // Adjust spacing between the search icon and TextInput if needed
  },

  searchInput: {
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 25,
    height: 40, // Adjust the height if necessary
    color: 'white',
    paddingHorizontal: 20, // Add padding for text input
    backgroundColor: '#306088', // Example color, adjust as needed
    width: '80%',
    textAlignVertical: 'center',
  },
  categoryStyles: {
    padding: 5,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: '#235A8A',
    borderWidth: 0,
  },
  categoryText: {
    fontFamily: 'RobotoSlab-ExtraLight',
    fontSize: scaleFontSize(18),
    color: 'white',
  },
  boldText_category: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingLeft: 5,
    paddingRight: '2%',
    // You can add more styles if needed
  },
  name_summary_catergory: {
    fontFamily: 'RobotoSlab-ExtraLight',
    color: 'white',
    marginLeft: horizontalScale(10),
    fontSize: scaleFontSize(20),
    textAlign: 'center',
    marginTop: 0,
    padding: 2,
    marginRight: '2%',
  },
  name_summary_bold_Category: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(18),
    fontWeight: 'bold',
    marginLeft: horizontalScale(10),
    color: 'white',
  },
  flatListContainer: {
    marginBottom: 40,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    left: 0,
    zIndex: 100,
    right: 0,
    backgroundColor: '#fff', // Adjust background color as needed
    elevation: 5,
    // Add elevation for shadow if desired
  },
  outer_user_upload: {
    marginTop: 5,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#235A8A',
    height: verticalScale(25),
    width: horizontalScale(25),
  },
  search: {
    marginTop: 5,
  },
  //   searchbar: {
  //     width: 60,
  //     height: 30,
  //   },
  user_intial: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C6991',

    padding: 10,
  },
  buttonContainer_upload: {
    backgroundColor: '#235A8A',
    width: horizontalScale(250),
    height: verticalScale(40),
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalScale(0),
    marginVertical: verticalScale(0),
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 15,
  },
  buttonContainer_upload_2: {
    backgroundColor: '#235A8A',
    width: horizontalScale(150),
    height: verticalScale(40),
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalScale(0),
    marginVertical: verticalScale(0),
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 15,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5188B6',
    paddingLeft: 10,
  },
  name: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(20),
    color: 'white',
    marginLeft: horizontalScale(10),
  },
  image: {
    width: horizontalScale(50),
    height: verticalScale(35),
    borderRadius: 25,
    resizeMode: 'cover',
  },
  image_upload: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: 25,
    resizeMode: 'cover',
  },
  fonts: {
    color: '#2D70AA',
  },
  learnMoreLink_bottom: {
    fontSize: scaleFontSize(14),
    fontWeight: '300',
    textAlign: 'center',
    color: 'white',
    marginTop: verticalScale(10),
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
  imageContainer_upload: {
    alignItems: 'center',
    margin: 5,
  },
  cardContainer: {
    margin: 0,
    paddingVertical: 0,
    paddingHorizontal: 70,
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonContainer: {
    backgroundColor: '#235A8A',
    width: 250,
    height: 62,
    marginHorizontal: 30,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#5188B6',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white',
  },
  buttonText_upload: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(22),
    fontWeight: '300',
    color: 'white',
  },
});

export default styles;
