import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, { useState } from 'react';
import SearchBar from "./CalorieTrackerComponenents/SearchBar";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//Title



//CalorieTracker Screen
function CalorieTrackerScreen({navigation}) {
    return (
        <div className="App">
          <SearchBar placeholder = "Enter Food Item" data = {FoodData} />
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
        </div>
    );
}
//On Select from the Search Bar add piece of data to a table



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


export default CalorieTrackerScreen;
