import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,ScrollView, View, Button, Dimensions,Image, Ionicons} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-web';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ProfilePicture = () =>{

    return(
            <ScrollView>
            
                <Image source={{uri: "https://images.dog.ceo/breeds/poodle-miniature/n02113712_3049.jpg"}} style= {styles.userImg}></Image>
                <View style= {styles.titleBar}>
                <Text style ={styles.userName}> Caitlin Fabian </Text>
                </View>

            </ScrollView>
       

    );
    
}

const ProfileScreen = () => {
    const{user, logout} = userContext([]);
    
    
}

// Main profile function
function Profile(){
    return (
        <View
            flex = {1}
            backgroundColor = '#96BDC6'
            alignItems = 'center'
            justifyContent = 'center'
            paddingTop ={20}
            paddingBottom = {80}
            width = {screenWidth}
            height = {screenHeight}
        >
        
            <ProfilePicture/>
            

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerText:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    userName:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    userImg:{
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