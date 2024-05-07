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
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#235A8A',
    height: verticalScale(25),
    width: horizontalScale(25),
  },
  categoryFlatList: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  flatListContainer: {
    flex: 1,

    marginBottom: verticalScale(40),
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    right: 0,
    backgroundColor: '#fff', // Adjust background color as needed
    elevation: 5,
    // Add elevation for shadow if desired
  },
  subscriptionText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: scaleFontSize(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    padding: horizontalScale(20),
  },
  categoryStyles: {
    padding: horizontalScale(5),
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
  user_summary: {
    marginTop: verticalScale(0),
  },
  outer_user_upload: {
    marginTop: verticalScale(5),
  },
  search: {
    marginTop: verticalScale(5),
    flexDirection: 'row',
    backgroundColor: '#5188B6',
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
  user_intial_summary: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#3C6991',

    padding: horizontalScale(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are vertically aligned
    justifyContent: 'space-between', // Distribute items along the row
    paddingHorizontal: horizontalScale(10), // Add some padding to the row
    marginTop: verticalScale(10),
    padding: horizontalScale(10),
    backgroundColor: '#5188B6', // Adjust the top margin if needed
  },
  searchBarContainer: {
    flex: 1, // Allow the TextInput to expand within the row
    marginLeft: horizontalScale(10),
  },
  searchInput: {
    fontFamily: 'RobotoSlab-Regular',
    flex: 1,
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 25,
    height: verticalScale(35), // Adjust the height if necessary
    color: 'white',
    paddingHorizontal: horizontalScale(10), // Add padding for text input
    backgroundColor: '#306088', // Example color, adjust as needed

    textAlignVertical: 'center',
  },
  circularInitials: {
    width: 50,
    height: 50,
    borderRadius: 25, // half of the width/height to make it circular
    backgroundColor: '#D9D9D9', // Adjust the color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#2D70AA',
  },
  updateButton: {justifyContent: 'center', alignItems: 'center'},
  buttonContainer_upload: {
    backgroundColor: '#235A8A',
    width: horizontalScale(250),
    height: verticalScale(45),
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
    paddingLeft: horizontalScale(10),
  },
  name: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(20),
    color: 'white',
    marginLeft: 10,
  },
  nameColumn: {
    flexDirection: 'column',
    justifyContent: 'fle',
    alignContent: 'center',

    maxWidth: '80%',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(0),
  },

  name_summary: {
    fontFamily: 'RobotoSlab-Regular',
    fontSize: scaleFontSize(15),
    color: 'black',

    textAlign: 'center',
    marginTop: 0,
  },
  name_summary_catergory: {
    fontFamily: 'RobotoSlab-Light',
    fontSize: scaleFontSize(15),
    color: 'white',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 0,
    padding: 2,
    marginRight: '2%',
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
  cardWithRadius: {
    marginBottom: 6,
    padding: 0,
    borderRadius: 25,
    backgroundColor: 'white', // Assuming the background color you need
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  boldText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',

    // You can add more styles if needed
  },
  addButton: {
    borderWidth: 2,
    borderColor: '#235A8A', // Blue color
    borderRadius: 5,
    paddingVertical: verticalScale(3), // Adjust the vertical padding
    paddingHorizontal: horizontalScale(10), // Adjust the horizontal padding
    marginTop: 10, // Add margin if needed
    marginBottom: 0,
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 8,
    marginTop: 0,
    // Blue color
    marginBottom: 10,
    marginLeft: 2,
    paddingVertical: 2, // Adjust the vertical padding
    paddingHorizontal: 1, // Adjust the horizontal padding
    // Add margin if needed
    marginBottom: 0,
    alignSelf: 'center',
  },
  summaryText: {
    fontSize: scaleFontSize(15),
    fontFamily: 'RobotoSlab-Regular',
  },

  boldText_category: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingLeft: horizontalScale(5),
    paddingRight: '2%',
    // You can add more styles if needed
  },

  summaryText: {
    width: '100%',
  },
  summaryContainer: {
    maxWidth: '80%', // Adjust the maximum width as needed
  },

  customCard: {
    backgroundColor: 'white', // Assuming the background color you need
    borderRadius: 10,
    borderWidth: 1, // If you want to add a border
    borderColor: '#ddd', // Example border color
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: 10, // Adjust padding as needed
    marginVertical: verticalScale(6),
    margin: horizontalScale(6),
    zIndex: 1,
    // Vertically center content
    // Adjust margin as needed
  },
  customCard_cv: {
    backgroundColor: 'white', // Assuming the background color you need
    borderRadius: 10,
    borderWidth: 1, // If you want to add a border
    borderColor: '#ddd', // Example border color
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10, // Adjust padding as needed
    marginVertical: verticalScale(6),
    margin: horizontalScale(6),
    justifyContent: 'center', // Vertically center content
    alignItems: 'center', // Adjust margin as needed
  },
  upload_button: {},
  image: {
    width: horizontalScale(50),
    height: verticalScale(35),
    borderRadius: 25,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: '80%', // Adjust the width as needed
    backgroundColor: '#fff', // Background color of the modal
    padding: horizontalScale(20),
    borderRadius: 10,
  },
  summaryInput: {
    height: verticalScale(90),
    color: 'black',
    borderColor: '#9bb3de',
    borderWidth: 1,
    marginBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  saveButton: {
    backgroundColor: '#235A8A',
    padding: horizontalScale(8),
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: '5%',
  },
  image_upload: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  fonts: {
    color: '#2D70AA',
    fontSize: scaleFontSize(14),
    fontWeight: '600',
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
    height: verticalScale(40),
    color: 'white',
    marginVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
  },
  name_summary_bold: {
    fontWeight: 'bold',
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
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    margin: horizontalScale(5),
  },
  imageContainer_upload: {
    alignItems: 'center',
    margin: horizontalScale(5),
  },
  cardContainer: {
    margin: horizontalScale(0),
    paddingVertical: verticalScale(0),
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonContainer: {
    backgroundColor: '#235A8A',
    width: horizontalScale(250),
    height: verticalScale(62),
    marginHorizontal: horizontalScale(30),
    marginVertical: verticalScale(5),
    borderWidth: 1,
    borderColor: '#5188B6',
  },
  buttonText: {
    fontSize: scaleFontSize(24),
    fontWeight: '300',
    color: 'white',
  },
  buttonText_upload: {
    fontSize: scaleFontSize(16),
    fontWeight: '300',
    color: 'white',
  },
  totalViews: {
    color: 'white',
    textAlign: 'center',
    fontSize: scaleFontSize(16),
    marginTop: verticalScale(10),
  },
});

export default styles;
