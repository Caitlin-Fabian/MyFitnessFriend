import { Text, View, Dimensions, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import User from '../database/user';
import NavBar from './NavBar';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


function LoginScreen({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const register = async () => {
        if (confirmPassword === password) {
            const user = new User(username, email, password);
            const docID = await user.addUser();
            console.log("Document added with ID: ", docID.id);
        } else {
            alert("Passwords do not match");
        }
    }

    return (
        <View
            flex={1}
            backgroundColor='#96BDC6'
            alignItems='center'
            justifyContent="space-between"
            paddingTop={screenHeight * 0.1}
            paddingBottom={screenHeight * 0.15}
            width={screenWidth}
            height={screenHeight}
        >
            <Text flex={1}>Login Below</Text>
            <TextInput placeholder="Username" onChangeText={(username) => setUsername(username)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <TextInput placeholder="Password" onChangeText={(password) => setPassword(password)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <TextInput placeholder="Confirm Password" onChangeText={(password) => setConfPassword(password)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <Button title="Submit!" onPress={() => register()} />
            <NavBar navigation={navigation} />
        </View>
    )
}


export default LoginScreen;