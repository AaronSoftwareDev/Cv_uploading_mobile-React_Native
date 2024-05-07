import React, {useState, useRef} from 'react';
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
  FlatList,
  VirtualizedList,
  Animated,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {BASE_URL} from '../../env';
import DatePicker from 'react-native-date-picker';
import {Card, Button} from '@rneui/themed';
import styles from './styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RNPickerSelect from 'react-native-picker-select';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
import {
  faSearch,
  faLeftLong,
  faFileArrowUp,
  faBriefcase,
  faMaximize,
  faRightToBracket,
  faEnvelope,
  faEnvelopeOpen,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';
const JobPosting = ({navigation}) => {
  const user_data = useSelector(state => state.cv.loginstate);
  console.log('user information ', user_data);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [job_Title, setJobTitle] = useState('');
  const [job_Description, setJobDescription] = useState('');
  const [qualifications_Level, setQualificationLevel] = useState('');
  const [yearsOf_Experience, setExperience] = useState(null);
  const [expiry_Date, setExpiryDate] = useState(null);
  const [job_Location, setJobLocation] = useState('');
  const [salary_Expectations, setSalaryExpectations] = useState(null);
  const [submission_Email, setSalarySubmissionEmail] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const dropDownRef = useRef(null);

  const scrollToIndex = index => {
    if (dropDownRef.current) {
      dropDownRef.current.scrollToIndex(index);
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

  const [items, setItems] = useState([
    {label: 'Electrical', value: 'Electrical'},
    {label: 'Construction', value: 'Construction'},
    {label: 'Healthuy care ', value: 'Healthuy care'},
    {label: 'Agriculture ', value: 'Agriculture'},
    {label: 'Retail', value: 'Retail'},
    {label: 'Finance ', value: 'Finance'},
    {label: 'Food Industry ', value: 'Food Industry'},
    {label: 'Managment ', value: 'Managment'},
    {label: 'Hospital Industry', value: 'Hospital Industry'},
    {label: 'software engineer ', value: 'software engineer'},
    {label: 'Legal ', value: 'Legal'},
    {label: 'Mining ', value: 'Mining'},
    {label: 'Education ', value: 'Education'},
  ]);
  const [date, setDate] = useState(new Date());
  const [open_date, setOpenDate] = useState(false);
  const formattedDate = date.toDateString();

  function close() {
    pickerRef.current.blur();
  }
  const getStatusColor = status => {
    return status === 'pending' ? 'red' : 'green';
  };
  const customModalProps = {
    transparent: true,
    animationType: 'slide',
    presentationStyle: 'overFullScreen',
    onRequestClose: () => {
      setOpen(false);
    },
    onDismiss: () => {},

    style: {
      width: 200,
      height: 200,
    },
  };
  const dataArray = [
    {title: 'Section 1', message: 'Content of section 1'},
    {title: 'Section 2', message: 'Content of section 2'},
    // Add more objects as needed
  ];
  const [heights, setHeights] = useState(
    dataArray.map(() => new Animated.Value(0)),
  );

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

  const handleSubmit = () => {
    submitJobPosting();
    // console.log('Email:', email);
    // console.log('Password:', password);
    // if (
    //   password.length < 8 ||
    //   !/[a-z]/.test(password) ||
    //   !/[A-Z]/.test(password)
    // ) {
    //   Alert.alert(
    //     'Invalid Password',
    //     'Password must have a minimum of 8 characters and include both upper and lower case letters.',
    //   );
    //   return;
    // }

    // authenticateUser(email, password);
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitJobPosting = async () => {
    try {
      // Extract data from the TextInput components
      const jobCategory = value;
      const jobTitle = job_Title;
      const jobDescription = job_Description; // Extract job description from the appropriate TextInput;
      const qualificationsLevel = qualifications_Level; // Extract qualifications level from the appropriate TextInput;
      const yearsOfExperience = yearsOf_Experience; // Extract years of experience from the appropriate TextInput;
      const expiryDate = expiry_Date;
      const jobLocation = job_Location; // Extract job location from the appropriate TextInput;
      const salaryExpectations = salary_Expectations; // Extract salary expectations from the appropriate TextInput;
      const submissionEmail = submission_Email; // Extract submission email from the appropriate TextInput;

      // Prepare the data object for API submission
      const jobPostingData = {
        jobCategory,
        jobTitle,
        jobDescription,
        qualificationsLevel,
        yearsOfExperience,
        expiryDate,
        jobLocation,
        salaryExpectations,
        submissionEmail,
        user_data,
      };
      console.log('this is the data to send', jobPostingData);
      const randomValue = Math.floor(Math.random() * 1000);
      const randomText = generateRandomText(5);
      // Make a POST request to the jobPosting API using the fetch API
      const response = await fetch(
        `${BASE_URL}/jobPosting.php?${randomText}=${randomValue}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobPostingData),
        },
      );

      const responseData = await response.text();
      console.log('Response from server:', responseData);
      setSuccessModalVisible(true);
      if (response.ok) {
        console.log('Job Posting Submitted:', responseData);
      } else {
        throw new Error(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error submitting job posting:', error.message);
      Alert.alert(
        'Error',
        'An error occurred while submitting the job posting. Please try again later.',
      );
    }
  };
  const closeModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate('Home_emp');
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderDropdown = () => {
    return (
      <DropDownPicker
        zIndex={1000}
        labelStyle={{
          fontFamily: 'RobotoSlab-ExtraLight',

          color: '#2D70AA',
        }}
        maxHeight={300}
        listMode="SCROLLVIEW"
        dropDownDirection="BOTTOM"
        style={{
          width: horizontalScale(290),
          alignSelf: 'center',
          color: '#2D70AA',
          borderColor: 'transparent',
        }}
        scrollViewProps={{
          decelerationRate: 'fast',
          maxHeight: 400,
        }}
        textStyle={{
          fontFamily: 'RobotoSlab-ExtraLight',
          fontSize: scaleFontSize(18),
          color: 'white',
        }}
        containerStyle={{
          borderWidth: 0, // Set borderWidth to 0 to remove the border
        }}
        placeholder="Select Category"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        autoScroll={true}
        modalProps={customModalProps}
        dropDownContainerStyle={{
          backgroundColor: '#235A8A',
          width: horizontalScale(290),
          borderColor: 'transparent',
          color: 'white',
        }}
        placeholderStyle={{color: '#2D70AA'}}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VirtualizedList
          style={{paddingBottom: 10}}
          contentContainerStyle={{flexGrow: 1}}
          data={[0]} // Pass any array as data
          getItemCount={() => 1} // Set to return 1 item
          getItem={() => ({key: 'dummy'})} // Dummy item
          renderItem={({item}) => (
            <>
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
                  Post a job
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start',
                    paddingLeft: 10,
                    paddingBottom: 4,
                    paddingTop: 4,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Light',
                      paddingLeft: horizontalScale(10),
                      color: 'white',
                      fontWeight: '300',
                      fontSize: scaleFontSize(18),
                      alignSelf: 'flex-start',
                      marginTop: 2,
                      marginBottom: 2,
                    }}>
                    Job Category
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View>{renderDropdown()}</View>
                  <View
                    style={{
                      flex: 1,

                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: horizontalScale(10),
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 16,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}>
                      Job Title
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Job Title"
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
                    value={job_Title}
                    onChangeText={text => setJobTitle(text)}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: 10,
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 16,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}
                      value>
                      Job Description
                    </Text>
                  </View>
                  <View
                    style={{position: 'relative', marginTop: 10, height: 180}}>
                    <ScrollView>
                      <TextInput
                        placeholder="Job Description"
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
                        value={job_Description}
                        onChangeText={text => setJobDescription(text)}
                      />
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: 10,
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 18,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}>
                      Qualifications level
                    </Text>
                  </View>

                  <TextInput
                    placeholder="Required Qualifications"
                    style={{
                      width: horizontalScale(290),
                      fontFamily: 'RobotoSlab-ExtraLight',
                      fontSize: scaleFontSize(18),
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      color: '#2D70AA',
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 5,
                    }}
                    placeholderTextColor="#2D70AA"
                    value={qualifications_Level}
                    onChangeText={text => setQualificationLevel(text)}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: 10,
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 16,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}>
                      Years of Experience
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Years of experience"
                    style={{
                      width: horizontalScale(290),
                      fontFamily: 'RobotoSlab-ExtraLight',
                      fontSize: scaleFontSize(18),
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      color: '#2D70AA',
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 5,
                    }}
                    placeholderTextColor="#2D70AA"
                    value={yearsOf_Experience}
                    onChangeText={text => setExperience(text)}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: horizontalScale(10),
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 16,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}>
                      Expiry Date
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                      paddingLeft: horizontalScale(25),
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <TextInput
                      placeholder="Expiry Date"
                      style={{
                        width: horizontalScale(150),
                        fontFamily: 'RobotoSlab-ExtraLight',
                        fontSize: scaleFontSize(18),
                        backgroundColor: 'white',
                        color: '#2D70AA',
                        padding: 10,
                        borderRadius: 5,
                      }}
                      placeholderTextColor="#2D70AA"
                      editable={false}
                      value={expiry_Date}
                      onChangeText={text => setExpiryDate(text)}
                    />
                    <View
                      style={{
                        marginLeft: 5,
                        marginVertical: 4,
                      }}>
                      <>
                        <Button
                          title="Pick Date"
                          onPress={() => setOpenDate(true)}
                          style={{marginLeft: 4, width: horizontalScale(100)}}
                        />

                        <DatePicker
                          modal
                          open={open_date}
                          date={date}
                          onConfirm={date => {
                            setOpenDate(false);
                            setDate(date);
                            setExpiryDate(date.toDateString());
                            console.log('this is the date', expiry_Date);
                          }}
                          onCancel={() => {
                            setOpenDate(false);
                          }}
                        />
                      </>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: 10,
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),

                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 16,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}>
                      Job Location
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Location"
                    style={{
                      width: horizontalScale(290),
                      fontFamily: 'RobotoSlab-ExtraLight',
                      fontSize: scaleFontSize(18),
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      color: '#2D70AA',
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 5,
                    }}
                    placeholderTextColor="#2D70AA"
                    value={job_Location}
                    onChangeText={text => setJobLocation(text)}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: 10,
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 16,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}>
                      Salary Expectations
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Salary expectations"
                    style={{
                      width: horizontalScale(290),
                      fontFamily: 'RobotoSlab-ExtraLight',
                      fontSize: scaleFontSize(18),
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      color: '#2D70AA',
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 5,
                    }}
                    placeholderTextColor="#2D70AA"
                    value={salary_Expectations}
                    onChangeText={text => setSalaryExpectations(text)}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'flex-start',
                      paddingLeft: 10,
                      paddingBottom: 4,
                      paddingTop: 4,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'RobotoSlab-Light',
                        paddingLeft: horizontalScale(10),
                        color: 'white',
                        textAlign: 'left',
                        fontWeight: '300',
                        fontSize: 16,
                        marginTop: 2,
                        marginBottom: 2,
                        alignSelf: 'flex-start',
                      }}>
                      Submission Email
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Email Address"
                    style={{
                      width: horizontalScale(290),
                      fontFamily: 'RobotoSlab-ExtraLight',
                      fontSize: scaleFontSize(18),
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      color: '#2D70AA',
                      marginVertical: 5,
                      padding: 10,
                      borderRadius: 5,
                    }}
                    placeholderTextColor="#2D70AA"
                    value={submission_Email}
                    onChangeText={text => setSalarySubmissionEmail(text)}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderRadius: 5,
                    overflow: 'hidden',
                    margin: 15,
                    marginBottom: '10%',
                  }}>
                  <Button
                    onPress={handleSubmit}
                    title="Submit"
                    size="lg"
                    containerStyle={{
                      marginTop: verticalScale(10),
                      fontFamily: 'RobotoSlab-Regular',
                      width: '80%',
                      height: '100%',
                    }}></Button>
                </View>
              </View>

              <Modal
                animationType="slide"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={closeModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                      Job Posting Successful!
                    </Text>
                    <Button title="Close" onPress={closeModal} />
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
            </>
          )}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default JobPosting;
