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
import {faLeftLong} from '@fortawesome/free-solid-svg-icons';
import {Card, Button, Text} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from './styles';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    emailAddress: '',
  });

  const inputFields = [
    {key: 'emailAddress', placeholder: 'Email Address', icon: 'user'},
  ];

  function generateRandomText(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomText += alphabet.charAt(randomIndex);
    }

    return randomText;
  }

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({...prevData, [key]: value}));
  };

  const validateEmail = email => {
    // Use a simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    // Validate email
    if (!validateEmail(formData.emailAddress)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      // Construct query parameters
      const email = `${encodeURIComponent(formData.emailAddress)}`;
      console.log('this this the mail', email);
      // Send GET request
      const response = await fetch(
        `${BASE_URL}/forgotpassword.php?${email}&${randomText}=${randomValue}`,
      );

      if (response.ok) {
        Alert.alert('Check your Email');
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Request Failed',
          'Failed to send forgot password request.',
        );
      }
    } catch (error) {
      console.error('Error during forgot password request:', error);
      Alert.alert(
        'Error',
        'An error occurred during forgot password request. Please try again later.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            Enter your Email
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
              containerStyle={styles.registerButton}
              onPress={handleForgotPassword}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: 'RobotoSlab-Regular',
                    fontSize: scaleFontSize(22),
                    fontWeight: '300',
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  submit
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
