import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Card, Button, Text} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import SpennPay from '../../components/SpennPay';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';
import {BASE_URL} from '../../env';

import styles from './styles';

const Membership = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [email, setEmail] = useState('');
  const [userdata, setUserData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  console.log('the newitems from the redux okay ', newItems_data);
  const [paymentResult, setPaymentResult] = useState(null);
  const handlePaymentInitiated = () => {
    setShowModal(true); // Show modal when payment process starts
    setModalContent(
      <>
        <View style={{flexDirection: 'column'}}>
          <View>
            <ActivityIndicator size="large" color="#9bb3de" />
          </View>
          <View>
            <Text
              style={{
                fontSize: scaleFontSize(25),
                fontFamily: 'RobotoSlab-Regular',
                color: '#3C6991',
              }}>
              {' '}
              Awaiting Approval...
            </Text>
          </View>
        </View>
      </>,
    );
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
  const handlePaymentResult = result => {
    setShowModal(true);
    console.log('parent results', result);
    //====================== First part ==================================

    const handleRegister = async () => {
      // Validate phone number, email, and password
      const resultWithEmail = {...result, username: userdata[0]?.email};
      console.log('the sent data to ', resultWithEmail);

      try {
        const randomValue = Math.floor(Math.random() * 1000);
        const randomText = generateRandomText(5);
        const response = await fetch(
          `${BASE_URL}/transactionlog.php?${randomText}=${randomValue}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(resultWithEmail),
          },
        );

        if (response.ok) {
          // console.log('Server Response:', JSON.stringify(formData));
          const responseData = await response.json();

          // console.log('Server Response:', responseData);
        } else {
          Alert.alert('Transaction Failed', ' Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        Alert.alert(
          'Error',
          'An error occurred during registration. Please try again later.',
        );
      }
    };
    //=====================================================================
    if (result && result.requestStatus === 'Pending') {
      handleRegister();
    }

    //======================== second part ================================
    else if (result && result.requestStatus === 'Approved') {
      setModalContent(
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                color: '#3C6991',
                fontSize: scaleFontSize(35),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Regular',
                  color: '#3C6991',
                  fontSize: scaleFontSize(25),
                  alignSelf: 'center',
                }}>
                Payment Status
              </Text>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Regular',
                  color: '#3C6991',
                  fontSize: scaleFontSize(25),
                  alignSelf: 'center',
                }}>
                {' '}
                {result.requestStatus}
              </Text>
            </Text>
          </View>
        </>,
      );
      //==================================================================
      const handleupdate = async () => {
        try {
          const randomValue = Math.floor(Math.random() * 1000);
          const randomText = generateRandomText(5);
          const response = await fetch(
            `${BASE_URL}/handleTransactionupdate.php?${randomText}=${randomValue}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(result),
            },
          );

          if (response.ok) {
            // console.log('Server Response:', JSON.stringify(formData));
            const responseData = await response.json();
            navigation.navigate('CV');
            // console.log('Server Response:', responseData);
          } else {
            Alert.alert('Transaction Failed', ' Please try again.');
          }
        } catch (error) {
          console.error('Error during registration:', error);
          Alert.alert(
            'Error',
            'An error occurred during registration. Please try again later.',
          );
        }
      };

      handleupdate();
      //==================================================================
      // You can add any additional logic here if needed
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
    //======================== third part =================================
    else if (result && result.requestStatus === 'Rejected') {
      setModalContent(
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                color: '#3C6991',
                fontSize: scaleFontSize(25),
                alignSelf: 'center',
                alignContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Regular',
                  color: '#3C6991',
                  fontSize: scaleFontSize(25),
                  alignSelf: 'center',
                }}>
                Payment Status
              </Text>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Regular',
                  color: '#3C6991',
                  fontSize: scaleFontSize(25),
                  alignSelf: 'center',
                }}>
                {' '}
                {result.requestStatus}
              </Text>
            </Text>
          </View>
        </>,
      );
      const handleupdate = async () => {
        try {
          const randomValue = Math.floor(Math.random() * 1000);
          const randomText = generateRandomText(5);
          const response = await fetch(
            `${BASE_URL}/handleTransactionupdate.php?${randomText}=${randomValue}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(result),
            },
          );

          if (response.ok) {
            // console.log('Server Response:', JSON.stringify(formData));
            const responseData = await response.json();

            // console.log('Server Response:', responseData);
          } else {
            Alert.alert('Transaction Failed', ' Please try again.');
          }
        } catch (error) {
          console.error('Error during registration:', error);
          Alert.alert(
            'Error',
            'An error occurred during registration. Please try again later.',
          );
        }
      };

      handleupdate();
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
    //=============== fourth part ======================================
    else if (
      result &&
      !(
        result.requestStatus === 'Rejected' ||
        result.requestStatus === 'Approved' ||
        result.requestStatus === 'Pending'
      )
    ) {
      setModalContent(
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                color: '#3C6991',
                fontSize: scaleFontSize(25),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Regular',
                  color: '#3C6991',
                  fontSize: scaleFontSize(25),
                  alignSelf: 'center',
                }}>
                Payment Status
              </Text>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Regular',
                  color: '#3C6991',
                  fontSize: scaleFontSize(25),
                  alignSelf: 'center',
                }}>
                {' '}
                {result.requestStatus}
              </Text>
            </Text>
          </View>
        </>,
      );
      const handleupdate = async () => {
        try {
          const randomValue = Math.floor(Math.random() * 1000);
          const randomText = generateRandomText(5);
          const response = await fetch(
            `${BASE_URL}/handleTransactionupdate.php?${randomText}=${randomValue}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(result),
            },
          );

          if (response.ok) {
            // console.log('Server Response:', JSON.stringify(formData));
            const responseData = await response.json();

            // console.log('Server Response:', responseData);
          } else {
            Alert.alert('Transaction Failed', ' Please try again.');
          }
        } catch (error) {
          console.error('Error during registration:', error);
          Alert.alert(
            'Error',
            'An error occurred during registration. Please try again later.',
          );
        }
      };

      handleupdate();
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };
  //====================================================================
  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const {firstName, lastName, emailAddress} = route.params || {};
  const handlePress = method => {
    setSelectedPaymentMethod(method);
    setShowModal(true);
  };
  useEffect(() => {
    // Set userData to be equal to newItems when the component mounts
    setUserData(newItems_data);

    console.log('user data latest', userdata[0]?.first_name);
  }, [newItems_data]);
  const users = [
    {
      first_name: `${firstName} `,
      last_name: `${lastName}`,
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    },
  ];

  const handleProceed = () => {
    setShowModal(false);
    console.log('this is the email been sent' + emailAddress);
    navigation.navigate('CV');
  };

  const handleConfirm = () => {
    // Perform actions when confirmed
    setShowModal(false);
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
          paddingVertical: 0,
          paddingHorizontal: 70,
          borderRadius: 50,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Card.Image
            style={{
              width: 50,
              height: 40,
              borderRadius: 25,
              resizeMode: 'cover',
            }}
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
        <View style={styles.user}>
          <View style={styles.circularInitials}>
            <Text style={styles.initials}>
              {userdata[0]?.first_name.charAt(0)}
              {userdata[0]?.last_name.charAt(0)}
            </Text>
          </View>
          <Text style={styles.name}>
            {userdata[0]?.first_name} {userdata[0]?.last_name}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontFamily: 'RobotoSlab-Light',
            color: 'white',
            textAlign: 'center',
            fontWeight: '200',
            fontSize: scaleFontSize(32),
            marginTop: verticalScale(10),
            marginBottom: verticalScale(10),
          }}>
          Membership Subscription
        </Text>

        <Text style={styles.subscriptionText}>
          {userdata[0]?.first_name && (
            <>
              Hi {userdata[0].first_name}, {'\n'}
              You are required to pay a once off subscription fee of K150 in
              order to access the platform and upload your CV. {'\n\n'}
              Please pay with spenn below
            </>
          )}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={styles.modalView_spenn}>
            <SpennPay
              onPaymentResult={handlePaymentResult}
              onPaymentInitiated={handlePaymentInitiated}
              userdata={userdata} // Assuming userdata is the variable holding your data
            />
          </View>
        </View>

        {/* Modal */}
        <Modal
          visible={showModal}
          style={{backgroundColor: 'black'}}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> {modalContent} </Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Membership;
