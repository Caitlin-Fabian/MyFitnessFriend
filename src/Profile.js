import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, Button, Dimensions, Image, Ionicons } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-web';
import NavBar from './NavBar';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfilePicture = (navigation) => {

    const [userData,setUserData] = userState(null);

    return(
        <SafeAreaView>
            <ScrollView>
            
                <Image source={{uri: "https://images.dog.ceo/breeds/poodle-miniature/n02113712_3049.jpg"}} style= {styles.userImg}></Image>
                <View style= {styles.titleBar}>
                <Text style ={styles.userName}> Caitlin Fabian </Text>
                </View>
                <View>
                    <Text style = {styles.titleBar}> Gender: </Text>
                </View>
                <View>
                    <Text style = {styles.titleBar}> Age: </Text>
                </View>
                <View>
                    <Text style = {styles.titleBar}> Height: </Text>
                </View>
                <View>
                    <Button styles={styles.button} title = "Back" onPress ={()=> navigation.navigate('HomeScreen')}></Button>

                    <Button styles={styles.button} title = "Log out" onPress = {()=>signOut()}></Button>
                </View>
            </ScrollView>
        </SafeAreaView>
       

    );

}
const getUser = async() => {
   await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) =>{
        if (documentSnapshot.exists){
            console.log('User data', documentSnapshot.data());
            setUserData(documentSnapshot.data());
        }
    })
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
        backgroundColor: '#F5FCFF',
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginRight: 16,
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