import React, {useState, useEffect, useMemo, memo} from 'react';
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
  VirtualizedList,
} from 'react-native';
import {Card, Button, Text, SearchBar} from '@rneui/themed';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
import {BASE_URL} from '../../env';
import {Picker} from '@react-native-picker/picker';
import ModalSelector from 'react-native-modal-selector';

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
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';

import {
  addNewItem,
  addUserinfor,
  addUserinfor1,
  addJobSeeker,
  addLoginState,
  clearItems,
  addNewItem2,
} from '../../redux/cvSlice.js';

const CV_agent = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('All');

  const [userEmail, setUserEmail] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [paraCategorySelected, setparamterCategory] = useState('');

  const [userDataStore, setUserData_store] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fetchedData2, setFetchedData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([
    'Electrical',
    'Software Developer',
    'Accountancy',
  ]);
  const screenHeight = Dimensions.get('window').height;
  const [selectedPdf, setSelectedPdf] = useState({});
  const [file_name_display, setFileName] = useState('');
  const [Image_display, setImageName] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  const user_data = useSelector(state => state.cv.loginstate);
  const [fetchedProfileData, setFetchedProfileData] = useState([]);
  const handleNavigation2 = item => {
    const {agent_email, username} = item;
    // Check if agent_email exists and matches user_data email
    if (agent_email === user_data) {
      console.log('the username', username);
      navigateToJobSeeker(username);
    } else if (agent_email === '') {
      console.log('the username', username);
      navigateToJobSeeker(username);
    } else {
      // Show an alert indicating that it's locked
      alert('Under review by  another agent');
    }
  };

  const data = [
    {label: 'All', value: 'all'},
    {label: 'Recent', value: 'recent'},
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'One Week', value: 'oneWeek'},
  ];

  const CustomFilter = ({data, onSelect}) => {
    return (
      <View>
        <Text style={styles.boldText_category}>
          <Text style={styles.name_summary_bold_Category}>Filter by:</Text>{' '}
          <Text style={styles.name_summary_catergory}>{selectedFilter}</Text>
        </Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#3C6991',
                padding: 30,
                borderRadius: 10,
                width: '70%',
                height: '40%',
                marginTop: '20%',
              }}>
              {/* Replace the FlatList with your custom filter options */}
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <Pressable
                    style={{
                      backgroundColor: '##3C6991',
                      padding: 10,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      onSelect(item.value);
                      setSelectedFilter(item.value);
                      setModalVisible(false); // Close the modal when an item is selected
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',

                        marginTop: 2,
                      }}>
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  borderColor: 'white',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                }}>
                <Text
                  style={{color: '#ffffff', alignSelf: 'center', padding: 5}}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  // console.log('isModalVisible:', isModalVisible);
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
  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        // console.log('Selected category:', item);
        setSelectedCategory(item);
        setSearchExpanded(false);
      }}
      style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );
  //====================================================================
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/emp_jobSeekers.php?${randomText}=${randomValue}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const profileData = await response.json();

        setFetchedProfileData(profileData);
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
      setIsLoading(false);
    }
  };
  //=======================================================================
  const fetchUserData = async () => {
    const randomValue = Math.floor(Math.random() * 1000);
    const randomText = generateRandomText(5);
    try {
      const response = await fetch(
        `${BASE_URL}/agent.php?email=${userEmail}&${randomText}=${randomValue}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0 &&
        !data.some(
          item => item.message === 'No user data found for the provided email',
        )
      ) {
        dispatch(addNewItem2(data));
      } else {
        console.log('No user data found for the provided email');
      }

      setFetchedData(data);
      setUserData(data);
      setFetchedData2(data);
      // console.log('agent infor', data);

      if (Array.isArray(data) && data.length > 0) {
        // Dispatch specific properties to the Redux store
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //=====================================================================
  const filterData = () => {
    let filteredResult = fetchedProfileData;
    // console.log('the fetchedProfileData data,', fetchedProfileData);

    switch (filter) {
      case 'recent':
        filteredResult = fetchedProfileData.filter(
          item =>
            new Date(item.upload_date).toDateString() ===
            new Date().toDateString(),
        );
        break;
      case 'today':
        filteredResult = fetchedProfileData.filter(
          item =>
            new Date(item.upload_date).toDateString() ===
            new Date().toDateString(),
        );
        break;
      case 'yesterday':
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        filteredResult = fetchedProfileData.filter(
          item =>
            new Date(item.upload_date).toDateString() ===
            yesterday.toDateString(),
        );
        break;
      case 'oneWeek':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredResult = fetchedProfileData.filter(
          item => new Date(item.upload_date) >= oneWeekAgo,
        );
        break;
      default:
        filteredResult = fetchedProfileData;
    }

    setFilteredData(filteredResult);
  };
  //=====================================================================
  useEffect(() => {
    // const {email} = route.params;
    setUserEmail(user_data);
    setUserData_store(newItems_data);

    fetchUserData();
    fetchProfileData();
  }, [route.params, userEmail, dispatch, paraCategorySelected]);
  //==============================================================
  // useEffect(() => {
  //   console.log('route paramert', route.params.paraCategory);
  //   if (route.params && route.params.paraCategory) {
  //     fetchProfileData();
  //     fetchUserData();
  //     setparamterCategory(route.params.paraCategory);
  //   }
  // }, []);
  //===============================================================
  useEffect(() => {
    if (fetchedProfileData.length > 0) {
      filterData();
    }
  }, [filter, fetchedProfileData, paraCategorySelected]);

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
    navigation.navigate('JobSeeker'); // Replace 'JobSeeker' with the actual name of your screen
  };

  useEffect(() => {
    filterData();
  }, [filter]);

  //===========================================================
  // useEffect(() => {
  //   fetchProfileData();
  //   filterData();
  // }, []);
  //===========================================================
  // const filteredItems = useMemo(() => {
  //   return filteredData?.filter(item => {
  //     return (
  //       item.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
  //       item.last_name.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   });
  // }, [filteredData, searchText]);
  //=============================================================

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
        {Array.isArray(userdata) && userdata.length > 0 ? (
          <View style={styles.user_intial}>
            <View style={styles.image_upload}>
              <View style={styles.circularInitials}>
                <Text style={styles.initials}>
                  {userdata[0]?.first_name.charAt(0)}
                  {userdata[0]?.last_name.charAt(0)}
                </Text>
              </View>
            </View>
            <Text style={styles.name}>
              {userdata[0]?.first_name} {''}
              {userdata[0]?.last_name}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="small" color="#ffffff" />
        )}
      </View>
      <View>
        <Text style={styles.subscriptionText_upload}>CVs for Job Seekers</Text>
        <View style={{flexDirection: 'column', backgroundColor: '#5188B6'}}>
          <View style={styles.searchContainerFilter}>
            <View
              style={{
                backgroundColor: '#235A8A',
                width: horizontalScale(20),
                height: verticalScale(20),

                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                marginRight: horizontalScale(2),
              }}>
              <Pressable onPress={() => setModalVisible(true)}>
                <FontAwesomeIcon
                  icon={faFilter}
                  size={14}
                  style={{marginRight: horizontalScale(2)}}
                />
              </Pressable>
            </View>
            <CustomFilter data={data} onSelect={value => setFilter(value)} />
          </View>
        </View>
        <View
          style={{
            height: screenHeight - childHeight,
            paddingBottom: '10%',
            padding: 5,
          }}>
          <VirtualizedList
            data={filteredData}
            getItemCount={() => filteredData.length} // Function to get the length of the data
            getItem={(data, index) => data[index]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.customCard}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.userDetailsContainer}>
                    <View style={styles.image_upload}>
                      <View style={styles.circularInitials}>
                        {item.image_name && !isCustomCardEmpty ? (
                          <Image
                            source={{
                              uri: `${BASE_URL}/uploads/${item.image_name}`,
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
                              {item.first_name.charAt(0)}{' '}
                              {item.last_name.charAt(0)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View style={styles.nameColumn}>
                      <Text style={styles.boldText}>
                        <Text style={styles.name_summary_bold}>Name:</Text>{' '}
                        <Text style={styles.name_summary}>
                          {item.first_name} {item.last_name}
                        </Text>
                      </Text>

                      <Text style={styles.boldText}>
                        Summary:{' '}
                        <Text style={[styles.name_summary, styles.summaryText]}>
                          {item.Summary}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        color: '#2D70AA',
                        fontSize: scaleFontSize(14),
                        fontWeight: '700',
                        padding: 4,
                      }}>
                      {item.review_status !== 'Viewed'
                        ? 'Pending'
                        : item.review_status}
                    </Text>
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
                    <Text>
                      <Text style={styles.name_summary_bold_Category_selected}>
                        Category:{' '}
                      </Text>
                      {item.category}
                    </Text>
                  </View>

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
                    <TouchableOpacity
                      onPress={() => handleNavigation2(item)}
                      style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: 'RobotoSlab-Light',
                          fontSize: scaleFontSize(18),
                        }}>
                        Open
                      </Text>
                      <Image source={require('../../assets/File.png')} />
                      <Image source={require('../../assets/pdf.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            onEndReached={() => {}}
            onEndReachedThreshold={0.1}
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
          backgroundColor: '#3C6991',
          height: 50,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faLeftLong}
            style={{color: '#ffffff', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 5}}>Back</Text>
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

export default CV_agent;
