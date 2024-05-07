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
  clearItems,
} from '../../redux/cvSlice.js';

const JobSeeker_agent = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fetchedData2, setFetchedData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([
    'Electrical',
    'Software Developer',
    'Accountancy',
  ]);

  const [selectedPdf, setSelectedPdf] = useState({});
  const [file_name_display, setFileName] = useState('');
  const [Image_display, setImageName] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  const viewUser = useSelector(state => state.cv.jobseeker);
  const [isPdfVisible, setIsPdfVisible] = useState(false);
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
  // consol
  // console.log('the newitems from the redux ', newItems_data);
  // var isCustomCardEmpty = true;
  const [isCustomCardEmpty, setIsCustomCardEmpty] = useState(true);
  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }
  const source_display = {
    uri: '',
    cache: true,
  };
  // console.log('this is the url again', source_display.uri);
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
    setUserEmail(viewUser[0]);
    console.log('the email', userEmail);

    const fetchProfileData = async () => {
      try {
        const randomValue = Math.floor(Math.random() * 1000);
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

        dispatch(addNewItem(profileData));
        setFetchedData(profileData);
        setUserData(profileData);
        setFetchedData2(profileData);

        setSelectedPdf(profileData[0]);

        if (profileData.length > 0) {
          console.log('this is the profile data ', profileData);
          const fileName = profileData[0]?.file_name;
          const imageName = profileData[0]?.image_name;
          console.log('file name' + fileName);
          setFileName(fileName);
          setImageName(imageName);
          console.log('profile image ', file_name_display);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params, userEmail, dispatch]); // Only include route.params and dispatch in the dependency array

  const UploadCVScreen = async () => {
    try {
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/getInfor.php?email=${userEmail}&${randomText}=${randomValue}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('the data', data);
      if (Array.isArray(data) && data.length > 0) {
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

  return (
    <View style={{flex: 1, backgroundColor: '#2D70AA'}}>
      <Card containerStyle={styles.cardContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
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
        {Array.isArray(fetchedData) && fetchedData.length > 0 ? (
          userdata.map((userData, i) => (
            <View key={i} style={styles.user_intial}>
              <View style={styles.image_upload}>
                <View style={styles.circularInitials}>
                  <Text style={styles.initials}>
                    {userData.first_name.charAt(0)}{' '}
                    {userData.last_name.charAt(0)}
                  </Text>
                </View>
              </View>
              <Text style={styles.name}>
                {userData.first_name} {userData.last_name}
              </Text>
            </View>
          ))
        ) : (
          <Text>No user data available</Text>
        )}
      </View>
      <View>
        <Text style={styles.subscriptionText_upload}>My CV </Text>
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
              <View>
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
              style={{backgroundColor: '#235A8A', borderRadius: 15}}
              title="Update"
              onPress={() => navigation.navigate('Upload')}
            />
          </View>
        </View>
        <View style={styles.customCard}>
          <View style={styles.user_summary}>
            <View style={styles.user_intial_summary}>
              {Array.isArray(fetchedData2) && fetchedData2.length > 0 ? (
                userdata.map((userData, i) => (
                  <View key={i} style={styles.userDetailsContainer}>
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
                              {userData.first_name.charAt(0)}{' '}
                              {userData.last_name.charAt(0)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View style={styles.nameColumn}>
                      <Text style={styles.boldText}>
                        <Text style={styles.name_summary_bold}>Name:</Text>
                        <Text style={styles.name_summary}>
                          {userData.first_name} {userData.last_name}
                        </Text>
                      </Text>

                      <Text style={styles.boldText}>
                        Summary:{' '}
                        <Text
                          style={[
                            styles.name_summary,
                            styles.summaryText,
                          ]}></Text>
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>No user data available</Text>
              )}
            </View>
          </View>
        </View>
        <View>
          {isCustomCardEmpty ? (
            <Button
              title={'Upload Cv'}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={UploadCVScreen}
            />
          ) : (
            <TouchableOpacity onPress={handlePdfPress}>
              <View
                style={{
                  width: '95%',
                  height: '80%',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: 5,
                  backgroundColor: '#F5F5F5',
                  overflow: 'hidden', // To ensure border-radius is applied properly
                }}>
                {file_name_display ? (
                  <Pdf
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
                ) : (
                  <Text>No file available</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
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
          ;
        </Modal>

        {/* <Text style={styles.totalViews}>Total Views: 0</Text> */}
      </View>

      {/* Bottom Navigation */}

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
          onPress={() => navigation.navigate('Upload', {first_name, last_name})}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <FontAwesomeIcon icon={faFileArrowUp} style={{color: '#0d0d0d'}} />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Upload CV
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
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
        </TouchableOpacity>

        <TouchableOpacity
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
        </TouchableOpacity>
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

export default JobSeeker_agent;
