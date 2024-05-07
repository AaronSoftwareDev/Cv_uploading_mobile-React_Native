import React, {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {
  faRightToBracket,
  faSearch,
  faLeftLong,
  faFileArrowUp,
  faBriefcase,
  faMaximize,
} from '@fortawesome/free-solid-svg-icons';
import {BASE_URL} from '../../env';
import {Card, Button, Text} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import {
  addNewItem,
  addUserinfor,
  addUserinfor1,
  addLoginState,
} from '../../redux/cvSlice.js';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const Register_emp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
  const [formData, setFormData] = useState({
    Company_Name: '',
    Company_Address: '',
    Representative_Name: '',
    Phone_Number: '',
    Email_Address: '',
    agentcode: '',
    password: '',
    repeatPassword: '',
  });

  const inputFields = [
    {key: 'Company_Name', placeholder: 'Company Name', icon: 'user'},
    {key: 'Company_Address', placeholder: 'Company Address', icon: 'envelope'},
    {
      key: 'Representative_Name',
      placeholder: 'Representative Name',
      icon: 'user',
    },
    {key: 'Phone_Number', placeholder: 'Phone Number', icon: 'user'},
    {key: 'Email_Address', placeholder: 'Email Address', icon: 'user'},
    {key: 'agentcode', placeholder: 'Agent Code', icon: 'user'},
    {key: 'password', placeholder: 'Password', icon: 'lock'},
    {key: 'repeatPassword', placeholder: 'Repeat Password', icon: 'lock'},
  ];

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({...prevData, [key]: value}));
  };
  const validatePhoneNumber = phoneNumber => {
    const zambianPhoneNumberRegex =
      /^(\+2607\d|07\d|(\+2609[56789]|09[56789]))\d{7}$/;
    return zambianPhoneNumberRegex.test(phoneNumber);
  };

  const validateEmail = email => {
    // Use a simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    // Password must be at least 8 characters and contain at least one uppercase letter and one lowercase letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    // Validate phone number, email, and password
    if (!validatePhoneNumber(formData.Phone_Number)) {
      Alert.alert(
        'Invalid Phone Number',
        'Please enter a valid Zambian phone number.',
      );
      return;
    }

    if (!validateEmail(formData.Email_Address)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(formData.password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters and contain at least one uppercase letter and one lowercase letter.',
      );
      return;
    }
    if (formData.password !== formData.repeatPassword) {
      Alert.alert(
        'Passwords do not match',
        'Please make sure the passwords match.',
      );
      return;
    }

    try {
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      console.log('this is the data', formData);
      const response = await fetch(
        `${BASE_URL}/emp_register.php?${randomText}=${randomValue}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      console.log('reponse data', response.ok);
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
          dispatch(addLoginState(data[0]?.email));
          console.log('company email:', data);
          Alert.alert(
            'Registration Successful',
            'You have been registered successfully.',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Membership_emp', {
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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{backgroundColor: '#2D70AA'}}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: horizontalScale(0),
              width: '100%',
              backgroundColor: '#2D70AA',
            }}>
            <Card
              containerStyle={{
                margin: verticalScale(0),
                paddingVertical: verticalScale(10),
                paddingHorizontal: horizontalScale(30),
                borderRadius: 50,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}>
              <Card.Image
                style={{padding: 0}}
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
            </Card>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Light',
                color: 'white',
                textAlign: 'center',
                fontWeight: '300',
                fontSize: scaleFontSize(32),
                marginTop: verticalScale(10),
                marginBottom: verticalScale(10),
              }}>
              Company Registration
            </Text>
            <View style={{alignItems: 'center', marginBottom: '20%'}}>
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
                    {field.key === 'password' ||
                    field.key === 'repeatPassword' ? (
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
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Regular',
                      fontSize: scaleFontSize(25),
                      fontWeight: '300',
                      color: 'white',
                      alignSelf: 'center',
                    }}>
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

                marginTop: 10,
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
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register_emp;