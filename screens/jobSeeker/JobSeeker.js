import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Linking,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Card, Button, Text, SearchBar} from '@rneui/themed';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

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
  clearItems,
  clearItems4,
  clearItems3,
} from '../../redux/cvSlice.js';
import {BASE_URL} from '../../env';

const JobSeeker = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fetchedData2, setFetchedData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([
    'Electrical',
    'Construction',
    'Healthy care',
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
  // const [selectedPdf, setSelectedPdf] = useState({});
  const [file_name_display, setFileName] = useState('');
  const [Image_display, setImageName] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems2[0]);
  const viewUser = useSelector(state => state.cv.jobseeker);
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  // Set the height of the container view to a percentage of the window height
  const containerHeight = windowHeight * 0.8;
  const handleLogout = () => {
    // Dispatch the action to clear items in the store
    dispatch(clearItems());

    // Navigate to the 'Home' screen
    navigation.navigate('Home');
  };

  const handlePdfPress = () => {
    setIsPdfVisible(true);
  };

  const handleClosePdf = () => {
    setIsPdfVisible(false);
  };
  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }

  const [isCustomCardEmpty, setIsCustomCardEmpty] = useState(true);

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchText.toLowerCase()),
  );
  const handleSearchTextChange = text => {
    setSearchText(text);
    setSearchExpanded(true);
  };

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedCategory(item);
        setSearchExpanded(false);
      }}
      style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    // const {email} = route.params;
    setUserEmail(viewUser[0]);

    const fetchProfileData = async () => {
      console.log('fetching profile based on email', userEmail);
      try {
        const randomValue = Math.floor(Math.random() * 1000); // Adjust the
        const randomText = generateRandomText(5);
        const response = await fetch(
          `${BASE_URL}/fetchprofile.php?email=${userEmail}&${randomText}=${randomValue}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const profileData = await response.json();
        // console.log('Profile data hello:', profileData);
        const contentType = response.headers.get('content-type');

        // dispatch(addNewItem(profileData));
        setFetchedData(profileData);
        setUserData(profileData);
        setFetchedData2(profileData);

        // setSelectedPdf(profileData[0]);

        if (profileData.length > 0) {
          // console.log('this is the profile data ', profileData);
          const fileName = profileData[0]?.file_name;
          const imageName = profileData[0]?.image_name;
          const clientCategory = profileData[0]?.category;
          const clientSummary = profileData[0]?.Summary;
          const reviewstatus = profileData[0]?.review_status;
          // console.log('file name' + fileName);
          setFileName(fileName);
          setImageName(imageName);
          setSelectedCategory(clientCategory);
          setSummaryText(clientSummary);

          // console.log('profile image ', Image_display);

          if (fileName !== null && fileName !== undefined) {
            setIsCustomCardEmpty(false);
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    // fetchUserData();
    fetchProfileData();
  }, [route.params, userEmail]); // Only include route.params and dispatch in the dependency array

  const UploadCVScreen = async () => {
    try {
      const randomValue = Math.floor(Math.random() * 1000); // Adjust the
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/getInfor.php?email=${userEmail}&${randomText}=${randomValue}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('the data', data);
      if (data.length > 0) {
        const userData = data[0];
        const {first_name, last_name} = userData;

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

  const updateCategory = async () => {
    console.log('the new category', selectedCategory);
    console.log('the new email', userEmail);
    console.log('the new email2', newItems_data[0].email);
    const paraCategory = selectedCategory;
    try {
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/catergoryUpdateAgent.php?email=${userEmail}&category=${selectedCategory}&newItemsEmail=${newItems_data[0].email}&${randomText}=${randomValue}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        setProfileData(data);
        dispatch(clearItems4());
        dispatch(clearItems3());
        navigation.navigate('CV_agent', {paraCategory});
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleGoBack = () => {
    dispatch(clearItems3()); // Dispatch clearItems action
    navigation.goBack();
  };

  // if (selectedCategory && userEmail) {
  //   updateCategory();
  // }

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
                fontSize: scaleFontSize(22),
                fontWeight: '600',
                color: '#235A8A',
              }}>
              CV WORLD
            </Text>
          </Card.Title>
        </View>
      </Card>
      <View style={styles.outer_user}>
        {Array.isArray(newItems_data) && newItems_data.length > 0 ? (
          <View style={styles.user_intial}>
            <View style={styles.image_upload}>
              <View style={styles.circularInitials}>
                <Text style={styles.initials}>
                  {newItems_data.length > 0
                    ? `${newItems_data[0]?.first_name.charAt(
                        0,
                      )} ${newItems_data[0]?.last_name.charAt(0)}`
                    : 'No data available'}
                </Text>
              </View>
            </View>
            <Text style={styles.name}>
              {newItems_data && newItems_data.length > 0
                ? `${newItems_data[0]?.first_name} ${newItems_data[0]?.last_name}`
                : 'No user data available'}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
      </View>
      <View>
        <Text style={styles.subscriptionText_upload}> Job Seeker's CV</Text>
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
          <View style={styles.updateButton}>
            <Button
              radius={10}
              color="#235A8A"
              style={{
                fontFamily: 'RobotoSlab-Regular',
                backgroundColor: '#235A8A',
                borderRadius: 15,

                alignSelf: 'center',
              }}
              title="Update"
              onPress={() => updateCategory()}
            />
          </View>
        </View>
        <View style={styles.customCard}>
          <View style={styles.user_summary}>
            <View style={styles.user_intial_summary}>
              {Array.isArray(userdata) && userdata.length > 0 ? (
                <View style={styles.userDetailsContainer}>
                  <View style={styles.image_upload}>
                    <View style={styles.circularInitials}>
                      {Image_display && !isCustomCardEmpty ? ( // Check if profileImage is available
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
                            {userdata[0]?.first_name.charAt(0)}{' '}
                            {userdata[0]?.last_name.charAt(0)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.nameColumn}>
                    <Text style={styles.boldText}>
                      <Text style={styles.name_summary_bold}>Name:</Text>{' '}
                      <Text style={styles.name_summary}>
                        {userdata[0]?.first_name} {userdata[0]?.last_name}
                      </Text>
                    </Text>

                    <Text style={styles.boldText}>
                      Summary:{' '}
                      <Text style={[styles.name_summary, styles.summaryText]}>
                        {summaryText}
                      </Text>
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <ActivityIndicator size="large" color="#235A8A" />
                  <Text
                    style={{
                      color: '#235A8A',
                      fontFamily: 'RobotoSlab-Light',
                      fontSize: scaleFontSize(18),
                    }}>
                    {' '}
                    Loading CV...{' '}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={handlePdfPress}>
            <View
              style={{
                width: '95%',
                height: containerHeight,
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                overflow: 'hidden', // To ensure border-radius is applied properly
              }}>
              {file_name_display ? (
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: `${BASE_URL}/uploads/${file_name_display}`,
                    cache: true,
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                  }}
                  onError={error => {
                    console.error('PDF error:', error);
                  }}
                  style={{flex: 1}}
                  scale={1}
                />
              ) : (
                <View style={{alignContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#235A8A" />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal for PDF Viewer */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={isPdfVisible}
          onRequestClose={handleClosePdf}>
          <View style={{flex: 1}}>
            {file_name_display ? (
              <>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: `${BASE_URL}/uploads/${file_name_display}`,
                    cache: true,
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                  }}
                  onError={error => {
                    console.error(error);
                  }}
                  style={{flex: 1}}
                />
                <Button
                  title="Close"
                  onPress={handleClosePdf}
                  containerStyle={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                  }}
                />
              </>
            ) : (
              <Text>No file selected</Text>
            )}
          </View>
        </Modal>
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
        <TouchableOpacity onPress={handleGoBack}>
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

export default JobSeeker;
