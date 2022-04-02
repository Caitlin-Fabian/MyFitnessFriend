import { StatusBar } from 'expo-status-bar';
import { Text, View, Dimensions, Button } from 'react-native';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import NavBar from './NavBar';


//Variables to get the width and height of the screen (That way it works for any screensize(?))
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


//Main homepage
function HomeScreen({ navigation }) {
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
            <WelcomeText daily='100' max='2000' />
            <CheesyQuote />
            <Graph />
            <StatusBar style="auto" showHideTransition={'fade'} />
            <NavBar navigation={navigation} />
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

            <Text style={{ fontSize: 15, fontWeight: '350' }} >{quote ? inspo : "Loading"} - {quote ? author : ""}</Text>
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
const Graph = () => {
    const [weights, setWeights] = useState([180, 185, 190, 185, 180, 180, 185]);
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
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                    {
                        data: weights.map(x => x)   //Now the data is just pulled from the weights state, so we can change it on the fly
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
        </View>
    );
}


const ButtonToGoToProfile = ({ navigation }) => {
    return (
        <View>
            <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')}>Hello</Button>
        </View>
    );
}


export default HomeScreen;