import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, Button} from '@rneui/themed';
import styles from './styles';

const HomeScreen = ({navigation}) => {
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
        <Card.Title style={styles.cardTitle}>
          <Text style={{...styles.fonts, fontSize: 24, fontWeight: '600'}}>
            CV WORLD
          </Text>
        </Card.Title>
      </Card>
      <Text
        style={{
          ...styles.whiteText,
        }}>
        Ditch the hassle of traditional job applications! Simply upload your CV
        in a snap and let CV World transform your professional story into a
        visually appealing masterpiece.
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          size="lg"
          color="#235A8A"
          onPress={() => navigation.navigate('Login')}
          containerStyle={{
            backgroundColor: '#235A8A',
            width: 270,
            height: 62,
            marginHorizontal: 30,
            marginVertical: 5,
            borderWidth: 1,
            borderColor: '#5188B6',
          }}>
          <Text style={{fontSize: 24, fontWeight: '300', color: 'white'}}>
            I am a job seeker
          </Text>
        </Button>
        <Button
          color="#235A8A"
          size="lg"
          containerStyle={{
            backgroundColor: '#235A8A',
            width: 270,
            height: 62,
            marginHorizontal: 30,
            marginVertical: 5,
            borderWidth: 1,
            borderColor: '#5188B6',
          }}>
          <Text style={{fontSize: 24, fontWeight: '300', color: 'white'}}>
            I am an employer
          </Text>
        </Button>

        <TouchableOpacity onPress={() => console.log('Learn More pressed')}>
          <Text style={styles.learnMoreLink}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
