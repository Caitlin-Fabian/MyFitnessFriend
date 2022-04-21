import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './src/Profile'
import ExerciseRoutines from './src/ExcerciseRoutines';
import RegistrationScreen from './src/RegistrationScreen';
import NavBar from './src/NavBar';
import LoginScreen from './src/LoginScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeScreen from './src/HomeScreen';


const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
        >
        <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen}/>
        <Stack.Screen name="HomeScreen" component={NavBar}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
