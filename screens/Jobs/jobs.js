import React from 'react';
import {View, Image} from 'react-native';
import {Card, Button, Text, SearchBar} from '@rneui/themed';
import styles from './styles'; // Import the styles from the separate file
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faRightToBracket,
  faEye,
  faEyeSlash,
  faSearch,
  faLeftLong,
  faFileArrowUp,
  faBriefcase,
  faMaximize,
} from '@fortawesome/free-solid-svg-icons';

const CV = () => {
  const users = [
    {
      name: 'brynn Scholascy',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    },
  ];

  return (
    <View
      style={{
        marginTop: 0,
        paddingHorizontal: 0,
        width: '100%',
        flex: 1,
        backgroundColor: '#2D70AA',
      }}>
      <Card containerStyle={styles.cardContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Card.Image
            style={styles.image}
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
        {users.map((u, i) => (
          <View key={i} style={styles.user_intial}>
            <Image
              style={styles.image_upload}
              resizeMode="cover"
              source={{uri: u.avatar}}
            />
            <Text style={styles.name}>{u.name}</Text>
          </View>
        ))}
      </View>
      <View>
        <Text style={styles.subscriptionText_upload}>My CV</Text>
        <View style={styles.search}>
          <SearchBar round lightTheme placeholder="Type Here..." value={''} />
        </View>
        <Card style={{marginBottom: 12, padding: 0}}></Card>
        <Card style={{marginBottom: 12, padding: 0}}></Card>
        <Text style={styles.totalViews}>Total Views: </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 15}}></View>
      {/* Bottom Navigation */}
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
        {/* Example buttons - Replace with your navigation */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faLeftLong}
            style={{color: '#0d0d0d', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 5}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Upload')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <FontAwesomeIcon icon={faFileArrowUp} style={{color: '#0d0d0d'}} />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Upload CV
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Jobs')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <FontAwesomeIcon
            icon={faBriefcase}
            style={{color: '#0d0d0d', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Jobs
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => handleNavigation('Screen4')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <FontAwesomeIcon icon={faMaximize} style={{color: '#0d0d0d'}} />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Expand View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{color: '#0d0d0d', marginLeft: 6}}
          />
          <Text style={{color: '#ffffff', marginTop: 4, fontSize: 12}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CV;
