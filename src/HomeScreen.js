import { StatusBar } from 'expo-status-bar';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, ScrollView, SafeAreaView } from "react-native";
import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { getAuth, signOut } from "firebase/auth";
import User from '../database/user';




//Variables to get the width and height of the screen (That way it works for any screensize(?))
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


//Main homepage
function HomeScreen(props) {

  const [weights, setWeights] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [displayName, setDisplayName] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  //Resets the weight state to the new array of weights
  function weightDataHandler() {
    let newWeights = weights;
    for (let data of userInfo.weightData) {
      newWeights[data.Day] = data.Weight;
    }
    setWeights(newWeights);
  }

  useEffect(async () => {
    const auth = getAuth();
    if (userInfo === null) {
      const userData = await User.getUserInfo(auth.currentUser.uid); //Pulls user info from the firebase
      setUserInfo(userData);
      if (userData != null) {
        setDisplayName(userData.displayName); //Updates displayname to be the name stored in database
      } else {
        setDisplayName(userInfo.displayName);
      }
    }
    weightDataHandler();
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
        <AppHeader displayName={displayName}/>
        <WelcomeText daily='100' max='2000' />
        <CheesyQuote />
        <Graph weights={weights} infoHandle={setUserInfo} weightRefresh={weightDataHandler} />
        <StatusBar style="auto" showHideTransition={'fade'} translucent={true} backgroundColor='transparent'/>
      </ScrollView>
    </SafeAreaView>

  );
}

function AppHeader(props) {
  return (
    <View
      flex={1}
      backgroundColor='#96BDC6'
      alignItems='center'
      justifyContent='center'
      marginBottom={25}
      marginTop={10}
    >
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>Welcome Back, {props.displayName ? props.displayName : "Unknown"}!</Text>
    </View>
  )
}

//Component that holds the daily calorie intake for the user
const WelcomeText = (props) => {
  return (
    <View style={styles.componentHolder} >
      <Text style={{ fontSize: 18, fontWeight: '500' }}>Calorie Goal for the Day</Text>
      <Text style={{ fontSize: 18, fontWeight: '500' }}>{props.daily}/{props.max}</Text>
    </View>
  );
}


//Component that holds the inspirational quote
const CheesyQuote = () => {
  const [quote, setQuote] = useState(false);
  const [inspo, setInspo] = useState("");
  const [author, setAuthor] = useState("");


  useEffect(() => {
    if (!quote) {
      getQuote()
        .then(res => {
          setQuote(true);
          setInspo(res[0].q);
          setAuthor(res[0].a);
        })
        .catch(err => {
          console.log(err)
        })
    }
  })

  function getQuote() {
    return new Promise((res, rej) => {
      fetch('https://zenquotes.io/api/today')
        .then(result => {
          return result.json();
        })
        .then(data => {
          res(data);
        })
        .catch(err => {
          console.log("Couldn't query API: ", err);
          rej(err);
        })
    })
  }

  return (
    <View style={styles.componentHolder} >
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
  decimalPlaces: 0,
}

//Component that holds the graph, rn I just put random numbers in there
const Graph = (props) => {

  //TBH there's definitely a better way to do this, but my head hurts so I'm leaving it like this for now
  const [refresh, setRefresh] = useState(0);


  return (
    <View style={styles.graphHolder}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
        Your Weight This Week
      </Text>
      <LineChart data={{
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            data: props.weights.map(x => x)   //Now the data is just pulled from the weights state, so we can change it on the fly
          }
        ]
      }}
        height={screenHeight * 0.3}
        width={screenWidth * 0.8}
        chartConfig={chartConfig}
        withInnerLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withOuterLines={true}
        yAxisSuffix=" lbs"

        bezier
        style={{
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 15,
          
        }}
      />
      <PopUp infoHandle={props} refresh={setRefresh} data={refresh} />
    </View>
  );
}


const PopUp = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState(null);

  async function addWeightData(weight) {
    const auth = getAuth();
    const date = new Date();
    const newInfo = await User.addWeightInfo({ Weight: weight, Day: date.getDay(), Month: date.getMonth() }, auth.currentUser.uid); //Add the weight data to the graph
    props.infoHandle.infoHandle(newInfo);   //Sets the new userInfo in the parent component
    props.infoHandle.weightRefresh()  //Reloads the weight data in the parent component
    props.refresh(props.data + 1); //Increments the state on the graph component so it will reload when weight data is updated
  }

  //Makes sure the user entered a weight > 0
  function verifyData() {
    return parseInt(weight) > 0;
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
            <TextInput placeholder="Weight" style={styles.inputWeight} onChangeText={text => setWeight(text)} keyboardType='numeric' />
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => {
                if (verifyData()) {
                  setModalVisible(!modalVisible);
                  addWeightData(weight);
                } else {
                  alert("Weight must be greater than 0!");
                }
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
        <Text style={styles.textStyle}>+</Text>
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
    padding: 8,
    elevation: 2,
    position: 'absolute',
    bottom: 250,
    left: 130
  },

  buttonOpen: {
    backgroundColor: "black",
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
  },
  graphHolder: {
    flex: 3,
    flexDirection: 'column',
    marginTop: 30,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentHolder: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1.5,
    width: (screenWidth * 0.8),
    minHeight: (screenHeight * 0.15),
    justifyContent: 'center',
    backgroundColor: '#E8CCBF',
  },
  container: {
    flex: 1,
    backgroundColor: '#96BDC6',
    alignItems: 'center',
    justifyContent: 'center',
    width: (screenWidth)
  },
  scrollview: {
    marginBottom: 60,
    marginTop: 10,
  }
});




export default HomeScreen;
