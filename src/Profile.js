import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Button, Dimensions, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import User from '../database/user';
import { getAuth, signOut, updateProfile,fireStore } from "firebase/auth";
import { Alert } from 'react-native-web';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function Profile({ navigation,props }) {
    
    const [displayName, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [edit, setEdit] = useState(false);

    const [refresh, setRefresh] = useState(0);
    const [userData, setUserData] = useState(null);

    function infoHandler(){
        let newName = userData.displayName;
        let newAge = userData.age;
        let newGender = userData.gender;

        setUsername(newName);
        setAge(newAge);
        setGender(newGender);
    }

    useEffect(async () => {
        if (userData === null) {
            const auth = getAuth();
            const { uid } = auth.currentUser;
            const userData = await User.getUserInfo(uid);
            setUserData(userData);
            //infoHandler();
        }
    })
    const LogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate('LoginScreen', { extraData: {} });
        })

    }

    function EditInfo (displayName,age, gender) {
        const auth = getAuth();
        const newInfo = new User.updateInfo(displayName,gender,age, auth.currentUser.uid);
        infoHandler(newInfo);   //Sets the new userInfo in the parent component
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ backgroundColor: '#96BDC6', flex: 1 }}>
                <View style={styles.container}>
                    <View >
                        <TouchableOpacity
                            onPress={() => LogOut()}
                            style={{ position: 'absolute', backgroundColor: '#dcdcdc', borderWidth: 1, padding: 10, borderRadius: 10, left: 80, bottom: 10 }}>
                            <Text style={styles.buttonText}> Log Out</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => setEdit(true)}
                            style={{ position: 'absolute', backgroundColor: '#dcdcdc', borderWidth: 1, padding: 10, borderRadius: 10, right: 100, bottom: 10 }}>
                            <Text style={styles.buttonText}> Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <Image
                        style={styles.userImg}
                        source={require('../assets/Larry.png')}
                    />
                    <Text style={styles.userName}> {userData ? userData.displayName : "User Name"} </Text>
                    <Text style={styles.titleBar}> Age {userData ? userData.age : "0"} </Text>
                    <Text style={styles.titleBar}> Gender {userData ? userData.Gender : ""} </Text>
                    <Text style={styles.titleBar}> Height {userData ? userData.Height : "0"} </Text>

                </View>

                <View>
                <Modal visible={edit}>
                <View style={styles.container}>
                    
                    <Text style={{ fontSize: 36, padding: 10 }}>Profile Edit</Text>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='UserName'
                        onChange={text => setUsername(text)}
                    />
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='Age'
                        onChangeText={text => setAge(text)}
                    />
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='Gender'
                        onChangeText={text => setGender(text)}
                    />
                    <Button title='exit' onPress={() => setEdit(false)} />
                    <Button title='Save' onPress={() => {
                        EditInfo(displayName, age, gender);
                        setEdit(false);
                    }}/>
                </View>
            </Modal>
            </View>


            </ScrollView>
        </SafeAreaView>


    );

    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96BDC6',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (screenHeight * 0.1),
        paddingBottom: (screenHeight * 0.15),
        width: (screenWidth),
        //height:(screenHeight),
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginTop: 20,
    },
    button: {
        position: 'absolute',
        backgroundColor: '#dcdcdc',
        padding: 10,
        borderRadius: 10,
        left: 50,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,

    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    inputContainer: {
        borderColor: '#000000',
        borderWidth: 1,
        width: 200,
        padding: 8,
        marginVertical: 10
    },
});

export default Profile;
