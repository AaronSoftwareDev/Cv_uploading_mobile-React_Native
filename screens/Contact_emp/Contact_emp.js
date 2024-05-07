import React, {useState, useEffect} from 'react';
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
  Platform,
  Keyboard,
  Button,
  Animated,
  Modal,
} from 'react-native';
import {BASE_URL} from '../../env';
import {Card} from '@rneui/themed';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {WebView} from 'react-native-webview';
import {
  faSearch,
  faLeftLong,
  faFileArrowUp,
  faBriefcase,
  faMaximize,
  faRightToBracket,
  faEnvelope,
  faEnvelopeOpen,
} from '@fortawesome/free-solid-svg-icons';
const Contact_emp = ({navigation}) => {
  const user_data = useSelector(state => state.cv.loginstate);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [subject, setSubject] = useState(''); // Change variable name to subject
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  // const [heights, setHeights] = useState([]);
  const [heights, setHeights] = useState(
    Array(sentMessages.length).fill(new Animated.Value(0)),
  );

  const getStatusColor = status => {
    return status === 'pending' ? 'red' : 'green';
  };

  const dataArray = [
    {title: 'Section 1', message: 'Content of section 1'},
    {title: 'Section 2', message: 'Content of section 2'},
    // Add more objects as needed
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

  const toggleAccordion = index => {
    const isExpanded = expanded === index;

    if (isExpanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }

    Animated.timing(heights[index], {
      toValue: isExpanded ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const customModalProps = {
    transparent: true,
    animationType: 'slide',
    presentationStyle: 'overFullScreen',
    onRequestClose: () => {
      setOpen(false);
    },
    onDismiss: () => {
      // handle modal dismiss
    },
    // Other modal props here
    // For adjusting the size, you can set the width and height
    // Example:
    style: {
      width: 200,
      height: 200,
    },
  };

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const authenticateUser = async (email, password) => {
    try {
      // Your authentication logic here
      // ...
    } catch (error) {
      console.error('Error during authentication:', error.message);
      Alert.alert(
        'Error',
        'An error occurred during authentication. Please try again later.',
      );
    }
  };
  useEffect(() => {
    // Fetch data from messageTrail.ph based on user_data (email) when the component mounts
    const fetchData = async () => {
      try {
        const randomValue = Math.floor(Math.random() * 1000);
        const randomText = generateRandomText(5);
        const response = await fetch(
          `${BASE_URL}/messageTrail.php?email=${user_data}&${randomText}=${randomValue}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          // Assuming data is an array of messages, update state accordingly
          // setSentMessages(data);
          setSentMessages(data || []); // Set to data or an empty array if data is falsy
          setHeights(data.map(() => new Animated.Value(0)));
          console.log('message trail', sentMessages);
        } else {
          console.error('Error fetching messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [user_data]);
  useEffect(() => {
    // Update heights array when sentMessages change
    if (sentMessages && sentMessages.length > 0) {
      setHeights(Array(sentMessages.length).fill(new Animated.Value(0)));
    } else {
      setHeights([]);
    }
  }, [sentMessages]);

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendContactMessage = async () => {
    console.log('Subject:', subject);
    console.log('Message:', message);

    if (subject.trim() === '' || message.trim() === '') {
      Alert.alert('Incomplete Form', 'Please fill in all fields.');
      return;
    }
    try {
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      const response = await fetch(
        `${BASE_URL}/contact.php?${randomText}=${randomValue}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject,
            message,
            user_data,
          }),
        },
      );

      if (response.ok) {
        console.log('Message sent successfully');
        setSuccessModalVisible(true);
      } else {
        console.error('Error sending message:', response.statusText);
        Alert.alert('Error', 'Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error during message sending:', error.message);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };
  const handleSend = () => {
    console.log('Subject:', subject);
    console.log('Message:', message);

    if (subject.trim() === '' || message.trim() === '') {
      Alert.alert('Incomplete Form', 'Please fill in all fields.');
      return;
    }

    sendContactMessage();
  };
  const closeModal = () => {
    setSuccessModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <Card
              containerStyle={{
                margin: 0,
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
                fontWeight: '200',
                fontSize: scaleFontSize(32),
                marginTop: verticalScale(5),
                marginBottom: verticalScale(10),
                padding: horizontalScale(10),
              }}>
              Contact Agent
            </Text>

            <View style={{alignItems: 'center'}}>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    flex: 1,
                    width: horizontalScale(120),
                    marginVertical: verticalScale(5),
                    marginRight: horizontalScale(30),
                    borderWidth: 1,
                    borderColor: '#235A8A',
                    justifyContent: 'center',

                    alignContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#235A8A',
                    overflow: 'hidden',
                    margin: 10,
                    alignSelf: 'flex-end',
                  }}>
                  <Button
                    onPress={handleSend}
                    title="Send"
                    color="#235A8A"
                    style={{flex: 1}}></Button>
                </View>
              </TouchableWithoutFeedback>
              <TextInput
                placeholder="Subject"
                style={{
                  width: horizontalScale(290),
                  fontFamily: 'RobotoSlab-ExtraLight',
                  fontSize: scaleFontSize(18),
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  color: '#2D70AA',
                  marginVertical: verticalScale(5),
                  padding: 10,
                  borderRadius: 5,
                }}
                placeholderTextColor="#2D70AA"
                value={subject}
                onChangeText={text => setSubject(text)}
              />

              <View
                style={{
                  position: 'relative',
                  marginTop: verticalScale(10),
                  height: 180,
                }}>
                <ScrollView>
                  <TextInput
                    placeholder="Message"
                    multiline
                    numberOfLines={10}
                    style={{
                      width: horizontalScale(290),
                      fontFamily: 'RobotoSlab-ExtraLight',
                      fontSize: scaleFontSize(18),
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      color: '#2D70AA',
                      padding: 10,
                      borderRadius: 5,
                      textAlignVertical: 'top',
                    }}
                    placeholderTextColor="#2D70AA"
                    value={message}
                    onChangeText={text => setMessage(text)}
                  />
                </ScrollView>
              </View>

              <View style={styles.accordian}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontWeight: '300',
                    fontSize: scaleFontSize(28),
                    marginTop: verticalScale(10),
                    marginBottom: verticalScale(10),
                  }}>
                  Sent Messages
                </Text>

                <ScrollView>
                  <ScrollView>
                    {sentMessages && Array.isArray(sentMessages) ? (
                      sentMessages.map((item, index) => (
                        <View key={index} style={styles.item}>
                          <View key={index} style={styles.itemContainer}>
                            <TouchableOpacity
                              style={styles.header}
                              onPress={() => toggleAccordion(index)}>
                              <Text
                                style={styles.headerText}
                                numberOfLines={undefined}>
                                {item.subject}
                              </Text>
                              <Text style={styles.headerText_icon}>
                                {expanded === index ? '-' : '+'}
                              </Text>
                            </TouchableOpacity>
                            <View style={[styles.statusIndicator]}>
                              {item.status === 'open' ? (
                                <FontAwesomeIcon
                                  icon={faEnvelopeOpen}
                                  bounce
                                  style={{color: '#ffffff'}}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  bounce
                                  style={{color: '#ffffff'}}
                                />
                              )}
                            </View>
                          </View>
                          {expanded === index && (
                            <Animated.View
                              style={[
                                styles.content_accordian,
                                {height: heights[index]},
                              ]}>
                              {item.message ? (
                                <Text
                                  style={{
                                    fontFamily: 'RobotoSlab-Light',
                                    fontSize: scaleFontSize(18),
                                  }}>
                                  {item.message}
                                </Text>
                              ) : (
                                <Text
                                  style={{
                                    fontFamily: 'RobotoSlab-Light',
                                  }}>
                                  No message available
                                </Text>
                              )}
                            </Animated.View>
                          )}
                        </View>
                      ))
                    ) : (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                          }}>
                          No messages available
                        </Text>
                      </View>
                    )}
                  </ScrollView>
                </ScrollView>
              </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={successModalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Message sent Successful!</Text>
                <Button title="Close" color="#235A8A" onPress={closeModal} />
              </View>
            </View>
          </Modal>
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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Contact_emp;
