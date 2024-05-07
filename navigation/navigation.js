import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/Home';
import Home_emp from '../screens/Home_emp/Home_emp';
import CV from '../screens/CV/cv';
import CV_emp from '../screens/CV_emp/cv_emp';
import ChangePassword from '../screens/Change_password/ChangePassword';
import CV_agent from '../screens/CV_agent/cv_agent';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';

import Login from '../screens/Login/Login';
import Login_emp from '../screens/Login_Employer/Login_emp';
import Register from '../screens/Register/Register';
import Register_emp from '../screens/Register_Employer/Register_emp';
import Upload from '../screens/Upload/Upload';
import JobSeeker from '../screens/jobSeeker/JobSeeker';
import JobSeeker_agent from '../screens/jobSeeker_agent/JobSeeker_agent';
import Membership from '../screens/Membership/Membership';
import Membership_emp from '../screens/Membership_emp/Membership_emp';
import Contact_emp from '../screens/Contact_emp/Contact_emp';
import JobPosting from '../screens/jobPosting/jobPosting';
import Joblist from '../screens/joblist/joblist';
Welcome;
import Welcome from '../screens/Welcome/Welcome';
import Cvdetails_emp from '../screens/CVDetails_emp/Cvdetails_emp';
import JobDescription from '../screens/JobDescription/JobDescription';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home" // Assuming Login is the initial route
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Home_emp" component={Home_emp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Login_emp" component={Login_emp} />
      <Stack.Screen name="CV" component={CV} />
      <Stack.Screen name="CV_emp" component={CV_emp} />
      <Stack.Screen name="JobSeeker" component={JobSeeker} />
      <Stack.Screen name="JobSeeker_agent" component={JobSeeker_agent} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="CV_agent" component={CV_agent} />
      <Stack.Screen name="Cvdetails_emp" component={Cvdetails_emp} />
      <Stack.Screen name="Membership" component={Membership} />
      <Stack.Screen name="JobDescription" component={JobDescription} />
      <Stack.Screen name="Membership_emp" component={Membership_emp} />
      <Stack.Screen name="Contact_emp" component={Contact_emp} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Register_emp" component={Register_emp} />
      <Stack.Screen name="JobPosting" component={JobPosting} />
      <Stack.Screen name="Joblist" component={Joblist} />
    </Stack.Navigator>
  );
}

export default MyStack;
