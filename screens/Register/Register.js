import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  faRightToBracket,
  faSearch,
  faLeftLong,
  faFileArrowUp,
  faBriefcase,
  faMaximize,
} from '@fortawesome/free-solid-svg-icons';
import {Card, Button, Text} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import {addNewItem, addUserinfor, addUserinfor1} from '../../redux/cvSlice.js';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    repeatPassword: '',
  });

  const inputFields = [
    {key: 'firstName', placeholder: 'First Name', icon: 'user'},
    {key: 'lastName', placeholder: 'Last Name', icon: 'envelope'},
    {key: 'address', placeholder: 'Address', icon: 'user'},
    {key: 'phoneNumber', placeholder: 'Phone Number', icon: 'user'},
    {key: 'emailAddress', placeholder: 'Email Address', icon: 'user'},
    {key: 'password', placeholder: 'Password', icon: 'lock'},
    {key: 'repeatPassword', placeholder: 'Repeat Password', icon: 'lock'},
  ];

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({...prevData, [key]: value}));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.repeatPassword) {
      Alert.alert(
        'Passwords do not match',
        'Please make sure the passwords match.',
      );
      return;
    }

    try {
      const response = await fetch(
        'http://172.20.10.8/CV_WORLD_APP/cv_world/Database/Register.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        // console.log('Server Response:', JSON.stringify(formData));
        const responseData = await response.json();
        // console.log('Server Response:', responseData);
        if (responseData.selectedRecord) {
          const {firstName, lastName, emailAddress} =
            responseData.selectedRecord;
          const data = [responseData.selectedRecord];
          console.log('Server Response:', data);
          dispatch(addNewItem(data));
          Alert.alert(
            'Registration Successful',
            'You have been registered successfully.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Membership', {
                    firstName,
                    lastName,
                    emailAddress,
                  });
                },
              },
            ],
          );
        } else {
          Alert.alert(
            'Registration Successful',
            'You have been registered successfully, but there is an issue fetching user details.',
          );
        }
      } else {
        Alert.alert(
          'Registration Failed',
          'Failed to register. Please try again.',
        );
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert(
        'Error',
        'An error occurred during registration. Please try again later.',
      );
    }
  };

  return (
    <View
      style={{
        marginTop: 0,
        paddingHorizontal: 0,
        width: '100%',
        flex: 1,
        backgroundColor: '#2D70AA',
      }}>
      <Card
        containerStyle={{
          margin: 0,
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 50,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        <Card.Image
          style={{padding: 0}}
          source={require('../../assets/logo1.jpg')}
        />
        <Card.Title style={styles.cardTitle}>
          <Text style={{...styles.fonts, fontSize: 24, fontWeight: '600'}}>
            CV WORLD
          </Text>
        </Card.Title>
      </Card>
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: '250',
          fontSize: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        Job Seeker Registration
      </Text>
      <View style={{alignItems: 'center'}}>
        <ScrollView style={styles.scrollView}>
          {inputFields.map(field => (
            <View key={field.key} style={{position: 'relative'}}>
              <TextInput
                placeholder={field.placeholder}
                style={styles.input}
                placeholderTextColor="white"
                onChangeText={text => handleInputChange(field.key, text)}
                secureTextEntry={
                  (field.key === 'password' ||
                    field.key === 'repeatPassword') &&
                  !showPassword
                }
              />
              {field.key === 'password' || field.key === 'repeatPassword' ? (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 20,
                  }}
                  onPress={togglePasswordVisibility}>
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    size={24}
                    color="#074173"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </ScrollView>
        <Button
          color="#235A8A"
          size="lg"
          containerStyle={styles.registerButton}
          onPress={handleRegister}>
          <View>
            <Text style={{fontSize: 20, fontWeight: '300', color: 'white'}}>
              Register
            </Text>
          </View>
        </Button>
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
        {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{color: '#0d0d0d', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Logout
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Register;
