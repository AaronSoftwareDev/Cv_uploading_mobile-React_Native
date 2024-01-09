import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Linking,
  FlatList,
} from 'react-native';
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
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';

import {addNewItem, addUserinfor, addUserinfor1} from '../../redux/cvSlice.js';

const CV = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fetchedData2, setFetchedData2] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([
    'Category1',
    'Category2',
    'Category3',
    'Category4',
  ]);

  const [selectedPdf, setSelectedPdf] = useState({});
  const [file_name_display, setFileName] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  // console.log('the newitems from the redux ', newItems_data);
  // var isCustomCardEmpty = true;
  const [isCustomCardEmpty, setIsCustomCardEmpty] = useState(true);
  const source_display = {
    uri: 'http://172.20.10.8/CV_WORLD_APP/cv_world/Database/uploads/cv.pdf',
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
        setSearchExpanded(false);
      }}
      style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const {email} = route.params;
    setUserEmail(email ?? newItems_data[0]?.email);

    // Fetch user information
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://172.20.10.8/CV_WORLD_APP/cv_world/Database/getInfor.php?email=${userEmail}`,
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
        console.error('Error fetching data:', error);
      }
    };

    // Fetch profile information
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `http://172.20.10.8/CV_WORLD_APP/cv_world/Database/fetchprofile.php?email=${userEmail}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const profileData = await response.json();
          console.log('Profile data:', profileData);

          setSelectedPdf(profileData[0]);

          if (profileData.length > 0) {
            const fileName = profileData[0]?.file_name;
            console.log('file name' + fileName);
            setFileName(fileName);

            if (fileName !== null && fileName !== undefined) {
              setIsCustomCardEmpty(false);
            }
          }
        } else {
          // Handle non-JSON responses
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
    fetchProfileData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params, userEmail, dispatch]); // Only include route.params and dispatch in the dependency array

  const UploadCVScreen = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.8/CV_WORLD_APP/cv_world/Database/getInfor.php?email=${userEmail}`,
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Card.Image
            style={styles.image}
            source={require('../../assets/logo1.jpg')}
          />
          <Card.Title style={styles.cardTitle}>
            <Text style={{...styles.fonts, fontSize: 14, fontWeight: '600'}}>
              CV WORLD
            </Text>
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
        <Text style={styles.subscriptionText_upload}>My CV</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => setSearchExpanded(!isSearchExpanded)}
            style={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} size={16} />
          </TouchableOpacity>
          <View style={{flex: 1}}>
            {isSearchExpanded && (
              <View style={styles.searchBarContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Type Here..."
                  placeholderTextColor="#ffffff"
                  onChangeText={handleSearchTextChange}
                  onFocus={() => setSearchExpanded(true)} // Set isSearchExpanded to true when the TextInput is focused
                  onBlur={() => setSearchExpanded(false)} // Set isSearchExpanded to false when the TextInput loses focus
                />
                {searchText.length > 0 &&
                  isSearchExpanded && ( // Only display categories when there is text in the search input
                    <View style={styles.flatListContainer}>
                      <FlatList
                        data={filteredCategories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  )}
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
                        <Text style={styles.initials}>
                          {userData.first_name.charAt(0)}{' '}
                          {userData.last_name.charAt(0)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.nameColumn}>
                      <Text style={styles.boldText}>
                        <Text style={styles.name_summary_bold}>Name:</Text>{' '}
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
            <View
              style={{
                width: 295,
                height: 170,
                left: 7,
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                overflow: 'hidden', // To ensure border-radius is applied properly
              }}>
              <Pdf
                source={{
                  uri: `http://172.20.10.8/CV_WORLD_APP/cv_world/Database/uploads/${file_name_display}`,
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
                style={{flex: 1, width: '100%', height: '100%'}}
              />
            </View>
          )}
        </View>

        <Text style={styles.totalViews}>Total Views: 0</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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

export default CV;
