import { Text, View, Dimensions, TouchableOpacity, TextInput, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
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
      if (password && email && username) {
        const user = new User(username, email, password);   //Create a new user object w/ the credentials
        const userInfo = await user.addUser();     //Asynchronously handles creating a user
        if (userInfo !== null) {
          navigation.navigate('HomeScreen');
          setUsername(null);
          setPassword(null);
          setConfPassword(null);
          setEmail(null);
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
            <TextInput placeholder="Username" onChangeText={(username) => setUsername(username)} style={styles.input} value={username} />
            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(password) => setPassword(password)} style={styles.input} value={password} />
            <TextInput placeholder="Confirm Password" secureTextEntry={true} onChangeText={(password) => setConfPassword(password)} style={styles.input} value={confirmPassword} />
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} style={styles.input} value={email} />
            <View style={styles.buttonHolder}>
              <TouchableOpacity style={styles.button} onPress={() => register()}>
                <Text style={{ textAlign: 'center' }}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('LoginScreen')}>
                <Text style={{ textAlign: 'center' }}>Have an account?{'\n'}Login Here!</Text>
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
    width: screenWidth * 0.9,
    height: screenHeight * 0.8,
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

export default RegistrationScreen;
