import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Button, Dimensions, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import User from '../database/user';
import { getAuth, signOut, updateProfile, fireStore } from "firebase/auth";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function Profile({ navigation, props }) {

    const [displayName, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [edit, setEdit] = useState(false);

    const [refresh, setRefresh] = useState(0);
    const [userData, setUserData] = useState(null);

    function infoHandler() {
        let newName = userData.displayName;
        let newAge = userData.age;
        let newGender = userData.gender;
    }

    useEffect(async () => {
        if (userData === null) {
            const auth = getAuth();
            const { uid } = auth.currentUser;
            const userData = await User.getUserInfo(uid);
            setUserData(userData);
            infoHandler();
            console.log(auth);
        }
    })
    const LogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate('LoginScreen', { extraData: {} });
        })

    }

    const EditInfo = async () => {
        const auth = getAuth();
        const newInfo = await User.updateInfo(displayName, gender, age, height, auth.currentUser.uid);
        console.log(newInfo);
        setUserData(newInfo);
        infoHandler(newInfo);   //Sets the new userInfo in the parent component
        setRefresh();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ backgroundColor: '#96BDC6', flex: 1 }}>
                <View style={styles.container} infoRefresh={infoHandler}>
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
                    <View style={styles.userInfo}>
                       
                        <Text style={{fontSize: 26, textAlign: 'center', fontWeight: 'bold'}}>{userData ? userData.displayName : "User Name"} </Text>
                        
                        <Text style={styles.infoText}> Age: {userData ? userData.age : "0"} </Text>
                        <Text style={styles.infoText}> Gender: {userData ? userData.gender : "Person"} </Text>
                        <Text style={styles.infoText}> Height: {userData ? userData.height : "0"} </Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center', justifyContent: "space-between", }}>Friends: </Text>
                    <FriendChart />

                </View>

                <View>
                    <Modal visible={edit}>
                        <View style={styles.container}>

                            <Text style={{ fontSize: 36, padding: 10 }}>Profile Edit</Text>
                            <TextInput
                                style={styles.inputContainer}
                                placeholder='UserName'
                                onChangeText={text => setUsername(text)}
                                placeholderTextColor='gray'
                            />
                            <TextInput
                                style={styles.inputContainer}
                                placeholder='Age'
                                onChangeText={text => setAge(text)}
                                placeholderTextColor='gray'
                            />
                            <TextInput
                                style={styles.inputContainer}
                                placeholder='Gender'
                                onChangeText={text => setGender(text)}
                                placeholderTextColor='gray'
                            />
                            <TextInput
                                style={styles.inputContainer}
                                placeholder='Height'
                                onChangeText={text => setHeight(text)}
                                placeholderTextColor='gray'
                            />

                            <Button title='exit' onPress={() => setEdit(false)} />
                            <Button title='Save' onPress={() => {
                                EditInfo();
                                setRefresh();
                                setEdit(false);
                            }} />
                        </View>
                    </Modal>
                </View>

            </ScrollView>
        </SafeAreaView>


    );


}
const FriendChart = () => {
    return (
        <View style={styles.graphHolder}>

        </View>
    )
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
        borderWidth: 1
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
    infoText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16,
        
    },
    inputContainer: {
        borderColor: '#000000',
        borderWidth: 1,
        width: 200,
        padding: 8,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        color: 'black',
    },
    graphHolder: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderRadius: 15,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1.5,
        marginHorizontal: 20,
        marginTop: 10,
        width: (screenWidth * 0.8),
        minHeight: (screenHeight * 0.15),
        justifyContent: 'center',
        backgroundColor: '#E8CCBF',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        width: screenWidth * 0.5,
        margin: 20,
        padding: 10
    }
});

export default Profile;
