import {StyleSheet} from 'react-native';

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
    backgroundColor: 'gray', // Adjust the color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '150',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  subscriptionText_upload: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '150',
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  outer_user: {
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are vertically aligned
    justifyContent: 'space-between', // Distribute items along the row
    paddingHorizontal: 10, // Add some padding to the row
    marginTop: 10,
    padding: 10,
    backgroundColor: '#5188B6', // Adjust the top margin if needed
  },
  searchBarContainer: {
    flex: 1, // Allow the TextInput to expand within the row
    marginLeft: 10,

    // Adjust spacing between the search icon and TextInput if needed
  },
  updateButton: {},
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 25,
    height: 40, // Adjust the height if necessary
    color: 'white',
    paddingHorizontal: 10, // Add padding for text input
    backgroundColor: '#306088', // Example color, adjust as needed
    // Center the text vertically within the input
    textAlignVertical: 'center',
  },
  outer_user_upload: {
    marginTop: 5,
  },
  searchIcon: {
    backgroundColor: '#235A8A',
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
    width: 250,
    height: 45,
    marginHorizontal: 0,
    marginVertical: 0,
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 15,
  },
  buttonContainer_upload_2: {
    backgroundColor: '#235A8A',
    width: 150,
    height: 45,
    marginHorizontal: 0,
    marginVertical: 0,
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
    color: 'white',
    marginLeft: 10,
  },
  image: {
    width: 50,
    height: 35,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  image_upload: {
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
    fontSize: 16,
    fontWeight: '300',
    color: 'white',
  },
});

export default styles;
