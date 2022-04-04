import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, { useState } from 'react';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


function CalorieTrackerScreen({ navigation }) {
    return (
        <View
            flex={1}
            backgroundColor='#96BDC6'
            alignItems='center'
            justifyContent='center'
            paddingTop={screenHeight * 0.1}
            paddingBottom={screenHeight * 0.15}
            width={screenWidth}
            height={screenHeight}
        >
            <Text>Hello!</Text>
        </View>
    )
}

export default CalorieTrackerScreen;