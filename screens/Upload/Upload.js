import React, {useState} from 'react';
import {View, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import {Card, Button, Text, SearchBar} from '@rneui/themed';
import styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';

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

const Uploads = ({navigation, route}) => {
  const [selectedFile, setSelectedFileName] = useState('');
  const newItems = useSelector(state => state.cv.newitems);
  console.log('the newitems from the redux ', newItems);
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

  const handleImportFile = async allowedTypes => {
    try {
      const result_2 = await DocumentPicker.pick({
        type: allowedTypes,
      });

      console.log('File Result:', result_2);

      if (result_2 && result_2[0].name) {
        setSelectedFiles(result_2);
        setSelectedFileName(result_2[0].name);
        console.log('the selected file ++' + selectedFiles_2);
        // setSelectedImageName(result_2[0].name);
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

  const handleImportImage = async allowedTypes => {
    try {
      const result = await DocumentPicker.pick({
        type: allowedTypes,
      });

      console.log('Result:', result);

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

  // ... (existing code remains unchanged)

  const handleSubmission = async () => {
    try {
      if (!selectedFiles.length || !selectedFiles_2.length) {
        Alert.alert('Missing Data', 'Please select a file and an image.');
        return;
      }

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
      formData.append('email', newItems[0].email);
      const response = await fetch(
        'http://172.20.10.8/CV_WORLD_APP/cv_world/Database/profile.php',
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

      console.log('Upload response:', responseData);
      setSelectedFileName('');
      setSelectedImageName('');
      setSelectedFiles([]); // Clear selected files after submission
      setSelectedFiles([]); // Clear selected files after submission
    } catch (error) {
      console.error('Error:', error);

      Alert.alert(
        'Network Request Failed',
        'Failed to submit data. Please check your internet connection and try again.',
      );
    }
  };

  // ... (rest of your React Native code remains unchanged)

  return (
    <View
      style={{
        marginTop: 0,
        paddingHorizontal: 0,
        width: '100%',
        flex: 1,
        backgroundColor: '#2D70AA',
      }}>
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
        {newItems.map((u, i) => (
          <View key={i} style={styles.user_intial}>
            <View style={styles.circularInitials}>
              <Text style={styles.initials}>
                {newItems[0].first_name.charAt(0)}{' '}
                {newItems[0].last_name.charAt(0)}
              </Text>
            </View>
            <Text style={styles.name}>
              {newItems[0].first_name} {newItems[0].last_name}
            </Text>
          </View>
        ))}
      </View>
      <View>
        <Text style={styles.subscriptionText_upload}>Upload CV</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => setSearchExpanded(!isSearchExpanded)}
            style={styles.searchIcon}>
            <FontAwesomeIcon icon={faSearch} size={16} />
          </TouchableOpacity>

          {isSearchExpanded && (
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Type Here..."
                placeholderTextColor="#ffffff"
                onChangeText={text => {
                  // Handle search text change
                }}
              />
            </View>
          )}

          {/* <View style={styles.updateButton}>
            <Button
              radius={10}
              color="#235A8A"
              style={{backgroundColor: '#235A8A', borderRadius: 15}}
              title="Update"
              onPress={() => {
                // Add your update logic here
              }}
            />
          </View> */}
        </View>
        <Card style={{marginBottom: 12, padding: 0}}>
          <View>
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
                  <Text style={styles.buttonText_upload}>Import Files</Text>
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

            <View style={{marginVertical: 10}}>
              <Button
                color="#235A8A"
                size="lg"
                containerStyle={styles.buttonContainer_upload}
                onPress={() =>
                  handleImportImage([DocumentPicker.types.images])
                }>
                <View style={{paddingHorizontal: 10}}>
                  <Text style={styles.buttonText_upload}>My Images </Text>
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
            style={{color: '#0d0d0d', marginLeft: 6}}
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

export default Uploads;
