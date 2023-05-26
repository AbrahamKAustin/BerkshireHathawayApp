import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './js/Home';
import Login from './js/Login';
import Signup from './js/Signup';
import LoginSignup from './js/LoginSignup';
import TasksPage from './js/TasksPage';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
