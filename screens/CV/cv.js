import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Linking,
  FlatList,
  Pressable,
  ActivityIndicator,
  Modal,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
import {Card, Button, Text, SearchBar} from '@rneui/themed';

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
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL} from '../../env';

import {
  addNewItem,
  addUserinfor,
  addUserinfor1,
  addLoginState,
  clearItems,
  clearItems2,
  addNewProfileData,
} from '../../redux/cvSlice.js';
import {useIsFocused} from '@react-navigation/native';
const CV = ({navigation, route}) => {
  const [lastPress, setLastPress] = useState(0);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const windowHeight = Dimensions.get('window').height;

  // Set the height of the container view to a percentage of the window height
  const containerHeight = windowHeight * 0.8;

  const [userEmail, setUserEmail] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fetchedData2, setFetchedData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const user_data = useSelector(state => state.cv.loginstate);
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
    'software engineer',
    'Legal',
    'Mining',
    'Education',
  ]);

  const [selectedPdf, setSelectedPdf] = useState({});
  const [file_name_display, setFileName] = useState('');
  const [Image_display, setImageName] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);
  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }

  const handleLogout = () => {
    // Dispatch the action to clear items in the store
    dispatch(clearItems());

    // Navigate to the 'Home' screen
    navigation.navigate('Home');
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const saveSummary = () => {
    // Add logic to save the entered summary
    setIsModalVisible(false);
  };

  const handlePdfPress = () => {
    const currentTime = new Date().getTime();
    const delay = 200; // Adjust the delay according to your preference (in milliseconds)
    if (currentTime - lastPress <= delay) {
      // Double-click action
      // console.log('Double-click detected');
      // Add your double-click logic here
    } else {
      // Single-click action
      // console.log('Single-click detected');
      // Add your single-click logic here
    }
    setIsPdfVisible(true);
  };

  const handleClosePdf = () => {
    setIsPdfVisible(false);
  };

  const [isCustomCardEmpty, setIsCustomCardEmpty] = useState(true);

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchText.toLowerCase()),
  );
  const handleSearchTextChange = text => {
    setSearchText(text);
    setSearchExpanded(true);
    // console.log('this is the search text', searchText);
  };

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

  useEffect(() => {
    setUserEmail(user_data);

    if (isFocused) {
      const fetchUserData = async () => {
        try {
          const randomValue = Math.floor(Math.random() * 1000);
          const randomText = generateRandomText(5);
          const response = await fetch(
            `${BASE_URL}/getInforCV.php?email=${userEmail}&${randomText}=${randomValue}`,
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          // console.log('User details:', data);

          dispatch(addNewItem(data));
          setFetchedData(data);
          setUserData(data);
          setFetchedData2(data);

          if (Array.isArray(data) && data.length > 0) {
            // const userData = data;
            // Dispatch specific properties to the Redux store
            // dispatch(addNewItem(userData));
          }
        } catch (error) {
          // console.error('Error fetching data:', error);
        }
      };

      // Fetch profile information
      const fetchProfileData = async () => {
        try {
          const randomValue = Math.floor(Math.random() * 1000); // Adjust the
          const randomText = generateRandomText(5);
          const response = await fetch(
            `${BASE_URL}/fetchprofile.php?email=${userEmail}&${randomText}=${randomValue}`,
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const profileData = await response.json();
            console.log('Profile data:', profileData);
            dispatch(addNewProfileData(profileData));
            // setSelectedPdf(profileData[0]);

            if (profileData.length > 0) {
              // console.log('this is the profile data ', profileData);
              const fileName = profileData[0]?.file_name;
              const imageName = profileData[0]?.image_name;
              const clientCategory = profileData[0]?.category;
              const clientSummary = profileData[0]?.Summary;
              // console.log('this is the file name' + fileName);
              setFileName(fileName);
              setImageName(imageName);
              setSelectedCategory(clientCategory);
              setSummaryText(clientSummary);
              // setSearchText

              // console.log('profile image ', Image_display);

              if (fileName !== null && fileName !== undefined) {
                setIsCustomCardEmpty(false);
              }
            }
          } else {
            // Handle non-JSON responses
            // console.error('Unexpected response format:', response);
          }
        } catch (error) {
          // console.error('Error fetching profile data:', error);
          // Alert.alert('CV upload', ' Would you like to upload your CV?', [
          //   {
          //     text: 'No',
          //     style: 'cancel',
          //   },
          //   {
          //     text: 'Yes',
          //     onPress: () => {
          //       // Navigate to the screen where the user can upload their CV
          //       navigation.navigate('Upload');
          //     },
          //   },
          // ]);
        }
      };

      fetchUserData();
      fetchProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, userEmail, navigation, route.params]); // Only include route.params and dispatch in the dependency array
  //[route.params, userEmail, dispatch]
  const UploadCVScreen = async () => {
    try {
      const randomValue = Math.floor(Math.random() * 1000); // Adjust the
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/getInforCV.php?email=${userEmail}&${randomText}=${randomValue}`,
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
        // console.warn('No user data available for upload');
      }
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const handleNavigation = screenName => {
    navigation.navigate(screenName);
  };
  useEffect(() => {
    const updateSummary = async () => {
      // console.log('this is the summary', summaryText);
      try {
        const randomValue = Math.floor(Math.random() * 1000); // Adjust the
        const randomText = generateRandomText(5);

        // Fetch data using selectedCategory and userEmail
        const response = await fetch(
          `${BASE_URL}/updatesummary.php?email=${userEmail}&summary=${summaryText}&${randomText}=${randomValue}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          // console.log('Fetched data:', data);

          // Update state or do something with the fetched data
          setProfileData(data);
        } else {
          // Handle non-JSON responses
          // console.error('Unexpected response format:', response);
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    // Call fetchData when selectedCategory changes
    if (summaryText && userEmail) {
      updateSummary();
    }
  }, [summaryText]);

  useEffect(() => {
    const updateCategory = async () => {
      try {
        const randomValue = Math.floor(Math.random() * 1000);
        const randomText = generateRandomText(5);

        const response = await fetch(
          `${BASE_URL}/updatecategory.php?email=${userEmail}&category=${selectedCategory}&${randomText}=${randomValue}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          // console.log('Fetched data:', data);

          // Update state or do something with the fetched data
          setProfileData(data);
        } else {
          // Handle non-JSON responses
          // console.error('Unexpected response format:', response);
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    // Call fetchData when selectedCategory changes
    if (selectedCategory && userEmail) {
      updateCategory();
    }
  }, [selectedCategory]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#2D70AA'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                  CV WORLD{' '}
                </Text>
              </Card.Title>
            </View>
          </Card>
          <View style={styles.outer_user}>
            {Array.isArray(fetchedData) &&
            fetchedData.length > 0 &&
            Array.isArray(userdata) &&
            userdata.length > 0 ? (
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
                  {userdata[0]?.first_name} {userdata[0]?.last_name}
                </Text>
              </View>
            ) : (
              // Render something else or nothing if the arrays are empty
              <ActivityIndicator size="small" color="#ffffff" />
            )}
          </View>
          <View>
            <Text style={styles.subscriptionText_upload}>
              My Curriculum Vitae
            </Text>
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
                      <View>
                        <View style={styles.flatListContainer}>
                          <FlatList
                            data={filteredCategories}
                            renderItem={renderCategoryItem}
                            keyExtractor={(item, index) => index.toString()}
                          />
                        </View>
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
                  onPress={() => {
                    dispatch(clearItems2());
                    navigation.navigate('Upload');
                  }}
                />
              </View>
            </View>
            <View style={styles.customCard}>
              <View style={styles.user_summary}>
                <View style={styles.user_intial_summary}>
                  {Array.isArray(fetchedData2) && fetchedData2.length > 0 ? (
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
                                {userdata[0]?.first_name.charAt(0)}
                                {userdata[0]?.last_name.charAt(0)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.nameColumn}>
                        <View
                          style={{
                            marginLeft: 0,
                            paddingLeft: horizontalScale(10),
                          }}>
                          <Text style={styles.boldText}>
                            <Text style={styles.name_summary_bold}>Name:</Text>{' '}
                            <Text style={styles.name_summary}>
                              {userdata[0]?.first_name} {userdata[0]?.last_name}
                            </Text>
                          </Text>
                        </View>

                        <View
                          style={{
                            marginLeft: 0,
                            paddingLeft: horizontalScale(10),
                          }}>
                          {summaryText ? (
                            <>
                              <View
                                style={{
                                  flexDirection: 'row',
                                }}>
                                <View style={{marginTop: 6}}>
                                  <Text
                                    style={[
                                      styles.name_summary,
                                      styles.summaryText,
                                    ]}>
                                    <Text style={styles.boldText}>
                                      Summary:
                                    </Text>{' '}
                                    <Text style={{}}>{summaryText}</Text>
                                  </Text>
                                </View>
                                <View style={{size: 8}}>
                                  <TouchableOpacity onPress={openModal}>
                                    <View style={styles.editButton}>
                                      {/* Add your icon or text for editing */}
                                      {/* <Text>Edit</Text> */}

                                      <FontAwesomeIcon
                                        icon={faPencil}
                                        style={{
                                          color: '#235A8A',
                                          fontSize: 8,
                                          marginTop: 4,
                                          marginBottom: 10,
                                        }}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </>
                          ) : (
                            <TouchableOpacity onPress={openModal}>
                              <View style={styles.addButton}>
                                {/* Add your icon or text for adding summary */}
                                <Text style={styles.summaryText}>
                                  Add Summary
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                        {/* Modal for entering summary */}
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={isModalVisible}
                          onRequestClose={closeModal}>
                          <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                              <TextInput
                                style={styles.summaryInput}
                                placeholder="maximum of 100 charecters"
                                maxLength={100}
                                onChangeText={text => setSummaryText(text)}
                              />
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignContent: 'flex-end',
                                  justifyContent: 'flex-end',
                                }}>
                                <TouchableOpacity
                                  onPress={saveSummary}
                                  style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <View style={styles.saveButton}>
                                    <Text style={{color: 'white'}}>Save</Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={closeModal}
                                  style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <View style={styles.closeButton}>
                                    <Text style={{color: 'white'}}>Close</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      </View>
                    </View>
                  ) : (
                    <ActivityIndicator size="large" color="#ffffff" />
                  )}
                </View>
              </View>
            </View>
            <View>
              {isCustomCardEmpty ? (
                <Button
                  title={'Upload CV'}
                  containerStyle={{
                    width: horizontalScale(200),
                    marginHorizontal: horizontalScale(50),
                    marginVertical: verticalScale(10),
                    alignSelf: 'center',
                    borderColor: '#235A8A',
                    borderWidth: 1,
                  }}
                  onPress={UploadCVScreen}
                />
              ) : (
                <Pressable onPress={handlePdfPress} onLongPress={() => {}}>
                  <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View
                      style={{
                        flex: 1,
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
                            // console.log(`number of pages: ${numberOfPages}`);
                          }}
                          onPageChanged={(page, numberOfPages) => {
                            // console.log(`current page: ${page}`);
                          }}
                          onError={error => {
                            // console.error(error);
                          }}
                          style={{flex: 1}}
                          scale={1}
                        />
                      ) : (
                        <Text>No PDF available</Text>
                        // You can replace this with your desired placeholder or message
                      )}
                    </View>
                  </ScrollView>
                </Pressable>
              )}
            </View>

            {/* Modal for PDF Viewer */}
            <Modal
              animationType="slide"
              transparent={false}
              visible={isPdfVisible}
              onRequestClose={handleClosePdf}>
              <View style={{flex: 1}}>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: `${BASE_URL}/uploads/${file_name_display}`,
                    cache: true,
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    // console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    // console.log(`current page: ${page}`);
                  }}
                  onError={error => {
                    // console.error(error);
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
              </View>
            </Modal>
            {/* <View>
              <Text style={styles.totalViews}>Total Views: 0</Text>
            </View> */}
          </View>
        </ScrollView>
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
            onPress={() => navigation.navigate('Joblist')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <FontAwesomeIcon
              icon={faBriefcase}
              style={{color: '#ffffff', marginLeft: 6}}
            />
            <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
              Jobs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
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
    </SafeAreaView>
  );
};

export default CV;
