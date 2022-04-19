import { Text, View, Dimensions, Button, TextInput, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import User from '../database/user';



const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


function RegistrationScreen(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfPassword] = useState(null);
    const [email, setEmail] = useState(null);

    const register = async () => {
        if (confirmPassword === password) {
          if(password && email && username) {
            const user = new User(username, email, password);   //Create a new user object w/ the credentials
            const userInfo = await user.addUser();     //Asynchronously handles creating a user
            if(userInfo !== null) {
              navigation.navigate('HomeScreen');
            }
          } else {
            alert("Missing Fields!");
          }
        } else {
            alert("Passwords do not match");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={{marginTop: 50}}>
            <View style={styles.header}>
              <Text style={{textAlign: 'center', fontSize: 35, fontWeight: '400'}}>Register Below</Text>
            </View>
            <TextInput placeholder="Username" onChangeText={(username) => setUsername(username)} style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(password) => setPassword(password)} style={styles.input} />
            <TextInput placeholder="Confirm Password" secureTextEntry={true} onChangeText={(password) => setConfPassword(password)} style={styles.input}/>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} style={styles.input} />
            <View style={styles.buttonHolder}>
              <Pressable style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#286370' : '#96BDC6'
                },
                styles.button
              ]} onPress={() => register()} >
              <Text style={{textAlign: 'center', flex: 1}}>Register</Text>
              </Pressable>
              <Pressable style={({pressed}) => [
                {
                  backgroundColor: pressed ? '#286370' : '#96BDC6'
                },
                styles.navButton
              ]} onPress={() => props.navigation.navigate('LoginScreen')}>
                <Text style={{textAlign: 'center', flex: 1}}>Have an account?  Login Here!</Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor:'#96BDC6',
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
    marginBottom: 20
  },
  button: {
    borderRadius: 10,
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1.5,
    padding: 5,
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
  }
})

export default RegistrationScreen;
