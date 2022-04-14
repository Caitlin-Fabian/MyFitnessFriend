import { Text, View, Dimensions, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import User from '../database/user';



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


function LoginScreen({ navigation }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);

    async function signIn() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('HomeScreen', { username: user.displayName });
            })
            .catch((err) => {
                console.log(err.code, err.message);
            })
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
            <Text flex={1}>Register Below</Text>
            <TextInput placeholder="Username" onChangeText={(username) => setUsername(username)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <TextInput placeholder="Password" onChangeText={(password) => setPassword(password)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} style={{ padding: 15, borderWidth: 1, borderColor: 'black', borderRadius: 35, width: screenWidth * 0.8, height: screenWidth * 0.1 }} />
            <Button title="Submit!" onPress={() => signIn()} />
            <Button
                title="Create an Account"
                onPress={() => navigation.navigate('ExerciseRoutines')}></Button>

        </View>
    )
}

export default LoginScreen;
