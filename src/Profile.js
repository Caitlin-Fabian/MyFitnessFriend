import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Button, Dimensions, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import User from '../database/user';
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Alert } from 'react-native-web';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

function Profile({ navigation }) {

    const [userData, setUserData]= useState(null);
    const [display, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');

    useEffect(async ()=>{
        const auth = getAuth();
        const {uid} = auth.currentUser;
        const userData = await User.getUserInfo(uid);
        setUserData(userData);
    })
    const LogOut = ()=>{
        signOut(getAuth());
        navigation.navigate('RegistrationScreen');
    }

    const [edit, setEdit] = useState(false);

    const changeUserName = (val) => {
        setUsername(val);
    };

    const changeAge = (val) => {
        setAge(val);
    };

    const changeGender = (val) => {
        setGender(val);
    };

    const handleUpdate = async()=> {

        fireStore()
        .collection('users')
        .doc(user.uid)
        .update({
            displayName: userData.displayName,
            age: userData.age,
            gender: userData.gender,
        })
        .then(()=>{
            console.log('User Updated');
            Alert.alert('Profile Updated!');
        })
    }


    return(
        <SafeAreaView style={styles.container}>
                <ScrollView style={{backgroundColor: '#96BDC6', flex: 1}}>
                    <View style={styles.container}>
                        <View >
                            <TouchableOpacity 
                            onPress={() => LogOut()} 
                            style={{position: 'absolute', backgroundColor: '#dcdcdc', borderWidth: 1, padding: 10, borderRadius: 10, left: 80, bottom: 10}}>
                            <Text style= {styles.buttonText}> Log Out</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                            onPress={() => setEdit(true)} 
                            style={{position: 'absolute', backgroundColor: '#dcdcdc',  borderWidth: 1,padding: 10, borderRadius: 10, right: 100, bottom: 10}}>
                            <Text style= {styles.buttonText}> Edit</Text>
                            </TouchableOpacity>
                        </View>
               
                    <Image
                        style={styles.userImg} 
                        source={userData ? userData.userImg : { uri: "https://images.dog.ceo/breeds/poodle-miniature/n02113712_3049.jpg" }}
                    />
                    <Text style={styles.userName}> {userData? userData.displayName: "User Name"} </Text>
                    <Text style={styles.titleBar}> Age {userData ? userData.age : "0"} </Text>
                    <Text style={styles.titleBar}> Gender {userData ? userData.Gender : "Female"} </Text>
                    <Text style={styles.titleBar}> Height {userData ? userData.Height : "0"} </Text>
                    
                    </View>

                    <Modal visible={edit}>
                    <View style={styles.container}>
                        <Image
                        style ={styles.userImg}
                        source ={{uri: "https://images.dog.ceo/breeds/poodle-miniature/n02113712_3049.jpg"}}
                        />
                        <Text style={{fontSize: 36, padding: 10}}>Profile Edit</Text>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='UserName'
                            onChangeText={changeUserName}
                        />
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='Age'
                            onChangeText={changeAge}
                        />
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='Gender'
                            onChangeText={changeGender}
                        />
                        <Button title='exit' onPress={() => setEdit(false)}/>
                        <Button title='Save' onPress={() => handleUpdate()}/>
                    </View>
                    </Modal>
                    
                     
                </ScrollView>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#96BDC6',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:(screenHeight * 0.1),
        paddingBottom:(screenHeight * 0.15),
        width:(screenWidth),
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
