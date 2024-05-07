import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import {Card, Button, Text, SearchBar} from '@rneui/themed';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
import {BASE_URL} from '../../env';

import styles from './styles.js';
import Pdf from 'react-native-pdf';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {WebView} from 'react-native-webview';
import {
  faSearch,
  faLeftLong,
  faFileArrowUp,
  faBriefcase,
  faMaximize,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';

import {
  addNewItem,
  addUserinfor,
  addUserinfor1,
  addJobSeeker,
  addLoginState,
  clearItems,
} from '../../redux/cvSlice.js';

const Joblist = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [userEmail, setUserEmail] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [userdata, setUserData] = useState([]);

  const [userDataStore, setUserData_store] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fetchedData2, setFetchedData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([
    'All',
    'Electrical',
    'Construction',
    'Healthuy care',
    'Agriculture',
    'Retail',
    'Finance',
    'Food Industry',
    'Managment',
    'Hospital Industry',
    'software engineer',
    'Legal',
    'Mining',
    'Education',
  ]);
  const screenHeight = Dimensions.get('window').height;
  const [selectedPdf, setSelectedPdf] = useState({});
  const [file_name_display, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Image_display, setImageName] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  const user_data = useSelector(state => state.cv.loginstate);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJobData, setSelectedJobData] = useState(null);

  const handleLogout = () => {
    // Dispatch the action to clear items in the store
    dispatch(clearItems());

    // Navigate to the 'Home' screen
    navigation.navigate('Home');
  };

  const [isCustomCardEmpty, setIsCustomCardEmpty] = useState(true);
  const source_display = {
    uri: `${BASE_URL}/uploads/cv.pdf`,
    cache: true,
  };

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchText.toLowerCase()),
  );
  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }
  const handleSearchTextChange = text => {
    setSearchText(text);
    setSearchExpanded(true);
  };
  const dummyData = [
    {id: '1', first_name: 'John', last_name: 'Doe'},
    {id: '2', first_name: 'Jane', last_name: 'Doe'},
    {id: '3', first_name: 'Alice', last_name: 'Smith'},
    {id: '4', first_name: 'Bob', last_name: 'Johnson'},
    {id: '5', first_name: 'Eva', last_name: 'Williams'},
    {id: '6', first_name: 'Michael', last_name: 'Brown'},
  ];
  const childHeightPercentage = 40; // Adjust the percentage as needed

  const childHeight = (screenHeight * childHeightPercentage) / 100;

  const renderCategoryItem = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('Selected category:', item);
        setSelectedCategory(item);
        setSearchExpanded(false);
      }}
      style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </Pressable>
  );

  useEffect(() => {
    // const {email} = route.params;
    setUserEmail(user_data);
    setUserData_store(newItems_data);
    // console.log('user details from the  store', userDataStore[0].first_name);

    const fetchUserData = async () => {
      try {
        const randomValue = Math.floor(Math.random() * 1000);
        const randomText = generateRandomText(5);
        const response = await fetch(
          `${BASE_URL}/agent.php?email=${userEmail}&${randomText}=${randomValue}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // dispatch(addNewItem(data));
        setFetchedData(data);
        setUserData(data);
        setFetchedData2(data);
        console.log('agent infor', data);

        if (Array.isArray(data) && data.length > 0) {
          // Dispatch specific properties to the Redux store
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const randomValue = Math.floor(Math.random() * 1000);
        const randomText = generateRandomText(5);
        const response = await fetch(
          `${BASE_URL}/joblisting.php?${randomText}=${randomValue}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const profileData = await response.json();
          console.log('the profile data AGENT', profileData);
          setProfileData(profileData);
          setSelectedPdf(profileData);

          if (profileData.length > 0) {
            const fileName = profileData[0]?.file_name;
            const imageName = profileData[0]?.image_name;
            setFileName(fileName);
            setImageName(imageName);

            if (fileName !== null && fileName !== undefined) {
              setIsCustomCardEmpty(false);
            }
          }
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false); // Set loading indicator back to false when fetching finishes
      }
    };

    fetchUserData();
    fetchProfileData();
  }, [route.params, userEmail, dispatch]);

  const UploadCVScreen = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/getInfor.php?email=${userEmail}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        // const userData = data[0];
        // const {first_name, last_name} = userData;

        navigation.navigate('Upload', {first_name, last_name});
      } else {
        console.warn('No user data available for upload');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };
  const navigateToJobSeeker = id => {
    dispatch(addJobSeeker(id));
    // navigation.navigate('JobDescription'); // Replace 'JobSeeker' with the actual name of your screen
  };
  const JobDetailsModal = ({isVisible, closeModal, jobData}) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              padding: 20,
              borderRadius: 10,
              flexDirection: 'column',
            }}>
            <Text style={{alignSelf: 'center', fontWeight: 700, fontSize: 18}}>
              Job Details
            </Text>
            {jobData && (
              <>
                {jobData.job_category && (
                  <Text style={styles.textJobDetails}>
                    <Text style={styles.jobTitle}>Job Category: </Text>
                    {'\n'}
                    {jobData.job_category}
                  </Text>
                )}
                {jobData.job_title && (
                  <Text style={styles.textJobDetails}>
                    <Text style={styles.jobTitle}>Job Title:</Text>
                    {'\n'}
                    {jobData.job_title}
                  </Text>
                )}
                {jobData.location && (
                  <Text style={styles.textJobDetails}>
                    <Text style={styles.jobTitle}>Job Location:</Text>
                    {'\n'}
                    {jobData.location}
                  </Text>
                )}
                {jobData.job_description && (
                  <Text style={styles.textJobDetails}>
                    <Text style={styles.jobTitle}>Job Description:</Text>
                    {'\n'}
                    <ScrollView>
                      <Text>{jobData.job_description}</Text>
                    </ScrollView>
                  </Text>
                )}
                {jobData.qualification_level && (
                  <Text style={styles.textJobDetails}>
                    <Text style={styles.jobTitle}>
                      Job Qualification level:
                    </Text>{' '}
                    {'\n'}
                    {jobData.qualification_level}
                  </Text>
                )}
                {jobData.salary && (
                  <Text style={styles.textJobDetails}>
                    <Text style={styles.jobTitle}>Salary expectation: </Text>
                    {'\n'}
                    {jobData.salary}
                  </Text>
                )}
                {jobData.submission_email && (
                  <Text style={styles.textJobDetails}>
                    <Text style={styles.jobTitle}>Submission Email:</Text>
                    {'\n'} {jobData.submission_email}
                  </Text>
                )}
              </>
            )}
            <Pressable
              onPress={closeModal}
              style={{
                marginTop: 20,
                backgroundColor: '#2D70AA',
                padding: 5,
                width: '40%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{color: 'white'}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#2D70AA'}}>
      <Card containerStyle={styles.cardContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Card.Image
            style={styles.image}
            source={require('../../assets/logo1.jpg')}
          />
          <Card.Title style={styles.cardTitle}>
            <Text
              style={{
                marginTop: verticalScale(8),
                fontFamily: 'RobotoSlab-SemiBold',
                fontSize: scaleFontSize(35),
                fontWeight: '600',
                color: '#235A8A',
              }}>
              CV WORLD
            </Text>
          </Card.Title>
        </View>
      </Card>
      <View style={styles.outer_user}>
        {Array.isArray(userDataStore) && userDataStore.length > 0 ? (
          <View style={styles.user_intial}>
            {userDataStore.length > 0 ? (
              <>
                <View style={styles.image_upload}>
                  <View style={styles.circularInitials}>
                    <Text style={styles.initials}>
                      {userDataStore[0]?.first_name.charAt(0)}
                      {userDataStore[0]?.last_name.charAt(0)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.name}>
                  {userDataStore[0]?.first_name} {''}
                  {userDataStore[0]?.last_name}
                </Text>
              </>
            ) : (
              <Text>Loading user data...</Text>
            )}
          </View>
        ) : (
          <ActivityIndicator size="small" color="#ffffff" />
        )}
      </View>
      <View>
        <Text style={styles.subscriptionText_upload}>Job Listings</Text>

        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => setSearchExpanded(!isSearchExpanded)}
            style={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} size={16} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            {isSearchExpanded ? (
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Type Here..."
                  placeholderTextColor="#ffffff"
                  onChangeText={handleSearchTextChange}
                  onFocus={() => setSearchExpanded(true)}
                  onBlur={() => setSearchExpanded(false)}
                />
                {searchText.length > 0 && isSearchExpanded && (
                  <View style={styles.flatListContainer}>
                    <FlatList
                      data={filteredCategories}
                      renderItem={renderCategoryItem}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.categoryStyles}>
                <Text style={styles.boldText_category}>
                  <Text style={styles.name_summary_bold_Category}>
                    Category:
                  </Text>{' '}
                  <Text style={styles.name_summary_catergory}>
                    {selectedCategory}
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={{height: screenHeight - childHeight, paddingBottom: '20%'}}>
          <FlatList
            data={
              profileData && profileData.length > 0
                ? profileData.filter(
                    item =>
                      selectedCategory === 'All' ||
                      item.job_category === selectedCategory,
                  )
                : []
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.customCard}>
                <View style={styles.userDetailsContainer}>
                  <View style={styles.image_upload}>
                    <View style={styles.circularInitials}>
                      {Image_display && !isCustomCardEmpty ? (
                        <Image
                          source={{
                            uri: `${BASE_URL}/uploads/${Image_display}`,
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignSelf: 'center',
                          }}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.circularInitials}>
                          <Text style={styles.initials}>
                            {item.company_email.charAt(0)}
                            {item.company_email.charAt(1)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-around',
                    }}>
                    <View style={styles.nameColumn}>
                      <Text style={styles.boldText}>
                        <Text style={styles.name_summary_bold}>
                          Company Name:{' '}
                        </Text>
                        <Text style={styles.name_summary}>
                          {item.company_email}
                        </Text>
                      </Text>

                      <Text style={styles.boldText}>
                        Position:{' '}
                        <Text style={[styles.name_summary, styles.summaryText]}>
                          {item.job_title}{' '}
                        </Text>
                      </Text>
                      <Text style={styles.boldText}>
                        Summary:{' '}
                        <Text style={[styles.name_summary, styles.summaryText]}>
                          {item.job_description}{' '}
                        </Text>
                      </Text>
                    </View>
                    <View>
                      <View>
                        <Pressable
                          onPress={() => {
                            setSelectedJobData(item); // Set the selected job data
                            setModalVisible(true);
                            navigateToJobSeeker(item.username);
                          }}>
                          <Image
                            source={require('../../assets/Open.png')}></Image>
                        </Pressable>
                        <JobDetailsModal
                          isVisible={modalVisible}
                          closeModal={() => setModalVisible(false)}
                          jobData={selectedJobData}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    borderTopWidth: 1, // Set the border width
                    borderTopColor: 'blue',
                    justifyContent: 'space-evenly',
                    paddingTop: 4,
                  }}>
                  {/* First column */}
                  <View
                    style={{
                      flexDirection: 'row',

                      flex: 1,
                      marginRight: 2,
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Medium',

                        fontSize: scaleFontSize(15),
                        marginRight: horizontalScale(4),
                      }}>
                      Listed on:{' '}
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',

                        fontSize: scaleFontSize(15),
                        marginRight: horizontalScale(4),
                      }}>
                      {item.submited_date}
                    </Text>
                  </View>

                  {/* Second column */}
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      marginLeft: 25,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      paddingLeft: 10,
                      paddingRight: 0,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Medium',

                        fontSize: scaleFontSize(15),
                        marginRight: horizontalScale(4),
                      }}>
                      Expires on:{' '}
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',

                        fontSize: scaleFontSize(15),
                        marginRight: horizontalScale(4),
                      }}>
                      {item.expiry_date}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            onEndReached={() => {
              // Load more data when the end of the list is reached
              // You can fetch more data here and update the state accordingly
            }}
            onEndReachedThreshold={0.1} // 10% from the end of the list
            ListFooterComponent={() => (
              <View>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : null}
              </View>
            )}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#235A8A',
          height: 50,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faLeftLong}
            style={{color: '#ffffff', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 5}}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavigation('Screen4')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <FontAwesomeIcon icon={faMaximize} style={{color: '#ffffff'}} />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Expand View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{color: '#ffffff', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Joblist;
