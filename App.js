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
import OtherUserAnalytics from './js/OtherUserAnalytics'
import EditPage from './js/EditPage';
import LeaderboardPage from './js/LeaderboardPage';
import LoadingScreen from './js/LoadingScreen';
import {LeaderboardProvider} from './js/LeaderboardContext'
import {UserProvider} from './js/UserContext'
import { AuthContext } from './js/AuthContext';



const Stack = createStackNavigator();

const App = () => {

  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync('jwt')
      .then(token => {
        if (token) {
          const decodedToken = jwtDecode(token);
          //console.log('Decoded token on load:', decodedToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            setUserToken(null); 
          } else {
            setUserToken(decodedToken);
          }
        }
        setIsLoading(false);
      });
  }, []);

  const authContext = {
    userToken,
    signIn: async (token) => {
      await SecureStore.setItemAsync('jwt', token);
      const decodedToken = jwtDecode(token)    
      //console.log('Decoded token:', decodedToken); 

      setUserToken(decodedToken);
    },
    signOut: async () => {
      setUserToken(null);
      await SecureStore.deleteItemAsync('jwt');
    },
    isLoading,
  };

  if (isLoading) {
    return <LoadingScreen />; 
  }

  return (
    <AuthContext.Provider value={authContext}>
      {userToken ? (
        <LeaderboardProvider>
          <UserProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="TasksPage" component={TasksPage} />
                  <Stack.Screen name="ProfilePage" component={ProfilePage} />
                  <Stack.Screen name="AnalyticsPage" component={AnalyticsPage} />
                  <Stack.Screen name="EditPage" component={EditPage} />
                  <Stack.Screen name="LeaderboardPage" component={LeaderboardPage} />
                  <Stack.Screen name="OtherUserAnalytics" component={OtherUserAnalytics} />
                </Stack.Navigator>
              </NavigationContainer>
          </UserProvider>
        </LeaderboardProvider>
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginSignup" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginSignup" component={LoginSignup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Provider>

  );
}
export default App;
