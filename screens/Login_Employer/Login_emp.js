import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {Card, Button} from '@rneui/themed';
import {BASE_URL} from '../../env';
import {
  addNewItem,
  addUserinfor,
  addUserinfor1,
  addLoginState,
} from '../../redux/cvSlice.js';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
// import {BASE_URL} from '@env';
import {useDispatch, useSelector} from 'react-redux';

const Login_emp = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }

  const isValidEmail = email => {
    // Basic email validation
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com|com\.br|co\.uk|net|org|edu|gov|info|biz|io)$/i;
    return emailRegex.test(email);
  };

  const authenticateUser = async (email, password) => {
    try {
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/Auth.php?${randomText}=${randomValue}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(addLoginState(data.dbEmail));
      console.log('this is the data', data);
      if (data) {
        console.log('User authenticated successfully');
        if (data.redirect === 'employer') {
          navigation.navigate('Home_emp', {email});
        } else if (data.redirect === 'change_password') {
          navigation.navigate('ChangePassword', {email});
        }
      } else {
        console.log('Invalid credentials');
        console.log(data);
        Alert.alert(
          'Invalid credentials',
          'Please enter valid email and password',
        );
      }
    } catch (error) {
      console.log(JSON.stringify({email, password}));
      console.error('Error during authentication:', error.message);
      Alert.alert(
        'Error',
        'An error occurred during authentication. Please try again later.',
      );
    }
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    authenticateUser(email, password);
  };
  const handleforgotpassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register_emp');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              paddingHorizontal: horizontalScale(0),
              width: '100%',
              flex: 1,
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
              <Card.Title
                style={{
                  marginTop: verticalScale(8),
                  fontFamily: 'RobotoSlab-SemiBold',
                  fontSize: scaleFontSize(35),
                  fontWeight: '600',
                  color: '#235A8A',
                }}>
                CV WORLD
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
              Employer
            </Text>

            <View style={{alignItems: 'center'}}>
              <TextInput
                placeholder="Username"
                style={{
                  fontFamily: 'RobotoSlab-Regular',
                  fontSize: scaleFontSize(15),
                  width: horizontalScale(290),
                  alignSelf: 'center',
                  backgroundColor: '#3C6991',
                  color: 'white',
                  marginVertical: verticalScale(5),
                  padding: horizontalScale(10),
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#5188B6',
                }}
                placeholderTextColor="white"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address" // Set keyboard type to email
              />
              {email.length > 0 && !isValidEmail(email) && (
                <Text
                  style={{
                    color: 'red',
                    alignSelf: 'center',
                    fontFamily: 'RobotoSlab-Light',
                    fontSize: scaleFontSize(18),
                  }}>
                  Please enter a valid email address.
                </Text>
              )}
              <View style={{position: 'relative'}}>
                <TextInput
                  placeholder="Password"
                  style={{
                    fontFamily: 'RobotoSlab-Regular',
                    fontSize: scaleFontSize(15),
                    width: horizontalScale(290),
                    alignSelf: 'center',
                    backgroundColor: '#3C6991',
                    color: 'white',
                    marginVertical: verticalScale(5),
                    padding: horizontalScale(10),
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#5188B6',
                  }}
                  placeholderTextColor="white"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 23,
                    right: 20,
                  }}
                  onPress={togglePasswordVisibility}>
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    size={24}
                    color="#074173"
                  />
                </TouchableOpacity>
              </View>

              <TouchableWithoutFeedback>
                <View
                  style={{
                    marginVertical: verticalScale(10),
                    borderWidth: 1,
                    width: horizontalScale(290),
                    borderColor: '#235A8A',
                    alignItems: 'center',
                    borderRadius: 5,
                    overflow: 'hidden', // Ensure that child content doesn't overflow
                  }}>
                  <Button
                    color="#235A8A"
                    onPress={handleLogin}
                    size="lg"
                    containerStyle={{
                      backgroundColor: '#235A8A',
                      flex: 1,

                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: horizontalScale(20),
                        width: '100%',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'RobotoSlab-Regular',
                          fontSize: scaleFontSize(24),
                          fontWeight: '300',
                          color: 'white',
                          textAlign: 'center',
                          flex: 1,
                        }}>
                        Login
                      </Text>
                      <FontAwesomeIcon
                        icon={faRightToBracket}
                        style={{marginLeft: 5, color: '#ffffff'}}
                      />
                    </View>
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <TouchableOpacity onPress={handleforgotpassword}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Light',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '300',
                  fontSize: scaleFontSize(25),
                  marginTop: verticalScale(10),
                }}>
                Forgot My Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRegisterPress}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Light',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '300',
                  fontSize: scaleFontSize(25),
                  marginVertical: verticalScale(10),
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login_emp;
