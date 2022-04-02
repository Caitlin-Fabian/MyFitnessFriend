import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, { useState } from 'react';

//TODO alot of things and figure out drop downs and buttons

//Variables to get the width and height of the screen (That way it works for any screensize(?))
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const tableConfig = {

}








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

//Title


//Dropdown
const Dropdown = () => {
    return (
        <View style={styles.box}>
            <h1>Custom Select/dropdown</h1>
            <DropDownContainer>
              <DropDownHeader>Enter Food</DropDownHeader>
              <DropDownListContainer>
                <DropDownList>
                  <ListItem>Mangoes</ListItem>
                  <ListItem>Apples</ListItem>
                  <ListItem>Oranges</ListItem>
            </DropDownList>
          </DropDownListContainer>
        </DropDownContainer>
      </View>
    );
}

//SearchButton





//NavBar stuff I stole
const NavBar = () => {
    return (
      <View style={styles.navBar}>
  
      </View>
    )
  }