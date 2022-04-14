import React, { useState, useEffect } from 'react';
import HomeScreen from './src/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './src/Profile'
import CalorieTracker from './src/CalorieTracker'
import ExerciseRoutines from './src/ExcerciseRoutines';
import ExerciseIntervals from './src/ExcerciseInterval';
import RegistrationScreen from './src/RegistrationScreen';
import NavBar from './src/NavBar';
import LoginScreen from './src/LoginScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <NavBar />
    </NavigationContainer>
  );
}
