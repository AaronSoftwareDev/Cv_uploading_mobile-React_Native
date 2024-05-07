import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {BASE_URL} from '../../env';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
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
import {useRoute} from '@react-navigation/native';
import {
  addNewItem,
  addUserinfor,
  addUserinfor1,
  addLoginState,
} from '../../redux/cvSlice.js';

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  // Extract the 'email' parameter from the route object
  const {email} = route.params;
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: email,

    password: '',
    repeatPassword: '',
  });

  const inputFields = [
    {key: 'password', placeholder: 'Password', icon: 'lock'},
    {key: 'repeatPassword', placeholder: 'Repeat Password', icon: 'lock'},
  ];

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({...prevData, [key]: value}));
  };
  //==================================================

  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }

  //==================================================
  const validatePassword = password => {
    // Password must be at least 8 characters and contain at least one uppercase letter and one lowercase letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  //================================================================
  const handlePassword = async () => {
    if (formData.password.length < 8) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters.',
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
      console.log(formData);
      const response = await fetch(
        `${BASE_URL}/updatepassword.php?email=${formData.email}&password=${formData.password}&${randomText}=${randomValue}`,
      );
      console.log(response);
      if (response.ok) {
        Alert.alert('Password changed successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Error',
          'An error occurred while changing password. Please try again later.',
        );
      }
    } catch (error) {
      console.error('Error during password change:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };
  //===============================================================================
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
              Change Password
            </Text>
            <View style={{alignItems: 'center', marginBottom: '20%'}}>
              {inputFields.map(field => (
                <View key={field.key} style={{position: 'relative'}}>
                  <TextInput
                    placeholder={field.placeholder}
                    style={styles.input}
                    placeholderTextColor="white"
                    onChangeText={text => handleInputChange(field.key, text)}
                  />
                </View>
              ))}

              <Button
                color="#235A8A"
                size="lg"
                containerStyle={styles.registerButton}
                o
                onPress={() => handlePassword()}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Regular',
                      fontSize: scaleFontSize(25),
                      fontWeight: '300',
                      color: 'white',
                      alignSelf: 'center',
                    }}>
                    Submit
                  </Text>
                </View>
              </Button>
              <View>
                <Text>{''}</Text>
              </View>
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
                  style={{color: '#ffffff', marginLeft: 6}}
                />
                <Text
                  style={{
                    color: '#ffffff',
                    marginTop: 5,
                    fontFamily: 'RobotoSlab-Regular',
                  }}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
