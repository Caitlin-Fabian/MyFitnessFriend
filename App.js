import { View } from 'react-native';
import React from 'react';
import HomeScreen from './src/HomeScreen'

export default function App() {
  return (
    <View
      flex={1}
      backgroundColor='#fff'
      alignItems='center'
      justifyContent='center'
      paddingTop={80}
      paddingBottom={80}
    >
      <HomeScreen />
    </View>
  );
}

