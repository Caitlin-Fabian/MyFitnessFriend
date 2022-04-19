import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, { useState } from 'react';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const tableConfig = {

}

//Title



//CalorieTracker Screen
export default function App() {
    return (
        <View style={styles.container}>
        <Title />
        <Dropdown />
        <SearchButton />
        <StatusBar style="auto" showHideTransition={'fade'} />
        <NavBar />
    </View>
    );
}


//Dropdown
const Dropdown = () => {
    return (
      <View style={styles.box}>
        <select name="pets" id="pet-select">
        {
        data.map((foodOptions) => (
              <option key={foodOptions.id}>{foodOptions.name}</option>
            ))
        }
</select>
        </View>
    );
}

//SearchButton
const button = () => {
  return (
    <View style = {Styles.Button}>
      <button type = "Button"></button>
    </View>
  )
}



//Table
const table = () => {
  return (
    <View style={styles.box}>
      <table class = "calorieLog">
        <title></title>
        <thead class= "calorieTableLog">
          <tr class = "calorieTableLog">
            <td>Food</td>
            <td>Calories</td>
          </tr>
        </thead>
        <tbody class ="calorieTableLog">
          {
            data.map((food) => (
              <tr key={food.id}>
                <td>{food.name}</td>
                <td>{food.calorie}</td>
                <td/>
                </tr>
            ))
          }
        </tbody>
        <tfoot>
          <td>Total Calories: </td>
          <td id="totalCalories">0</td>
        </tfoot>
      </table>
    </View>
  )
}


//NavBar
const NavBar = () => {
    return (
      <View style={styles.navBar}>
  
      </View>
    )
  }
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
