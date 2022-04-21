import { Text, View, Dimensions, Button, TextInput, StyleSheet, ScrollView, SafeAreaView, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import ErrorHandle from '../database/errorHandle'




const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


function LoginScreen(props) {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);


  async function signIn() {
    const auth = getAuth();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User Credentials", userCredential);
          props.navigation.navigate('HomeScreen', { extraData: userCredential });
          setEmail(null);
          setPassword(null);
        })
        .catch((err) => {
          console.log(err.code, err.message);
          alert(ErrorHandle.parseError(err.code))
        })
    } else {
      alert("Missing Info!");
    }
  }

  useEffect(() => {
    const auth = getAuth();
    if (!user) {
      onAuthStateChanged(auth, (userInfo) => {
        if (userInfo) {
          setUser(userInfo);
          console.log("Here is the auto login credentials: ", userInfo);
          console.log("Here are the props we have access to: ", props);
          props.navigation.navigate('HomeScreen', { extraData: userInfo });
        }
      })
    }

  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image source={require('../assets/logo1.png')}
              resizeMode='contain'
              style={{
                width: 150,
                height: 150,
                marginTop: 50
              }} />
          </View>
          <View style={styles.form}>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} style={styles.input} value={email} />
            <TextInput placeholder="Password" onChangeText={(password) => setPassword(password)} secureTextEntry={true} style={styles.input} value={password} />
            <View style={styles.buttonHolder}>
              <TouchableOpacity style={styles.button} onPress={() => signIn()}>
                <Text style={{ textAlign: 'center'}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('RegistrationScreen')}>
                <Text style={{ textAlign: 'center' }}>Create an Account</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#96BDC6',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
    minWidth: screenWidth,
    flexDirection: 'column',
    flex: 1
  },
  input: {
    padding: 12,
    fontSize: 14,
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 10,
    width: screenWidth * 0.7,
    height: screenWidth * 0.12,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white'
  },
  header: {
    height: screenHeight * 0.1,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center'
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1.5,
    padding: 13,
    width: screenWidth * 0.2,
    backgroundColor: 'white'
  },
  buttonHolder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navButton: {
    borderRadius: 10,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1.5,
    padding: 5,
    width: screenWidth * 0.4,
    backgroundColor: 'white'
  },
  form: {
    marginTop: 150
  },
  card: {
    backgroundColor: "#E8CCBF",
    alignItems: 'center',
    width: screenWidth*0.9,
    height: screenHeight*0.7,
    marginTop: 20,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
})

export default LoginScreen;
