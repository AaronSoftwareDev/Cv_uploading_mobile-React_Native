import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Button} from '@rneui/themed';
import styles from './styles';
import {horizontalScale, scaleFontSize, verticalScale} from '../../scaling';

const Home_emp = ({navigation}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingBottom: 0,
        margin: 0,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
      }}>
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
            Unlock Your Dream Team: Explore CV World for the Perfect Match to
            Fill Your Job Opening!
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: verticalScale(15),
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Button
            size="lg"
            color="#235A8A"
            onPress={() => navigation.navigate('CV_emp')}
            containerStyle={{
              backgroundColor: '#235A8A',
              width: horizontalScale(270),

              marginVertical: verticalScale(5),
              borderWidth: 1,
              borderColor: '#5188B6',
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Regular',
                fontSize: scaleFontSize(24),
                color: 'white',
              }}>
              View Job Seekers
            </Text>
          </Button>
          <Button
            size="lg"
            color="#235A8A"
            onPress={() => navigation.navigate('JobPosting')}
            containerStyle={{
              backgroundColor: '#235A8A',
              width: horizontalScale(270),

              marginVertical: verticalScale(5),
              borderWidth: 1,
              borderColor: '#5188B6',
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Regular',
                fontSize: scaleFontSize(24),
                color: 'white',
              }}>
              Post a Job
            </Text>
          </Button>
          <Button
            color="#235A8A"
            size="lg"
            onPress={() => navigation.navigate('Contact_emp')}
            containerStyle={{
              backgroundColor: '#235A8A',
              width: horizontalScale(270),

              marginVertical: verticalScale(5),
              borderWidth: 1,
              borderColor: '#5188B6',
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Regular',
                fontSize: scaleFontSize(24),
                color: 'white',
              }}>
              Contact agent
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home_emp;
