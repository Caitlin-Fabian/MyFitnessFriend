import React from 'react';
import HomeScreen from './src/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './src/Profile'
import CalorieTracker from './src/CalorieTracker'
import ExerciseRoutines from './src/ExcerciseRoutines';
import ExerciseIntervals from './src/ExcerciseInterval';

const Stack = createNativeStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{ headerShown: true }}

      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CalorieTracker" component={CalorieTracker} />
        <Stack.Screen name='ExerciseRoutines' component={ExerciseRoutines} />
        <Stack.Screen name='ExerciseIntervals' component={ExerciseIntervals} />
      </Stack.Navigator>


    </NavigationContainer >

  );
}


