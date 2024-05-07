import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {Card, Button, Text, SearchBar} from '@rneui/themed';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

import {BASE_URL} from '../../env';
import styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import RNFS from 'react-native-fs';
import {
  faRightToBracket,
  faSearch,
  faLeftLong,
  faFileArrowUp,
  faBriefcase,
  faMaximize,
} from '@fortawesome/free-solid-svg-icons';
import DocumentPicker from 'react-native-document-picker';
import {
  addNewItem,
  addUserinfor,
  addUserinfor1,
  addLoginState,
  clearItems,
} from '../../redux/cvSlice.js';
import {useDispatch, useSelector} from 'react-redux';
const Uploads = ({navigation, route}) => {
  const [selectedFile, setSelectedFileName] = useState('');
  const [activityVisible, setActivityVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const user_data = useSelector(state => state.cv.loginstate);
  const dispatch = useDispatch();
  const newItems = useSelector(state => state.cv.newitems);
  const profileData = useSelector(state => state.cv.profileData);

  console.log('the newitems from the redux ', profileData[0]?.category);
  const clientCategory = profileData[0]?.category;
  const [selectedImageName, setSelectedImageName] = useState('');
  const users = [
    {
      name: 'brynn Scholascy',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    },
  ];
  // const {first_name, last_name} = route.params;
  const [isSearchExpanded, setSearchExpanded] = useState(false);
  const [selectedFiles_2, setSelectedFiles] = useState([]);
  const [selectedFiles, setSelectedFile] = useState([]);
  const handleLogout = () => {
    // Dispatch the action to clear items in the store
    dispatch(clearItems());

    // Navigate to the 'Home' screen
    navigation.navigate('Home');
  };
  useEffect(() => {
    setUserEmail(user_data);
    // console.log('the user email', userEmail);
    // setSelectedCategory(clientCategory);
  }, [userEmail]);
  const handleImportFile = async allowedTypes => {
    try {
      const result_2 = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      // console.log('File Result:', result_2);

      if (result_2 && result_2[0].name) {
        setSelectedFiles(result_2);
        setSelectedFileName(result_2[0].name);
        // console.log('the selected file ++' + selectedFiles_2);
        // setSelectedImageName(result_2[0].name);
      } else {
        Alert.alert(
          'Missing Name',
          'The selected file does not contain a name.',
        );
      }
    } catch (err) {
      Alert.alert(
        'Error',
        'Failed to pick a file, Only PDF files are allowed. Please try again.',
      );
    }
  };
  const [categories, setCategories] = useState([
    'Electrical',
    'Construction',
    'Healthuy care',
    'Agriculture',
    'Retail',
    'Finance',
    'software engineer',
    'Food Industry',
    'Managment',
    'Hospital Industry',
    'Legal',
    'Mining',
    'Education',
  ]);

  const handleImportImage = async allowedTypes => {
    try {
      const result = await DocumentPicker.pick({
        type: allowedTypes,
      });

      // console.log('Result:', result);

      if (result && result[0].name) {
        setSelectedFile(result);
        setSelectedImageName(result[0].name);
      } else {
        Alert.alert(
          'Missing Name',
          'The selected file does not contain a name.',
        );
      }
    } catch (err) {
      // Error handling remains the same
    }
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

  const handleSubmission = async () => {
    try {
      if (!selectedFiles.length || !selectedFiles_2.length) {
        Alert.alert('Missing Data', 'Please select a file and an image.');
        return;
      }
      if (!selectedCategory) {
        Alert.alert('Missing Category', 'Please select a category.');
        return;
      }
      setActivityVisible(true);

      const formData = new FormData();

      formData.append('file', {
        uri: selectedFiles_2[0].uri,
        type: selectedFiles_2[0].type,
        name: selectedFiles_2[0].name,
      });
      formData.append('image', {
        uri: selectedFiles[0].uri,
        type: selectedFiles[0].type,
        name: selectedFiles[0].name,
      });
      // console.log('the mainm manin categeory', selectedCategory);

      formData.append('email', newItems[0].email);
      formData.append('selectedCategory', selectedCategory);
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/profile.php?${randomText}=${randomValue}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const responseData = await response.json();

      // console.log('Upload response:', responseData);
      setSelectedFileName('');
      setSelectedImageName('');
      setSelectedFiles([]); // Clear selected files after submission
      setSelectedFiles([]); // Clear selected files after submission
      setActivityVisible(false);
      navigation.navigate('CV');
    } catch (error) {
      // console.error('Error:', error);
      setActivityVisible(false);

      Alert.alert(
        'Network Request Failed',
        'Failed to submit data. Please check your internet connection and try again.',
      );
    }
  };
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

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            marginTop: 0,
            paddingHorizontal: 0,
            width: '100%',
            flex: 1,
            backgroundColor: '#2D70AA',
          }}>
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
            <View style={styles.user_intial}>
              <View style={styles.circularInitials}>
                <Text style={styles.initials}>
                  {newItems[0].first_name.charAt(0)}
                  {newItems[0].last_name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.name}>
                {newItems[0].first_name} {newItems[0].last_name}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.subscriptionText_upload}>Upload CV </Text>
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
            {activityVisible ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <Card
                style={{
                  marginBottom: 12,
                  padding: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{position: 'relative', alignItems: 'center'}}>
                  <View style={styles.imageContainer_upload}>
                    <Image
                      style={styles.image}
                      resizeMode="contain"
                      source={require('../../assets/Upload.png')}
                    />
                  </View>

                  <View style={{marginVertical: 10}}>
                    <Button
                      color="#235A8A"
                      size="lg"
                      containerStyle={styles.buttonContainer_upload}
                      onPress={() =>
                        handleImportFile([
                          DocumentPicker.types.pdf,
                          DocumentPicker.types.doc,
                        ])
                      }>
                      <View style={{paddingHorizontal: 10}}>
                        <Text style={styles.buttonText_upload}>
                          Import Files
                        </Text>
                      </View>
                    </Button>
                    {selectedFile ? (
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          color: 'gray',
                          fontWeight: 'bold',
                          marginTop: 5,
                        }}>
                        {selectedFile}
                      </Text>
                    ) : null}
                  </View>

                  <View style={{marginVertical: verticalScale(13)}}>
                    <Button
                      color="#235A8A"
                      size="lg"
                      containerStyle={styles.buttonContainer_upload}
                      onPress={() =>
                        handleImportImage([DocumentPicker.types.images])
                      }>
                      <View style={{paddingHorizontal: horizontalScale(10)}}>
                        <Text style={styles.buttonText_upload}>
                          My Profile Image
                        </Text>
                      </View>
                    </Button>
                    {selectedImageName ? ( // Render only when selectedImageName is not empty
                      <Text
                        style={{
                          alignSelf: 'center', // Center the text horizontally
                          fontSize: 16,
                          color: 'gray',
                          fontWeight: 'bold',
                        }}>
                        {selectedImageName}
                      </Text>
                    ) : null}
                  </View>
                  <View style={{marginVertical: 8, marginHorizontal: 50}}>
                    <Button
                      color="#235A8A"
                      type="outline"
                      size="md"
                      containerStyle={styles.buttonContainer_upload_2}
                      onPress={handleSubmission}>
                      <View style={{paddingHorizontal: 10}}>
                        <Text style={styles.buttonText_upload}>Submit</Text>
                      </View>
                    </Button>
                  </View>
                </View>
              </Card>
            )}
          </View>
          <View style={{alignItems: 'center', marginTop: 15}}></View>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('Jobs')}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Uploads;
