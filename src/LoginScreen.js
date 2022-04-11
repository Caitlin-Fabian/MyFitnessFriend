import { Text, View, Dimensions, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import User from '../database/user';




const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


function LoginScreen(props) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    async function signIn() {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                props.navigation.navigate('HomeScreen', { username: user.displayName });
            })
            .catch((err) => {
                console.log(err.code, err.message);
            })
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                props.navigation.navigate('HomeScreen', { extraData: user })
            }
        })
    }, [])


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
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <Button title="Submit!" onPress={() => signIn()} />
            <Button
                title="Create an Account"
                onPress={() => props.navigation.navigate('RegistrationScreen')}></Button>

        </View>
    )
}

export default LoginScreen;
