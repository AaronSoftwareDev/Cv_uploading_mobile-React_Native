import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import getBearerToken from '../spennpay/Functions/getBearerToken';
import requestPayment from '../spennpay/Functions/requestPayment';
import generateUUID from '../spennpay/Functions/generateUUID';

import getRequestStatus from '../spennpay/Functions/getRequestStatus';

export default function SpennPay({
  onPaymentResult,
  onPaymentInitiated,
  userdata,
}) {
  const getCurrentTimestamp = () => {
    return Date.now(); // This will return the current timestamp in milliseconds since the Unix epoch
  };

  // Example usage

  const [bearerToken, setBearerToken] = useState(null);
  const [amountToPay, setAmountToPay] = useState(20);
  const [requestId, setRequestId] = useState(null);
  const [resultData, setresultData] = useState(null);
  const [userphone, setUserPhone] = useState(userdata[0]?.phonenumber);

  const [msg, setMsg] = useState('You are required to confirm payment');

  const ourref = getCurrentTimestamp();

  // const getAccessToken = async () => {
  //   var authToken = await getBearerToken();
  //   if (authToken !== '' || authToken !== null) {
  //     setBearerToken(authToken);
  //     //alert(authToken);
  //   }
  // };

  // Define an async function to call getRequestStatus
  const callGetRequestStatusRepeatedly = (token, requestId) => {
    let stopInterval = false;
    let previousStatus = null; // Store the previous status

    const intervalId = setInterval(async () => {
      try {
        if (!stopInterval) {
          const result = await getRequestStatus(token, requestId);

          if (result !== null && typeof result !== 'undefined') {
            const paymentStatus = result.requestStatus;

            console.log('Result:', paymentStatus);

            // Only call onPaymentResult if status changes
            if (paymentStatus !== previousStatus) {
              onPaymentResult(result);
              previousStatus = paymentStatus; // Update previous status
            }

            // Stop interval if paymentStatus is not Pending
            if (paymentStatus !== 'Pending') {
              stopInterval = true;
              clearInterval(intervalId);
            }
          } else {
            console.log('No result available.');
            stopInterval = true;
            clearInterval(intervalId);
          }
        } else {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error('Error:', error);
        stopInterval = true;
        clearInterval(intervalId);
      }
    }, 3000);
  };

  // Call callGetRequestStatus function

  const makePayment = async () => {
    onPaymentInitiated();
    const newuuid = generateUUID();
    //===========================
    var authToken = await getBearerToken();
    if (authToken !== '' && authToken !== null) {
      // Use && instead of ||
      try {
        const result = await requestPayment(
          authToken,
          userphone,
          amountToPay,
          msg,
          newuuid,
        );
        const paymentResult = JSON.stringify(result);
        const requestId = result.requestId;
        callGetRequestStatusRepeatedly(authToken, requestId); // Use authToken instead of bearerToken
      } catch (er) {
        console.log('authToken: ' + authToken);
        console.log('userphone: ' + userphone);
        console.log('amountToPay: ' + amountToPay);
        console.log('msg: ' + msg);
        console.log('newuuid: ' + newuuid);
        console.log('Error: ' + er);
      }
    }
    //==========================
  };

  return (
    <View style={styles.spenncontainer}>
      <TouchableOpacity onPress={() => makePayment()}>
        <Image
          style={{
            width: 120,
            height: 50,
          }}
          source={require('./../assets/logo_PNG.png')}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  spenncontainer: {},
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9bb3de;',
    borderRadius: 5,
  },
});
