import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Button, Text} from '@rneui/themed';
import styles from './styles';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{backgroundColor: '#2D70AA'}}>
      <View
        style={{
          paddingHorizontal: horizontalScale(0),
          width: '100%',
          flex: 1,
          backgroundColor: '#2D70AA',
          marginBottom: 15,
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
                fontFamily: 'RobotoSlab-SemiBold',
                fontSize: scaleFontSize(35),
                fontWeight: '600',
                color: '#235A8A',
              }}>
              CV WORLD
            </Text>
          </Card.Title>
        </Card>
        <View>
          <Text
            style={{
              ...styles.whiteText,
            }}>
            Ditch the hassle of traditional job applications! Simply upload your
            CV in a snap and let CV World transform your professional story into
            a visually appealing masterpiece.
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: verticalScale(15),
          }}>
          <Button
            size="lg"
            color="#235A8A"
            onPress={() => navigation.navigate('Login')}
            containerStyle={{
              backgroundColor: '#235A8A',
              width: horizontalScale(270),
              marginHorizontal: horizontalScale(30),
              marginVertical: verticalScale(5),
              borderWidth: 1,
              borderColor: '#5188B6',
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Regular',
                fontSize: scaleFontSize(24),
                fontWeight: '300',
                color: 'white',
              }}>
              I am a job seeker
            </Text>
          </Button>
          <Button
            color="#235A8A"
            size="lg"
            onPress={() => navigation.navigate('Login_emp')}
            containerStyle={{
              backgroundColor: '#235A8A',
              width: horizontalScale(270),
              marginHorizontal: horizontalScale(20),
              borderWidth: 1,
              borderColor: '#5188B6',
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Regular',
                fontSize: scaleFontSize(24),
                fontWeight: '300',
                color: 'white',
              }}>
              I am an employer
            </Text>
          </Button>

          {/* <TouchableOpacity onPress={() => console.log('Learn More pressed')}>
          <Text style={styles.learnMoreLink}>Learn More</Text>
        </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
