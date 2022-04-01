import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, { useState } from 'react';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function getPicture(){
    return (
        <View style={styles.container}>
        <Image
            source ={require("assets\favicon.png")}
            //Round shape
            style={{
                width: 200,
                height: 200,
                borderRadius: 200 / 2
              }}
        />

        </View>
    )
}

// Profile Screen
function ProfileScreen(){
    return(
        <View
            flex = {1}
            backgroundColor = '#96BDC6'
            alignItems = 'center'
            justifyContent = 'center'
            paddingTop ={20}
            paddingBottom = {80}
            width = {screenWidth}
            height = {screenHeight}
        >
            <ProfilePicture />

        </View>
    )
}

function ProfilePicture(){
    return(
        <View
        flex = {1}
        
        ></View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerText:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },

});