import React, {useState, useEffect} from 'react';
import {View, Image, Pressable, Modal} from 'react-native';
import {Card, Button, Text} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import styles from './styles';

const Membership = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [userdata, setUserData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const newItems_data = useSelector(state => state.cv.newitems);
  console.log('the newitems from the redux ', newItems_data);
  //

  const {firstName, lastName, emailAddress} = route.params || {};
  const handlePress = method => {
    setSelectedPaymentMethod(method);
    setShowModal(true);
  };
  useEffect(() => {
    // Set userData to be equal to newItems when the component mounts
    setUserData(newItems_data);
    console.log('user data', newItems_data);
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
    // setEmail(emailAddress);
    console.log('this is the email been sent' + emailAddress);
    navigation.navigate('CV', {email: emailAddress});
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <Text style={{...styles.fonts, fontSize: 14, fontWeight: '600'}}>
              CV WORLD
            </Text>
          </Card.Title>
        </View>
      </Card>

      <View style={styles.outer_user}>
        {userdata.map((u, i) => {
          return (
            <View key={i} style={styles.user}>
              <View style={styles.circularInitials}>
                <Text style={styles.initials}>
                  {u.first_name.charAt(0)}
                  {u.last_name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.name}>
                {u.first_name} {u.last_name}
              </Text>
            </View>
          );
        })}
      </View>

      <View>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '150',
            fontSize: 20,
            marginTop: 10,
            marginBottom: 10,
          }}>
          Membership Subscription
        </Text>
        <Text style={styles.subscriptionText}>
          Hi {userdata[0].first_name}, {'\n'} you are required to pay a 2 year
          subscription fee of K200 in order to access the platform and upload
          your CV. {'\n'}
          {'\n'} Choose your payment method below
        </Text>

        <Card style={{marginBottom: 12, padding: 0}}>
          <View style={{flexDirection: 'row', padding: 0}}>
            <View style={styles.imageContainer}>
              <Pressable onPress={() => handlePress('MTN')}>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={require('../../assets/mtnmomo.png')}
                />
              </Pressable>
            </View>
            <View style={styles.imageContainer}>
              <Pressable onPress={() => handlePress('Airtel')}>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={require('../../assets/airtelmoney.png')}
                />
              </Pressable>
            </View>
            <View style={styles.imageContainer}>
              <Pressable onPress={() => handlePress('Zamtel')}>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={require('../../assets/zamtelmoney.png')}
                />
              </Pressable>
            </View>
            <View style={styles.imageContainer}>
              <Pressable onPress={() => handlePress('Visa')}>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={require('../../assets/visa.png')}
                />
              </Pressable>
            </View>
          </View>
        </Card>

        <View style={{alignItems: 'center', marginTop: 15}}>
          <Button
            color="#235A8A"
            size="lg"
            onPress={handleProceed}
            containerStyle={{
              backgroundColor: '#235A8A',
              width: 250,
              height: 62,
              marginHorizontal: 30,
              marginVertical: 5,
              borderWidth: 1,
              borderColor: '#5188B6',
            }}>
            <View style={{paddingHorizontal: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '300',
                  color: 'white',
                }}>
                Proceed
              </Text>
            </View>
          </Button>
        </View>

        {/* Modal */}
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedPaymentMethod}</Text>
              <Text style={styles.modalText}>Amount: K200</Text>
              <Button
                color="#235A8A"
                size="md"
                onPress={handleConfirm}
                containerStyle={styles.confirmButton}>
                <Text style={styles.confirmText}>Confirm</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Membership;
