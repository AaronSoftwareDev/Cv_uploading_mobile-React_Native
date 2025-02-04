// App.js or index.js
import Upload from './screens/Upload/Upload';
import Register from './screens/Register/Register';
import CV from './screens/CV/cv';
import {Provider} from 'react-redux';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './redux/store';
import BootSplash from 'react-native-bootsplash';
import MyStack from './navigation/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer
          onReady={() => {
            BootSplash.hide();
          }}>
          <MyStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
