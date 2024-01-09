import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Home';
import CV from '../screens/CV/cv';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Upload from '../screens/Upload/Upload';
import Membership from '../screens/Membership/Membership';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home" // Assuming Login is the initial route
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CV" component={CV} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="Membership" component={Membership} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default MyStack;
