import { StatusBar } from 'expo-status-bar';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, Button, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { getAuth, signOut } from "firebase/auth";
import User from '../database/user';
import NavBar from './NavBar'




//Variables to get the width and height of the screen (That way it works for any screensize(?))
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


//Main homepage
function HomeScreen(props) {

    const [weights, setWeights] = useState([0,0,0,0,0,0,0]);
    const [displayName, setDisplayName] = useState("");
    const [userInfo, setUserInfo] = useState(null);


    useEffect(async () => {
      if(userInfo === null) {
        const user = new User();
        const userData = await user.getUserInfo(props.extraData.uid); //Pulls user info from the firebase
        setUserInfo(userData);
        if(userData != null) {
          setDisplayName(userData.displayName); //Updates displayname to be the name stored in database
        } else {
          setDisplayName(userInfo.displayName);
        }
      }
      let newWeights = weights;
      for(let data of userInfo.weightData) {
        newWeights[data.Day] = data.Weight;
      }
      setWeights(newWeights);
    })




    return (
        <View
            flex={1}
            backgroundColor='#96BDC6'
            alignItems='center'
            justifyContent='center'
            paddingTop={screenHeight * 0.1}
            paddingBottom={screenHeight * 0.15}
            width={screenWidth}
            height={screenHeight}
        >
            <AppHeader />
            <WelcomeText daily='100' max='2000' displayName={displayName} />
            <CheesyQuote />
            <Graph weights={weights} userInfoHandle={setUserInfo}/>
            <StatusBar style="auto" showHideTransition={'fade'} />
            <NavBar navigation={props.navigation} />
        </View>
    );
}

function AppHeader() {
    return (
        <View
            flex={1}
            backgroundColor='#96BDC6'
            alignItems='center'
            justifyContent='center'
            marginBottom={25}
            marginTop={0}
        >
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>MyFitnessFriend</Text>
        </View>
    )
}

//Component that holds the daily calorie intake for the user
const WelcomeText = (props) => {
    return (
        <View
            flex={1}
            flexDirection='column'
            margin={5}
            padding={20}
            alignItems='center'
            borderColor='black'
            borderWidth={1.5}
            width={screenWidth * 0.8}
            justifyContent='center'
            height={screenHeight * 0.25}
            backgroundColor='#E8CCBF'
        >
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Welcome: {props.displayName}</Text>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Calorie Goal for the Day</Text>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{props.daily}/{props.max}</Text>
        </View>
    );
}


//Queries an API to get a daily inspirational quote and returns the quote string
function getQuote() {
    console.log("Querying data");
    return new Promise((res, rej) => {
        fetch('https://quotes.rest/qod.json')
            .then(result => {
                return result.json();
            })
            .then(data => {
                res(data.contents.quotes[0]);
            })
            .catch(err => {
                rej(err);
            })
    })
}


//Component that holds the inspirational quote
const CheesyQuote = () => {
    const [quote, setQuote] = useState(false);
    const [inspo, setInspo] = useState("");
    const [author, setAuthor] = useState("");
    //If the quote has already been retrieved from API don't query for another
    if (!quote) {
        getQuote()
            .then(result => {
                setQuote(true);
                setInspo(result.quote);
                setAuthor(result.author);
            })
            .catch(err => {
                setQuote(false);
                console.log(`Error querying API: ${err}`);
            })
    }
    return (
        <View
            flex={1}
            flexDirection='column'
            margin={5}
            padding={20}
            alignItems='center'
            borderColor='black'
            borderWidth={1.5}
            width={screenWidth * 0.8}
            height={screenHeight * 0.25}
            justifyContent='center'
            backgroundColor='#E8CCBF'
        >
            <Text style={{ fontSize: 15, fontWeight: '400' }} >{quote ? inspo : "Loading"} - {quote ? author : ""}</Text>
        </View>
    )
}


//Styling for the graphs
const chartConfig = {
    backgroundGradientFrom: "#E8CCBF",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#E8CCBF",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, 0.8)`,
    labelColor: (opacity = 1) => 'rgba(0,0,0, 1)',
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
}

//Component that holds the graph, rn I just put random numbers in there
const Graph = (props) => {



    return (
        <View
            flex={3}
            flexDirection='column'
            marginTop={50}
            padding={0}
            alignItems='center'
            justifyContent='center'
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Your Weight This Week
            </Text>
            <LineChart data={{
                labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
                datasets: [
                    {
                        data: props.weights.map(x => x)   //Now the data is just pulled from the weights state, so we can change it on the fly
                    }
                ]
            }}

                height={screenHeight * 0.3}
                width={screenWidth * 0.8}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                bezier
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 15,
                    marginTop: 5
                }}
            />
            <PopUp infoHandle = {props}/>
        </View>
    );
}


const PopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState(null);

  async function addWeightData(weight) {
    const auth = getAuth();
    const user = new User();
    const date = new Date();
    user.addWeightInfo({Weight: weight, Day: date.getDay(), Month: date.getMonth()}, auth.currentUser.uid);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Today's Weight</Text>
            <TextInput placeholder="Weight" style={styles.inputWeight} onChangeText={text => setWeight(text)} keyboardType='numeric'/>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                addWeightData(weight);
              }}
            >
              <Text style={styles.textStyle}>Add!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Add...</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 250,
    left: 90
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inputWeight: {
    width: 200,
    height: 30,
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center'
  }
});




export default HomeScreen;
