import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Button, Dimensions, Image, Ionicons } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-web';
import NavBar from './NavBar';
import User from '../database/user';
import { getAuth, signOut } from "firebase/auth";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfilePicture = () => {

    const [userData, setUserData]= useState(null)

    useEffect(async ()=>{
        const auth = getAuth();
        if(userData === null) {
          const user = new User();
          console.log("Auth Data: ", auth);
          const userDataNew = await user.getUserInfo(auth.currentUser.uid);
          console.log(userDataNew);
          setUserData(userDataNew);
      }

    })

    return(
            <ScrollView>

                <Image source={{uri: "https://images.dog.ceo/breeds/poodle-miniature/n02113712_3049.jpg"}} style= {styles.userImg}></Image>
                <View style= {styles.titleBar}>
                <Text style ={styles.userName}> {userData ? userData.displayName : "Hello"} </Text>
                </View>
                <View>
                    <Text style = {styles.titleBar}> {userData ? userData.age : "Hello"} </Text>
                </View>
                <View>
                    <Text style = {styles.titleBar}> {userData ? userData.Gender : "Hello"} </Text>
                </View>

                <View>
                    <Text style = {styles.titleBar}> {userData ? userData.Height : "Hello"} </Text>
                </View>
            </ScrollView>


    );

}

const ProfileScreen = () => {
    const { user, logout } = userContext([]);


}

// Main profile function
function Profile({ navigation }) {
    return (
        <View
            flex={1}
            backgroundColor='#96BDC6'
            alignItems='center'
            justifyContent='center'
            paddingTop={20}
            paddingBottom={80}
            width={screenWidth}
            height={screenHeight}
        >
            <ProfilePicture/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,

    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    }

});

export default Profile;
