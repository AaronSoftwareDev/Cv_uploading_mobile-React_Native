import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {Card, Button} from '@rneui/themed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

// const users = [
//   {email: 'jobseer1@example.com', password: 'password1'},
//   {email: 'jobseer2@example.com', password: 'password2'},
// ];

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // http://172.25.160.1/CV_WORLD_APP/cv_world/Database/Auth.php'

  const isValidEmail = email => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch(
        'http://172.20.10.8/CV_WORLD_APP/cv_world/Database/Auth.php',
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

      if (data) {
        console.log('User authenticated successfully');
        console.log('this is the data', data);
        navigation.navigate('CV', {email});
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
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      Alert.alert(
        'Invalid Password',
        'Password must have a minimum of 8 characters and include both upper and lower case letters.',
      );
      return;
    }

    // Perform authentication
    authenticateUser(email, password);
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Card.Title style={{fontSize: 24, fontWeight: '600'}}>
          CV WORLD
        </Card.Title>
      </Card>

      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: '300',
          fontSize: 24,
          marginTop: 10,
          marginBottom: 10,
        }}>
        Job Seeker
      </Text>

      <View style={{alignItems: 'center'}}>
        <TextInput
          placeholder="Username"
          style={{
            width: 290,
            alignSelf: 'center',
            backgroundColor: '#3C6991',
            color: 'white',
            marginVertical: 5,
            padding: 10,
            borderRadius: 5,
          }}
          placeholderTextColor="white"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address" // Set keyboard type to email
        />
        {email.length > 0 && !isValidEmail(email) && (
          <Text style={{color: 'red', alignSelf: 'center'}}>
            Please enter a valid email address.
          </Text>
        )}
        <View style={{position: 'relative'}}>
          <TextInput
            placeholder="Password"
            style={{
              width: 290,
              alignSelf: 'center',
              backgroundColor: '#3C6991',
              color: 'white',
              marginVertical: 5,
              padding: 10,
              borderRadius: 5,
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
              width: 290,
              height: 62,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: '#5188B6',
              justifyContent: 'center',
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
                width: '100%', // Take the full width of the parent view
                height: '100%', // Take the full height of the parent view
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '300',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <TouchableOpacity onPress={() => console.log('Forgot password')}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '300',
            fontSize: 16,
            marginTop: 10,
            marginBottom: 10,
          }}>
          Forgot My Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegisterPress}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '300',
            fontSize: 20,
            marginVertical: 10,
          }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
