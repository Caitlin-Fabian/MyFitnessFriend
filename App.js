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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("Auth:", auth);
        // console.log("Here is the auth: ", auth);
      }
    })
    //Removed this function
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="HomeScreen"  >{props => <HomeScreen {...props} extraData={user} />}</Stack.Screen>
        <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <Stack.Screen name="LoginScreen" >{props => <LoginScreen {...props} extraData={user} />}</Stack.Screen>
        <Stack.Screen name="Profile" >{props => <Profile {...props} extraData={user} />}</Stack.Screen>
        <Stack.Screen name="CalorieTracker" component={CalorieTracker} />
        <Stack.Screen name='ExerciseRoutines' component={ExerciseRoutines} />
        <Stack.Screen name='ExerciseIntervals' component={ExerciseIntervals} />
        <Stack.Screen name='NavBar' component={NavBar} />
      </Stack.Navigator>


      </NavigationContainer>

  );
}
