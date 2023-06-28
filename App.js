import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import jwtDecode from 'jwt-decode';

import Home from './js/Home';
import Login from './js/Login';
import Signup from './js/Signup';
import LoginSignup from './js/LoginSignup';
import TasksPage from './js/TasksPage';
import ProfilePage from './js/ProfilePage';
import AnalyticsPage from './js/AnalyticsPage';
import EditPage from './js/EditPage';

import { AuthContext } from './js/AuthContext';  // import the context you created

const Stack = createStackNavigator();

const App = () => {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Try to fetch the token from secure store when the app starts
    SecureStore.getItemAsync('jwt')
      .then(token => {
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          // Check if the token has expired
          if (decodedToken.exp < currentTime) {
            authContext.signOut();
          } else {
            setUserToken(decodedToken);
          }
        }
      });
  }, []);

  const authContext = {
    signIn: async (token) => {
      const decodedToken = jwtDecode(token)
      setUserToken(decodedToken);
      await SecureStore.setItemAsync('jwt', token);
    },
    signOut: async () => {
      setUserToken(null);
      await SecureStore.deleteItemAsync('jwt');
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginSignup" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginSignup" component={LoginSignup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TasksPage" component={TasksPage} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="AnalyticsPage" component={AnalyticsPage} />
          <Stack.Screen name="EditPage" component={EditPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
