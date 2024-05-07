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
} from 'react-native';
import {Card, Button, Text, SearchBar} from '@rneui/themed';

import {BASE_URL} from '../../env';
import styles from './styles';
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
  addEmployerData,
} from '../../redux/cvSlice.js';
import {useIsFocused} from '@react-navigation/native';
const JobDescription = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [modalVisible, setModalVisible] = useState(false);
  const [userDataStore, setUserData_store] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fetchedData2, setFetchedData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([
    'Electrical',
    'Construction',
    'Healthuy care',
    'Agriculture',
    'Retail',
    'Finance',
    'Food Industry',
    'Managment',
    'Hospital Industry',
    'Legal',
    'Mining',
    'Education',
  ]);
  const screenHeight = Dimensions.get('window').height;
  const [selectedPdf, setSelectedPdf] = useState({});
  const [file_name_display, setFileName] = useState('');
  const [Image_display, setImageName] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  const user_data = useSelector(state => state.cv.loginstate);
  const [filteredData, setFilteredData] = useState(profileData);
  const [filter, setFilter] = useState('All');
  const [fetchedProfileData, setFetchedProfileData] = useState([]);
  const data = [
    {label: 'All', value: 'all'},
    {label: 'Recent', value: 'recent'},
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'One Week', value: 'oneWeek'},
  ];
  useEffect(() => {
    filterData();
  }, [filter]);
  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }

  const filterData = () => {
    let filteredResult = fetchedProfileData;

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

  const [isCustomCardEmpty, setIsCustomCardEmpty] = useState(true);

  const handleLogout = () => {
    // Dispatch the action to clear items in the store
    dispatch(clearItems());

    // Navigate to the 'Home' screen
    navigation.navigate('Home');
  };
  const source_display = {
    uri: '${BASE_URL}/uploads/cv.pdf',
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

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        console.log('Selected category:', item);
        setSelectedCategory(item);
        setSearchExpanded(false);
      }}
      style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    // const {email} = route.params;
    setUserEmail(user_data);
    console.log('the email of the the emploeyr', data);
    setUserData_store(newItems_data);

    const fetchUserData = async () => {
      try {
        const randomValue = Math.floor(Math.random() * 1000);
        const randomText = generateRandomText(5);
        const response = await fetch(
          `${BASE_URL}/employer.php?email=${userEmail}&${randomText}=${randomValue}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        dispatch(addEmployerData(data));
        console.log('the data of the the emploeyr', data);
        setFetchedData(data);
        setUserData(data);
        setFetchedData2(data);

        if (Array.isArray(data) && data.length > 0) {
          // Dispatch specific properties to the Redux store
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const randomValue = Math.floor(Math.random() * 1000);
        const randomText = generateRandomText(5);
        const randomNumber = Date.now();
        const response = await fetch(
          `${BASE_URL}/emp_jobSeekers.php?random=${randomNumber}&${randomText}=${randomValue}`,
          {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const profileData = await response.json();
          console.log('the profile data', profileData);
          setFetchedProfileData(profileData);
          setProfileData(profileData);
          setSelectedPdf(profileData);

          if (profileData.length > 0) {
            const fileName = profileData[0]?.file_name;
            const imageName = profileData[0]?.image_name;
            const summaryData = profileData[0]?.summary;
            setFileName(fileName);
            setImageName(imageName);

            if (fileName !== null && fileName !== undefined) {
              setIsCustomCardEmpty(false);
            }
          }
          setFilteredData(profileData);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
    fetchProfileData();
  }, [isFocused, userEmail, navigation]);

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
    navigation.navigate('Cvdetails_emp'); // Replace 'JobSeeker' with the actual name of your screen
  };
  const CustomFilter = ({data, onSelect}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.boldText_category}>
            <Text style={styles.name_summary_bold_Category}>Filter by:</Text>{' '}
            <Text style={styles.name_summary_catergory}>{selectedFilter}</Text>
          </Text>
        </TouchableOpacity>

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
              style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
              {/* Replace the FlatList with your custom filter options */}
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item.value);
                      setSelectedFilter(item.value);
                      setModalVisible(false); // Close the modal when an item is selected
                    }}>
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#2D70AA'}}>
      <Card containerStyle={styles.cardContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Card.Image
            style={styles.image}
            source={require('../../assets/logo1.jpg')}
          />
          <Card.Title style={styles.cardTitle}>
            <Text style={{...styles.fonts}}>CV WORLD</Text>
          </Card.Title>
        </View>
      </Card>
      <View style={styles.outer_user}>
        {Array.isArray(userdata) && userdata.length > 0 ? (
          <View style={styles.user_intial}>
            <View style={styles.image_upload}>
              <View style={styles.circularInitials}>
                <Text style={styles.initials}>
                  {userdata[0]?.company_name.charAt(0)}{' '}
                </Text>
              </View>
            </View>
            <Text style={styles.name}>{userdata[0]?.company_name}</Text>
          </View>
        ) : (
          <ActivityIndicator size="small" color="#ffffff" />
        )}
      </View>
      <View>
        <Text style={styles.subscriptionText_upload}>Job Details</Text>

        <View style={{height: screenHeight - childHeight, paddingBottom: 5}}>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.customCard}>
                <View style={styles.userDetailsContainer}>
                  <View style={styles.image_upload}>
                    <View style={styles.circularInitials}>
                      {item.image_name && !isCustomCardEmpty ? (
                        <Image
                          source={{
                            uri: `/${item.image_name}`,
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
                      justifyContent: 'space-around',
                      flex: 1,
                      marginRight: 2,
                      alignItems: 'flex-start',
                    }}>
                    <Text>{item.category}</Text>
                    {/* <View
                      style={{
                        height: 20,

                        marginRight: 2,
                        marginLeft: 2,
                        borderLeftWidth: 1,
                        borderLeftColor: 'black',
                      }}></View>
                    <Text>Degree</Text> */}
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
                    <Text>Open</Text>
                    <Pressable
                      onPress={() => navigateToJobSeeker(item.username)}>
                      <Image source={require('../../assets/File.png')}></Image>
                    </Pressable>
                    <Pressable>
                      <Image source={require('../../assets/pdf.png')}></Image>
                    </Pressable>
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
              <ActivityIndicator size="large" color="#ffffff" />
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
            style={{color: '#0d0d0d', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 5}}>Back</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Jobs')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{color: '#0d0d0d', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Jobs
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={() => handleNavigation('Screen4')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <FontAwesomeIcon icon={faMaximize} style={{color: '#0d0d0d'}} />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Expand View
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{color: '#0d0d0d', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobDescription;
