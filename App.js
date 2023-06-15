import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './js/Home';
import Login from './js/Login';
import Signup from './js/Signup';
import LoginSignup from './js/LoginSignup';
import TasksPage from './js/TasksPage';
import ProfilePage from './js/ProfilePage';
import AnalyticsPage from './js/AnalyticsPage';
import EditPage from './js/EditPage';

const Stack = createStackNavigator();

const App = () => {
  return (
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
  );
};

export default App;
