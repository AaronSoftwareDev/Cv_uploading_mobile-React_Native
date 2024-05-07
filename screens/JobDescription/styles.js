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
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#235A8A',
    height: 25,
    width: 25,
  },
  categoryFlatList: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: 'white',
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
  subscriptionText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
  },
  subscriptionText_upload: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  outer_user: {
    marginTop: 20,
  },
  user_summary: {
    marginTop: 0,
  },
  outer_user_upload: {
    marginTop: 5,
  },
  search: {
    marginTop: 5,
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

    padding: 10,
  },
  searchContainerFilter: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are vertically aligned
    // Distribute items along the row
    paddingHorizontal: 10, // Add some padding to the row
    marginTop: 2,
    padding: 20,
    // Adjust the top margin if needed
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
  searchContainer_filter: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure items are vertically aligned
    justifyContent: 'space-between', // Distribute items along the row
    paddingHorizontal: 10, // Add some padding to the row
    padding: 10,
    backgroundColor: '#5188B6', // Adjust the top margin if needed
  },
  searchBarContainer: {
    flex: 1, // Allow the TextInput to expand within the row
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#5188B6',
    borderRadius: 25,
    height: 40, // Adjust the height if necessary
    color: 'white',
    paddingHorizontal: 10, // Add padding for text input
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

  updateButton: {},
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
  nameColumn: {
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 10,

    maxWidth: '80%',
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  name_summary: {
    color: 'black',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 0,
  },
  name_summary_catergory: {
    color: 'white',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 0,
  },
  boldText_category: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingLeft: 5,
    // You can add more styles if needed
  },

  summaryText: {
    width: '100%',
  },

  name_summary_bold_Category: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
  name_summary_catergory: {
    color: 'white',
    marginLeft: 10,
    textAlign: 'center',
    marginTop: 0,
  },

  categoryItem: {
    padding: 10,
    backgroundColor: '#235A8A',
    borderWidth: 0,
  },
  categoryText: {
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
    fontWeight: 'bold',
    flexWrap: 'wrap',
    // You can add more styles if needed
  },
  boldText_category: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    paddingLeft: 5,
    // You can add more styles if needed
  },

  summaryText: {
    width: '100%',
  },
  summaryContainer: {
    maxWidth: '80%', // Adjust the maximum width as needed
  },
  flatlist_container: {
    height: 300,
  },
  customCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    marginTop: 5,
    marginBottom: 5, // Adjust margin-bottom to add space between cards
    marginLeft: 12, // Adjust margin-left to add space between cards
    marginRight: 12, // Adjust margin-right to add space between cards
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    flex: 1,
    flexDirection: 'column',
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
    marginVertical: 6,
    margin: 6,
    justifyContent: 'center', // Vertically center content
    alignItems: 'center', // Adjust margin as needed
  },
  upload_button: {},
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
    fontSize: 14,
    fontWeight: '600',
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
  name_summary_bold: {
    fontWeight: 'bold',
  },
  name_summary_bold_Category: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
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
  totalViews: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
});

export default styles;
